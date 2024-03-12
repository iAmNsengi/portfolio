"use strict";

const username = document.getElementById("username") as HTMLInputElement | null;
const password = document.getElementById("password") as HTMLInputElement | null;
const erroMsg = document.querySelector(".error-msg") as HTMLElement | null;
const erroBox = document.querySelector(".error-box") as HTMLElement | null;
const login_form = document.getElementById("login-form");

if (login_form && username && password && erroMsg && erroBox) {
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
          "https://nsengi.onrender.com/api/v1/user/login",
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
        if (!response.ok) {
          // Handle unsuccessful login (e.g., display error message)
          if (erroBox && erroMsg) {
            erroBox.style.display = "block";
            erroMsg.innerText = "Invalid username or password";
          }
          console.log(response);
          return;
        } else if (response.status == 200) {
          // Login successful, extract token from response
          const data = await response.json();
          console.log(data.token);
          const token = data.token;
          window.location.replace("./admin.html");
          // Store token in localStorage or sessionStorage
          localStorage.setItem("token", "");
          localStorage.setItem("token", token);
        }
      } catch (error) {
        console.error("Error logging in:", error);
        // Handle other errors (e.g., display generic error message)

        if (error_box && error_msg) {
          error_box.style.display = "block";
          error_msg.innerText = error as string;
        }
      }
    }
  });
}
