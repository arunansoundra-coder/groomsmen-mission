// Tab functionality
const tabButtons = document.querySelectorAll(".tabBtn");
const tabContents = document.querySelectorAll(".tabContent");

tabButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    tabButtons.forEach(b => b.classList.remove("active"));
    tabContents.forEach(c => c.classList.add("hidden"));

    btn.classList.add("active");
    document.getElementById(btn.dataset.target).classList.remove("hidden");
  });
});

// Start mission functionality
const startButtons = document.querySelectorAll(".startBtn");

startButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const type = btn.dataset.type;
    const nameInput = document.getElementById(`${type}Name`);
    const name = nameInput.value.trim() || "Agent";

    const terminal = document.getElementById(type === "bestman" ? "terminalBestman" : "terminalGroomsmen");
    terminal.classList.remove("hidden");
    terminal.innerHTML = "";

    const lines = [
      "Initializing MI6 secure channel...",
      "Scanning agent registry...",
      `Verifying identity for ${name}...`,
      "3 verification challenges detected..."
    ];

    let index = 0;
    function showNextLine() {
      if (index < lines.length) {
        terminal.innerHTML += `<p>${lines[index]}</p>`;
        index++;
        setTimeout(showNextLine, 1000);
      } else {
        terminal.innerHTML += `<p>Access granted. Welcome, ${name}.</p>`;
      }
    }
    showNextLine();
  });
});
