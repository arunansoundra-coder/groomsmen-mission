import { createDeck, eval7 } from "./poker.js";
import { roles } from "./roles.js";

export function startPoker(app, { state, onComplete }) {
  /* =========================
     INIT GAME
  ========================= */

  const agent = state.agent;
  const role = roles[agent] || "Groomsman";

  let deck = createDeck();
  let playerHand = [];
  let botHand = [];
  let community = [];

  let round = 0;
  let gameOver = false;

  function dealInitial() {
    playerHand = [deck.pop(), deck.pop()];
    botHand = [deck.pop(), deck.pop()];
    community = [];
    round = 0;
  }

  dealInitial();

  /* =========================
     RENDER
  ========================= */

  function render(message = "") {
    app.innerHTML = `
      <div class="poker-table">
        
        <h2>FINAL OPERATION: SHOWDOWN</h2>

        <p class="meta">
          Agent: ${agent} | Role: ${role}
        </p>

        <div class="message">${message}</div>

        <div class="section">
          <h3>Your Hand</h3>
          <div>${formatHand(playerHand)}</div>
        </div>

        <div class="section">
          <h3>Community</h3>
          <div>${formatHand(community)}</div>
        </div>

        <div class="section">
          <h3>Opponent Hand</h3>
          <div>${gameOver ? formatHand(botHand) : "?? ??"}</div>
        </div>

        <div class="actions">
          ${
            gameOver
              ? `<button id="finishBtn">COMPLETE MISSION</button>`
              : `<button id="dealBtn">NEXT DEAL</button>
                 <button id="showdownBtn">SHOWDOWN</button>`
          }
        </div>
      </div>
    `;

    bindEvents();
  }

  /* =========================
     HELPERS
  ========================= */

  function formatHand(hand) {
    return hand.map(c => `<span class="card">${c}</span>`).join(" ");
  }

  function dealCommunity() {
    if (round === 0) {
      community.push(deck.pop(), deck.pop(), deck.pop()); // flop
    } else if (round === 1) {
      community.push(deck.pop()); // turn
    } else if (round === 2) {
      community.push(deck.pop()); // river
    }
    round++;
  }

  function getResult() {
    const playerScore = eval7([...playerHand, ...community]);
    const botScore = eval7([...botHand, ...community]);

    if (playerScore > botScore) return "WIN";
    if (playerScore < botScore) return "LOSE";
    return "DRAW";
  }

  /* =========================
     EVENTS
  ========================= */

  function bindEvents() {
    const dealBtn = document.getElementById("dealBtn");
    const showdownBtn = document.getElementById("showdownBtn");
    const finishBtn = document.getElementById("finishBtn");

    if (dealBtn) {
      dealBtn.onclick = () => {
        dealCommunity();
        render("New intelligence deployed...");
      };
    }

    if (showdownBtn) {
      showdownBtn.onclick = () => {
        gameOver = true;

        const result = getResult();

        let message =
          result === "WIN"
            ? "MISSION SUCCESSFUL"
            : result === "LOSE"
            ? "MISSION FAILED"
            : "STALEMATE DETECTED";

        render(message);

        state.poker.result = result;
        state.poker.inProgress = false;

        onComplete(result);
      };
    }

    if (finishBtn) {
      finishBtn.onclick = () => {
        app.innerHTML = `
          <div class="briefing">
            <h2>MISSION COMPLETE</h2>
            <p>${getFinalMessage(state.poker.result)}</p>
          </div>
        `;

        setTimeout(() => onComplete(state.poker.result), 1200);
      };
    }
  }

  /* =========================
     FINAL MESSAGE
  ========================= */

  function getFinalMessage(result) {
    if (result === "WIN") {
      return "Your loyalty has been confirmed. You are officially part of the inner circle.";
    }
    if (result === "LOSE") {
      return "Even in failure, loyalty is remembered. You are still valued.";
    }
    return "Balance maintained. No outcome changes the mission.";
  }

  /* =========================
     START
  ========================= */

  state.poker.inProgress = true;
  render("Operation initiated...");
}
