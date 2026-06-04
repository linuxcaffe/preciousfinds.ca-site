import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { siteConfig } from "../util/siteConfig"
// @ts-ignore
import style from "./styles/siteFooter.scss"

function parseFooter(text: string): (string | JSX.Element)[] {
  const parts: (string | JSX.Element)[] = []
  const re = /\*\*(.+?)\*\*|\*(.+?)\*|\[([^\]]+)\]\(([^)]+)\)|\[\[([^\]]+)\]\]/g
  let last = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index))
    if (m[1] !== undefined)      parts.push(<strong>{m[1]}</strong>)
    else if (m[2] !== undefined) parts.push(<em>{m[2]}</em>)
    else if (m[4] !== undefined) parts.push(<a href={m[4]}>{m[3]}</a>)
    else {
      const title = m[5]
      const slug = title.toLowerCase().replace(/\s+/g, "-")
      parts.push(<a href={slug}>{title}</a>)
    }
    last = re.lastIndex
  }
  if (last < text.length) parts.push(text.slice(last))
  return parts
}

export default (() => {
  const SiteFooter: QuartzComponent = ({ cfg }: QuartzComponentProps) => {
    const year      = new Date().getFullYear()
    const footer    = siteConfig.footer || null
    const copyright = !footer ? (siteConfig.copyright ?? `© ${year} ${cfg?.configuration?.pageTitle ?? ""}`) : null
    const instagram = !footer ? (siteConfig.instagram || null) : null
    const ebay      = !footer ? (siteConfig.ebay || null) : null
    const etsy      = !footer ? (siteConfig.etsy || null) : null

    return (
      <footer class="site-footer">
        {footer
          ? <p class="site-footer-copy">
              {footer.split("\n").flatMap((line, i) =>
                i === 0 ? parseFooter(line) : [<br />, ...parseFooter(line)]
              )}
            </p>
          : <p class="site-footer-copy">{copyright}</p>
        }
        {(instagram || ebay || etsy) && (
          <ul class="site-footer-links">
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

  SiteFooter.css = style
  return SiteFooter
}) satisfies QuartzComponentConstructor
