"use strict";

const contact_name = document.getElementById(
  "contact-name"
) as HTMLInputElement;
const contact_email = document.getElementById(
  "contact-email"
) as HTMLInputElement;
const contact_phone = document.getElementById(
  "contact-phone"
) as HTMLInputElement;
const submitBtn = document.getElementById("submit-btn");
const contact_message = document.getElementById(
  "contact-message"
) as HTMLInputElement;
const mailformat =
  /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

function validateInput(x: HTMLInputElement) {
  if (x.value === "") {
    x.classList.add("error");
  } else {
    x.classList.remove("error");
  }
}

function validatePassword(x: HTMLInputElement) {
  if (x.value.length < 6) {
    x.classList.add("error");
  } else {
    x.classList.remove("error");
  }
}

function validateEmail(x: HTMLInputElement) {
  if (!x.value.match(mailformat)) {
    x.classList.add("error");
  } else {
    x.classList.remove("error");
  }
}
