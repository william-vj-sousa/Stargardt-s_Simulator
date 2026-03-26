const video = document.querySelector("video")

navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
  .then(stream => {
    video.srcObject = stream;
    video.play();
  })
  .catch(err => console.error(err));