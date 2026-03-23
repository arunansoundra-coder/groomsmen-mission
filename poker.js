const suits = ["♠","♥","♦","♣"];
const values = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"];

export function createDeck(){
  let d=[];
  suits.forEach(s=>values.forEach(v=>d.push(v+s)));
  return shuffle(d);
}

function shuffle(a){
  for(let i=a.length-1;i>0;i--){
    let j=Math.floor(Math.random()*(i+1));
    [a[i],a[j]]=[a[j],a[i]];
  }
  return a;
}

function val(c){ return values.indexOf(c.slice(0,-1)); }

function combinations(arr,k){
  let res=[];
  (function comb(start,combo){
    if(combo.length===k){res.push(combo);return;}
    for(let i=start;i<arr.length;i++){
      comb(i+1,[...combo,arr[i]]);
    }
  })(0,[]);
  return res;
}

function eval5(cards){
  let v=cards.map(val).sort((a,b)=>a-b);
  let s=cards.map(c=>c.slice(-1));

  let flush = s.every(x=>x===s[0]);
  let straight = v.every((x,i)=>i===0 || x===v[i-1]+1);

  let counts={};
  v.forEach(x=>counts[x]=(counts[x]||0)+1);
  let freq=Object.values(counts).sort((a,b)=>b-a);

  if(straight && flush) return 9;
  if(freq[0]===4) return 8;
  if(freq[0]===3 && freq[1]===2) return 7;
  if(flush) return 6;
  if(straight) return 5;
  if(freq[0]===3) return 4;
  if(freq[0]===2 && freq[1]===2) return 3;
  if(freq[0]===2) return 2;
  return 1;
}

export function eval7(cards){
  let best=0;
  combinations(cards,5).forEach(c=>{
    best=Math.max(best,eval5(c));
  });

  const names={
    9:"Straight Flush",8:"Four of a Kind",7:"Full House",
    6:"Flush",5:"Straight",4:"Three of a Kind",
    3:"Two Pair",2:"Pair",1:"High Card"
  };

  return {score:best,name:names[best]};
}
