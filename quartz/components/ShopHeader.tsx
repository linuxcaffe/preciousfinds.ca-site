import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
// @ts-ignore
import style from "./styles/shopHeader.scss"

export default (() => {
  const ShopHeader: QuartzComponent = ({ cfg }: QuartzComponentProps) => {
    const title = cfg?.configuration?.pageTitle ?? "Precious Finds"

    return (
      <div class="shop-header-bar">
        <button class="shop-header-hamburger" aria-label="Menu">
          ☰
        </button>
        <div class="shop-header-center">
          <a href="/" class="shop-header-logo">
            {title}
            <span class="shop-header-tld">.ca</span>
          </a>
          <div class="shop-header-tagline">Find here a clever catch-phrase</div>
        </div>
        <button class="shop-header-search" aria-label="Search" data-shop-search>
          🔍
        </button>
      </div>
    )
  }

  ShopHeader.css = style

  ShopHeader.afterDOMLoaded = `
    document.querySelector('[data-shop-search]')?.addEventListener('click', () => {
      document.querySelector('.search button')?.click()
    })
  `

  return ShopHeader
}) satisfies QuartzComponentConstructor
