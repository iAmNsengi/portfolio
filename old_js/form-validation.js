let contact_form = document.getElementById("contact-form");
let contact_name = document.getElementById("contact-name");
let contact_email = document.getElementById("contact-email");
let contact_phone = document.getElementById("contact-phone");
let contact_message = document.getElementById("contact-message");
var mailformat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
let containsError = true;

function validateInput(x) {
  if (x.value == "") {
    x.classList.add("error");
    containsError = true;
  }
  if (x.value != "") {
    x.classList.remove("error");
    containsError = false;
  }
}
function validateEmail(x) {
  if (!x.value.match(mailformat)) {
    x.classList.add("error");
    containsError = true;
  } else {
    x.classList.remove("error");
    containsError = false;
  }
}

contact_form.addEventListener("submit", (e) => {
  e.preventDefault();
  let name = contact_name.value;
  let email = contact_email.value;
  let phone = contact_phone.value;
  let message = contact_message.value;
  console.log(containsError);

  if (name == "") {
    contact_name.classList.add("error");
    containsError = true;
  }
  if (email == "") {
    contact_email.classList.add("error");
    containsError = true;
  }
  if (phone == "") {
    contact_phone.classList.add("error");
    containsError = true;
  }
  if (message == "") {
    contact_message.classList.add("error");
    containsError = true;
  }
  if (containsError == false) {
    all_messages = JSON.parse(localStorage.getItem("arr-messages"));
    let newObject = [
      {
        name: name,
        email: email,
        phone: phone,
        message: message,
      },
    ];

    var dataArray = [];
    if (all_messages) {
      dataArray = all_messages;
    }
    dataArray.push(newObject);
    localStorage.setItem("arr-messages", JSON.stringify(dataArray));
    alert("done");
    contact_form.reset();
  }
});
