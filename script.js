// --- SOUND ---
const dealSound = new Audio("https://assets.mixkit.co/active_storage/sfx/2005/2005-preview.mp3");
const chipSound = new Audio("https://assets.mixkit.co/active_storage/sfx/209/209-preview.mp3");

// --- HAND RANKS ---
const handRanks = [
  {name:"High Card", value:1},
  {name:"Pair", value:2},
  {name:"Two Pair", value:3},
  {name:"Three of a Kind", value:4},
  {name:"Straight", value:5},
  {name:"Flush", value:6}
];

// --- APP ROOT ---
const app = document.getElementById('app');

// --- AGENT DATA ---
const agentName = new URLSearchParams(window.location.search).get('agent') || 'Agent';

const codenames = {
  "Arunan":"Alpha","Jason":"Viper","Gill":"Architect",
  "Prathap":"Midnight","Taylor":"Shadow","Duran":"Anomaly","Josh":"Mirage"
};

const roles = {
  "Arunan":"Groom",
  "Jason":"Best Man",
  "Prathap":"Groomsman","Gill":"Groomsman",
  "Taylor":"Groomsman","Duran":"Groomsman","Josh":"Groomsman"
};

const agents = Object.keys(codenames);

// --- QUESTIONS ---
const innerCircle = [
  {level:1,q:"Identify the location.",options:["Cedar Rapids","Chicago","Des Moines","Omaha"],answer:"Cedar Rapids"},
  {level:2,q:"Confirm the operation date.",options:["September 18, 2026","September 19, 2026","October 1, 2026","August 30, 2026"],answer:"September 18, 2026"},
  {level:3,q:"Follow-up event?",options:["Homecoming Celebration","Rehearsal Dinner","After Party","Brunch"],answer:"Homecoming Celebration"},
  {level:4,q:"Lodging location?",options:["Safe House","Headquarters","Command Center","Base Camp"],answer:"Safe House"},
  {level:5,q:"Blood makes us related, loyalty makes a family, and family is ____.",options:["Forever","Strong","Unbreakable","Everything"],answer:"Forever"}
];

let currentQ = 0;

// --- RENDER ---
function render(html){
  app.innerHTML = html;
}

// --- START ---
function start(){
  render(`
    <h2>Agent ${agentName}</h2>
    <button onclick="showQuestion()">Begin Mission</button>
  `);
}

