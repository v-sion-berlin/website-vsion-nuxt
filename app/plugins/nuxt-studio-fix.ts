export default defineNuxtPlugin(() => {
  if (typeof window === 'undefined') return

  const isStudio = window.location.hostname.includes('studio')
  if (!isStudio) return

  const { locale, defaultLocale, setLocale } = useI18n()

  if (locale.value === 'en' && locale.value !== defaultLocale) {
    console.info('[Studio Fix] Adjusting locale to default for English preview')
    setLocale(defaultLocale)
  }
})
