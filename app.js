import { applyScotoma } from "./filters.js";

const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const intensitySlider = document.getElementById("intensity");

// Resize
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Camera
navigator.mediaDevices.getUserMedia({
  video: { facingMode: "environment" }
})
.then(stream => {
  video.srcObject = stream;
})
.catch(err => {
  alert("Camera access failed.");
  console.error(err);
});

// Render loop
function render() {
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  let frame = ctx.getImageData(0, 0, canvas.width, canvas.height);

  applyScotoma(frame, canvas.width, canvas.height, parseInt(intensitySlider.value));

  ctx.putImageData(frame, 0, 0);

  requestAnimationFrame(render);
}

video.addEventListener("loadeddata", () => {
  render();
});