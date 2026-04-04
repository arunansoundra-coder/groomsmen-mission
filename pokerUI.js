import { createDeck, eval7 } from "./poker.js";

let gameState = null;

/* =========================
   INIT GAME
========================= */
function initGame() {
  const deck = createDeck();

  return {
    deck,
    players: [
      { name: "You", hand: [] },
      { name: "Opponent", hand: [] }
    ]
  };
}

/* =========================
   DEAL CARDS
========================= */
function dealCards(state) {
  state.players.forEach(p => {
    p.hand = state.deck.splice(0, 7);
  });
}

/* =========================
   PLAYER RENDER (INSIDE TABLE)
========================= */
function renderPlayer(player, index) {
  const div = document.createElement("div");
  div.className = "seat";
  div.id = `p${index}`;

  const title = document.createElement("div");
  title.textContent = player.name;

  const hand = document.createElement("div");
  hand.className = "hand";

  player.hand.slice(0, 2).forEach(card => {
    const c = document.createElement("div");
    c.className = "card";

    // color logic (simple)
    if (card.includes("♥") || card.includes("♦")) {
      c.classList.add("red");
    }

    c.textContent = card;
    hand.appendChild(c);
  });

  div.appendChild(title);
  div.appendChild(hand);

  return div;
}

/* =========================
   MAIN POKER SCREEN
========================= */
export function startPoker(app, agentName) {

  gameState = initGame();
  dealCards(gameState);

  const you = gameState.players[0];
  const opp = gameState.players[1];

  let yourResult, oppResult, resultText;

  try {
    yourResult = eval7(you.hand);
    oppResult = eval7(opp.hand);

    if (yourResult.score > oppResult.score) {
      resultText = "YOU WIN 🏆";
    } else if (yourResult.score < oppResult.score) {
      resultText = "YOU LOSE 💀";
    } else {
      resultText = "TIE 🤝";
    }

  } catch (e) {
    console.error(e);
    yourResult = { name: "ERROR", score: 0 };
    oppResult = { name: "ERROR", score: 0 };
    resultText = "GAME ERROR";
  }

  /* =========================
     RENDER
  ========================= */
  app.innerHTML = `
    <div class="poker-screen fade-in">
      <h2>HIGH STAKES POKER - ${agentName}</h2>

      <div class="table" id="table">
        <div class="community"></div>
      </div>

      <div class="results">
        <p>Your Hand: ${yourResult.name}</p>
        <p>Opponent Hand: ${oppResult.name}</p>
        <h3>${resultText}</h3>
      </div>

      <div class="controls">
        <button id="nextRound">NEXT ROUND</button>
        <button id="exitGame">EXIT</button>
      </div>
    </div>
  `;

  /* =========================
     INSERT PLAYERS INTO TABLE
  ========================= */
  const table = app.querySelector(".table");

  table.appendChild(renderPlayer(you, 0));
  table.appendChild(renderPlayer(opp, 3));

  /* =========================
     BUTTONS
  ========================= */
  document.getElementById("nextRound").onclick = () => {
    startPoker(app, agentName);
  };

  document.getElementById("exitGame").onclick = () => {
    app.innerHTML = "<h2>Mission Paused</h2>";
  };
}
