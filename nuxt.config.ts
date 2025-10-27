// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/icon",
    "@nuxt/fonts",
    "@nuxt/fonts",
    "@nuxtjs/i18n",
  ],
  i18n: {
    defaultLocale: "en",
    strategy: "prefix_except_default",
    detectBrowserLanguage: false,
    locales: [
      { code: "en", name: "English", language: "en-US" },
      { code: "de", name: "Deutsch", language: "de-DE" },
    ],
  },
  content: {
    preview: {
      api: "https://api.nuxt.studio",
    },
    experimental: { sqliteConnector: "native" },
  },

  app: {
    head: {
      title: "v-sion",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },

        // Open Graph
        { property: "og:title", content: "v-sion" },
        {
          property: "og:description",
          content:
            "Excellent design and pioneering technology powering today’s live content delivery",
        },
        { property: "og:image", content: "https://www.v-sion.de/OG_Image.jpg" },
        { property: "og:url", content: "https://www.v-sion.de" },
        { property: "og:type", content: "website" },

        // Twitter
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "v-sion" },
        {
          name: "twitter:description",
          content:
            "Excellent design and pioneering technology powering today’s live content delivery",
        },
        {
          name: "twitter:image",
          content: "https://www.v-sion.de/OG_Image.jpg",
        },
      ],
      link: [
        // Favicon (light)
        {
          rel: "icon",
          type: "image/svg+xml",
          href: "/favicon-black.svg",
          media: "(prefers-color-scheme: light)",
          sizes: "any",
        },
        // Favicon (dark)
        {
          rel: "icon",
          type: "image/svg+xml",
          href: "/favicon.svg",
          media: "(prefers-color-scheme: dark)",
          sizes: "any",
        },
        // PNG fallback
        {
          rel: "icon",
          type: "image/png",
          href: "/favicon-96x96.png",
          sizes: "96x96",
        },
        // Safari pinned tab
        {
          rel: "mask-icon",
          href: "/safari-pinned-tab.svg",
          color: "#000000",
        },
        // Apple touch icon (placeholder)
        {
          rel: "apple-touch-icon",
          id: "apple-touch-icon",
          href: "/apple-touch-icon.png",
        },
        // Web manifest
        { rel: "manifest", href: "/site.webmanifest" },
      ],
    },
  },
});
