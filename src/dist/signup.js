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
const uname = document.getElementById("uname");
const pwd = document.getElementById("pwd");
const error_Msg = document.querySelector(".error-msg");
const error_Box = document.querySelector(".error-box");
const loginForm = document.getElementById("login-form");
if (loginForm && uname && pwd && error_Msg && error_Box) {
    loginForm.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
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
                const response = yield fetch("https://nsengi.onrender.com/api/v1/user/signup", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: uname.value,
                        pwd: pwd.value,
                    }),
                });
                console.log(response.status);
                console.log(typeof response.status);
                if (response.status == 400) {
                    // Handle unsuccessful login (e.g., display error message)
                    error_Box.style.display = "block";
                    error_Msg.innerText = "Bad Request!";
                    console.log(response);
                    return;
                }
                else if (response.status == 409) {
                    // Handle unsuccessful login (e.g., display error message)
                    error_Box.style.display = "block";
                    error_Msg.innerText = "You Already Have An Account Login!";
                    console.log(response);
                    return;
                }
                else if (response.status == 201) {
                    window.location.href = "/login.html";
                }
            }
            catch (error) {
                console.error("Error logging in:", error);
                // Handle other errors (e.g., display generic error message)
                error_Box.style.display = "block";
                error_Msg.innerText = String(error);
            }
        }
    }));
}
