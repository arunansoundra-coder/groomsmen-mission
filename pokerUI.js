import { createDeck, eval7 } from "./poker.js";

let gameState = null;

function initGame(){
  const deck = createDeck();

  return {
    deck,
    players: [
      { name: "You", hand: [] },
      { name: "Opponent", hand: [] }
    ]
  };
}

function dealCards(state){
  state.players.forEach(p => {
    p.hand = state.deck.splice(0, 7);
  });
}

function renderPlayer(player){
  const div = document.createElement("div");
  div.className = "player";

  const title = document.createElement("h3");
  title.textContent = player.name;

  const hand = document.createElement("div");
  hand.className = "hand";

  player.hand.slice(0, 2).forEach(card => {
    const c = document.createElement("div");
    c.className = "card";
    c.textContent = card;
    hand.appendChild(c);
  });

  div.appendChild(title);
  div.appendChild(hand);

  return div;
}

export function startPoker(app, agentName){

  gameState = initGame();
  dealCards(gameState);

  const you = gameState.players[0];
  const opp = gameState.players[1];

  let yourResult, oppResult, resultText;

  try {
    yourResult = eval7(you.hand);
    oppResult = eval7(opp.hand);

    if (yourResult.score > oppResult.score){
      resultText = "YOU WIN 🏆";
    } else if (yourResult.score < oppResult.score){
      resultText = "YOU LOSE 💀";
    } else {
      resultText = "TIE 🤝";
    }
  } catch (e) {
    console.error(e);
    yourResult = { name: "ERROR" };
    oppResult = { name: "ERROR" };
    resultText = "GAME ERROR";
  }

  app.innerHTML = `
    <div class="poker-screen">
      <h2>HIGH STAKES POKER - ${agentName}</h2>

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

  const playersDiv = app.querySelector(".players");

  playersDiv.appendChild(renderPlayer(you));
  playersDiv.appendChild(renderPlayer(opp));

  document.getElementById("nextRound").onclick = () => {
    startPoker(app, agentName);
  };

  document.getElementById("exitGame").onclick = () => {
    app.innerHTML = "<h2>Mission Paused</h2>";
  };
}
