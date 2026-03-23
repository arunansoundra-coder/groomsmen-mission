
// =======================
// 🔊 SOUND
// =======================
const dealSound = new Audio("https://assets.mixkit.co/active_storage/sfx/2005/2005-preview.mp3");
const chipSound = new Audio("https://assets.mixkit.co/active_storage/sfx/209/209-preview.mp3");

// =======================
// 🎯 ROOT
// =======================
const app = document.getElementById('app');

// =======================
// 👥 AGENTS
// =======================
const codenames = {
  "Arunan":"Ghost","Jason":"Viper","Gill":"Architect",
  "Prathap":"Midnight","Taylor":"Shadow","Duran":"Anomaly","Josh":"Mirage"
};

const agentName = new URLSearchParams(window.location.search).get('agent') || "Arunan";

// =======================
// 🧩 MISSION QUESTIONS
// =======================
const questions = [
  {
    q:"The operation begins in which city?",
    options:["Cedar Rapids","Chicago","Des Moines","Omaha"],
    answer:"Cedar Rapids"
  },
  {
    q:"When is the mission date?",
    options:["September 18","October 1","August 30","November 5"],
    answer:"September 18"
  },
  {
    q:"What follows the ceremony?",
    options:["Homecoming","Rehearsal","Reception","Brunch"],
    answer:"Homecoming"
  },
  {
    q:"Where is the safe house?",
    options:["Muirfield","Downtown","Uptown","Airport"],
    answer:"Muirfield"
  },
  {
    q:"Loyalty makes a family, and family is ____.",
    options:["Forever","Strong","Unbreakable","Everything"],
    answer:"Forever"
  }
];

let currentQ = 0;

// =======================
// 🎮 RENDER
// =======================
function render(html){
  app.innerHTML = html;
}

// =======================
// 🚀 START
// =======================
function start(){
  showQuestion();
}

// =======================
// 🎯 QUESTIONS
// =======================
function showQuestion(){
  const q = questions[currentQ];

  render(`
    <h2>MISSION LEVEL ${currentQ+1}</h2>
    <p>${q.q}</p>

    ${q.options.map(o=>`
      <button onclick="check('${o}')">${o}</button>
    `).join('')}

    <div id="feedback"></div>
  `);
}

function check(ans){
  const q = questions[currentQ];
  const fb = document.getElementById("feedback");

  if(ans === q.answer){
    currentQ++;
    if(currentQ === questions.length){
      setTimeout(()=>startPoker(), 800);
    } else {
      fb.innerText = "✓ Access Granted";
      setTimeout(showQuestion, 700);
    }
  } else {
    fb.innerText = "✖ Try Again";
  }
}

// =======================
// 🃏 POKER ENGINE
// =======================

const suits = ["♠","♥","♦","♣"];
const values = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"];

function createDeck(){
  let d=[];
  suits.forEach(s=>values.forEach(v=>d.push(v+s)));
  return shuffle(d);
}

function shuffle(a){
  for(let i=a.length-1;i>0;i--){
    let j=Math.floor(Math.random()*(i+1));
    [a[i],a[j]]=[a[j],a[i]];
  }
  return a;
}

function val(c){ return values.indexOf(c.slice(0,-1)); }

function combinations(arr,k){
  let res=[];
  (function comb(start,combo){
    if(combo.length===k){res.push(combo);return;}
    for(let i=start;i<arr.length;i++){
      comb(i+1,[...combo,arr[i]]);
    }
  })(0,[]);
  return res;
}

function eval5(cards){
  let v=cards.map(val).sort((a,b)=>a-b);
  let s=cards.map(c=>c.slice(-1));

  let flush = s.every(x=>x===s[0]);
  let straight = v.every((x,i)=>i===0 || x===v[i-1]+1);

  let counts={};
  v.forEach(x=>counts[x]=(counts[x]||0)+1);
  let freq=Object.values(counts).sort((a,b)=>b-a);

  if(straight && flush) return 9;
  if(freq[0]===4) return 8;
  if(freq[0]===3 && freq[1]===2) return 7;
  if(flush) return 6;
  if(straight) return 5;
  if(freq[0]===3) return 4;
  if(freq[0]===2 && freq[1]===2) return 3;
  if(freq[0]===2) return 2;
  return 1;
}

function eval7(cards){
  let best=0;
  combinations(cards,5).forEach(c=>{
    best=Math.max(best,eval5(c));
  });

  const names={
    9:"Straight Flush",8:"Four of a Kind",7:"Full House",
    6:"Flush",5:"Straight",4:"Three of a Kind",
    3:"Two Pair",2:"Pair",1:"High Card"
  };

  return {score:best,name:names[best]};
}

// =======================
// 🃏 POKER GAME
// =======================
function startPoker(){

  render(`
    <div class="table-wrapper">
      <div class="table"></div>

      <div class="community" id="community"></div>
      <div class="pot" id="pot">POT: 0</div>
      <div id="msg"></div>
    </div>
  `);

  const table=document.querySelector('.table-wrapper');
  const communityEl=document.getElementById('community');
  const potEl=document.getElementById('pot');
  const msg=document.getElementById('msg');

  let deck=createDeck();
  let pot=0;
  let community=[];

  const players = Object.keys(codenames).map(name=>({
    name,
    hand:[deck.pop(),deck.pop()]
  }));

  // --- DEAL HOLE CARDS ---
  players.forEach((p,i)=>{
    let seat=document.createElement('div');
    seat.className="seat";
    seat.style.left=(100+i*40)+"px";
    seat.style.top="200px";

    seat.innerHTML=`
      <div class="cards">
        <div class="card">${p.hand[0]}</div>
        <div class="card">${p.hand[1]}</div>
      </div>
      <div class="player-name">${p.name}</div>
    `;

    table.appendChild(seat);
  });

  // --- FLOP ---
  setTimeout(()=>{
    for(let i=0;i<3;i++){
      community.push(deck.pop());
    }
    renderCommunity(communityEl,community);
    betting(potEl,pot,players);
  },1000);

  // --- TURN ---
  setTimeout(()=>{
    community.push(deck.pop());
    renderCommunity(communityEl,community);
    betting(potEl,pot,players);
  },2500);

  // --- RIVER ---
  setTimeout(()=>{
    community.push(deck.pop());
    renderCommunity(communityEl,community);
    betting(potEl,pot,players);
  },4000);

  // --- SHOWDOWN ---
  setTimeout(()=>{
    players.forEach(p=>{
      let res = eval7([...p.hand,...community]);
      p.result=res;
      msg.innerHTML+=`${p.name}: ${res.name}<br>`;
    });

    let winner = players.sort((a,b)=>b.result.score - a.result.score)[0];
    msg.innerHTML += `<h2>🏆 ${winner.name} Wins</h2>`;
  },5500);
}

// =======================
// 🎰 COMMUNITY RENDER
// =======================
function renderCommunity(el,cards){
  el.innerHTML = "";
  cards.forEach(c=>{
    let d=document.createElement('div');
    d.className="card";
    d.innerText=c;
    el.appendChild(d);
  });
}

// =======================
// 💰 BETTING
// =======================
function betting(potEl,pot,players){
  players.forEach(()=>{
    let bet = Math.floor(Math.random()*50)+10;
    pot += bet;
    potEl.innerText = "POT: " + pot;
    chipSound.play().catch(()=>{});
  });
}

// =======================
// 🚀 INIT
// =======================
start();

// =======================
// 🌍 GLOBAL
// =======================
window.check = check;
