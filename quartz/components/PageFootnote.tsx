import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const PageFootnote: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  if (fileData.slug?.startsWith("items/")) return null
  const footnote = fileData.frontmatter?.footnote as string | undefined
  if (!footnote) return null
  return <p class="page-footnote">{footnote}</p>
}

PageFootnote.css = `
.page-footnote {
  font-style: italic;
  color: var(--gray);
  font-size: 0.88rem;
  border-top: 1px solid var(--lightgray);
  padding-top: 0.9rem;
  margin-top: 2rem;
}
`

export default (() => PageFootnote) satisfies QuartzComponentConstructor
