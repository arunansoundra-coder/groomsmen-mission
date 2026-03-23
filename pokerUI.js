import { createDeck, eval7 } from './poker.js';
import { chipSound } from './sounds.js';

export function startPoker(app){

  console.log("Poker started");

  app.innerHTML = `
    <div class="table-wrapper">
      <div class="community" id="community"></div>
      <div class="pot" id="pot">POT: 0</div>
      <div id="players"></div>
      <div id="msg"></div>
    </div>
  `;

  const communityEl = document.getElementById('community');
  const potEl = document.getElementById('pot');
  const msg = document.getElementById('msg');
  const playersEl = document.getElementById('players');

  let deck = createDeck();
  let pot = 0;
  let community = [];

  const players = ["Arunan","Jason","Gill","Prathap"].map(name => ({
    name,
    hand: [deck.pop(), deck.pop()]
  }));

  players.forEach(p => {
    const div = document.createElement('div');
    div.className = "player";

    div.innerHTML = `
      <div>${p.name}</div>
      <div>${p.hand[0]} ${p.hand[1]}</div>
    `;

    playersEl.appendChild(div);
  });

  function renderCommunity(){
    communityEl.innerHTML = "";
    community.forEach(card => {
      const c = document.createElement("div");
      c.className = "card";
      c.innerText = card;
      communityEl.appendChild(c);
    });
  }

  function betting(){
    pot += Math.floor(Math.random()*50)+10;
    potEl.innerText = "POT: " + pot;
    chipSound.play().catch(()=>{});
  }

  setTimeout(()=>{
    community.push(deck.pop(), deck.pop(), deck.pop());
    renderCommunity();
    betting();
  },1000);

  setTimeout(()=>{
    community.push(deck.pop());
    renderCommunity();
    betting();
  },2500);

  setTimeout(()=>{
    community.push(deck.pop());
    renderCommunity();
    betting();
  },4000);

  setTimeout(()=>{
    players.forEach(p=>{
      const res = eval7([...p.hand, ...community]);
      msg.innerHTML += `${p.name}: ${res.name}<br>`;
    });
  },5500);
}
