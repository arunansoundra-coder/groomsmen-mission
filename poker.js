export function createDeck(){
  const suits = ["♠","♥","♦","♣"];
  const values = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"];

  let deck = [];
  suits.forEach(s=>{
    values.forEach(v=>{
      deck.push(v + s);
    });
  });

  return shuffle(deck);
}

function shuffle(a){
  for(let i=a.length-1;i>0;i--){
    let j = Math.floor(Math.random()*(i+1));
    [a[i],a[j]] = [a[j],a[i]];
  }
  return a;
}

// (Move ALL eval logic here unchanged)
export function eval7(cards){ /* keep your existing logic */ }
