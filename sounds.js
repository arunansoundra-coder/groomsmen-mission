export const dealSound = new Audio("https://assets.mixkit.co/active_storage/sfx/2005/2005-preview.mp3");
export const chipSound = new Audio("https://assets.mixkit.co/active_storage/sfx/209/209-preview.mp3");
export function playAmbient() {
  const audio = new Audio('ambient.mp3');
  audio.loop = true;
  audio.volume = 0.2;
  audio.play();
}
