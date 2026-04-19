export function renderPoker(app) {

  const agents = ["Arunan","Jason","Gill","Prathap","Taylor","Duran","Josh"];
  const registry = window.MI6_REGISTRY;

  app.innerHTML = `
    <div class="screen cinematic">
      <h2>OPERATION SCHEDULED: SEPT 18, 2026 @ 12:00 PM</h2>

      <div id="log" class="log"></div>
      <div id="table" class="table"></div>

      <div id="overlay" class="overlay hidden">
        <div class="reveal-text" id="revealText"></div>
      </div>
    </div>
  `;

  const table = document.getElementById("table");
  const log = document.getElementById("log");
  const overlay = document.getElementById("overlay");
  const revealText = document.getElementById("revealText");

  function logLine(t) {
    const d = document.createElement("div");
    d.innerText = t;
    log.appendChild(d);
  }

  // =========================
  // LOAD AGENTS
  // =========================
  let activeCount = 0;

  agents.forEach((a, i) => {
    const active = registry.activeAgents.has(a) || a === "Arunan";

    const el = document.createElement("div");
    el.className = `agent ${active ? "active" : "pending"}`;

    el.innerHTML = `
      <b>${a}</b>
      <span>${active ? "ACTIVE" : "AWAITING CLEARANCE"}</span>
    `;

    table.appendChild(el);

    setTimeout(() => {
      if (active) {
        logLine(`>> Agent ${a} has entered the operation`);
        activeCount++;
      }
    }, 500 + i * 400);
  });

  // =========================
  // FINAL SEQUENCE TRIGGER
  // =========================
  const totalDelay = 500 + agents.length * 400;

  setTimeout(() => {

    logLine(" ");
    logLine(">> ALL ACTIVE AGENTS SYNCED");
    logLine(">> SYSTEM LOCKED");

    setTimeout(() => {
      // fade into reveal mode
      overlay.classList.remove("hidden");

      typeReveal([
        "SYSTEM OVERRIDE COMPLETE",
        "",
        "This was never just a mission.",
        "It was a gathering of those who matter.",
        "",
        "You were not invited.",
        "You were selected.",
        "",
        "Operation: Always and Forever"
      ]);

    }, 1200);

  }, totalDelay + 800);

  // =========================
  // TYPE REVEAL ANIMATION
  // =========================
  function typeReveal(lines) {
    let i = 0;

    function next() {
      if (i >= lines.length) return;

      const line = document.createElement("div");
      line.className = "reveal-line";
      revealText.appendChild(line);

      let j = 0;

      function typeChar() {
        if (j < lines[i].length) {
          line.innerHTML += lines[i][j++];
          setTimeout(typeChar, 25);
        } else {
          i++;
          setTimeout(next, 500);
        }
      }

      typeChar();
    }

    next();
  }
}
