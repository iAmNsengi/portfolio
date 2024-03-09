"use strict";
// const axios = require("axios");

const username = document.getElementById("username");
const password = document.getElementById("password");
const error_msg = document.querySelector(".error-msg");
const error_box = document.querySelector(".error-box");
const login_form = document.getElementById("login-form");

if (login_form && username && password && error_msg && error_box) {
  login_form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let containsError = false;
    if (username.value === "") {
      username.classList.add("error");
      containsError = true;
    }
    if (password.value === "") {
      password.classList.add("error");
      containsError = true;
    }
    if (!containsError) {
      try {
        const response = await fetch(
          "https://nsengi.onrender.com/api/v1/user/signup",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: username.value,
              password: password.value,
            }),
          }
        );
        console.log(response.status);
        console.log(typeof response.status);

        if (response.status == 400) {
          // Handle unsuccessful login (e.g., display error message)
          error_box.style.display = "block";
          error_msg.innerText = "Bad Request!";
          console.log(response);
          return;
        } else if (response.status == 409) {
          // Handle unsuccessful login (e.g., display error message)
          error_box.style.display = "block";
          error_msg.innerText = "You Already Have An Account Login!";
          console.log(response);
          return;
        } else if (response.status == 201) {
          window.location.href = "/login.html";
        }
      } catch (error) {
        console.error("Error logging in:", error);
        // Handle other errors (e.g., display generic error message)
        error_box.style.display = "block";
        error_msg.innerText = error;
      }
    }
  });

  function validateInput(x) {
    if (error_box) error_box.style.display = "none";
    if (x.value === "") {
      x.classList.add("error");
      containsError = true; // 'containsError' is not defined here, maybe i should pass it as a parameter
    }
    if (x.value !== "") {
      x.classList.remove("error");
      containsError = false;
      // 'containsError' is not defined here too maybe i should declare it as a parameter
    }
  }
}
