// Secret codename for the Best Man
const BEST_MAN_CODENAME = "brooke"; // change to actual codename

const answers = {
  1: "royal flush",
  2: "194",
  3: "piano"
};

let agentName = "";

// Start authentication after agent name
function startAuthentication() {
  const inputName = document.getElementById("agentName").value.trim().toLowerCase();
  const nameResult = document.getElementById("nameResult");

  if(inputName === ""){
    nameResult.textContent = "❌ Please enter your codename!";
    nameResult.style.color = "red";
    return;
  }

  if(inputName !== BEST_MAN_CODENAME){
    nameResult.textContent = "🚫 Access Denied. You are not authorized!";
    nameResult.style.color = "red";
    return;
  }

  agentName = inputName;

  // Hide name input, show first puzzle
  document.getElementById("agentNameScreen").classList.add("hidden");
  document.getElementById("puzzle1").classList.remove("hidden");
}

// Check answer for each puzzle
function checkAnswer(puzzleNumber){
  const input = document.getElementById(`answer${puzzleNumber}`).value.trim().toLowerCase();
  const resultEl = document.getElementById(`result${puzzleNumber}`);

  if(input === answers[puzzleNumber]){
    resultEl.textContent = "✅ Verified!";
    resultEl.style.color = "gold";

    // Show next authentication puzzle
    const nextPuzzle = document.getElementById(`puzzle${puzzleNumber + 1}`);
    if(nextPuzzle){
      nextPuzzle.classList.remove("hidden");
    } else {
      // All puzzles complete
      showWelcomeMessage();
    }

  } else {
    resultEl.textContent = "❌ Invalid code. Try again!";
    resultEl.style.color = "red";
  }
}

// Show welcome message and followup
function showWelcomeMessage(){
  const championEl = document.getElementById("champion");
  championEl.textContent = `🎉 Welcome Agent ${agentName.toUpperCase()}! You are officially the Best Man! 🥳`;
  championEl.classList.remove("hidden");

  // Show further instructions and countdown
  setTimeout(() => {
    document.getElementById("followup").classList.remove("hidden");
    startCountdown();
  }, 1500);
}

// Countdown to September 18, 2026 at noon
function startCountdown(){
  const targetDate = new Date("September 18, 2026 12:00:00").getTime();
  const countdownEl = document.getElementById("countdown");

  const interval = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if(distance < 0){
      clearInterval(interval);
      countdownEl.textContent = "⏰ The poker game is happening now!";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownEl.textContent = `⏳ Time until poker showdown: ${days}d ${hours}h ${minutes}m ${seconds}s`;
  }, 1000);
}
