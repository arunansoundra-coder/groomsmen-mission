export function MI6MissionOS(app, agent, next) {
  let state = {
    clearance: 0,
    agent,
    codename: null
  };

  /* =========================
     SYSTEM BOOT
  ========================= */
  async function boot() {
    await type(`
MI6 // CLASSIFIED OPERATING SYSTEM v9.1
Initializing secure environment...
Encrypting session... ██████████ 100%
Satellite uplink: ACTIVE
Threat detection: NONE
`);

    await delay(600);

    await identityLayer();
  }

  /* =========================
     IDENTITY LAYER
  ========================= */
  async function identityLayer() {
    await type(`
IDENTITY CHECK REQUIRED
Cross-referencing global agent registry...
`);

    await delay(800);

    state.codename = assignCodename(agent);

    await type(`
MATCH FOUND
Agent: ${agent}
Codename: ${state.codename}
Status: ACTIVE
Clearance: ALPHA-0
`);

    await delay(800);

    await loyaltyProtocol();
  }

  /* =========================
     LOYALTY AUTH PROTOCOL
  ========================= */
  async function loyaltyProtocol() {
    await type(`
LOYALTY PROTOCOL 01
This is not a test.
This is a trust evaluation.
`);

    await delay(500);

    renderQuestion();
  }

  const question = {
    q: "When the mission fails and all exits are compromised… who do you stand beside?",
    options: ["No one", "Myself", "Arunan", "The highest bidder"],
    correct: "Arunan"
  };

  function renderQuestion() {
    app.innerHTML = `
      <div class="terminal">
        <div id="log"></div>
        <div id="options"></div>
      </div>
    `;

    const log = document.getElementById("log");
    const options = document.getElementById("options");

    typeTo(log, question.q);

    options.innerHTML = question.options
      .map(o => `<button class="opt">${o}</button>`)
      .join("");

    document.querySelectorAll(".opt").forEach(btn => {
      btn.onclick = () => handleAnswer(btn.innerText);
    });
  }

  /* =========================
     RESPONSE ENGINE
  ========================= */
  async function handleAnswer(answer) {
    const log = document.getElementById("log");

    await typeTo(log, `> ${answer}`);
    await typeTo(log, "ANALYZING RESPONSE...");

    if (answer === question.correct) {
      state.clearance++;

      await typeTo(log, "EMOTIONAL CONSISTENCY: VERIFIED");
      await typeTo(log, "TRUST INDEX: INCREASING");
      await typeTo(log, "CLEARANCE UPGRADE: ALPHA → BETA");

      await delay(800);

      missionBriefing();
    } else {
      await typeTo(log, "INCONSISTENT RESPONSE DETECTED");
      await typeTo(log, "CLEARANCE STABLE: ALPHA-0");

      await delay(800);

      loyaltyProtocol();
    }
  }

  /* =========================
     MISSION BRIEFING
  ========================= */
  async function missionBriefing() {
    app.innerHTML = `
      <div class="terminal">
        <div id="brief"></div>
        <button id="enter">ACCEPT MISSION</button>
      </div>
    `;

    const brief = document.getElementById("brief");

    await typeTo(brief, `
OPERATION: ALWAYS AND FOREVER

Agent ${agent},
Codename: ${state.codename}

You are hereby assigned to:
- Secure the perimeter
- Maintain operational secrecy
- Support Agent Ghost (Arunan)

Status: MISSION ACTIVE
`);

    document.getElementById("enter").onclick = operationNode;
  }

  /* =========================
     OPERATION NODE (POKER TABLE)
  ========================= */
  function operationNode() {
    app.innerHTML = `
      <div class="mission-node">
        <h1>OPERATION NODE: ACTIVE</h1>
        <p>Initializing poker table environment...</p>
      </div>
    `;

    setTimeout(next, 1500);
  }

  /* =========================
     UTILITIES
  ========================= */
  function assignCodename(name) {
    const map = {
      Jason: "Viper",
      Gill: "Architect",
      Prathap: "Midnight",
      Taylor: "Shadow",
      Duran: "Anomaly",
      Josh: "Mirage"
    };
    return map[name] || "Ghost";
  }

  function delay(ms) {
    return new Promise(res => setTimeout(res, ms));
  }

  function type(text, speed = 15) {
    return new Promise(resolve => {
      const log = document.getElementById("log") || document.createElement("div");
      let i = 0;

      function step() {
        if (i < text.length) {
          log.innerHTML += text[i++];
          setTimeout(step, speed);
        } else {
          log.innerHTML += "\n";
          resolve();
        }
      }

      step();
    });
  }

  function typeTo(el, text, speed = 15) {
    return new Promise(resolve => {
      let i = 0;
      function step() {
        if (i < text.length) {
          el.innerHTML += text[i++];
          setTimeout(step, speed);
        } else {
          el.innerHTML += "\n";
          resolve();
        }
      }
      step();
    });
  }

  /* START */
  boot();
}
