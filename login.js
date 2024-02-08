"use strict";
const username = document.getElementById("username");
const password = document.getElementById("password");
const error_msg = document.querySelector(".error-msg");
const error_box = document.querySelector(".error-box");
const login_form = document.getElementById("login-form");
if (login_form && username && password && error_msg && error_box) {
    login_form.addEventListener("submit", (e) => {
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
            let users = localStorage.getItem("user");
            if (!users) {
                localStorage.setItem("user", JSON.stringify({ username: "admin", password: "password" }));
            }
            users = localStorage.getItem("user");
            const usernameMatch = typeof users === "string"
                ? users.match(/(?<="username":")([^"]+)/)
                : null;
            const passwordMatch = typeof users === "string"
                ? users.match(/(?<="password":")([^"]+)/)
                : null;
            const usernameMatched = usernameMatch && usernameMatch[0] === username.value;
            const passwordMatched = passwordMatch && passwordMatch[0] === password.value;
            if (usernameMatched && passwordMatched) {
                login_form.reset();
                error_box.style.display = "none";
                localStorage.setItem("is-authenticated", "true");
                window.location.href = "admin.html";
            }
            else {
                error_box.style.display = "block";
                error_msg.innerHTML = "User Not Found!";
            }
        }
    });
    function validateInput(x) {
        if (error_box)
            error_box.style.display = "none";
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
