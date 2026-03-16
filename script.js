// BEST MAN
const startBtn = document.getElementById("startBtn");
const terminal = document.getElementById("terminal");
const terminalOutput = document.getElementById("terminalOutput");

startBtn?.addEventListener("click", () => startMission("bestman"));

// GROOMSMEN
const startBtnGroomsmen = document.getElementById("startBtnGroomsmen");
const terminalOutputGroomsmen = document.getElementById("terminalOutputGroomsmen");

startBtnGroomsmen?.addEventListener("click", () => startMission("groomsmen"));

function startMission(type) {
  const output = type === "bestman" ? terminalOutput : terminalOutputGroomsmen;
  terminal.classList.remove("hidden");
  output.innerHTML = "";

  const lines = [
    "Initializing MI6 secure channel...",
    "Scanning agent registry...",
    "Identity requires multi-factor authentication...",
    "3 verification challenges detected..."
  ];

  let index = 0;

  function showNextLine() {
    if (index < lines.length) {
      output.innerHTML += `<p>${lines[index]}</p>`;
      index++;
      setTimeout(showNextLine, 1000);
    } else {
      output.innerHTML += `<p>Access granted. Welcome, Agent.</p>`;
    }
  }

  showNextLine();
}
