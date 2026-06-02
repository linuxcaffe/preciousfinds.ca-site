import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { siteConfig } from "../util/siteConfig"
// @ts-ignore
import style from "./styles/shopFooter.scss"

export default (() => {
  const ShopFooter: QuartzComponent = ({ cfg }: QuartzComponentProps) => {
    const year      = new Date().getFullYear()
    const copyright = siteConfig.copyright ?? `© ${year} ${cfg.configuration.pageTitle}`
    const instagram = siteConfig.instagram || null
    const ebay      = siteConfig.ebay || null
    const etsy      = siteConfig.etsy || null

    return (
      <footer class="shop-footer">
        <p class="shop-footer-copy">{copyright}</p>
        {(instagram || ebay || etsy) && (
          <ul class="shop-footer-links">
            {instagram && (
              <li>
                <a href={`https://instagram.com/${instagram}`} target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </li>
            )}
            {ebay && (
              <li>
                <a href={`https://ebay.ca/usr/${ebay}`} target="_blank" rel="noopener noreferrer">
                  eBay
                </a>
              </li>
            )}
            {etsy && (
              <li>
                <a href={`https://etsy.com/shop/${etsy}`} target="_blank" rel="noopener noreferrer">
                  Etsy
                </a>
              </li>
            )}
          </ul>
        )}
      </footer>
    )
  }

  ShopFooter.css = style
  return ShopFooter
}) satisfies QuartzComponentConstructor
