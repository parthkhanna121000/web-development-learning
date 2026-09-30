const title = document.querySelector("#title");
const message = document.querySelector("#message");
const button = document.querySelector("#chaosBtn");
const count = document.querySelector("#count");
const chaosContainer = document.querySelector("#chaosContainer");

let mistakes = 0;

const emojis = ["👁️", "💀", "👾", "🔥", "🤡", "😈", "🗿"];

function randomColor() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  return `rgb(${red}, ${green}, ${blue})`;
}

function createEmoji() {
  const emoji = document.createElement("div");

  emoji.classList.add("emoji");

  const randomIndex = Math.floor(Math.random() * emojis.length);

  emoji.textContent = emojis[randomIndex];

  emoji.style.left = Math.random() * 90 + "%";
  emoji.style.top = Math.random() * 90 + "%";

  chaosContainer.appendChild(emoji);
}

button.addEventListener("click", () => {
  mistakes++;

  count.textContent = mistakes;

  document.body.style.backgroundColor = randomColor();

  createEmoji();

  if (mistakes === 1) {
    title.textContent = "⚠️ SYSTEM UNSTABLE";
    message.textContent = "Why did you click that?";
  }

  if (mistakes === 3) {
    title.textContent = "😈 SYSTEM COMPROMISED";
    message.textContent = "I told you not to click.";
  }

  if (mistakes >= 5) {
    title.textContent = "💀 YOU BROKE THE INTERNET";
    message.textContent = "There is no going back now.";
  }

  if (mistakes >= 8) {
    button.textContent = "CLICK ME AGAIN 😈";
  }
});
