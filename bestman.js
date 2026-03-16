let agentName = "Best Man";

// Start the mission sequence
function startMission() {
    const intro = document.getElementById("intro");
    const terminal = document.getElementById("terminal");

    if (!intro || !terminal) return;

    intro.style.display = "none";
    terminal.innerHTML = "";

    const lines = [
        "Initializing MI6 secure channel...",
        "Scanning agent registry...",
        "Identity requires multi-factor authentication...",
        "3 verification challenges detected..."
    ];

    let index = 0;

    function showNextLine() {
        if (index < lines.length) {
            terminal.innerHTML += lines[index] + "<br>";
            index++;
            setTimeout(showNextLine, 800);
        } else {
            showPuzzle(1);
        }
    }

    showNextLine();
}

// Generic function to show a puzzle by number
function showPuzzle(num) {
    const puzzle = document.getElementById(`puzzle${num}`);
    if (puzzle) puzzle.style.display = "block";
}

// Generic function to check puzzle answers
function checkPuzzle(num, answer = null) {
    const result = document.getElementById(`p${num}result`);
    if (!result) return;

    let correct = false;

    switch (num) {
        case 1:
            // Puzzle 1: text answer
            if (answer && answer.trim().toLowerCase() === "correct") {
                correct = true;
            }
            break;
        case 2:
            // Puzzle 2: math answer
            const val = document.getElementById("mathAnswer")?.value;
            if (parseInt(val) === 7) correct = true;
            break;
        case 3:
            // Puzzle 3: final verification (drag/drop or button)
            correct = true; // Assume verified by user action
            break;
    }

    if (correct) {
        result.innerHTML = `Authentication ${num} Passed`;
        if (num < 3) showPuzzle(num + 1);
        else verifyAgent();
    } else {
        result.innerHTML = "Access Denied";
    }
}

// Final agent verification
function verifyAgent() {
    const verified = document.getElementById("verified");
    const welcome = document.getElementById("welcomeAgent");

    if (verified) verified.style.display = "block";
    if (welcome) welcome.innerHTML = `Welcome Agent ${agentName}`;
}
