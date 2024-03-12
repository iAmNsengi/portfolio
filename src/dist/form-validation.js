"use strict";
const contact_name = document.getElementById("contact-name");
const contact_email = document.getElementById("contact-email");
const contact_phone = document.getElementById("contact-phone");
const submitBtn = document.getElementById("submit-btn");
const contact_message = document.getElementById("contact-message");
const mailformat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
function validateInput(x) {
    if (x.value === "") {
        x.classList.add("error");
    }
    else {
        x.classList.remove("error");
    }
}
function validatePassword(x) {
    if (x.value.length < 6) {
        x.classList.add("error");
    }
    else {
        x.classList.remove("error");
    }
}
function validateEmail(x) {
    if (!x.value.match(mailformat)) {
        x.classList.add("error");
    }
    else {
        x.classList.remove("error");
    }
}
