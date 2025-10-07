export default defineNuxtPlugin(() => {
  if (typeof window === "undefined") return;

  const url = new URL(window.location.href);

  // Only fix default locale paths inside Studio (where /en/ is added)
  // This plugin runs in any environment, but the change only matters for Studio
  if (url.pathname.startsWith("/en/")) {
    const newPath = url.pathname.replace(/^\/en/, "") || "/";
    console.info("[Studio Fix] Removing /en prefix for Studio preview:", newPath);
    window.history.replaceState({}, "", newPath);
  }
});