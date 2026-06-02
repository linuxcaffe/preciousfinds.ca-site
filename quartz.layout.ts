import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [Component.SiteHeader()],
  afterBody: [Component.PageFootnote(), Component.Search()],
  footer: Component.SiteFooter(),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ConditionalRender({
      component: Component.ShopHome(),
      condition: (page) => page.fileData.slug === "index",
    }),
    Component.ItemGallery(),
    Component.ItemMeta(),
    Component.ContentMeta(),
    Component.TagList(),
    Component.ConditionalRender({
      component: Component.ItemGrid({ tag: "shop" }),
      condition: (page) => page.fileData.slug === "shop",
    }),
    Component.ConditionalRender({
      component: Component.ItemGrid({ tag: "new" }),
      condition: (page) => page.fileData.slug === "new-arrivals",
    }),
  ],
  left: [],
  right: [],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [],
  right: [],
}
