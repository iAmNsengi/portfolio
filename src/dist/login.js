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
const username = document.getElementById("username");
const password = document.getElementById("password");
const erroMsg = document.querySelector(".error-msg");
const erroBox = document.querySelector(".error-box");
const login_form = document.getElementById("login-form");
if (login_form && username && password && erroMsg && erroBox) {
    login_form.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
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
                const response = yield fetch("https://nsengi.onrender.com/api/v1/user/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: username.value,
                        password: password.value,
                    }),
                });
                if (!response.ok) {
                    // Handle unsuccessful login (e.g., display error message)
                    if (erroBox && erroMsg) {
                        erroBox.style.display = "block";
                        erroMsg.innerText = "Invalid username or password";
                    }
                    console.log(response);
                    return;
                }
                else if (response.status == 200) {
                    // Login successful, extract token from response
                    const data = yield response.json();
                    console.log(data.token);
                    const token = data.token;
                    window.location.replace("./admin.html");
                    // Store token in localStorage or sessionStorage
                    localStorage.setItem("token", "");
                    localStorage.setItem("token", token);
                }
            }
            catch (error) {
                console.error("Error logging in:", error);
                // Handle other errors (e.g., display generic error message)
                if (error_box && error_msg) {
                    error_box.style.display = "block";
                    error_msg.innerText = error;
                }
            }
        }
    }));
}
