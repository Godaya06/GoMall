// Guarded service-worker registration. Refuses to register inside Lovable
// preview/dev contexts so the editor iframe never gets a sticky SW.
import { toast } from "@/hooks/use-toast";

const SW_URL = "/sw.js";

const isPreviewHost = (host: string) =>
  host.startsWith("id-preview--") ||
  host.startsWith("preview--") ||
  host === "lovableproject.com" ||
  host.endsWith(".lovableproject.com") ||
  host === "lovableproject-dev.com" ||
  host.endsWith(".lovableproject-dev.com") ||
  host === "beta.lovable.dev" ||
  host.endsWith(".beta.lovable.dev");

const unregisterMatching = async () => {
  if (!("serviceWorker" in navigator)) return;
  const regs = await navigator.serviceWorker.getRegistrations();
  await Promise.all(
    regs
      .filter((r) => {
        const url = r.active?.scriptURL || r.installing?.scriptURL || r.waiting?.scriptURL || "";
        return url.endsWith(SW_URL);
      })
      .map((r) => r.unregister())
  );
};

export const registerServiceWorker = async () => {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;

  const inIframe = window.self !== window.top;
  const host = window.location.hostname;
  const killSwitch = new URLSearchParams(window.location.search).get("sw") === "off";

  if (
    !import.meta.env.PROD ||
    inIframe ||
    isPreviewHost(host) ||
    killSwitch
  ) {
    await unregisterMatching();
    return;
  }

  try {
    const { Workbox } = await import("workbox-window");
    const wb = new Workbox(SW_URL, { scope: "/" });

    wb.addEventListener("waiting", () => {
      wb.messageSkipWaiting();
    });

    wb.addEventListener("controlling", () => {
      // A new SW took over — reload once so users get the new assets.
      window.location.reload();
    });

    const reg = await wb.register();
    if (reg) {
      // First warm-up notice (only when there's no controller yet).
      if (!navigator.serviceWorker.controller) {
        setTimeout(() => {
          toast({
            title: "Ready for offline",
            description: "Catalog saved — browse anytime, even offline.",
          });
        }, 1500);
      }
    }
  } catch (err) {
    console.warn("[pwa] SW registration failed", err);
  }
};
