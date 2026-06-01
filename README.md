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
