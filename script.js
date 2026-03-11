function startMission() {
  document.getElementById('intro').style.display = 'none';
  document.getElementById('terminal').style.display = 'block';
}

function checkPuzzle() {
  const answer = document.getElementById('answer').value.trim().toLowerCase();
  const result = document.getElementById('result');
  if (answer === 'royal flush' || answer === 'royal flush in spades') {
    result.innerText = 'Correct! Mission Puzzle Complete.';
  } else {
    result.innerText = 'Incorrect. Try again.';
  }
}

function acceptMission(agent) {
  alert(agent + ' has accepted the high-stakes poker mission! Good luck!');
}

// Simple countdown for poker showdown at 12:00 PM
function updateCountdown() {
  const now = new Date();
  const nextNoon = new Date();
  nextNoon.setHours(12,0,0,0);
  if (now > nextNoon) nextNoon.setDate(now.getDate() + 1);
  const diff = nextNoon - now;
  const hours = Math.floor(diff / (1000*60*60));
  const minutes = Math.floor((diff % (1000*60*60)) / (1000*60));
  const seconds = Math.floor((diff % (1000*60)) / 1000);
  const countdown = document.getElementById('countdown');
  if(countdown) countdown.innerText = `Time until poker showdown: ${hours}h ${minutes}m ${seconds}s`;
}

setInterval(updateCountdown, 1000);
