import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
// @ts-ignore
import style from "./styles/itemMeta.scss"

const ItemMeta: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  if (!fileData.slug?.startsWith("items/")) return null

  const fm        = fileData.frontmatter ?? {}
  const status    = fm["status"]    as string | undefined
  const price     = fm["price"]     as string | undefined
  const platform  = fm["platform"]  as string | undefined
  const listing   = fm["listing"]   as string | undefined
  const condition = fm["condition"] as string | undefined

  if (!status && !price && !platform && !condition) return null

  const statusLabel =
    status === "available" ? "Available"
    : status === "sold"    ? "Sold"
    : status               ?? ""

  return (
    <div class={classNames(displayClass, "item-meta")}>
      {status && (
        <span class={`item-status item-status--${status}`}>{statusLabel}</span>
      )}
      {price && <span class="item-price">{String(price)}</span>}
      {condition && <span class="item-condition">{String(condition)}</span>}
      {platform && listing
        ? <a class="item-listing" href={String(listing)} target="_blank" rel="noopener noreferrer">
            View on {String(platform)} →
          </a>
        : platform
        ? <span class="item-platform">{String(platform)}</span>
        : null
      }
    </div>
  )
}

ItemMeta.css = style

export default (() => ItemMeta) satisfies QuartzComponentConstructor
