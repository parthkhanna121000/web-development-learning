const title = document.querySelector("#title");
const message = document.querySelector("#message");
const button = document.querySelector("#changeButton");

button.addEventListener("click", function () {
  title.textContent = "Hello, Parth!";
  message.textContent = "You just changed the DOM!";
});
