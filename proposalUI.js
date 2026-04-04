export function startProposal(app, { next }) {
  app.innerHTML = `
    <div class="screen">
      <h2>FINAL QUESTION</h2>
      <p>Will you stand as my groomsman?</p>
      <button id="yesBtn">YES</button>
    </div>
  `;

  document.getElementById("yesBtn").onclick = next;
}
