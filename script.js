function startMission(role) {
    const agentName = document.getElementById("agentName").value.trim();
    if (!agentName) {
        alert("Please enter your agent name!");
        return;
    }

    document.getElementById("intro").classList.add("hidden");
    showQuiz(agentName, role);
}

function showQuiz(agentName, role) {
    const quizDiv = document.getElementById("quiz");
    quizDiv.classList.remove("hidden");

    quizDiv.innerHTML = `
        <h2>Welcome, Agent ${agentName}</h2>
        <p>First, answer this security question:</p>
        <p>What is the code word for today's mission?</p>
        <input id="answer" placeholder="Enter code word"><br><br>
        <button onclick="checkAnswer('${role}')">Submit</button>
    `;
}

function checkAnswer(role) {
    const answer = document.getElementById("answer").value.toLowerCase().trim();
    const correct = "shaken"; // example code word
    if (answer === correct) {
        document.getElementById("quiz").classList.add("hidden");
        showSecurity(role);
    } else {
        alert("Incorrect code word. Try again!");
    }
}

function showSecurity(role) {
    const securityDiv = document.getElementById("security");
    securityDiv.classList.remove("hidden");

    securityDiv.innerHTML = `
        <h2>Security Clearance</h2>
        <p>Enter your 3-digit clearance code:</p>
        <input id="clearance" placeholder="000"><br><br>
        <button onclick="checkSecurity('${role}')">Submit</button>
    `;
}

function checkSecurity(role) {
    const code = document.getElementById("clearance").value.trim();
    if (code === "007") {
        document.getElementById("security").classList.add("hidden");
        startMissionPhase(role);
    } else {
        alert("Access Denied!");
    }
}

function startMissionPhase(role) {
    const missionDiv = document.getElementById("mission");
    missionDiv.classList.remove("hidden");
    missionDiv.innerHTML = `
        <h2>Mission Phase</h2>
        <p>Agent ${role} is cleared. Prepare for your poker briefing.</p>
        <button onclick="startPoker()">Proceed to Poker</button>
    `;
}

function startPoker() {
    document.getElementById("mission").classList.add("hidden");
    const pokerDiv = document.getElementById("poker");
    pokerDiv.classList.remove("hidden");
    pokerDiv.innerHTML = `
        <h2>Poker Briefing</h2>
        <p>Shuffle your cards and prepare for the final mission.</p>
        <button onclick="alert('Mission Complete!')">Complete Mission</button>
    `;
}
