import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
// @ts-ignore
import style from "./styles/shopHeader.scss"

export default (() => {
  const ShopHeader: QuartzComponent = ({ cfg }: QuartzComponentProps) => {
    const title = cfg?.configuration?.pageTitle ?? "Precious Finds"

    return (
      <div class="shop-header-wrap">
        <div class="shop-header-bar">
          <button class="shop-header-hamburger" aria-label="Menu" data-shop-menu="1">
            ☰
          </button>
          <div class="shop-header-center">
            <a href="/" class="shop-header-logo">
              {title}
              <span class="shop-header-tld">.ca</span>
            </a>
            <div class="shop-header-tagline">Find here a clever catch-phrase</div>
          </div>
          <button class="shop-header-search" aria-label="Search" data-shop-search="1">
            🔍
          </button>
        </div>

        {/* Hamburger drawer */}
        <div class="shop-drawer" data-shop-drawer="1" aria-hidden="true">
          <button class="shop-drawer-close" data-shop-drawer-close="1" aria-label="Close">✕</button>
          <ul class="shop-drawer-menu">
            <li>
              <button class="shop-drawer-item" data-shop-darkmode="1">
                <span data-darkmode-icon="1">🌙</span>
                <span data-darkmode-label="1">Dark mode</span>
              </button>
            </li>
          </ul>
        </div>
        <div class="shop-drawer-overlay" data-shop-overlay="1" />
      </div>
    )
  }

  ShopHeader.css = style

  ShopHeader.afterDOMLoaded = `
    function initShopHeader() {
      const menu    = document.querySelector('[data-shop-menu]')
      const drawer  = document.querySelector('[data-shop-drawer]')
      const overlay = document.querySelector('[data-shop-overlay]')
      const closeBtn = document.querySelector('[data-shop-drawer-close]')
      const dmBtn   = document.querySelector('[data-shop-darkmode]')
      const dmIcon  = document.querySelector('[data-darkmode-icon]')
      const dmLabel = document.querySelector('[data-darkmode-label]')
      const searchBtn = document.querySelector('[data-shop-search]')

      function openDrawer()  { drawer?.classList.add('open'); overlay?.classList.add('open') }
      function closeDrawer() { drawer?.classList.remove('open'); overlay?.classList.remove('open') }

      function syncDarkmode() {
        const dark = document.documentElement.getAttribute('saved-theme') === 'dark'
        if (dmIcon)  dmIcon.textContent  = dark ? '☀️' : '🌙'
        if (dmLabel) dmLabel.textContent = dark ? 'Light mode' : 'Dark mode'
      }

      menu?.addEventListener('click', openDrawer)
      closeBtn?.addEventListener('click', closeDrawer)
      overlay?.addEventListener('click', closeDrawer)

      dmBtn?.addEventListener('click', () => {
        const cur  = document.documentElement.getAttribute('saved-theme') ?? 'light'
        const next = cur === 'dark' ? 'light' : 'dark'
        document.documentElement.setAttribute('saved-theme', next)
        localStorage.setItem('theme', next)
        window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: next } }))
        syncDarkmode()
      })

      window.addEventListener('themechange', syncDarkmode)
      window.addCleanup(() => window.removeEventListener('themechange', syncDarkmode))

      searchBtn?.addEventListener('click', () => {
        closeDrawer()
        document.querySelector('.search button')?.click()
      })

      syncDarkmode()
    }

    document.addEventListener('nav', initShopHeader)
    initShopHeader()
  `

  return ShopHeader
}) satisfies QuartzComponentConstructor
