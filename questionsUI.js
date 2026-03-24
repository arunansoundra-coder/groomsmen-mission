import { questions } from "./questions.js";

export function startQuestions(app, onComplete){

  let index = 0;
  let score = 0;

  function render(){

    const q = questions[index];

    if (!q){
      app.innerHTML = `
        <div class="question-screen">
          <h2>Welcome Agent</h2>
          <p>Identity and Security Clearance Confirmed</p>
        </div>
      `;

      setTimeout(() => onComplete(), 1500);
      return;
    }

    // TEXT INPUT QUESTION
    if (q.type === "text"){
      app.innerHTML = `
        <div class="question-screen">
          <div class="level">${q.stage} - Level ${q.level}</div>
          <div class="question-text">${q.q}</div>
          <input id="textAnswer" placeholder="Type answer..." />
          <button id="submitBtn">Submit</button>
        </div>
      `;

      document.getElementById("submitBtn").onclick = () => {
        const val = document.getElementById("textAnswer").value.toLowerCase();

        if (val.includes(q.answer)){
          next();
        } else {
          alert("Access Denied");
        }
      };

      return;
    }

    // MULTIPLE CHOICE
    app.innerHTML = `
      <div class="question-screen">
        <div class="level">${q.stage} - Level ${q.level}</div>
        <div class="question-text">${q.q}</div>
        ${q.options.map(o => `<button class="option-btn">${o}</button>`).join("")}
      </div>
    `;

    document.querySelectorAll(".option-btn").forEach(btn=>{
      btn.onclick = () => {
        if (btn.innerText === q.answer){
          next();
        } else {
          btn.style.background = "red";
        }
      };
    });
  }

  function next(){
    index++;
    render();
  }

  render();
}
