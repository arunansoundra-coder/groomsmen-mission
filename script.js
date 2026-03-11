// script.js

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

// Countdown to poker showdown
function updateCountdown() {
  const now = new Date();
  const showdown = new Date('2026-09-18T12:00:00'); // September 18, 2026, 12:00 PM
  const diff = showdown - now;
  if (diff < 0) {
    document.getElementById('countdown').innerText = "Mission time reached!";
    return;
  }
  const hours = Math.floor(diff / (1000*60*60));
  const minutes = Math.floor((diff % (1000*60*60)) / (1000*60));
  const seconds = Math.floor((diff % (1000*60)) / 1000);
  const countdown = document.getElementById('countdown');
  if(countdown) countdown.innerText = `Time until high-stakes poker: ${hours}h ${minutes}m ${seconds}s`;
}

setInterval(updateCountdown, 1000);