// --- QUESTIONS ---
function showQuestion(){
  const q = innerCircle[currentQ];

  render(`
    <h3>LEVEL ${q.level}</h3>
    <p>${q.q}</p>
    ${q.options.map(o => `<button onclick="checkAnswer('${o.replace(/'/g,"\\'")}')">${o}</button>`).join('')}
    <div id="fb"></div>
  `);
}

function checkAnswer(a){
  const q = innerCircle[currentQ];
  const fb = document.getElementById('fb');

  if(a === q.answer){
    fb.innerHTML = "✓";
    currentQ++;
    if(currentQ < innerCircle.length){
      setTimeout(showQuestion, 700);
    } else {
      setTimeout(pokerTable, 900);
    }
  } else {
    fb.innerHTML = "✖";
  }
}

// --- HAND EVALUATION (simple for now) ---
function evaluateHand(){
  const score = Math.floor(Math.random() * handRanks.length);
  return handRanks[score];
}

// --- POKER TABLE ---
function pokerTable(){
  render(`
    <h3>MISSION BRIEFING</h3>
    <div class="table-wrapper" id="table">
      <div class="table"></div>
      <div class="deal-origin" id="origin"></div>

      <div class="pot">
        POT
      </div>
    </div>

    <div id="centerMsg" class="center-message"></div>

    <button onclick="safeHouse()">Continue</button>
  `);

  const table = document.getElementById('table');
  const origin = document.getElementById('origin');
  const centerMsg = document.getElementById('centerMsg');

  const cx = 175, cy = 110;
  const suits = ["♠","♥","♦","♣"];
  const values = ["A","K","Q","J","10","9","8","7"];

  const dealerIndex = Math.floor(Math.random() * agents.length);
  let results = [];

  agents.forEach((name,i)=>{

    let angle = (i / agents.length) * Math.PI * 2;
    let x = cx + Math.cos(angle) * 135;
    let y = cy + Math.sin(angle) * 75;

    let seat = document.createElement('div');
    seat.className = 'seat';
    seat.style.left = x + "px";
    seat.style.top = y + "px";
    seat.id = "seat-" + i;

    const card1 = values[Math.floor(Math.random()*values.length)] + suits[Math.floor(Math.random()*suits.length)];
    const card2 = values[Math.floor(Math.random()*values.length)] + suits[Math.floor(Math.random()*suits.length)];

    const rank = evaluateHand();
    results.push({name, rank, index:i});

    seat.innerHTML = `
      <div class="player-area">

        <div class="result-text" id="result-${i}"></div>

        <div class="cards">
          <div class="card" id="c1-${i}"></div>
          <div class="card" id="c2-${i}"></div>
        </div>

        <div class="player-name">
          <b>${name}</b>
          <div>${codenames[name]}</div>
        </div>

      </div>
    `;

    table.appendChild(seat);

    // Dealer marker
    if(i === dealerIndex){
      const dealer = document.createElement('div');
      dealer.className = 'dealer-btn';
      dealer.innerText = 'D';
      dealer.style.left = (x + 20) + "px";
      dealer.style.top = (y - 15) + "px";
      table.appendChild(dealer);
    }

    setTimeout(()=>dealCard(origin, document.getElementById(`c1-${i}`), card1), i*300+200);
    setTimeout(()=>dealCard(origin, document.getElementById(`c2-${i}`), card2), i*300+350);
  });

  setTimeout(()=> centerMsg.innerText = "Evaluating hands...", agents.length*300+800);

  setTimeout(()=>{
    results.forEach(r=>{
      const el = document.getElementById(`result-${r.index}`);
      if(el) el.innerText = r.rank.name;
    });
  }, agents.length*300+1500);

  setTimeout(()=>{
    const sorted = [...results].sort((a,b)=>b.rank.value - a.rank.value);
    const winner = sorted[0];

    document.getElementById("seat-"+winner.index)?.classList.add("winner");

    centerMsg.innerHTML = `🏆 WINNER: ${winner.name} (${winner.rank.name})`;

  }, agents.length*300+2500);
}

agents.forEach((name,i)=>{

  const angle = (i / agents.length) * Math.PI * 2;

  // Elliptical table (more realistic proportions)
  const radiusX = 145;
  const radiusY = 95;

  const x = cx + Math.cos(angle) * radiusX;
  const y = cy + Math.sin(angle) * radiusY;

  let seat = document.createElement('div');
  seat.className = 'seat';
  seat.style.left = x + "px";
  seat.style.top = y + "px";
  seat.id = "seat-" + i;

  // Calculate rotation so cards face center
  const rotation = angle * (180 / Math.PI) + 90;

  const card1 = randomCard();
  const card2 = randomCard();

  const rank = evaluateHand();
  results.push({name, rank, index:i});

  seat.innerHTML = `
    <div class="player-area">

      <div class="result-text" id="result-${i}"></div>

      <!-- CARDS (ROTATE TO FACE CENTER) -->
      <div class="cards" style="transform: rotate(${rotation}deg);">
        <div class="card" id="c1-${i}"></div>
        <div class="card" id="c2-${i}"></div>
      </div>

      <!-- NAME ALWAYS STRAIGHT -->
      <div class="player-name">
        <b>${name}</b>
        <div>${codenames[name]}</div>
      </div>

    </div>
  `;

  table.appendChild(seat);

  setTimeout(()=>dealCard(origin, document.getElementById(`c1-${i}`), card1), i*300+200);
  setTimeout(()=>dealCard(origin, document.getElementById(`c2-${i}`), card2), i*300+350);
});

// --- DEAL CARD ---
function dealCard(origin, target, value){
  if(!origin || !target) return;

  const rect = target.getBoundingClientRect();
  const parentRect = origin.parentElement.getBoundingClientRect();

  const card = document.createElement('div');
  card.className = 'dealing-card';
  card.innerText = value;

  origin.parentElement.appendChild(card);

  try {
    dealSound.currentTime = 0;
    dealSound.play().catch(()=>{});
  } catch {}

  setTimeout(()=>{
    card.style.left = (rect.left - parentRect.left) + "px";
    card.style.top = (rect.top - parentRect.top) + "px";
  }, 20);

  setTimeout(()=>{
    target.innerText = value;
    target.classList.add("dealt");
    card.remove();
  }, 500);
}

// --- SAFE HOUSE ---
function safeHouse(){
  render(`
    <h3>Safe House</h3>
    <p>6233 Muirfield Dr SW</p>

    <button onclick="submitForm(true)">Confirm Attendance</button>
    <button onclick="submitForm(false)">Decline</button>
  `);
}

// --- FORM ---
function submitForm(attending){

  if(roles[agentName] === "Groom"){
    render("<h2>✔ Attendance Recorded (Local)</h2>");
    return;
  }

  const url = "https://docs.google.com/forms/d/e/1FAIpQLSdBp0bzZtk-W-5jtPFT3uUjNoJrOG1C8HsVxbTgG5D5VSAY_w/formResponse";

  const data = new URLSearchParams();
  data.append("entry.385675046", agentName);
  data.append("entry.1160902778", attending ? "Yes":"No");
  data.append("entry.794497838", roles[agentName]);

  fetch(url,{
    method:"POST",
    mode:"no-cors",
    body:data
  });

  render(`<h2>✔ Response Submitted</h2>`);
}

function randomCard(){
  const suits = ["♠","♥","♦","♣"];
  const values = ["A","K","Q","J","10","9","8","7"];
  return values[Math.floor(Math.random()*values.length)] + suits[Math.floor(Math.random()*suits.length)];
}

// --- INIT ---
start();

// --- GLOBAL ---
window.safeHouse = safeHouse;
window.submitForm = submitForm;
window.checkAnswer = checkAnswer;
window.showQuestion = showQuestion;
