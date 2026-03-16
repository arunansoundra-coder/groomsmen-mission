let agentName;
let role;
let puzzleIndex = 0;
let securityIndex = 0;

const puzzles = [
    {
        question: "What poker hand did James Bond win in Montenegro?",
        choices: ["Full House", "Royal Flush", "Straight", "Two Pair"],
        answer: "Royal Flush"
    },
    {
        question: "What is James Bond's favorite drink?",
        choices: ["Martini", "Whiskey", "Gin & Tonic", "Beer"],
        answer: "Martini"
    },
    {
        question: "Name all of Bond's love interests?",
        choices: ["Vesper, Honey, Pussy, Solitaire", "Vesper, Tracy, Moneypenny", "Bond has none", "Tracy, Honey, Miss Moneypenny"],
        answer: "Vesper, Honey, Pussy, Solitaire"
    }
];

const securityQuestions = [
    { question: "What was the name of the horse that Arunan had?", answer: "Maya" },
    { question: "Arunan had a 2023 BMW 330i. What was its name?", answer: "Cloud" },
    { question: "Fill in the blank: Blood makes us related, loyalty makes us family and _____", answer: "family is forever" }
];

function startMission(selectedRole) {
    agentName = document.getElementById("agentName").value.trim();
    if (!agentName) {
        alert("Please enter your agent name!");
        return;
    }
    role = selectedRole;
    document.getElementById("intro").classList.add("hidden");
    showPuzzle();
}

function showPuzzle() {
    if (puzzleIndex >= puzzles.length) {
        document.getElementById("puzzle").classList.add("hidden");
        showSecurity();
        return;
    }
    const puzzleDiv = document.getElementById("puzzle");
    puzzleDiv.classList.remove("hidden");
    const puzzle = puzzles[puzzleIndex];
    puzzleDiv.innerHTML = `<h2>Puzzle Level ${puzzleIndex + 1}</h2>
        <p>${puzzle.question}</p>
        ${puzzle.choices.map(c => `<button onclick="checkPuzzle('${c}')">${c}</button>`).join('<br><br>')}
    `;
}

function checkPuzzle(choice) {
    if (choice === puzzles[puzzleIndex].answer) {
        puzzleIndex++;
        showPuzzle();
    } else {
        alert("Incorrect. Try again!");
    }
}

function showSecurity() {
    if (securityIndex >= securityQuestions.length) {
        document.getElementById("security").classList.add("hidden");
        showWelcome();
        return;
    }
    const sec = securityQuestions[securityIndex];
    const securityDiv = document.getElementById("security");
    securityDiv.classList.remove("hidden");
    if (securityIndex < 2) { // multiple choice
        securityDiv.innerHTML = `<h2>Security Clearance ${securityIndex + 1}</h2>
            <p>${sec.question}</p>
            <input id="secAnswer" placeholder="Answer"><br><br>
            <button onclick="checkSecurity()">Submit</button>
        `;
    } else { // fill in the blank
        securityDiv.innerHTML = `<h2>Security Clearance ${securityIndex + 1}</h2>
            <p>${sec.question}</p>
            <input id="secAnswer" placeholder="Fill in the blank"><br><br>
            <button onclick="checkSecurity()">Submit</button>
        `;
    }
}

function checkSecurity() {
    const answer = document.getElementById("secAnswer").value.trim();
    if (answer.toLowerCase() === securityQuestions[securityIndex].answer.toLowerCase()) {
        securityIndex++;
        showSecurity();
    } else {
        alert("Incorrect. Try again!");
    }
}

function showWelcome() {
    const welcomeDiv = document.getElementById("welcome");
    welcomeDiv.classList.remove("hidden");
    welcomeDiv.innerHTML = `<h2>Welcome Agent ${agentName}</h2>
        <p>You have successfully passed authentication and security clearance.</p>
        <button onclick="showMission()">Proceed to Mission Briefing</button>
    `;
}

function showMission() {
    document.getElementById("welcome").classList.add("hidden");
    const missionDiv = document.getElementById("mission");
    missionDiv.classList.remove("hidden");
    missionDiv.innerHTML = `<h2>Mission: Operation Forever</h2>
        <p>Your task is to assist the groom as the ${role}.</p>
        <p>Are you up for the task?</p>
        <button onclick="missionResponse('Yes, ready for action')">Yes, ready for action</button>
        <button onclick="missionResponse('Pour the whiskey')">Pour the whiskey</button>
        <button onclick="missionResponse('Always on standby')">Always on standby</button>
        <button onclick="missionResponse('Leave it to Bond')">Leave it to Bond</button>
    `;
}

function missionResponse(response) {
    const missionDiv = document.getElementById("mission");
    missionDiv.innerHTML = `<h2>Mission Confirmed</h2>
        <p>Mission will begin at noon on September 18, 2026 with a high-stakes poker game to beat the groom.</p>
        <p>The winner will claim the title: MI6 Poker Champion.</p>
        <div id="countdown" class="countdown-time hidden"></div>
        <p>Await further instructions regarding suits and apparel.</p>
        <p><a href="https://theknot.com/arunanandbrooke" target="_blank" class="rsvp">RSVP for the occasion</a></p>
    `;
    document.getElementById("countdown").classList.remove("hidden");
    startCountdown(new Date("September 18, 2026 12:00:00").getTime());
}

function startCountdown(eventTime) {
    const countdownEl = document.getElementById("countdown");
    const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = eventTime - now;
        if (distance < 0) {
            clearInterval(interval);
            countdownEl.innerHTML = "Mission is underway!";
            return;
        }
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        countdownEl.innerHTML = `Countdown: ${days}d ${hours}h ${minutes}m ${seconds}s`;
    }, 1000);
}
