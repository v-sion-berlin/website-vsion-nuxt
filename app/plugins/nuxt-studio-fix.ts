export default defineNuxtPlugin(() => {
  if (typeof window === "undefined") return;

  const previewIframe = window.parent.document.getElementById("preview-iframe");
  if (!previewIframe) return;

  const url = new URL(window.location.href);

  if (url.pathname.startsWith("/en/")) {
    const newPath = url.pathname.replace(/^\/en/, "") || "/";
    console.info("[Studio Fix] Redirecting Studio EN path:", newPath);
    window.history.replaceState({}, "", newPath);
  }
});