 import { createDeck, eval7 } from './poker.js';
import { chipSound } from './sounds.js';

export function startPoker(app){

  app.innerHTML = `
    <div class="table">
      <div class="pot" id="pot">POT: 0</div>
      <div class="community" id="community"></div>

      <div class="seat" id="p0"></div>
      <div class="seat" id="p1"></div>
      <div class="seat" id="p2"></div>
      <div class="seat" id="p3"></div>
      <div class="seat" id="p4"></div>
      <div class="seat" id="p5"></div>
      <div class="seat" id="p6"></div>

      <div id="msg" class="msg"></div>
    </div>
  `;

  const communityEl = document.getElementById('community');
  const potEl = document.getElementById('pot');
  const msg = document.getElementById('msg');

  let deck = createDeck();
  let pot = 0;
  let community = [];

  const names = ["Josh","Duran","Taylor","Arunan","Jason","Gill","Prathap"];

  const roleMap = {
    "Arunan": "Groom",
    "Jason": "Best Man",
    "Josh": "Groomsman",
    "Duran": "Groomsman",
    "Taylor": "Groomsman",
    "Gill": "Groomsman",
    "Prathap": "Groomsman"
  };

  const codenameMap = {
    "Arunan": "Ghost",
    "Jason": "Viper",
    "Josh": "Mirage",
    "Duran": "Anomaly",
    "Taylor": "Shadow",
    "Gill": "Architect",
    "Prathap": "Midnight"
  };

  const players = names.map((name, i) => {
    const el = document.getElementById(`p${i}`);
    return {
      name,
      codename: codenameMap[name],
      role: roleMap[name],
      el,
      chips: 100,
      hand: [deck.pop(), deck.pop()]
    };
  });

  // Seat positioning
  function positionSeats(players, tableWidth, tableHeight){
    const centerX = tableWidth / 2;
    const centerY = tableHeight / 2;
    const radiusX = tableWidth * 0.38;
    const radiusY = tableHeight * 0.38;

    players.forEach((p, i) => {
      const angle = (i / players.length) * 2 * Math.PI - Math.PI / 2;

      const x = centerX + radiusX * Math.cos(angle);
      const y = centerY + radiusY * Math.sin(angle);

      p.el.style.left = `${x}px`;
      p.el.style.top = `${y}px`;
    });
  }

  positionSeats(players, 900, 500);

  // Card render
  function renderCard(card, delay = 0){
    const value = card.slice(0,-1);
    const suit = card.slice(-1);
    const color = (suit === "♥" || suit === "♦") ? "red" : "black";

    return `
      <div class="card ${color}" style="animation-delay:${delay}ms">
        ${value}${suit}
      </div>
    `;
  }

  // Render players
  players.forEach((p, i) => {
    if (!p.el) return;

    p.el.innerHTML = `
      <div class="name">${p.name}</div>
      <div class="codename">Codename: ${p.codename}</div>
      <div class="role">${p.role}</div>
      <div class="cards">
        ${renderCard(p.hand[0])}
        ${renderCard(p.hand[1])}
      </div>
      <div class="chips" id="chips-${i}">${p.chips}</div>
    `;
  });

  function renderCommunity(){
    communityEl.innerHTML = community
      .map((c, i) => renderCard(c, i * 200))
      .join("");
  }

  // 🪙 FIXED chip animation
  function animateBet(playerIndex){
    const chip = document.createElement("div");
    chip.className = "chip-fly";

    const start = players[playerIndex].el.getBoundingClientRect();
    const end = potEl.getBoundingClientRect();

    chip.style.position = "fixed";
    chip.style.left = start.left + "px";
    chip.style.top = start.top + "px";
    chip.style.width = "20px";
    chip.style.height = "20px";
    chip.style.borderRadius = "50%";
    chip.style.background = "gold";
    chip.style.transition = "transform 0.8s ease, opacity 0.8s";

    document.body.appendChild(chip);

    requestAnimationFrame(() => {
      chip.style.transform = `translate(${end.left - start.left}px, ${end.top - start.top}px) scale(0.5)`;
      chip.style.opacity = "0";
    });

    setTimeout(() => chip.remove(), 900);
  }

  function bet(){
    players.forEach((p, i) => {
      if (p.chips <= 0) return;

      const betAmount = Math.floor(Math.random()*20)+10;

      p.chips -= betAmount;
      pot += betAmount;

      const chipEl = document.getElementById(`chips-${i}`);
      if (chipEl) chipEl.innerText = p.chips;

      animateBet(i);
    });

    potEl.innerText = "POT: " + pot;

    if (chipSound) {
      chipSound.currentTime = 0;
      chipSound.play().catch(()=>{});
    }
  }

  function highlightPlayer(index){
    players.forEach((p, i) => {
      if (p.el) p.el.classList.toggle("active", i === index);
    });
  }

  // Initial deal (slightly staggered)
  setTimeout(()=>{ highlightPlayer(0); bet(); }, 800);

  setTimeout(()=>{
    community.push(deck.pop(), deck.pop(), deck.pop());
    renderCommunity();
    highlightPlayer(1);
    bet();
  }, 2000);

  setTimeout(()=>{
    community.push(deck.pop());
    renderCommunity();
    highlightPlayer(2);
    bet();
  }, 3500);

  setTimeout(()=>{
    community.push(deck.pop());
    renderCommunity();
    highlightPlayer(3);
    bet();
  }, 5000);

  // Showdown (FIXED)
  setTimeout(()=>{
    let results = players.map(p=>{
      const res = eval7([...p.hand, ...community]);
      return { name: p.name, score: res.score, hand: res.name };
    });

    results.sort((a,b)=>b.score - a.score);

    msg.innerHTML = `
      <h3>Showdown</h3>
      ${results.map(r => `<p>${r.name} — ${r.hand}</p>`).join("")}
    `;
  }, 5500);
}
