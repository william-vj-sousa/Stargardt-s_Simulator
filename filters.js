export function applyScotoma(frame, width, height, radius) {
  const data = frame.data;

  const centerX = width / 2;
  const centerY = height / 2;

  const fadeStart = radius * 0.6;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {

      const dx = x - centerX;
      const dy = y - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < radius) {
        const i = (y * width + x) * 4;

        let factor;
        if (dist < fadeStart) {
          factor = 0.1;
        } else {
          factor = 0.1 + (dist - fadeStart) / (radius - fadeStart);
        }

        data[i] *= factor;
        data[i + 1] *= factor;
        data[i + 2] *= factor;
      }
    }
  }
}