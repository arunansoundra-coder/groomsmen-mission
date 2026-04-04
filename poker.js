const suits = ["♠","♥","♦","♣"];
const values = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"];

/* ---------------- DECK ---------------- */
export function createDeck(){
  let deck = [];
  suits.forEach(s => {
    values.forEach(v => deck.push(v + s));
  });
  return shuffle(deck);
}

function shuffle(arr){
  for(let i = arr.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/* ---------------- HELPERS ---------------- */
function getValue(card){
  if (!card) return -1;
  const value = card.replace(/[♠♥♦♣]/g, "").trim();
  const index = values.indexOf(value);
  return index === -1 ? -1 : index;
}

function getSuit(card){
  if (!card) return null;
  return card.replace(/[2-9JQKA10]/g, "").trim();
}

/* ---------------- COMBINATIONS ---------------- */
function combinations(arr, k){
  const result = [];

  (function combine(start, combo){
    if (combo.length === k){
      result.push(combo);
      return;
    }

    for(let i = start; i < arr.length; i++){
      combine(i + 1, [...combo, arr[i]]);
    }
  })(0, []);

  return result;
}

/* ---------------- STRAIGHT CHECK ---------------- */
function isStraight(vals){
  const unique = [...new Set(vals)].sort((a,b)=>a-b);

  if (unique.length < 5) return false;

  for (let i = 0; i <= unique.length - 5; i++){
    let ok = true;

    for (let j = 1; j < 5; j++){
      if (unique[i + j] !== unique[i] + j){
        ok = false;
        break;
      }
    }

    if (ok) return true;
  }

  // A-2-3-4-5
  const wheel = [0,1,2,3,12];
  return wheel.every(v => unique.includes(v));
}

/* ---------------- 5 CARD EVAL ---------------- */
function eval5(cards){
  const vals = cards.map(getValue).filter(v => v !== -1).sort((a,b)=>a-b);
  const suitsArr = cards.map(getSuit).filter(Boolean);

  if (vals.length < 5) return 0;

  const isFlush = suitsArr.every(s => s === suitsArr[0]);
  const straight = isStraight(vals);

  const counts = {};
  vals.forEach(v => counts[v] = (counts[v] || 0) + 1);

  const freq = Object.values(counts).sort((a,b)=>b-a);

  if (straight && isFlush) return 9;
  if (freq[0] === 4) return 8;
  if (freq[0] === 3 && freq[1] === 2) return 7;
  if (isFlush) return 6;
  if (straight) return 5;
  if (freq[0] === 3) return 4;
  if (freq[0] === 2 && freq[1] === 2) return 3;
  if (freq[0] === 2) return 2;

  return 1;
}

/* ---------------- 7 CARD EVAL (SAFE) ---------------- */
export function eval7(cards){

  try {
    if (!Array.isArray(cards) || cards.length < 5){
      return { score: 0, name: "Invalid Hand" };
    }

    if (cards.some(c => !c)){
      return { score: 0, name: "Invalid Hand" };
    }

    let best = 0;

    combinations(cards, 5).forEach(combo => {
      const score = eval5(combo);
      if (score > best) best = score;
    });

    const names = {
      9: "Straight Flush",
      8: "Four of a Kind",
      7: "Full House",
      6: "Flush",
      5: "Straight",
      4: "Three of a Kind",
      3: "Two Pair",
      2: "Pair",
      1: "High Card",
      0: "Invalid Hand"
    };

    return {
      score: best,
      name: names[best] || "Invalid"
    };

  } catch (err) {
    console.error("eval7 crashed:", err);
    return { score: 0, name: "ERROR" };
  }
}
