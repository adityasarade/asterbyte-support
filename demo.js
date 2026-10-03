// Local-only examples: no network requests, user input, analytics or AI calls.
const examples = {
  catchup: {
    prompt: "@AsterByte catch me up",
    intro: "Quick catch-up, coming through. ✦",
    points: ["Decided: game night is Friday.", "Next up: pick a game.", "Still open: what time works for everyone?"]
  },
  reminder: {
    prompt: "@AsterByte remind me in 2h to pick a game",
    intro: "A little nudge for future-you. 🤖",
    points: ["Reminder: pick a game.", "Due: in two hours.", "Say ‘show my reminders’ to review or cancel it. Reminders can be delayed while the host is offline."]
  },
  poll: {
    prompt: "@AsterByte poll: Friday game? | Chess | Minecraft",
    intro: "Let the crew pick. ✦",
    points: ["A. Chess · B. Minecraft", "One vote each, changeable. Voter identities aren't shown in results.", "Expires after ten minutes or bot restart. Exact local polls don't use AI quota."]
  }
};
const buttons = document.querySelectorAll("[data-demo]");
const prompt = document.querySelector("#demo-prompt");
const response = document.querySelector("#demo-response");
for (const button of buttons) {
  button.addEventListener("click", () => {
    const example = examples[button.dataset.demo];
    if (!example || !prompt || !response) return;
    for (const item of buttons) item.setAttribute("aria-pressed", String(item === button));
    const code = document.createElement("code");
    code.textContent = example.prompt;
    prompt.replaceChildren(code);
    const intro = document.createElement("p");
    intro.textContent = example.intro;
    const list = document.createElement("ul");
    for (const point of example.points) {
      const item = document.createElement("li");
      item.textContent = point;
      list.append(item);
    }
    response.replaceChildren(intro, list);
  });
}
