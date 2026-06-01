import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
// @ts-ignore
import style from "./styles/itemMeta.scss"

const ItemMeta: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  if (!fileData.slug?.startsWith("items/")) return null

  const fm          = fileData.frontmatter ?? {}
  const status      = fm["status"]      as string | undefined
  const price       = fm["price"]       as string | undefined
  const qtty        = fm["qtty"]        as string | undefined
  const category    = fm["category"]    as string | undefined
  const description = fm["description"] as string | undefined
  const platform    = fm["platform"]    as string | undefined
  const listing     = fm["listing"]     as string | undefined
  const condition   = fm["condition"]   as string | undefined

  if (!status && !price && !platform && !condition && !description && !category) return null

  const statusLabel =
    status === "available" ? "Available"
    : status === "sold"    ? "Sold"
    : status               ?? ""

  return (
    <div class={classNames(displayClass, "item-meta-wrap")}>
      {category && <span class="item-category">{String(category)}</span>}
      {description && <p class="item-description">{String(description)}</p>}
      {condition && <p class="item-condition">{String(condition)}</p>}
      <div class="item-meta">
        {qtty && <span class="item-qtty">×{String(qtty)}</span>}
        {status && (
          <span class={`item-status item-status--${status}`}>{statusLabel}</span>
        )}
        {price && <span class="item-price">{String(price)}</span>}
        {platform && listing
          ? <a class="item-listing" href={String(listing)} target="_blank" rel="noopener noreferrer">
              View on {String(platform)} →
            </a>
          : platform
          ? <span class="item-platform">{String(platform)}</span>
          : null
        }
      </div>
    </div>
  )
}

ItemMeta.css = style

export default (() => ItemMeta) satisfies QuartzComponentConstructor
