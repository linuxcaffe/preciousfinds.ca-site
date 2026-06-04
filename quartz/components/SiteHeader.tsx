import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { siteConfig } from "../util/siteConfig"
import { pathToRoot } from "../util/path"
// @ts-ignore
import style from "./styles/siteHeader.scss"

export default (() => {
  const SiteHeader: QuartzComponent = ({ cfg, fileData }: QuartzComponentProps) => {
    const title       = cfg?.configuration?.pageTitle ?? "Precious Finds"
    const logoHref    = pathToRoot(fileData.slug!)
    const pageCaption = fileData.frontmatter?.caption
    const tagline     = pageCaption ? String(pageCaption) : (siteConfig.tagline ?? null)

    return (
      <div class="site-header-wrap">
        <div class="site-header-bar">
          <div class="site-header-left" />
          <div class="site-header-center">
            <a href={logoHref} class="site-header-logo">
              {title}
              <span class="site-header-tld">.ca</span>
            </a>
            {tagline && <div class="site-header-tagline">{tagline}</div>}
          </div>
          <div class="site-header-right">
            <button class="site-header-icon-btn" aria-label="Search" data-shop-search="1">
              🔍
            </button>
            <button class="site-header-icon-btn darkmode" aria-label="Toggle dark mode">
              <span data-darkmode-icon="1">🌙</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  SiteHeader.css = style

  // Quartz's darkmode.inline.ts owns the toggle — it wires any .darkmode button automatically.
  // We only need to sync the icon when the theme changes.
  SiteHeader.afterDOMLoaded = `
    function syncDarkmodeIcon() {
      const icon = document.querySelector('[data-darkmode-icon]')
      if (!icon) return
      icon.textContent = document.documentElement.getAttribute('saved-theme') === 'dark' ? '☀️' : '🌙'
    }

    function initSiteHeader() {
      const searchBtn = document.querySelector('[data-shop-search]')

      function onSearchClick() {
        document.querySelector('.search button')?.click()
      }

      syncDarkmodeIcon()
      document.addEventListener('themechange', syncDarkmodeIcon)
      searchBtn?.addEventListener('click', onSearchClick)

      window.addCleanup?.(() => {
        document.removeEventListener('themechange', syncDarkmodeIcon)
        searchBtn?.removeEventListener('click', onSearchClick)
      })
    }

    document.addEventListener('nav', initSiteHeader)
    initSiteHeader()
  `

  return SiteHeader
}) satisfies QuartzComponentConstructor
