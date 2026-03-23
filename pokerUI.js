import { createDeck, eval7 } from './poker.js';
import { chipSound } from './sounds.js';

export function startPoker(app){

  app.innerHTML = `
    <div class="table">
      
      <div class="pot" id="pot">POT: 0</div>
      <div class="community" id="community"></div>

      <div class="seat seat-1" id="p0"></div>
      <div class="seat seat-2" id="p1"></div>
      <div class="seat seat-3" id="p2"></div>
      <div class="seat seat-4" id="p3"></div>

      <div id="msg" class="msg"></div>
    </div>
  `;

  const communityEl = document.getElementById('community');
  const potEl = document.getElementById('pot');
  const msg = document.getElementById('msg');

  let deck = createDeck();
  let pot = 0;
  let community = [];

  const names = ["Arunan","Jason","Gill","Prathap"];

  const players = names.map((name,i)=>({
    name,
    el: document.getElementById(`p${i}`),
    hand: [deck.pop(), deck.pop()]
  }));

  // 🎴 Render players
  players.forEach(p=>{
    p.el.innerHTML = `
      <div class="name">${p.name}</div>
      <div class="cards">
        ${renderCard(p.hand[0])}
        ${renderCard(p.hand[1])}
      </div>
    `;
  });

  function renderCard(card){
    const value = card.slice(0,-1);
    const suit = card.slice(-1);

    const color = (suit === "♥" || suit === "♦") ? "red" : "black";

    return `<div class="card ${color}">${value}${suit}</div>`;
  }

  function renderCommunity(){
    communityEl.innerHTML = community.map(renderCard).join("");
  }

  function bet(){
    pot += Math.floor(Math.random()*50)+20;
    potEl.innerText = "POT: " + pot;
    chipSound.play().catch(()=>{});
  }

  // FLOP
  setTimeout(()=>{
    community.push(deck.pop(), deck.pop(), deck.pop());
    renderCommunity();
    bet();
  },1000);

  // TURN
  setTimeout(()=>{
    community.push(deck.pop());
    renderCommunity();
    bet();
  },2500);

  // RIVER
  setTimeout(()=>{
    community.push(deck.pop());
    renderCommunity();
    bet();
  },4000);

  // SHOWDOWN
  setTimeout(()=>{
    let results = players.map(p=>{
      const res = eval7([...p.hand, ...community]);
      return {name:p.name, ...res};
    });

    results.sort((a,b)=>b.score - a.score);

    msg.innerHTML = `
      ${results.map(r=>`${r.name}: ${r.name ? r.name : ''} ${r.name && r.score ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}${r.name}: ${r.name ? '' : ''}${r.name ? '' : ''}${r.name ? '' : ''}
    `;
  },5500);
}
