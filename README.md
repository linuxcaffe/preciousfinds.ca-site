# quartz-preciousfinds.ca

> preciousfinds.ca shop site — built on Quartz v4, deployed to GitHub Pages.

## Local setup

Content lives in the nb notebook `~/.nb/preciousfinds.ca/` and is linked into
this project via a symlink:

```bash
ln -s ~/.nb/preciousfinds.ca content
```

**Do not commit the symlink target** — `content/` is `.gitignore`d; the notebook
has its own git history. Build and deploy with:

```bash
# Push notebook content (triggers GitHub Actions build):
git -C ~/.nb/preciousfinds.ca push origin HEAD:preciousfinds.ca
git push origin main     # push quartz config changes if any
```

Or use **Menu → Notebooks → preciousfinds.ca → Build & Deploy** in nb-web,
which pushes both the notebook content and quartz config to GitHub — GitHub
Actions handles the actual build and Pages deployment automatically.

---

## Content authoring reference

### Page frontmatter

| Field | Purpose | Example |
|-------|---------|---------|
| `title:` | Page title | `title: New Arrivals` |
| `caption:` | Subtitle shown below title | `caption: Fresh finds, updated regularly.` |
| `footnote:` | Italic note at page bottom — supports inline markup | `footnote: Follow us on [eBay](https://…)` |
| `with_tags:` | Renders an item grid filtered by these tags | `with_tags: [vintage, new]` |
| `draft: true` | Prevents page from being published | `draft: true` |
| `SEO:` | Keywords for the page meta description | `SEO: vintage, antique` |

### Item frontmatter (`items/` folder)

| Field | Purpose |
|-------|---------|
| `status:` | `available` or `sold` — anything else removes the item from the site |
| `price:` | Display price |
| `category:` | Drives category pages and nav |
| `tags:` | Used by `with_tags:` feed pages |
| `image:` | Filename(s) from `images/`, comma-separated for galleries |
| `caption:` | Short description shown on cards |
| `description:` | Longer text shown on featured cards |
| `condition:`, `size:`, `shipping:` | Shown on featured and detail views |
| `platform:` + `listing:` | External marketplace name + URL |
| `featured: true` | Promotes item to the home page featured carousel |

### Tag-feed pages

Any page (outside `items/`) with `with_tags:` frontmatter becomes a curated
collection page and auto-appears in the shop nav and home page ribbons:

```yaml
---
title: Vintage
with_tags: [vintage]
---
```

Tag items with matching `tags: [vintage]` and they appear automatically.
No code changes needed — just create the note and sync.

### Inline link syntax

Supported in `footnote:` (per-page) and `footer:` (`_meta.md`):

| Syntax | Result |
|--------|--------|
| `[text](url)` | Standard link |
| `[[Page Title]]` | Wikilink — resolved to slug (`New Arrivals` → `new-arrivals`) |
| `[Home](/)` | Link to the home page (use this instead of `[[Site Title]]`) |
| `**bold**`, `*italic*` | Inline emphasis |

> **Note:** `[[Wikilinks]]` resolve by slugifying the title (lowercase, spaces→hyphens).
> For the home page, use `[text](/)` — there is no slug to match against.

### Sitewide config (`_meta.md`)

`_meta.md` is never published (`draft: true`). Its frontmatter fields configure
the whole site:

| Field | Purpose |
|-------|---------|
| `title:` | Site name |
| `tagline:` | Shown on the home page |
| `footer:` | Footer text — supports inline link syntax above, `\|` for multiline |
| `copyright:` | Copyright line (used when `footer:` is absent) |
| `instagram:`, `ebay:`, `etsy:` | Social/platform handles for footer links |

---

# Quartz v4

> “[One] who works with the door open gets all kinds of interruptions, but [they] also occasionally gets clues as to what the world is and what might be important.” — Richard Hamming

Quartz is a set of tools that helps you publish your [digital garden](https://jzhao.xyz/posts/networked-thought) and notes as a website for free.

🔗 Read the documentation and get started: https://quartz.jzhao.xyz/

[Join the Discord Community](https://discord.gg/cRFFHYye7t)

## Sponsors

<p align="center">
  <a href="https://github.com/sponsors/jackyzha0">
    <img src="https://cdn.jsdelivr.net/gh/jackyzha0/jackyzha0/sponsorkit/sponsors.svg" />
  </a>
</p>
