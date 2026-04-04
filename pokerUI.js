import { createDeck } from "./poker.js";

export function startPoker(app) {
  const deck = createDeck();

  const playerCard = deck.pop();
  const opponentCard = deck.pop();

  app.innerHTML = `
    <div class="screen">
      <h2>HIGH STAKES POKER</h2>

      <p>You: ${playerCard}</p>
      <p>Opponent: ${opponentCard}</p>

      <button id="restartBtn">Play Again</button>
    </div>
  `;

  document.getElementById("restartBtn").onclick = () => {
    location.reload();
  };
}
