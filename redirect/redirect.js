export function redirectDestination(currentUrl) {
  const current = new URL(currentUrl);
  const destination = new URL("https://hitenjadeja.github.io/the-build-bench/");
  destination.search = current.search;
  const anchors = new Map([
    ["#catalog", "#directory-results"],
    ["#main-content", "#top"],
    ["#method", "#method-heading"],
  ]);
  destination.hash = anchors.get(current.hash) ?? current.hash;
  return destination.href;
}

if (typeof document !== "undefined") {
  const destination = redirectDestination(window.location.href);
  document.querySelector("#destination").href = destination;
  window.location.replace(destination);
}
