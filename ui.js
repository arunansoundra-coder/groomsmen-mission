  
export function renderAuth(app, next) {
  app.innerHTML = `
    <div class="screen">
      <h1>Identity Authentication</h1>
      <p>Agent, proceed with authentication</p>
      <button id="start">Begin</button>
    </div>
  `;

  document.getElementById("start").onclick = next;
}

export function renderBriefing(app, agent, role, next) {
  const isJason = agent === "Jason";

  const roleText = isJason
    ? "Will you assist as Best Man?"
    : "Will you assist as Groomsman?";

  app.innerHTML = `
    <div class="briefing">
      <h1>Operation Always and Forever</h1>

      <h2>Agent ${agent}</h2>
      <p>Role: ${role}</p>

      <div class="mission-box">
        <p>Prepare for mission assignment.</p>
        <p class="prompt">${roleText}</p>
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
        <p>Mission rejected.</p>
      </div>
    `;
  };
}

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

  const communityCards = ["A♠", "K♦", "10♣", "7♥", "3♠"];

  const hands = {
    Arunan: ["A♥", "A♦"],
    Jason: ["K♠", "Q♠"],
    Gill: ["10♦", "9♣"],
    Prathap: ["7♠", "7♦"],
    Taylor: ["Q♥", "J♦"],
    Duran: ["9♠", "8♠"],
    Josh: ["5♣", "5♦"]
  };

  const results = {
    Arunan: "WINNER 🏆 Full House",
    Jason: "Kings High",
    Gill: "Straight Draw",
    Prathap: "Pair of Sevens",
    Taylor: "Straight Draw",
    Duran: "Flush Draw",
    Josh: "Pair of Fives"
  };

  function getSeatStyle(index, total) {
    const angle = (index / total) * 2 * Math.PI;
    const radius = 320;

    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    return {
      transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`
    };
  }

  app.innerHTML = `
    <div class="poker-table-container">
      <h1 class="table-title">Final Showdown</h1>

      <div class="poker-table">

        <div class="community">
          <h3>Community Cards</h3>
          <div class="community-cards">
            ${communityCards.map(c => `<div class="card">${c}</div>`).join("")}
          </div>
        </div>

        ${agents.map((a, i) => {
          const style = getSeatStyle(i, agents.length);

          return `
            <div class="seat" style="
              top:50%;
              left:50%;
              position:absolute;
              transform:${style.transform};
            ">
              <div class="agent-card">
                <h3>${a.name}</h3>
                <p>${a.codename}</p>
                <p>${a.role}</p>

                <div class="chips">💰 ${a.chips}</div>

                <div class="cards">
                  ${(hands[a.name] || ["?", "?"])
                    .map(c => `<div class="card">${c}</div>`)
                    .join("")}
                </div>

                <div class="result">${results[a.name]}</div>
              </div>
            </div>
          `;
        }).join("")}

      </div>
    </div>
  `;
}
