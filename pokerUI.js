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

  // position seats in a circle
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

players.forEach((p, i) => {
  if (!p.el) return;

  p.el.innerHTML = `
    <div class="name">${p.name}</div>
    <div class="codename">Codename: ${p.codename}</div>
    <div class="role">${p.role}</div>
    <div class="cards">
      ${renderCard(p.hand[0], i * 200)}
      ${renderCard(p.hand[1], i * 200 + 200)}
    </div>
    <div class="chips" id="chips-${i}">100</div>
  `;
});

 function renderCommunity(){
  communityEl.innerHTML = community
    .map((c, i) => renderCard(c, i * 200))
    .join("");
}

  function bet(){
    pot += Math.floor(Math.random()*50)+20;
    potEl.innerText = "POT: " + pot;
    chipSound.play().catch(()=>{});
  }

  setTimeout(()=>{
    community.push(deck.pop(), deck.pop(), deck.pop());
    renderCommunity();
    bet();
  },1000);

  setTimeout(()=>{
    community.push(deck.pop());
    renderCommunity();
    bet();
  },2500);

  setTimeout(()=>{
    community.push(deck.pop());
    renderCommunity();
    bet();
  },4000);

  setTimeout(()=>{
    let results = players.map(p=>{
      const res = eval7([...p.hand, ...community]);
      return { name: p.name, ...res };
    });

    results.sort((a,b)=>b.score - a.score);

    msg.innerHTML = `
      <h3>Showdown</h3>
      ${results.map(r => `<p>${r.name} - ${r.name}</p>`).join("")}
    `;
  }, 5500);
}
