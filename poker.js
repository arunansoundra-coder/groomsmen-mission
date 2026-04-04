export function createDeck() {
  const suits = ["♠", "♥", "♦", "♣"];
  const values = [
    "2","3","4","5","6","7","8","9","10",
    "J","Q","K","A"
  ];

  let deck = [];

  for (let s of suits) {
    for (let v of values) {
      deck.push(`${v}${s}`);
    }
  }

  return shuffle(deck);
}

/* =========================
   SHUFFLE (FISHER-YATES)
========================= */
function shuffle(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

/* =========================
   SIMPLE POKER SCORING (eval7 replacement)
   - Lightweight for cinematic gameplay
   - Stable + deterministic
========================= */
export function eval7(hand) {
  const values = {
    "2": 2, "3": 3, "4": 4, "5": 5, "6": 6,
    "7": 7, "8": 8, "9": 9, "10": 10,
    "J": 11, "Q": 12, "K": 13, "A": 14
  };

  let score = 0;

  for (let card of hand) {
    const value = card.replace(/♠|♥|♦|♣/g, "");
    score += values[value] || 0;
  }

  return score;
}
