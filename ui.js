/* =========================
   AUTH + SECURITY FLOW
========================= */

export function startAuthFlow(app, agent, onComplete) {
  showAuthIntro();

  function showAuthIntro() {
    app.innerHTML = `
      <h1>Agent Authentication</h1>
      <p>Agent, proceed with identity authentication</p>
      <button id="start">Start</button>
    `;

    document.getElementById("start").onclick = showQ1;
  }

  function showQ1() {
    renderMCQ(
      "What poker hand did James Bond win with in Montenegro?",
      ["Royal Flush", "Straight Flush", "Full House"],
      "Straight Flush",
      showQ2
    );
  }

  function showQ2() {
    renderMCQ(
      "What is James Bond’s favorite drink?",
      ["Vodka Martini — Shaken, not stirred", "Scotch Neat", "Old Fashioned"],
      "Vodka Martini — Shaken, not stirred",
      showQ3
    );
  }

  function showQ3() {
    renderMCQ(
      "Name all of James Bond’s love interests.",
      [
        "Vesper Lynd, Tracy Bond, Madeleine Swann",
        "Domino, Tiffany Case, Natalya Simonova",
        "Honey Ryder, Kissy Suzuki, Wai Lin"
      ],
      "Vesper Lynd, Tracy Bond, Madeleine Swann",
      showAuthSuccess
    );
  }

  function showAuthSuccess() {
    app.innerHTML = `
      <h1>Identity Authentication Successful</h1>
      <h2>Welcome Agent ${agent}</h2>
      <button id="continue">Continue</button>
    `;

    document.getElementById("continue").onclick = showSecurityIntro;
  }

  /* =========================
     SECURITY CLEARANCE
  ========================= */

  function showSecurityIntro() {
    app.innerHTML = `
      <h1>Security Clearance</h1>
      <p>Agent ${agent}, confirm security clearance</p>
      <button id="startSec">Begin</button>
    `;

    document.getElementById("startSec").onclick = showS1;
  }

  function showS1() {
    renderMCQ(
      "What was the name of the horse that Arunan had?",
      ["Luna", "Bella", "Maya", "Shadow"],
      "Maya",
      showS2
    );
  }

  function showS2() {
    renderMCQ(
      "Arunan had a Grey 2023 BMW 330i. What was its name?",
      ["Frost", "Cloud", "Phantom", "Glacier"],
      "Cloud",
      showS3
    );
  }

  function showS3() {
    app.innerHTML = `
      <h2>Final Verification</h2>
      <p>Complete the phrase:</p>
      <p><i>Blood makes us related, loyalty makes us family, and family is ______.</i></p>
      <input id="answer" placeholder="Type answer"/>
      <br/><br/>
      <button id="submit">Submit</button>
    `;

    document.getElementById("submit").onclick = () => {
      const val = document.getElementById("answer").value.toLowerCase().trim();
      if (val === "forever") {
        showSecuritySuccess();
      } else {
        alert("Incorrect. Try again.");
      }
    };
  }

  function showSecuritySuccess() {
    app.innerHTML = `
      <h1>Security Clearance Approved</h1>
      <p>Access Granted</p>
      <button id="continue">Proceed to Mission</button>
    `;

    document.getElementById("continue").onclick = onComplete;
  }

  /* =========================
     REUSABLE MCQ FUNCTION
  ========================= */

  function renderMCQ(question, options, correct, next) {
    app.innerHTML = `
      <h2>${question}</h2>
      ${options
        .map(opt => `<button class="opt">${opt}</button>`)
        .join("<br/>")}
    `;

    document.querySelectorAll(".opt").forEach((btn) => {
      btn.onclick = () => {
        if (btn.innerText === correct) {
          next();
        } else {
          alert("Incorrect. Try again.");
        }
      };
    });
  }
}

/* =========================
   MISSION BRIEFING
========================= */

export function renderBriefing(app, agent, role, next) {
  const isJason = agent === "Jason";

  const roleText = isJason
    ? "Will you assist the groom as Best Man?"
    : "Will you assist the groom as Groomsman?";

  app.innerHTML = `
    <h1>Operation Always and Forever</h1>
    <h2>Agent ${agent}</h2>
    <p>${roleText}</p>

    <button id="accept">Pour the whiskey.</button>
    <button class="alt">For King and Country</button>
    <button class="alt">Sounds like a job for 007</button>
    <button class="alt">The name’s Bond… Let’s do it!</button>
  `;

  document.getElementById("accept").onclick = next;
}

/* =========================
   POKER TABLE
========================= */

export function renderPoker(app, agent, role) {
  const players = [
    { name: "Josh", code: "Mirage" },
    { name: "Taylor", code: "Shadow" },
    { name: "Duran", code: "Anomaly" },
    { name: "Gill", code: "Architect" },
    { name: "Prathap", code: "Midnight" },
    { name: "Jason", code: "Viper" },
    { name: "Arunan", code: "Ghost" }
  ];

  app.innerHTML = `
    <h1>Poker Table</h1>

    <p>The mission will begin at noon on September 18, 2026</p>

    <h3>Agent ${agent} (${role})</h3>

    <div>
      ${players.map(p => `
        <div class="card">
          <b>${p.name}</b><br/>
          ${p.code}
        </div>
      `).join("")}
    </div>

    <p style="margin-top:20px;">
      Objective: Defeat the Groom
    </p>

    <p>
      Safe House: 6233 Muirfield Dr SW, Cedar Rapids, IA
    </p>
  `;
}
