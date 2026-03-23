// sounds.js

export const chipSound = new Audio(
  "https://assets.mixkit.co/active_storage/sfx/209/209-preview.mp3"
);

export const ambientSound = new Audio(
  "https://assets.mixkit.co/active_storage/sfx/preview.mp3"
);

// Optional ambient control
export function playAmbient() {
  ambientSound.loop = true;
  ambientSound.volume = 0.3;
  ambientSound.play().catch(() => {});
}

chipSound.volume = 0.5;

// Prevent crash if browser blocks autoplay
chipSound.load();
