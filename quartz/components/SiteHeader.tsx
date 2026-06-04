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
            <button class="site-header-icon-btn" aria-label="Toggle dark mode" data-shop-darkmode="1">
              <span data-darkmode-icon="1">🌙</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  SiteHeader.css = style

  // Runs in <head> before paint — sets saved-theme from localStorage to prevent flash.
  // Needed because we don't include the Darkmode component (which normally does this).
  SiteHeader.beforeDOMLoaded = `
    (function() {
      const pref = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      const theme = localStorage.getItem('theme') ?? pref
      document.documentElement.setAttribute('saved-theme', theme)
    })()
  `

  // Fully self-contained toggle — no dependency on Darkmode component or darkmode.inline.ts.
  SiteHeader.afterDOMLoaded = `
    function initSiteHeader() {
      const dmBtn     = document.querySelector('[data-shop-darkmode]')
      const dmIcon    = document.querySelector('[data-darkmode-icon]')
      const searchBtn = document.querySelector('[data-shop-search]')

      function syncIcon() {
        if (dmIcon) dmIcon.textContent =
          document.documentElement.getAttribute('saved-theme') === 'dark' ? '☀️' : '🌙'
      }

      function onDmClick() {
        const next = document.documentElement.getAttribute('saved-theme') === 'dark' ? 'light' : 'dark'
        document.documentElement.setAttribute('saved-theme', next)
        localStorage.setItem('theme', next)
        document.dispatchEvent(new CustomEvent('themechange', { detail: { theme: next } }))
        syncIcon()
      }

      function onThemeChange() { syncIcon() }

      function onSearchClick() {
        document.querySelector('.search button')?.click()
      }

      syncIcon()
      dmBtn?.addEventListener('click', onDmClick)
      document.addEventListener('themechange', onThemeChange)
      searchBtn?.addEventListener('click', onSearchClick)

      window.addCleanup?.(() => {
        dmBtn?.removeEventListener('click', onDmClick)
        document.removeEventListener('themechange', onThemeChange)
        searchBtn?.removeEventListener('click', onSearchClick)
      })
    }

    document.addEventListener('nav', initSiteHeader)
  `

  return SiteHeader
}) satisfies QuartzComponentConstructor
