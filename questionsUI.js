export function renderAuth(app, next, agent) {
  let step = 0;

  const questions = [
    {
      q: "VERIFY SUBJECT IDENTITY",
      options: ["Jason", "Prathap", "Gill", "Taylor", "Duran", "Josh", "Arunan"],
      correct: agent
    },
    {
      q: "CONFIRM OPERATION AWARENESS",
      options: ["CONFIRMED", "DENIED"],
      correct: "CONFIRMED"
    },
    {
      q: "SET LOYALTY STATUS",
      options: ["ABSOLUTE", "UNDEFINED"],
      correct: "ABSOLUTE"
    },
    {
      q: "SET RESPONSE BEHAVIOR",
      options: ["IMMEDIATE", "DELAYED"],
      correct: "IMMEDIATE"
    },
    {
      q: "FINAL CLEARANCE FLAG",
      options: ["YES", "NO"],
      correct: "YES"
    }
  ];

  function boot() {
    app.innerHTML = `
      <div class="mi6-terminal">
        <div class="sys-header">MI6 SECURE TERMINAL</div>
        <div class="sys-sub">SESSION INITIALIZED</div>
        <button id="init">RUN AUTH SEQUENCE</button>
      </div>
    `;

    document.getElementById("init").onclick = loadStep;
  }

  function loadStep() {
    const q = questions[step];

    app.innerHTML = `
      <div class="mi6-terminal">
        <div class="log-line">[AUTH ${step + 1}/${questions.length}]</div>
        <div class="prompt">${q.q}</div>

        <div class="options">
          ${q.options.map(o => `<button class="opt">${o}</button>`).join("")}
        </div>
      </div>
    `;

    document.querySelectorAll(".opt").forEach(btn => {
      btn.onclick = () => {
        const ok = btn.innerText === q.correct;

        if (!ok) {
          btn.innerText = "REJECTED";
          btn.disabled = true;
          return;
        }

        step++;
        if (step === questions.length) return success();
        loadStep();
      };
    });
  }

  function success() {
    app.innerHTML = `
      <div class="mi6-terminal">
        <div class="status-ok">AUTHORIZATION GRANTED</div>
        <div class="log-line">CLEARANCE LEVEL: VERIFIED</div>
        <div class="log-line">ACCESS NODE: UNLOCKED</div>
        <div class="final">THE TABLE AWAITS</div>
        <button id="next">CONTINUE</button>
      </div>
    `;

    document.getElementById("next").onclick = next;
  }

  boot();
}
