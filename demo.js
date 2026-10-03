// Local-only illustrations. No analytics, network calls or live AI.
const examples = {
  catchup: { prompt: "@Sparuko catch me up", intro: "Quick catch-up, coming through. ✦", points: ["Decided: game night is Friday.", "Next up: pick a game.", "Still open: what time works for everyone?"] },
  reminder: { prompt: "@Sparuko remind me in 2h to pick a game", intro: "A nudge for future-you.", points: ["Reminder: pick a game.", "Due: in two hours.", "Say ‘show my reminders’ to review or cancel. Reminders can be delayed while the host is offline."] },
  poll: { prompt: "@Sparuko poll: Friday game? | Chess | Minecraft", intro: "Let the crew pick. ✦", points: ["A. Chess · B. Minecraft", "One vote each, changeable. Results hide voter identities.", "Expires after ten minutes or bot restart. Exact local polls don't use AI quota."] },
  workflow: { prompt: "@Sparuko save workflow triage: Group this report into bugs, impact, and next steps.", intro: "Save the structure. Reuse the thinking.", points: ["Personal workflow: triage.", "Next, say ‘run triage with login fails after signup’.", "Saving is local; running it uses your selected AI account and quota. Channel inputs require readable history."] },
  action: { prompt: "@Sparuko create a channel called roadmap", intro: "A proposal first—not an unchecked change.", points: ["Proposed action: create a text channel named roadmap.", "Requires your Manage Channels permission and the bot's matching access.", "Only you can confirm. Permissions are checked again before execution; the proposal expires after five minutes."] }
};
const buttons = document.querySelectorAll("[data-demo]");
const prompt = document.querySelector("#demo-prompt");
const response = document.querySelector("#demo-response");
const status = document.querySelector("#copy-status");
let selected = examples.catchup;
for (const button of buttons) {
  button.addEventListener("click", () => {
    const example = examples[button.dataset.demo];
    if (!example || !prompt || !response) return;
    selected = example;
    if (status) status.textContent = "";
    for (const item of buttons) item.setAttribute("aria-pressed", String(item === button));
    const code = document.createElement("code"); code.textContent = example.prompt; prompt.replaceChildren(code);
    const intro = document.createElement("p"); intro.textContent = example.intro;
    const list = document.createElement("ul");
    for (const point of example.points) { const item = document.createElement("li"); item.textContent = point; list.append(item); }
    response.replaceChildren(intro, list);
  });
}
document.querySelector("#copy-prompt")?.addEventListener("click", async () => {
  if (!status) return;
  // Capture the active example so switching tabs during a clipboard prompt is unambiguous.
  const value = selected.prompt;
  try { await navigator.clipboard.writeText(value); status.textContent = "Copied. Select the real bot mention in Discord."; }
  catch { status.textContent = "Clipboard unavailable. Select and copy the prompt above."; }
});
