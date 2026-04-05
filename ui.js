
/* =========================
   AUTH FLOW (IDENTITY + SECURITY)
========================= */
export function renderAuth(app, next, agent) {
  let step = 0;

  const questions = [
    {
      q: "What poker hand did James Bond win with in Montenegro?",
      options: ["Royal Flush", "Straight Flush", "Full House", "Straight Flush"],
      correct: "Straight Flush"
    },
    {
      q: "What is James Bond’s favorite drink?",
      options: [
        "Vodka Martini — Shaken, not stirred",
        "Scotch Neat",
        "Old Fashioned",
        "Gin and Tonic"
      ],
      correct: "Vodka Martini — Shaken, not stirred"
    },
    {
      q: "Name all of James Bond’s love interests.",
      options: [
        "Vesper Lynd, Tracy Bond, Madeleine Swann",
        "Domino, Tiffany Case, Natalya Simonova",
        "Honey Ryder, Kissy Suzuki, Wai Lin",
        "Solitaire, Natalya Simonova, Camille Montes"
      ],
      correct: "Vesper Lynd, Tracy Bond, Madeleine Swann"
    },
    {
      q: "What was the name of the horse that Arunan had?",
      options: ["Luna", "Bella", "Maya", "Shadow"],
      correct: "Maya"
    },
    {
      q: "Arunan had a Grey 2023 BMW 330i. What was its name?",
      options: ["Frost", "Cloud", "Phantom", "Glacier"],
      correct: "Cloud"
    }
  ];

  function renderIntro() {
    app.innerHTML = `
      <div class="screen">
        <h1>Agent Authentication</h1>
        <p>Agent, proceed with identity authentication</p>
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

          if (step === 3) return renderIdentitySuccess();
          if (step === questions.length) return renderFinalInput();

          renderQuestion();
        } else {
          btn.style.background = "red";
        }
      };
    });
  }

  function renderIdentitySuccess() {
    app.innerHTML = `
      <div class="screen">
        <h1>Identity Authentication Successful</h1>
        <h2>Welcome Agent ${agent}</h2>
        <button id="next">Proceed</button>
      </div>
    `;
    document.getElementById("next").onclick = renderQuestion;
  }

  function renderFinalInput() {
    app.innerHTML = `
      <div class="screen">
        <h2>Final Verification</h2>
        <p>Complete the phrase:</p>
        <p><i>Blood makes us related, loyalty makes us family, and family is ______.</i></p>
        <input id="answer" placeholder="Type answer"/>
        <button id="submit">Submit</button>
      </div>
    `;

    document.getElementById("submit").onclick = () => {
      const val = document.getElementById("answer").value.toLowerCase();
      if (val.includes("forever")) {
        renderSuccess();
      }
    };
  }

  function renderSuccess() {
    app.innerHTML = `
      <div class="screen">
        <h1>Security Clearance Approved</h1>
        <button id="continue">Proceed to Mission</button>
      </div>
    `;
    document.getElementById("continue").onclick = next;
  }

  renderIntro();
}

/* =========================
   BRIEFING
========================= */
export function renderBriefing(app, agent, role, next) {
  app.innerHTML = `
    <div class="briefing">
      <h1>Operation Always and Forever</h1>
      <h2>Agent ${agent}</h2>
      <p>Role: ${role}</p>

      <div class="mission-box">
        <p>Assist the groom in a high-stakes operation.</p>
      </div>

      <button id="accept">Accept Mission</button>
      <button id="decline">Decline</button>
    </div>
  `;

  document.getElementById("accept").onclick = next;

  document.getElementById("decline").onclick = () => {
    app.innerHTML = `
      <div class="decline-screen">
        <h1>ACCESS DENIED</h1>
      </div>
    `;
  };
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

  const community = ["A♠","K♦","10♣","7♥","3♠"];

  function pos(i, total){
    const angle = (i/total)*2*Math.PI;
    const r = 280;
    return `translate(-50%,-50%) translate(${Math.cos(angle)*r}px, ${Math.sin(angle)*r}px)`;
  }

  app.innerHTML = `
    <div class="poker-table-container">
      <div class="poker-table">

        <div class="community">
          ${community.map(c=>`<div class="card">${c}</div>`).join("")}
        </div>

        ${agents.map((a,i)=>`
          <div class="seat" style="transform:${pos(i,agents.length)}">
            <div class="agent-card">
              <h3>${a.name}</h3>
              <p>${a.codename}</p>
              <p>${a.role}</p>
              <div class="chips">💰 ${a.chips}</div>
              <div class="cards">
                <div class="card">A</div>
                <div class="card">K</div>
              </div>
            </div>
          </div>
        `).join("")}

      </div>
    </div>
  `;
}
