import { createDeck, eval7 } from './poker.js';
import { chipSound } from './sounds.js';

export function startPoker(app){

  app.innerHTML = `
    <div class="table-wrapper">
      <div class="table"></div>
      <div class="community" id="community"></div>
      <div class="pot" id="pot">POT: 0</div>
      <div id="msg"></div>
    </div>
  `;

  const communityEl = document.getElementById('community');
  const potEl = document.getElementById('pot');
  const msg = document.getElementById('msg');

  let deck = createDeck();
  let pot = 0;
  let community = [];

  function betting(){
    pot += Math.floor(Math.random()*50)+10;
    potEl.innerText = "POT: " + pot;
    chipSound.play().catch(()=>{});
  }

  // Deal, flop, turn, river...
  setTimeout(()=>{ betting(); }, 1000);
}
