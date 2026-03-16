let agent = "";
let qIndex = 0;
let sIndex = 0;

// Role mapping
const roles = {
    "Jason": "Best Man",
    "Gill": "Groomsman",
    "Prathap": "Groomsman",
    "Duran": "Groomsman",
    "Taylor": "Groomsman",
    "Josh": "Groomsman"
};

// Bond Authentication Questions
const questions = [
{
q:"What poker hand did James Bond win with in Montenegro?",
options:["Royal Flush","Straight Flush","Full House","Four of a Kind"],
correct:1
},
{
q:"What is James Bond's favorite drink?",
options:["Martini – shaken, not stirred","Whiskey on the rocks","Scotch neat","Champagne"],
correct:0
},
{
q:"Who are Bond's love interests?",
options:["Vesper Lynd, Madeleine Swann, Tracy Bond","Moneypenny, Judy Dench, Vesper Lynd","Vesper Lynd, Tiffany Case, Domino","Tracy Bond, Honey Ryder, Octopussy"],
correct:0
}
];

// Personal Security Verification
const security = [
{
q:"What was the name of the horse that Arunan had?",
options:["Bella","Storm","Maya","Spirit"],
correct:2
},
{
q:"Arunan had a 2023 BMW 330i. What was its name?",
options:["Ghost","Cloud","Shadow","Nova"],
correct:1
},
{
q:"Complete the phrase:<br><br>Blood makes us related, loyalty makes us family and ____ is forever.",
options:["friendship","family","honor","legacy"],
correct:1
}
];

function startMission(){
    agent = document.getElementById("agentName").value.trim();
    if(agent==="") {
        alert("Enter your agent name to proceed.");
        return;
    }
    document.getElementById("intro").classList.add("hidden");
    showQuestion();
}

function showQuestion(){
    let quiz = document.getElementById("quiz");
    quiz.classList.remove("hidden");
    let q = questions[qIndex];
    quiz.innerHTML = `<div class='question'>
        <h2>Security Clearance Level ${qIndex+1}</h2>
        <p>${q.q}</p>
    </div>`;
    q.options.forEach((opt,i)=>{
        quiz.innerHTML += `<button onclick='answer(${i})'>${opt}</button><br>`;
    });
}

function answer(i){
    if(i===questions[qIndex].correct){
        qIndex++;
        if(qIndex<questions.length){
            showQuestion();
        } else {
            document.getElementById("quiz").classList.add("hidden");
            showSecurity();
        }
    } else {
        alert("Access Denied Agent.");
    }
}

function showSecurity(){
    let sec = document.getElementById("security");
    sec.classList.remove("hidden");
    let s = security[sIndex];
    sec.innerHTML = `<div class='question'>
        <h2>Personal Security Verification</h2>
        <p>${s.q}</p>
    </div>`;
    s.options.forEach((opt,i)=>{
        sec.innerHTML += `<button onclick='secAnswer(${i})'>${opt}</button><br>`;
    });
}

function secAnswer(i){
    if(i===security[sIndex].correct){
        sIndex++;
        if(sIndex<security.length){
            showSecurity();
        } else {
            document.getElementById("security").classList.add("hidden");
            showMission();
        }
    } else {
        alert("Security clearance failed.");
    }
}

function showMission(){
    let m = document.getElementById("mission");
    m.classList.remove("hidden");
    let role = roles[agent] || "Groomsman";
    m.innerHTML = `
    <h2>Welcome Agent ${agent} – ${role}</h2>
    <p>Identity confirmed.</p>
    <h3>MISSION BRIEFING</h3>
    <p>Operation Forever</p>
    <p>You have been selected to assist the groom as a <b>${role}</b>.</p>
    <p>Are you up for the task?</p>
    <button onclick="accept()">Pour the whiskey.</button>
    <button onclick="accept()">For King and country.</button>
    <button onclick="accept()">The name's Bond… let's do it.</button>
    <button onclick="accept()">I never miss a mission.</button>
    `;
}

function accept(){
    let m = document.getElementById("mission");
    m.innerHTML = `
    <h2>Mission Accepted</h2>
    <p>The mission will begin at <b>Noon on September 18, 2026</b>.</p>
    <p>A high‑stakes poker game will determine the MI6 Poker Champion.</p>
    <p>The winner will defeat the groom and claim the title.</p>
    <h3>Countdown to Mission Start</h3>
    <div class="countdown" id="countdown"></div>
    <p>Await further instructions regarding suits and apparel.</p>
    <br>
    <a href="https://theknot.com/arunanandbrooke" target="_blank">RSVP HERE</a>
    `;
    startCountdown();
}

function startCountdown(){
    let target = new Date("Sept 18, 2026 12:00:00").getTime();
    setInterval(()=>{
        let now = new Date().getTime();
        let diff = target - now;
        if(diff<0) diff=0;
        let d = Math.floor(diff/(1000*60*60*24));
        let h = Math.floor((diff%(1000*60*60*24))/(1000*60*60));
        let m = Math.floor((diff%(1000*60*60))/(1000*60));
        let s = Math.floor((diff%(1000*60))/1000);
        document.getElementById("countdown").innerHTML = d+"d "+h+"h "+m+"m "+s+"s";
    },1000);
}
