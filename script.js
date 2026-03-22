// --- SOUND ---
const dealSound = new Audio("https://assets.mixkit.co/active_storage/sfx/2005/2005-preview.mp3");
const chipSound = new Audio("https://assets.mixkit.co/active_storage/sfx/209/209-preview.mp3");

// --- APP ROOT ---
const app = document.getElementById('app');

// --- AGENTS ---
const codenames = {
  "Arunan":"Ghost","Jason":"Viper","Gill":"Architect",
  "Prathap":"Midnight","Taylor":"Shadow","Duran":"Anomaly","Josh":"Mirage"
};

const agents = Object.keys(codenames);

// --- DECK ---
const suits = ["♠","♥","♦","♣"];
const values = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"];

function createDeck(){
  let deck = [];
  for(let s of suits){
    for(let v of values){
      deck.push(v+s);
    }
  }
  return shuffle(deck);
}

function shuffle(deck){
  for(let i=deck.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [deck[i],deck[j]]=[deck[j],deck[i]];
  }
  return deck;
}

// --- HAND EVALUATION (REAL) ---
function getValue(card){
  const v = card.slice(0,-1);
  return values.indexOf(v);
}

function evaluateHand(cards){
  const vals = cards.map(getValue).sort((a,b)=>a-b);
  const suitsArr = cards.map(c=>c.slice(-1));

  const isFlush = suitsArr.every(s=>s===suitsArr[0]);

  let isStraight = true;
  for(let i=1;i<vals.length;i++){
    if(vals[i] !== vals[i-1]+1){
      isStraight = false;
      break;
    }
  }

  let counts = {};
  vals.forEach(v=>counts[v]=(counts[v]||0)+1);
  const freq = Object.values(counts).sort((a,b)=>b-a);

  if(isStraight && isFlush) return {name:"Straight Flush", score:9};
  if(freq[0]===4) return {name:"Four of a Kind", score:8};
  if(freq[0]===3 && freq[1]===2) return {name:"Full House", score:7};
  if(isFlush) return {name:"Flush", score:6};
  if(isStraight) return {name:"Straight", score:5};
  if(freq[0]===3) return {name:"Three of a Kind", score:4};
  if(freq[0]===2 && freq[1]===2) return {name:"Two Pair", score:3};
  if(freq[0]===2) return {name:"Pair", score:2};

  return {name:"High Card", score:1};
}

// --- RENDER ---
function render(html){
  app.innerHTML = html;
}

// --- MAIN TABLE ---
function pokerTable(){

  render(`
    <div class="table-wrapper" id="table">
      <div class="table"></div>
      <div class="deal-origin" id="origin"></div>
      <div class="pot" id="pot">POT: 0</div>
    </div>
    <div id="centerMsg"></div>
  `);

  const table = document.getElementById('table');
  const origin = document.getElementById('origin');
  const potEl = document.getElementById('pot');
  const centerMsg = document.getElementById('centerMsg');

  const cx = 180, cy = 120;
  const radiusX = 150, radiusY = 95;

  let deck = createDeck();
  let pot = 0;

  const dealerIndex = Math.floor(Math.random()*agents.length);

  let players = [];

  // --- CREATE SEATS ---
  agents.forEach((name,i)=>{

    const angle = (i/agents.length)*Math.PI*2;
    const x = cx + Math.cos(angle)*radiusX;
    const y = cy + Math.sin(angle)*radiusY;

    const rotation = angle*(180/Math.PI)+90;

    const seat = document.createElement('div');
    seat.className="seat";
    seat.style.left=x+"px";
    seat.style.top=y+"px";
    seat.id="seat-"+i;

    const hand = [deck.pop(),deck.pop()];
    const community = [deck.pop(),deck.pop(),deck.pop()];
    const fullHand = [...hand,...community];

    const evalResult = evaluateHand(fullHand);

    players.push({name, hand, evalResult, index:i});

    seat.innerHTML=`
      <div class="player-area">

        <div class="cards" 
          style="transform: rotate(${rotation}deg) skewY(${Math.sin(angle)*10}deg);">

          <div class="card" id="c1-${i}"></div>
          <div class="card" id="c2-${i}"></div>
        </div>

        <div class="player-name">
          <b>${name}</b><br>${codenames[name]}
        </div>

        <div class="result-text" id="r-${i}"></div>

      </div>
    `;

    table.appendChild(seat);

    // DEAL
    setTimeout(()=>dealCard(origin, document.getElementById(`c1-${i}`), hand[0]), i*200);
    setTimeout(()=>dealCard(origin, document.getElementById(`c2-${i}`), hand[1]), i*200+150);

    // BETTING
    const bet = Math.floor(Math.random()*50)+10;
    pot += bet;

    setTimeout(()=>{
      animateChips(seat);
      chipSound.play().catch(()=>{});
      potEl.innerText="POT: "+pot;
    }, i*200+400);

    // DEALER BUTTON
    if(i===dealerIndex){
      const d = document.createElement('div');
      d.className="dealer-btn";
      d.innerText="D";
      d.style.left=(x+20)+"px";
      d.style.top=(y-15)+"px";
      table.appendChild(d);
    }
  });

  // --- REVEAL ---
  setTimeout(()=>{
    players.forEach(p=>{
      document.getElementById(`r-${p.index}`).innerText=p.evalResult.name;
    });
  },2000);

  // --- WINNER ---
  setTimeout(()=>{
    const winner = players.sort((a,b)=>b.evalResult.score-a.evalResult.score)[0];

    document.getElementById("seat-"+winner.index).classList.add("winner");

    centerMsg.innerHTML=`🏆 ${winner.name} wins with ${winner.evalResult.name}`;
  },3000);
}

// --- CHIP ANIMATION ---
function animateChips(seat){
  const chip = document.createElement('div');
  chip.className="chip";
  chip.style.left="0px";
  chip.style.top="0px";
  seat.appendChild(chip);

  setTimeout(()=>chip.remove(),500);
}

// --- DEAL CARD ---
function dealCard(origin,target,value){
  if(!target)return;

  const card=document.createElement('div');
  card.className="dealing-card";
  card.innerText=value;

  origin.parentElement.appendChild(card);

  const rect=target.getBoundingClientRect();
  const parentRect=origin.parentElement.getBoundingClientRect();

  dealSound.play().catch(()=>{});

  setTimeout(()=>{
    card.style.left=(rect.left-parentRect.left)+"px";
    card.style.top=(rect.top-parentRect.top)+"px";
  },20);

  setTimeout(()=>{
    target.innerText=value;
    card.remove();
  },400);
}

// --- START ---
pokerTable();
