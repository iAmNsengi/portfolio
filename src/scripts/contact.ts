const contactForm = document.getElementById("contact-me") as HTMLFormElement;
const error_msg = document.querySelector(".error-msg") as HTMLElement;
const error_box = document.querySelector(".error-box") as HTMLElement;
const inputs = document.querySelectorAll("input");
const textarea = document.querySelectorAll("textarea");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(contactForm);
  const formDataObject: { [key: string]: string } = {};

  for (const [key, value] of formData.entries()) {
    formDataObject[key] = typeof value === "string" ? value : "";
  }

  console.log(formDataObject);

  try {
    const response = await fetch(
      "https://nsengi.onrender.com/api/v1/messages",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender_name: formDataObject["contact_name"],
          sender_email: formDataObject["contact_email"],
          sender_phone: formDataObject["contact_phone"],
          message_content: formDataObject["contact_message"],
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
