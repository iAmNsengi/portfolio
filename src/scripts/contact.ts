const myForm = document.getElementById("contact-me");

myForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(this);
  console.log(formData);
  fetch("https://nsengi.onrender.com/api/v1/messages", {
    method: "POST",
    body: formData,
  }).then((res) => {
    console.log(res.status);
  });
});
