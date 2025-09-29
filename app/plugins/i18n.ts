import { createI18n } from "vue-i18n"
import en from "~/locales/en.json"
import de from "~/locales/de.json"

export default defineNuxtPlugin((nuxtApp) => {
  const i18n = createI18n({
    legacy: false, // recommended in Vue 3
    locale: "en",
    fallbackLocale: "en",
    warnHtmlMessage: false,
    messages: {
      en,
      de,
    },
  })

  nuxtApp.vueApp.use(i18n)
})
