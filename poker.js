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
    const r = Math.min(window.innerWidth, window.innerHeight) * 0.35;
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

        <!-- ✅ TEXT DIRECTLY UNDER THE CARDS -->
        <div class="poker-subtext">
          Salud mi familia 🍻
        </div>
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

          </div>
        `;
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
