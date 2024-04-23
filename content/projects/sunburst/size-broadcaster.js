function calculateSize() {
  const widthM  = document.getElementById("main").offsetWidth;
  const widthS  = document.getElementById("sidebar").offsetWidth;
  const heightM = document.getElementById("main").offsetHeight;
  const heightS = document.getElementById("sidebar").offsetHeight;
  return {"id": "sunburst", "width": 25 + widthM + widthS, "height": Math.max(heightM + heightS)};
}

function notifyParentOfSize() {
  // If this is included as an iframe, notify the parent of our size so that the iframe can be resized accordingly
  const size = calculateSize();
  window.parent.postMessage(size, "*");
}

window.addEventListener("message", (event) => {
  notifyParentOfSize();
});
