// FAQ answer bank
const faqs = {
  "what are your hours?": "We're open Monday–Friday, 9am to 6pm.",
  "how do i contact support?": "You can email us at support@example.com or call 1-800-000-0000.",
  "where are you located?": "We're based in Colombo, Sri Lanka."
};

function appendMessage(sender, text) {
  const chatWindow = document.getElementById("chatWindow");
  const msg = document.createElement("div");
  msg.className = "mb-2";
  msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatWindow.appendChild(msg);
  chatWindow.scrollTop = chatWindow.scrollHeight; // auto-scroll
}

function getBotReply(input) {
  const key = input.toLowerCase().trim();
  return faqs[key] || "Sorry, I don't have an answer for that. Please contact support.";
}

function handleSend() {
  const input = document.getElementById("userInput");
  const text = input.value.trim();
  if (!text) return;

  appendMessage("You", text);
  const reply = getBotReply(text);
  setTimeout(() => appendMessage("Bot", reply), 400); // slight delay feels natural
  input.value = "";
}

// Send button click
document.getElementById("sendBtn").addEventListener("click", handleSend);

// Enter key to send
document.getElementById("userInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleSend();
});

// FAQ buttons auto-fill and send
document.querySelectorAll(".faq-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.getElementById("userInput").value = btn.textContent.trim();
    handleSend();
  });
});