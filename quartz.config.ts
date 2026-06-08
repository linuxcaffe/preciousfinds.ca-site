import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Precious Finds",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "linuxcaffe.github.io/preciousfinds.ca-site",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Playfair Display",
        body: "Lora",
        code: "IBM Plex Mono",
      },
      colors: {
        // Warm Vintage palette — mirrors custom.scss :root variables exactly
        lightMode: {
          light: "#faf7f0",
          lightgray: "#d9cdbf",
          gray: "#a08c7e",
          darkgray: "#4a3728",
          dark: "#2c1a0e",
          secondary: "#8b3a52",
          tertiary: "#b8704a",
          highlight: "rgba(201, 163, 82, 0.15)",
          textHighlight: "rgba(139, 58, 82, 0.2)",
        },
        darkMode: {
          light: "#1c1208",
          lightgray: "#2e1f0e",
          gray: "#7a5c48",
          darkgray: "#d4c5b5",
          dark: "#faf7f0",
          secondary: "#c97a8f",
          tertiary: "#c9a352",
          highlight: "rgba(201, 163, 82, 0.12)",
          textHighlight: "rgba(201, 163, 82, 0.3)",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.PrivateBody(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts(), Plugin.UnderscoreFiles(), Plugin.ShopStatus()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      Plugin.CategoryPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
