if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/ProiectAN.TAW/sw.js", { scope: "/ProiectAN.TAW/" })
  })
}
