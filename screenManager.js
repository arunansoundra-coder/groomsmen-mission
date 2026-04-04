// screenManager.js

export function loadScreen(app, screenFn, ...args) {
  // fade out
  app.style.opacity = 0;

  setTimeout(() => {
    app.innerHTML = "";

    // load new screen
    screenFn(app, ...args);

    // fade in
    app.style.opacity = 1;
  }, 150);
}
