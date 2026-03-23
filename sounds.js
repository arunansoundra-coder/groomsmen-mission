// sounds.js

export const chipSound = new Audio(
  "https://assets.mixkit.co/active_storage/sfx/209/209-preview.mp3"
);

chipSound.volume = 0.5;

// Prevent crash if browser blocks autoplay
chipSound.load();
