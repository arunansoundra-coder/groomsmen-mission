export function loadScreen(screenName) {
  const app = document.getElementById("app");

  switch (screenName) {
    case "questions":
      app.innerHTML = "<h2>Questions Screen</h2>";
      break;

    case "briefing":
      app.innerHTML = "<h2>Briefing Screen</h2>";
      break;

    case "poker":
      app.innerHTML = "<h2>Poker Screen</h2>";
      break;

    default:
      app.innerHTML = "<h2>Unknown Screen</h2>";
  }
}
