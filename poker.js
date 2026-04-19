export function renderPoker(app) {

  const agents = ["Arunan","Jason","Gill","Prathap","Taylor","Duran","Josh"];
  const registry = window.MI6_REGISTRY;

  app.innerHTML = `
    <div class="screen">
      <h2>OPERATION SCHEDULED: SEPT 18, 2026 @ 12PM</h2>
      <div id="log"></div>
      <div id="table"></div>
    </div>
  `;

  const table = document.getElementById("table");
  const log = document.getElementById("log");

  function logLine(t) {
    const d = document.createElement("div");
    d.innerText = t;
    log.appendChild(d);
  }

  let delay = 500;

  agents.forEach(a => {
    const active = registry.activeAgents.has(a) || a === "Arunan";
    const res = registry.responses[a];

    const el = document.createElement("div");

    el.innerHTML = `
      <b>${a}</b> — ${active ? "ACTIVE" : "PENDING"}
      ${res?.staying ? " | SAFEHOUSE ✔" : ""}
    `;

    el.style.opacity = active ? 1 : 0.4;

    table.appendChild(el);

    if (active) {
      setTimeout(() => {
        logLine(`>> Agent ${a} has entered the operation`);
      }, delay);
      delay += 400;
    }
  });

 setTimeout(() => {
  logLine(">> ALL ACTIVE AGENTS SYNCED");
  logLine(">> TABLE READY");

  // 🔥 FINAL CINEMATIC MESSAGE
  setTimeout(() => {
    logLine(" ");
    logLine(">> You were not invited...");
    logLine(">> You were selected.");
  }, 1200);

}, delay + 300);
