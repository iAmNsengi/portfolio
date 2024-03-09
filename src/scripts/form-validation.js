"use strict";
let contact_form = document.getElementById("contact-form");
let contact_name = document.getElementById("contact-name");
let contact_email = document.getElementById("contact-email");
let contact_phone = document.getElementById("contact-phone");
let submitBtn = document.getElementById("submit-btn");
let contact_message = document.getElementById("contact-message");
let mailformat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

function validateInput(x) {
  if (x.value == "") {
    x.classList.add("error");
  }
  if (x.value != "") {
    x.classList.remove("error");
  }
}

function validatePassword(x) {
  if (x.value.length < 6) {
    x.classList.add("error");
  }
  if (x.value.length >= 6) {
    x.classList.remove("error");
  }
}

function validateEmail(x) {
  if (!x.value.match(mailformat)) {
    x.classList.add("error");
  } else {
    x.classList.remove("error");
  }
}
