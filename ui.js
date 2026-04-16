/* =========================
   AUTH FLOW
========================= */
export function renderAuth(app, next, agent) {
  let step = 0;

  // SINGLE QUESTION ONLY (condensed)
  const questions = [
    {
      q: "What poker hand did James Bond win with in Montenegro?",
      options: ["Royal Flush", "Straight Flush", "Full House", "Four of a Kind"],
      correct: "Straight Flush"
    }
  ];

  function renderIntro() {
    app.innerHTML = `
      <div class="screen">
        <h1>Agent Authentication</h1>
        <p>Proceed with identity authentication</p>
        <button id="start">Begin</button>
      </div>
    `;
    document.getElementById("start").onclick = renderQuestion;
  }

  function renderQuestion() {
    const current = questions[step];

    app.innerHTML = `
      <div class="screen">
        <h2>Challenge ${step + 1}</h2>
        <p>${current.q}</p>
        ${current.options.map(o => `<button class="opt">${o}</button>`).join("")}
      </div>
    `;

    document.querySelectorAll(".opt").forEach(btn => {
      btn.onclick = () => {
        if (btn.innerText === current.correct) {
          step++;

          if (step === questions.length) return renderSuccess();
          renderQuestion();
        } else {
          btn.style.background = "red";
        }
      };
    });
  }

  function renderSuccess() {
    app.innerHTML = `
      <div class="screen">
        <h1>Identity Authentication Successful</h1>
        <h2>Welcome Agent ${agent}</h2>
        <button id="continue">Proceed to Mission</button>
      </div>
    `;
    document.getElementById("continue").onclick = next;
  }

  renderIntro();
}


/* =========================
   CINEMATIC BRIEFING
========================= */
export function renderBriefing(app, agent, role, next) {
  const roleLabel = agent === "Jason" ? "Best Man" : "Groomsman";

  app.innerHTML = `
    <div class="briefing cinematic">
      <h1>Operation: Always and Forever</h1>
      <p class="subtitle">MI6 Secure Transmission</p>

      <div id="typewriter"></div>

      <div class="options hidden" id="actions">
        <button id="accept">Accept Mission</button>
        <button id="decline">Decline</button>
      </div>
    </div>
  `;

  const lines = [
    `Agent ${agent}...`,
    `You have been selected for a high-priority assignment.`,
    `You are to assist Agent Ghost.`,
    `Operation: Always and Forever.`,
    `Your role: ${roleLabel}.`,
    `Will you accept your mission?`,
    `The table awaits...`
  ];

  const container = document.getElementById("typewriter");
  const actions = document.getElementById("actions");

  let lineIndex = 0;

  function typeLine(text, callback) {
    let i = 0;
    const el = document.createElement("p");
    container.appendChild(el);

    function typing() {
      if (i < text.length) {
        el.innerHTML += text.charAt(i);
        i++;
        setTimeout(typing, 25);
      } else {
        setTimeout(callback, 400);
      }
    }

    typing();
  }

  function nextLine() {
    if (lineIndex < lines.length) {
      typeLine(lines[lineIndex], () => {
        lineIndex++;
        nextLine();
      });
    } else {
      actions.classList.remove("hidden");

      document.getElementById("accept").onclick = () => {
        app.innerHTML = `
          <div class="screen fade-out">
            <h1>Mission Accepted</h1>
            <p>Initializing operation...</p>
          </div>
        `;
        setTimeout(next, 1200);
      };

      document.getElementById("decline").onclick = () => {
        app.innerHTML = `
          <div class="decline-screen">
            <h1 class="warning">⚠ ACCESS DENIED</h1>
          </div>
        `;
      };
    }
  }

  nextLine();
}


/* =========================
   POKER TABLE
========================= */
export function renderPoker(app) {
  const agents = [
    { name: "Arunan", codename: "Ghost", role: "Groom", chips: 1500 },
    { name: "Jason", codename: "Viper", role: "Best Man", chips: 1200 },
    { name: "Gill", codename: "Architect", role: "Groomsman", chips: 1100 },
    { name: "Prathap", codename: "Midnight", role: "Groomsman", chips: 1000 },
    { name: "Taylor", codename: "Shadow", role: "Groomsman", chips: 1000 },
    { name: "Duran", codename: "Anomaly", role: "Groomsman", chips: 950 },
    { name: "Josh", codename: "Mirage", role: "Groomsman", chips: 900 }
  ];

  const community = ["A♠", "K♦", "10♣", "7♥", "3♠"];

  function getPosition(i, total) {
    const angle = (i / total) * 2 * Math.PI - Math.PI / 2;
    const r = 300;
    return {
      x: Math.cos(angle) * r,
      y: Math.sin(angle) * r
    };
  }

  app.innerHTML = `
    <div class="poker-table-container">
      <div class="poker-table">

        <div class="community">
          <div class="community-cards" id="community-cards"></div>
        </div>

        ${agents.map((a, i) => {
          const pos = getPosition(i, agents.length);
          return `
          <div class="seat"
            style="transform:translate(-50%,-50%) translate(${pos.x}px,${pos.y}px)">
            <div class="agent-card">
              <h3>${a.name}</h3>
              <div class="codename">${a.codename}</div>
              <div class="role">${a.role}</div>
              <div class="chips">💰 ${a.chips}</div>

              <div class="cards">
                <div class="card">A</div>
                <div class="card">K</div>
              </div>

              <div class="result">Waiting...</div>
            </div>
          </div>`;
        }).join("")}

      </div>
    </div>
  `;

  const container = document.getElementById("community-cards");

  community.forEach((card, i) => {
    setTimeout(() => {
      const el = document.createElement("div");
      el.className = "card deal";
      el.innerText = card;
      container.appendChild(el);

      setTimeout(() => el.classList.add("show"), 50);
    }, i * 500);
  });
}
