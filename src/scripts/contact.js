const contactForm = document.getElementById("contact-me");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(contactForm);
  console.log(formData);
  //   try {
  //     const response = await fetch(
  //       "https://nsengi.onrender.com/api/v1/messages",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         // body: JSON.stringify({
  //         //   sender_name: string,
  //         //   sender_email: string,
  //         //   sender_phone: string,
  //         //   message_content: string,
  //         // }),
  //       }
  //     );

  //     console.log(response);
  //     if (response.status == 400) {
  //       error_box.style.display = "block";
  //       error_msg.innerText = "Make Sure You Provided Correct Information!";
  //       console.log(response);
  //     } else if (response.status == 201) {
  //       alert("Message Sent Successfully!");
  //       contactForm.reset();
  //     }
  //   } catch (error) {
  //     console.error("error", error);
  //     error_box.style.display = "block";
  //     error_msg.innerText = "An Internal Server Occured, Try Again Later";
  //   }
});
