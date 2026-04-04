import { createDeck, eval7 } from "./poker.js";

let gameState = null;

/* ---------------- INIT GAME ---------------- */
function initGame(){
  const deck = createDeck();

  return {
    deck,
    players: [
      { name: "You", hand: [], el: null },
      { name: "Opponent", hand: [], el: null }
    ],
    pot: 0,
    message: ""
  };
}

/* ---------------- DEAL ---------------- */
function dealCards(state){
  state.players.forEach(p => {
    p.hand = [state.deck.pop(), state.deck.pop(), state.deck.pop(), state.deck.pop(), state.deck.pop(), state.deck.pop(), state.deck.pop()];
  });
}

/* ---------------- RENDER CARD ---------------- */
function renderCard(card){
  const div = document.createElement("div");
  div.className = "card";
  div.textContent = card;
  return div;
}

/* ---------------- RENDER PLAYER ---------------- */
function renderPlayer(player){
  const div = document.createElement("div");
  div.className = "player";

  const title = document.createElement("h3");
  title.textContent = player.name;

  const hand = document.createElement("div");
  hand.className = "hand";

  player.hand.slice(0, 2).forEach(card => {
    hand.appendChild(renderCard(card));
  });

  div.appendChild(title);
  div.appendChild(hand);

  return div;
}

/* ---------------- MAIN START ---------------- */
export function startPoker(app){

  // reset state every time
  gameState = initGame();
  dealCards(gameState);

  const you = gameState.players[0];
  const opp = gameState.players[1];

  const yourResult = eval7(you.hand);
  const oppResult = eval7(opp.hand);

  let resultText = "";

  if (yourResult.score > oppResult.score){
    resultText = "YOU WIN 🏆";
  } else if (yourResult.score < oppResult.score){
    resultText = "YOU LOSE 💀";
  } else {
    resultText = "TIE 🤝";
  }

  app.innerHTML = `
    <div class="poker-screen">
      <h2>HIGH STAKES POKER</h2>

      <div class="table"></div>

      <div class="players"></div>

      <div class="results">
        <p>Your Hand: ${yourResult.name}</p>
        <p>Opponent Hand: ${oppResult.name}</p>
        <h3>${resultText}</h3>
      </div>

      <button id="nextRound">NEXT ROUND</button>
      <button id="exitGame">EXIT</button>
    </div>
  `;

  const table = app.querySelector(".table");
  const playersDiv = app.querySelector(".players");

  playersDiv.appendChild(renderPlayer(you));
  playersDiv.appendChild(renderPlayer(opp));

  /* ---------------- NEXT ROUND ---------------- */
  const nextBtn = document.getElementById("nextRound");
  nextBtn.onclick = () => {
    startPoker(app);
  };

  /* ---------------- EXIT ---------------- */
  const exitBtn = document.getElementById("exitGame");
  exitBtn.onclick = () => {
    app.innerHTML = "<h2>Mission Paused</h2>";
  };
}
