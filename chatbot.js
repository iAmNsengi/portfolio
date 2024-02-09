const sendChatBtn = document.querySelector(".chat-input span");
const chatInput = document.querySelector(".chat-input textarea");
const chatBox = document.querySelector(".chatbox");

let userMessage;
const API_KEY = "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";

const createChatLi = (message, className) => {
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", className);
  let chatContent =
    className === "outgoing"
      ? `<p>${message}</p>`
      : `<span class=""> <i class="fa fa-bug"></i></span> <p>${message}</p>`;
  chatLi.innerHTML = chatContent;
  return chatLi;
};
const generateResponse = (incomingChatLi) => {
  const API_URL = "https://api.openai.com/v1/chat/completions";
  const messageElement = incomingChatLi.querySelector("p");

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo-0125",
      messages: [{ role: "user", content: userMessage }],
    }),
  };
  fetch(API_URL, requestOptions)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      messageElement.textContent = data.choices[0].message.content;
    })
    .catch((error) => {
      messageElement.textContent =
        "Opps something Went Wrong Please try again Later!!";
    });
};

const handleChat = () => {
  userMessage = chatInput.value.trim();
  if (!userMessage) return;
  console.log(userMessage);

  // gotta  append user's message to the chatbox
  chatBox.appendChild(createChatLi(userMessage, "outgoing"));
  createChatLi(userMessage, "outgoing");
  setTimeout(() => {
    const incomingChatLi = createChatLi("Thinking...", "incoming");
    chatBox.appendChild(incomingChatLi);
    generateResponse(incomingChatLi);
  }, 600);
};

sendChatBtn.addEventListener("click", handleChat);
