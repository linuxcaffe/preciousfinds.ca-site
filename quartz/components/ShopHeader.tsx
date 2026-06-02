import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
// @ts-ignore
import style from "./styles/shopHeader.scss"

export default (() => {
  const ShopHeader: QuartzComponent = ({ cfg, fileData }: QuartzComponentProps) => {
    const title   = cfg?.configuration?.pageTitle ?? "Precious Finds"
    const caption = fileData.frontmatter?.caption
    const tagline = caption ? String(caption) : null

    return (
      <div class="shop-header-wrap">
        <div class="shop-header-bar">
          <div class="shop-header-left" />
          <div class="shop-header-center">
            <a href="/" class="shop-header-logo">
              {title}
              <span class="shop-header-tld">.ca</span>
            </a>
            {tagline && <div class="shop-header-tagline">{tagline}</div>}
          </div>
          <div class="shop-header-right">
            <button class="shop-header-icon-btn" aria-label="Search" data-shop-search="1">
              🔍
            </button>
            <button class="shop-header-icon-btn" aria-label="Toggle dark mode" data-shop-darkmode="1">
              <span data-darkmode-icon="1">🌙</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  ShopHeader.css = style

  ShopHeader.afterDOMLoaded = `
    function initShopHeader() {
      const dmBtn     = document.querySelector('[data-shop-darkmode]')
      const dmIcon    = document.querySelector('[data-darkmode-icon]')
      const searchBtn = document.querySelector('[data-shop-search]')

      function syncDarkmode() {
        const dark = document.documentElement.getAttribute('saved-theme') === 'dark'
        if (dmIcon) dmIcon.textContent = dark ? '☀️' : '🌙'
      }

      dmBtn?.addEventListener('click', () => {
        const cur  = document.documentElement.getAttribute('saved-theme') ?? 'light'
        const next = cur === 'dark' ? 'light' : 'dark'
        document.documentElement.setAttribute('saved-theme', next)
        localStorage.setItem('theme', next)
        window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: next } }))
        syncDarkmode()
      })

      window.addEventListener('themechange', syncDarkmode)
      window.addCleanup?.(() => window.removeEventListener('themechange', syncDarkmode))

      searchBtn?.addEventListener('click', () => {
        document.querySelector('.search button')?.click()
      })

      syncDarkmode()
    }

    document.addEventListener('nav', initShopHeader)
    initShopHeader()
  `

  return ShopHeader
}) satisfies QuartzComponentConstructor
