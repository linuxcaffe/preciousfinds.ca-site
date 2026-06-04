import { QuartzFilterPlugin } from "../types"

const PUBLISH_STATUSES = new Set(["available", "sold"])

export const ShopStatus: QuartzFilterPlugin<{}> = () => ({
  name: "ShopStatus",
  shouldPublish(_ctx, [_tree, vfile]) {
    const status = vfile.data?.frontmatter?.status
    // Only intervene when status is explicitly set — regular pages have no status field
    if (status === undefined || status === null || status === "") return true
    return PUBLISH_STATUSES.has(String(status).toLowerCase().trim())
  },
})
