const socket = io("http://localhost:8000");

const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageInp");
const messageContainer = document.querySelector(".container");
const user = document.getElementById("user");
var audio = new Audio("notification.mp3");

const appendUserInfo = (message) => {
  const messageElement = document.createElement("p");
  messageElement.innerText = message;
  messageElement.classList.add("userInfo");
  user.append(messageElement);
};
const appendAlert = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("message");
  messageElement.classList.add("notification");
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
  audio.play();
};
const appendMessage = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("message");
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
  if (position == "left") {
    audio.play();
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  appendMessage(`You: ${message}`, "right");
  socket.emit("send", message);
  messageInput.value = "";
});

const name = prompt("Enter your name to join chat :");
socket.emit("new-user-joined", name); // passing new user name to server
appendUserInfo(name); // for intro user section where we print the user name att thatt user page

socket.on("user-joined", (name) => {
  appendAlert(`${name} joined the chat`, "right");
});

socket.on("receive", (data) => {
  appendMessage(`${data.name}: ${data.message}`, "left");
});

socket.on("left", (name) => {
  appendAlert(`${name} left the chat`, "right");
});
