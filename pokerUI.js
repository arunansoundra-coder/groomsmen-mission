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
   PLAYER RENDER (TABLE SEATS)
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
export function startPoker(app, { agentName, next }) {

  try {
    console.log("POKER STARTED");

    gameState = initGame();
    dealCards(gameState);

    const you = gameState.players[0];
    const opp = gameState.players[1];

    const yourResult = eval7(you.hand);
    const oppResult = eval7(opp.hand);

    console.log("YOUR RESULT:", yourResult);
    console.log("OPP RESULT:", oppResult);

    let resultText = "TIE 🤝";

    if (yourResult.score > oppResult.score) {
      resultText = "YOU WIN 🏆";
    } else if (yourResult.score < oppResult.score) {
      resultText = "YOU LOSE 💀";
    }

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

    const table = document.getElementById("table");

    if (!table) {
      throw new Error("TABLE NOT FOUND - DOM NOT RENDERED");
    }

    table.appendChild(renderPlayer(you, 0));
    table.appendChild(renderPlayer(opp, 3));

    document.getElementById("nextRound").onclick = () => {
      startPoker(app, { agentName, next });
    };

    document.getElementById("exitGame").onclick = () => {
      if (typeof next === "function") next();
    };

  } catch (err) {
    console.error("POKER CRASH:", err);
    app.innerHTML = `<h2 style="color:red;">POKER ERROR</h2><pre>${err.message}</pre>`;
  }
}
  /* =========================
     RENDER UI
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

  if (table) {
    table.appendChild(renderPlayer(you, 0));
    table.appendChild(renderPlayer(opp, 3));
  }

  /* =========================
     BUTTONS
  ========================= */
  document.getElementById("nextRound").onclick = () => {
    startPoker(app, { agentName, next });
  };

  document.getElementById("exitGame").onclick = () => {
    if (typeof next === "function") {
      next();
    } else {
      app.innerHTML = "<h2>Mission Paused</h2>";
    }
  };
}
