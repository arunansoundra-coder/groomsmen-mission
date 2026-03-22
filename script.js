const dealSound = new Audio("https://assets.mixkit.co/active_storage/sfx/2005/2005-preview.mp3");
const chipSound = new Audio("https://assets.mixkit.co/active_storage/sfx/209/209-preview.mp3");

const app = document.getElementById('app');

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

const innerCircle = [
  {level:1,q:"Identify the location.",options:["Cedar Rapids","Chicago","Des Moines","Omaha"],answer:"Cedar Rapids"},
  {level:2,q:"Confirm the operation date.",options:["September 18, 2026","September 19, 2026","October 1, 2026","August 30, 2026"],answer:"September 18, 2026"},
  {level:3,q:"Follow-up event?",options:["Homecoming Celebration","Rehearsal Dinner","After Party","Brunch"],answer:"Homecoming Celebration"},
  {level:4,q:"Lodging location?",options:["Headquarters","Safe House","Command Center","Base Camp"],answer:"Safe House"},
  {level:5,q:"Blood makes us related, loyalty makes a family, and family is ____.",options:["Forever","Strong","Unbreakable","Everything"],answer:"Forever"}
];

let currentQ = 0;

function render(html){
  app.innerHTML = html;
}

function start(){
  render(`<h2>Agent ${agentName}</h2>
  <button onclick="showQuestion()">Begin Mission</button>`);
}

function showQuestion(){
  const q = innerCircle[currentQ];

  render(`<h3>LEVEL ${q.level}</h3>
  <p>${q.q}</p>
  ${q.options.map(o=>`<button onclick="checkAnswer('${o}')">${o}</button>`).join('')}
  <div id="fb"></div>`);
}

function checkAnswer(a){
  const q = innerCircle[currentQ];
  const fb = document.getElementById('fb');

  if(a === q.answer){
    fb.innerHTML = "✓";
    currentQ++;
    if(currentQ < innerCircle.length) setTimeout(showQuestion,800);
    else setTimeout(pokerTable,1000);
  } else {
    fb.innerHTML = "✖";
  }
}

/* POKER TABLE */
function pokerTable(){
  render(`
    <h3>MISSION BRIEFING</h3>
    <div class="table-wrapper" id="table">
      <div class="table"></div>
    </div>
    <button onclick="safeHouse()">Continue</button>
  `);

  const table = document.getElementById('table');
  const cx = 175, cy = 110;

  const suits = ["♠","♥","♦","♣"];
  const values = ["A","K","Q","J","10","9","8","7"];

  // Random dealer
  const dealerIndex = Math.floor(Math.random() * agents.length);

  agents.forEach((name,i)=>{
    let angle = (i / agents.length) * Math.PI * 2;
    let x = cx + Math.cos(angle) * 140;
    let y = cy + Math.sin(angle) * 90;

    let seat = document.createElement('div');
    seat.className = 'seat';
    seat.style.left = x + "px";
    seat.style.top = y + "px";

    // Random 2 cards
    const card1 = values[Math.floor(Math.random()*values.length)] + suits[Math.floor(Math.random()*suits.length)];
    const card2 = values[Math.floor(Math.random()*values.length)] + suits[Math.floor(Math.random()*suits.length)];

    // Random chips
    const chipCount = Math.floor(Math.random()*4)+2;
    let chipsHTML = '';
    for(let c=0;c<chipCount;c++){
      const types=["red","blue","black","gold"];
      const t = types[Math.floor(Math.random()*types.length)];
      chipsHTML += `<div class="chip ${t}"></div>`;
    }

    seat.innerHTML = `
      <div class="player-area">
        <div class="cards">
          <div class="card">${card1}</div>
          <div class="card">${card2}</div>
        </div>

        <div class="chip-stack">
          ${chipsHTML}
        </div>

        <b>${name}</b>
        <div>${codenames[name]}</div>
      </div>
    `;

    // Dealer button
    if(i === dealerIndex){
      const dealer = document.createElement('div');
      dealer.className = 'dealer-btn';
      dealer.innerText = 'D';
      dealer.style.left = (x + 25) + "px";
      dealer.style.top = (y - 10) + "px";
      table.appendChild(dealer);
    }

    seat.onclick = () => showPopup(name);
    table.appendChild(seat);
  });
}

/* POPUP */
function showPopup(name){
  document.getElementById('overlay').style.display = 'block';
  document.getElementById('popup').style.display = 'block';

  document.getElementById('popupName').innerText = name;
  document.getElementById('popupCodename').innerText = "Codename: " + codenames[name];
  document.getElementById('popupRole').innerText = "Role: " + roles[name];
}

function closePopup(){
  document.getElementById('overlay').style.display = 'none';
  document.getElementById('popup').style.display = 'none';
}

/* SAFE HOUSE */
function safeHouse(){
  render(`
    <h3>Safe House</h3>
    <p>6233 Muirfield Dr SW</p>

    <button onclick="submitForm(true)">Confirm Attendance</button>
    <button onclick="submitForm(false)">Decline</button>
  `);
}

/* GOOGLE FORM */
function submitForm(attending){

  if(roles[agentName] === "Groom"){
    render("<h2>✔ Attendance Recorded (Local)</h2>");
    return;
  }

  const url = "https://docs.google.com/forms/d/e/1FAIpQLSdBp0bzZtk-W-5jtPFT3uUjNoJrOG1C8HsVxbTgG5D5VSAY_w/formResponse";

  const data = new URLSearchParams();
  data.append("entry.385675046", agentName);
  data.append("entry.1160902778", attending ? "Yes" : "No");
  data.append("entry.794497838", roles[agentName]);

  fetch(url,{
    method:"POST",
    mode:"no-cors",
    body:data
  });

  render(`<h2>✔ Response Submitted</h2>`);
}

start();

/* GLOBAL */
window.showPopup = showPopup;
window.closePopup = closePopup;
window.safeHouse = safeHouse;
window.submitForm = submitForm;
window.checkAnswer = checkAnswer;
window.showQuestion = showQuestion;
