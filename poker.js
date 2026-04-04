export function createDeck() {
  const suits = ["♠", "♥", "♦", "♣"];
  const values = ["A","K","Q","J","10","9","8","7","6","5","4","3","2"];

  const deck = [];

  for (let s of suits) {
    for (let v of values) {
      deck.push(v + s);
    }
  }

  return deck.sort(() => Math.random() - 0.5);
}
