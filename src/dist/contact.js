"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const contactForm = document.getElementById("contact-me");
const error_msg = document.querySelector(".error-msg");
const error_box = document.querySelector(".error-box");
const inputs = document.querySelectorAll("input");
const textarea = document.querySelectorAll("textarea");
contactForm.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const formDataObject = {};
    for (const [key, value] of formData.entries()) {
        formDataObject[key] = typeof value === "string" ? value : "";
    }
    console.log(formDataObject);
    try {
        const response = yield fetch("https://nsengi.onrender.com/api/v1/messages", {
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
        });
        console.log(response);
        if (response.status == 400) {
            error_box.style.display = "block";
            error_msg.innerText = "Make Sure You Provided Correct Information!";
            console.log(response);
        }
        else if (response.status == 201) {
            alert("Message Sent Successfully!");
            inputs.forEach((input) => (input.value = ""));
            textarea.forEach((input) => (input.value = ""));
        }
    }
    catch (error) {
        console.error("error", error);
        error_box.style.display = "block";
        error_msg.innerText = "An Internal Server Occured, Try Again Later";
    }
}));
