const contactForm = document.getElementById("contact-me");
const error_msg = document.querySelector(".error-msg");
const error_box = document.querySelector(".error-box");
var inputs = document.querySelectorAll("input");
var textarea = document.querySelectorAll("textarea");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = Object.fromEntries(new FormData(e.target).entries());
  console.log(formData);
  try {
    const response = await fetch(
      "https://nsengi.onrender.com/api/v1/messages",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender_name: formData.contact_name,
          sender_email: formData.contact_email,
          sender_phone: formData.contact_phone,
          message_content: formData.contact_message,
        }),
      }
    );
    console.log(response);
    if (response.status == 400) {
      error_box.style.display = "block";
      error_msg.innerText = "Make Sure You Provided Correct Information!";
      console.log(response);
    } else if (response.status == 201) {
      alert("Message Sent Successfully!");
      inputs.forEach((input) => (input.value = ""));
      textarea.forEach((input) => (input.value = ""));
    }
  } catch (error) {
    console.error("error", error);
    error_box.style.display = "block";
    error_msg.innerText = "An Internal Server Occured, Try Again Later";
  }
});
