const chatMessages = document.getElementById("chatMessages");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

sendBtn.addEventListener("click", sendMessage);

function sendMessage() {

    const message = messageInput.value.trim();

    if (!message) return;

    addMessage("user", message);

    messageInput.value = "";
    messageInput.style.height = "auto";

    /* call backend API */

    sendToBackend(message);

}

/* display message */

function addMessage(sender, content) {

    const messageDiv = document.createElement("div");

    messageDiv.className = `message ${sender}`;

    messageDiv.innerHTML =
        `<div class="message-bubble">${content}</div>`;

    chatMessages.appendChild(messageDiv);

    chatMessages.scrollTop = chatMessages.scrollHeight;

}

/* enter key */

messageInput.addEventListener("keydown", function (e) {

    if (e.key === "Enter" && !e.shiftKey) {

        e.preventDefault();
        sendMessage();

    }

});

/* textarea resize */

messageInput.addEventListener("input", function () {

    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";

});
