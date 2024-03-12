"use strict";

const uname = document.getElementById("uname") as HTMLInputElement | null;
const pwd = document.getElementById("pwd") as HTMLInputElement | null;
const error_Msg = document.querySelector(".error-msg") as HTMLElement | null;
const error_Box = document.querySelector(".error-box") as HTMLElement | null;
const loginForm = document.getElementById(
  "login-form"
) as HTMLFormElement | null;

if (loginForm && uname && pwd && error_Msg && error_Box) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    let containsError = false;

    if (uname.value === "") {
      uname.classList.add("error");
      containsError = true;
    }

    if (pwd.value === "") {
      pwd.classList.add("error");
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
              email: uname.value,
              pwd: pwd.value,
            }),
          }
        );

        console.log(response.status);
        console.log(typeof response.status);

        if (response.status == 400) {
          // Handle unsuccessful login (e.g., display error message)
          error_Box.style.display = "block";
          error_Msg.innerText = "Bad Request!";
          console.log(response);
          return;
        } else if (response.status == 409) {
          // Handle unsuccessful login (e.g., display error message)
          error_Box.style.display = "block";
          error_Msg.innerText = "You Already Have An Account Login!";
          console.log(response);
          return;
        } else if (response.status == 201) {
          window.location.href = "/login.html";
        }
      } catch (error) {
        console.error("Error logging in:", error);
        // Handle other errors (e.g., display generic error message)
        error_Box.style.display = "block";
        error_Msg.innerText = String(error);
      }
    }
  });
}
