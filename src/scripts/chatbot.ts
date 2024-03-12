const sendChatBtn = document.querySelector(
  ".chat-input span"
) as HTMLElement | null;
const chatInput = document.querySelector(
  ".chat-input textarea"
) as HTMLTextAreaElement | null;
const chatBox = document.querySelector(".chatbox") as HTMLElement | null;
const chatBotToggler = document.querySelector(
  ".chatbot-toggler"
) as HTMLElement | null;

let userMessage: string;
const API_KEY = "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";

const createChatLi = (message: string, className: string): HTMLLIElement => {
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", className);
  let chatContent =
    className === "outgoing"
      ? `<p></p>`
      : `<span class=""> <i class="fa fa-bug"></i></span> <p></p>`;
  chatLi.innerHTML = chatContent;
  chatLi.querySelector("p")!.textContent = message;
  return chatLi;
};

const generateResponse = (incomingChatLi: HTMLLIElement): void => {
  const API_URL = "https://api.openai.com/v1/chat/completions";
  const messageElement = incomingChatLi.querySelector("p")!;

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
      messageElement.textContent = data.choices[0].message.content;
    })
    .catch((error) => {
      console.log(error);
      messageElement.textContent =
        "Oops something Went Wrong Please try again Later!!";
    })
    .finally(() => {
      chatBox!.scrollTo(0, chatBox!.scrollHeight);
    });
};

const handleChat = (): void => {
  userMessage = chatInput!.value.trim();
  if (!userMessage) return;
  chatInput!.value = "";

  // gotta  append user's message to the chatbox
  chatBox!.appendChild(createChatLi(userMessage, "outgoing"));
  createChatLi(userMessage, "outgoing");
  chatBox!.scrollTo(0, chatBox!.scrollHeight);
  setTimeout(() => {
    const incomingChatLi = createChatLi("Wait...", "incoming");
    chatBox!.appendChild(incomingChatLi);
    generateResponse(incomingChatLi);
    chatBox!.scrollTo(0, chatBox!.scrollHeight);
  }, 600);
};

chatBotToggler!.addEventListener("click", () => {
  document.body.classList.toggle("show-chatbot");
});
sendChatBtn!.addEventListener("click", handleChat);
