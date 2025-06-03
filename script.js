
let socket;
let nickname = "";

function enterChat() {
  nickname = document.getElementById("nickname").value.trim();
  socket = io();

  socket.emit("set_nickname", nickname);

  socket.on("nickname_confirmed", (name) => {
    nickname = name;
    document.getElementById("login").style.display = "none";
    document.getElementById("chat").style.display = "block";
  });

  socket.on("message", (data) => {
    const msgDiv = document.createElement("div");
    msgDiv.textContent = data.name + ": " + data.msg;
    document.getElementById("messages").appendChild(msgDiv);
  });
}

function sendMessage() {
  const msg = document.getElementById("messageInput").value;
  if (msg.trim()) {
    socket.emit("message", msg);
    document.getElementById("messageInput").value = "";
  }
}
