import { createDeck, eval7 } from './poker.js';
import { chipSound } from './sounds.js';

export function startPoker(app){

  app.innerHTML = `
    <div class="table">

     <div class="mission-info">
  <h3>Mission Begins: September 18, 2026 - 12:00 PM</h3>
  <p>High Stakes Poker Game</p>
  <p>Objective: Defeat the Groom</p>
  <p>Prize: MI6 Poker Champion</p>
</div>

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

  function renderCard(card){
    const value = card.slice(0,-1);
    const suit = card.slice(-1);
    const color = (suit === "♥" || suit === "♦") ? "red" : "black";

    return `<div class="card ${color}">${value}${suit}</div>`;
  }

players.forEach((p, i) => {
  if (!p.el) return;

  p.el.innerHTML = `
    <div class="seat-label">
      <div class="name">${p.name}</div>
      <div class="codename">${p.codename}</div>
      <div class="role">${p.role}</div>
    </div>

    <div class="seat-hand">
      <div class="cards">
        ${renderCard(p.hand[0])}
        ${renderCard(p.hand[1])}
      </div>
      <div class="chips" id="chips-${i}">${p.chips}</div>
    </div>
  `;
});

  function renderCommunity(){
    communityEl.innerHTML = community.map(renderCard).join("");
  }

  function bet(){
    players.forEach((p, i) => {
      if (p.chips <= 0) return;

      const betAmount = 10;

      p.chips -= betAmount;
      pot += betAmount;

      const chipEl = document.getElementById(`chips-${i}`);
      if (chipEl) chipEl.innerText = p.chips;
    });

    potEl.innerText = "POT: " + pot;

    if (chipSound) chipSound.play().catch(()=>{});
  }

  setTimeout(()=>{ bet(); }, 800);

  setTimeout(()=>{
    community.push(deck.pop(), deck.pop(), deck.pop());
    renderCommunity();
    bet();
  }, 2000);

  setTimeout(()=>{
    community.push(deck.pop());
    renderCommunity();
    bet();
  }, 3500);

  setTimeout(()=>{
    community.push(deck.pop());
    renderCommunity();
    bet();
  }, 5000);

  setTimeout(()=>{
    let results = players.map(p=>{
      const res = eval7([...p.hand, ...community]);
      return { name: p.name, hand: res.name, score: res.score };
    });

    results.sort((a,b)=>b.score - a.score);

    msg.innerHTML = `
      <h3>Showdown</h3>
      ${results.map(r => `<p>${r.name} — ${r.hand}</p>`).join("")}

      <p>Await further instructions via email.</p>
      <p>Safe House: 6233 Muirfield Dr SW, Cedar Rapids, IA</p>
      <p>Confirm with Agent Ghost</p>
      <p>Hotel: The Hotel at Kirkwood Center</p>
    `;
  }, 5500);

}
