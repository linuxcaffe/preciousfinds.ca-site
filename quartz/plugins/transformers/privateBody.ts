import { QuartzTransformerPlugin } from "../types"
import { Root } from "hast"

/**
 * PrivateBody — keep note bodies out of the published site.
 *
 * Two mechanisms:
 *
 * 1. Frontmatter flag — strips the entire body:
 *      private_body: true
 *    Ideal for item notes where the body is always back-of-house.
 *
 * 2. Inline sentinel — strips everything from the marker onward:
 *      <!-- nb:private -->
 *    Splits any note into a published top and a private bottom.
 */
export const PrivateBody: QuartzTransformerPlugin = () => ({
  name: "PrivateBody",
  htmlPlugins() {
    return [
      () => (tree: Root, file) => {
        const fm = file.data.frontmatter as Record<string, unknown> | undefined

        // Whole-body flag
        if (fm?.private_body) {
          tree.children = []
          return
        }

        // Sentinel: <!-- nb:private -->
        // remark-rehype+rehype-raw produces `comment` nodes for HTML comments.
        // Guard against `raw` nodes too in case the pipeline differs.
        const idx = tree.children.findIndex((node) => {
          if (node.type === "comment") {
            return (node as unknown as { value: string }).value.trim() === "nb:private"
          }
          if (node.type === "raw") {
            const v = (node as unknown as { value: string }).value.trim()
            return v === "<!--nb:private-->" || v === "<!-- nb:private -->"
          }
          return false
        })
        if (idx >= 0) tree.children = tree.children.slice(0, idx)
      },
    ]
  },
})
