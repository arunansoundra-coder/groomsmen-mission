// --- SOUND ---
const dealSound = new Audio("https://assets.mixkit.co/active_storage/sfx/2005/2005-preview.mp3");
const chipSound = new Audio("https://assets.mixkit.co/active_storage/sfx/209/209-preview.mp3");

// --- ROOT ---
const app = document.getElementById('app');

// --- AGENTS ---
const codenames = {
  "Arunan":"Alpha","Jason":"Viper","Gill":"Architect",
  "Prathap":"Midnight","Taylor":"Shadow","Duran":"Anomaly","Josh":"Mirage"
};
const agents = Object.keys(codenames);

// --- DECK ---
const suits = ["♠","♥","♦","♣"];
const values = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"];

function createDeck(){
  let deck=[];
  suits.forEach(s=>values.forEach(v=>deck.push(v+s)));
  return shuffle(deck);
}

function shuffle(deck){
  for(let i=deck.length-1;i>0;i--){
    let j=Math.floor(Math.random()*(i+1));
    [deck[i],deck[j]]=[deck[j],deck[i]];
  }
  return deck;
}

// --- HAND EVAL (7-card best of 5) ---
function getValue(card){ return values.indexOf(card.slice(0,-1)); }

function combinations(arr,k){
  let result=[];
  function comb(start,path){
    if(path.length===k){ result.push(path); return; }
    for(let i=start;i<arr.length;i++) comb(i+1,[...path,arr[i]]);
  }
  comb(0,[]);
  return result;
}

function eval5(cards){
  let vals=cards.map(getValue).sort((a,b)=>a-b);
  let suitsArr=cards.map(c=>c.slice(-1));

  let isFlush=suitsArr.every(s=>s===suitsArr[0]);
  let isStraight=vals.every((v,i)=>i===0||v===vals[i-1]+1);

  let counts={};
  vals.forEach(v=>counts[v]=(counts[v]||0)+1);
  let freq=Object.values(counts).sort((a,b)=>b-a);

  if(isStraight&&isFlush) return 9;
  if(freq[0]===4) return 8;
  if(freq[0]===3&&freq[1]===2) return 7;
  if(isFlush) return 6;
  if(isStraight) return 5;
  if(freq[0]===3) return 4;
  if(freq[0]===2&&freq[1]===2) return 3;
  if(freq[0]===2) return 2;
  return 1;
}

function evaluate7(cards){
  let combos=combinations(cards,5);
  let best=0;
  combos.forEach(c=> best=Math.max(best,eval5(c)));

  const names={
    9:"Straight Flush",8:"Four of a Kind",7:"Full House",
    6:"Flush",5:"Straight",4:"Three of a Kind",
    3:"Two Pair",2:"Pair",1:"High Card"
  };

  return {score:best,name:names[best]};
}

// --- RENDER ---
function render(html){ app.innerHTML=html; }

// --- MAIN GAME ---
function startGame(){

  render(`
    <div class="table-wrapper" id="table">
      <div class="table"></div>

      <div class="community" id="community"></div>
      <div class="pot" id="pot">POT: 0</div>
      <div class="deal-origin" id="origin"></div>
    </div>

    <div id="centerMsg"></div>
  `);

  const table=document.getElementById('table');
  const origin=document.getElementById('origin');
  const communityEl=document.getElementById('community');
  const potEl=document.getElementById('pot');
  const centerMsg=document.getElementById('centerMsg');

  let deck=createDeck();
  let pot=0;
  let community=[];

  const cx=180, cy=120;
  const rx=150, ry=95;

  const dealerIndex=Math.floor(Math.random()*agents.length);
  let players=[];

  // --- SEATS ---
  agents.forEach((name,i)=>{
    let angle=(i/agents.length)*Math.PI*2;
    let x=cx+Math.cos(angle)*rx;
    let y=cy+Math.sin(angle)*ry;

    let rot=angle*(180/Math.PI)+90;

    let seat=document.createElement('div');
    seat.className="seat";
    seat.style.left=x+"px";
    seat.style.top=y+"px";
    seat.id="seat-"+i;

    let hand=[deck.pop(),deck.pop()];

    players.push({name,hand,index:i});

    seat.innerHTML=`
      <div class="cards" style="transform:rotate(${rot}deg)">
        <div class="card" id="c1-${i}"></div>
        <div class="card" id="c2-${i}"></div>
      </div>

      <div class="player-name">${name}<br>${codenames[name]}</div>
      <div class="result-text" id="r-${i}"></div>
    `;

    table.appendChild(seat);

    setTimeout(()=>deal(origin,`c1-${i}`,hand[0]),i*150);
    setTimeout(()=>deal(origin,`c2-${i}`,hand[1]),i*150+100);

    // Dealer
    if(i===dealerIndex){
      let d=document.createElement('div');
      d.className="dealer-btn";
      d.innerText="D";
      d.style.left=(x+20)+"px";
      d.style.top=(y-15)+"px";
      table.appendChild(d);
    }
  });

  // --- BETTING ROUND ---
  function betRound(){
    players.forEach((p,i)=>{
      let bet=Math.floor(Math.random()*40)+10;
      pot+=bet;
      setTimeout(()=>{
        chipSound.play().catch(()=>{});
        potEl.innerText="POT: "+pot;
      },i*100);
    });
  }

  // --- COMMUNITY DEAL ---
  function dealCommunity(count,delay){
    setTimeout(()=>{
      for(let i=0;i<count;i++){
        let card=deck.pop();
        community.push(card);

        let c=document.createElement('div');
        c.className="card";
        communityEl.appendChild(c);

        deal(origin,null,card,c);
      }
    },delay);
  }

  // --- FLOW ---
  betRound(); // preflop

  dealCommunity(3,1200); // flop
  setTimeout(betRound,1800);

  dealCommunity(1,2600); // turn
  setTimeout(betRound,3000);

  dealCommunity(1,3800); // river
  setTimeout(betRound,4200);

  // --- SHOWDOWN ---
  setTimeout(()=>{
    players.forEach(p=>{
      let full=[...p.hand,...community];
      let res=evaluate7(full);
      p.result=res;
      document.getElementById(`r-${p.index}`).innerText=res.name;
    });

    let winner=players.sort((a,b)=>b.result.score-a.result.score)[0];

    document.getElementById("seat-"+winner.index).classList.add("winner");

    centerMsg.innerHTML=`🏆 ${winner.name} wins with ${winner.result.name}`;
  },5200);
}

// --- DEAL ---
function deal(origin,id,value,customEl){
  const target=customEl||document.getElementById(id);
  if(!target)return;

  const card=document.createElement('div');
  card.className="dealing-card";
  card.innerText=value;

  origin.parentElement.appendChild(card);

  let rect=target.getBoundingClientRect();
  let parent=origin.parentElement.getBoundingClientRect();

  dealSound.play().catch(()=>{});

  setTimeout(()=>{
    card.style.left=(rect.left-parent.left)+"px";
    card.style.top=(rect.top-parent.top)+"px";
  },20);

  setTimeout(()=>{
    target.innerText=value;
    card.remove();
  },400);
}

// --- START ---
startGame();
