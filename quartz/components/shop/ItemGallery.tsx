import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"
import { pathToRoot, joinSegments } from "../../util/path"
// @ts-ignore
import style from "../styles/itemGallery.scss"

function resolveImages(imageField: string | undefined, fromSlug: string): string[] {
  if (!imageField) return []
  return imageField
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((img) => {
      const rel = img.startsWith("../images/") ? img.slice(3)
                : img.startsWith("images/")    ? img
                : `images/${img}`
      return joinSegments(pathToRoot(fromSlug as any), rel)
    })
}

export default (() => {
  const ItemGallery: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
    if (!fileData.slug?.startsWith("items/")) return null

    const fm      = fileData.frontmatter ?? {}
    const title   = (fm["title"] as string) ?? ""
    const caption = fm["caption"] as string | undefined
    const images  = resolveImages(fm["image"] as string | undefined, fileData.slug!)

    if (images.length === 0) return null

    return (
      <div class="item-gallery">
        <div class="item-gallery-hero-wrap" data-gallery-wrap="1">
          <img
            src={images[0]}
            alt={title}
            class="item-gallery-hero-img"
            data-gallery-hero="1"
            loading="eager"
          />
          {images.length > 1 && (
            <button class="item-gallery-next" data-gallery-next="1" aria-label="Next image">
              ›
            </button>
          )}
        </div>

        {caption && <p class="item-gallery-caption">{caption}</p>}

        {images.length > 1 && (
          <div class="item-gallery-thumbs">
            {images.map((src, i) => (
              <button
                class={`item-gallery-thumb${i === 0 ? " item-gallery-thumb--active" : ""}`}
                data-gallery-thumb={String(i)}
                aria-label={`Image ${i + 1}`}
              >
                <img src={src} alt={`${title} — image ${i + 1}`} loading="lazy" />
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }

  ItemGallery.css = style

  ItemGallery.afterDOMLoaded = `
    function initGalleries() {
      document.querySelectorAll('[data-gallery-wrap]').forEach(wrap => {
        if (wrap.dataset.galleryInit) return
        wrap.dataset.galleryInit = '1'

        const heroImg = wrap.querySelector('[data-gallery-hero]')
        const nextBtn = wrap.querySelector('[data-gallery-next]')
        const gallery = wrap.closest('.item-gallery')
        const thumbs  = gallery ? [...gallery.querySelectorAll('[data-gallery-thumb]')] : []
        if (!heroImg || !thumbs.length) return

        let idx = 0

        function show(i) {
          idx = i
          const src = thumbs[i].querySelector('img')?.src
          if (src) heroImg.src = src
          thumbs.forEach((t, j) => t.classList.toggle('item-gallery-thumb--active', j === i))
        }

        thumbs.forEach((t, i) => t.addEventListener('click', () => show(i)))
        nextBtn?.addEventListener('click', () => show((idx + 1) % thumbs.length))
      })
    }

    document.addEventListener('nav', initGalleries)
    initGalleries()
  `

  return ItemGallery
}) satisfies QuartzComponentConstructor
