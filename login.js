let username = document.getElementById("username");
let password = document.getElementById("password");
let error_msg = document.querySelector(".error-msg");
let error_box = document.querySelector(".error-box");

let login_form = document.getElementById("login-form");
login_form.addEventListener("submit", (e) => {
  e.preventDefault();
  let containsError = false;

  if (username.value == "") {
    username.classList.add("error");
    containsError = true;
  }
  if (password.value == "") {
    password.classList.add("error");
    containsError = true;
  }
  if (containsError == false) {
    var users = localStorage.getItem("user");
    if (!users)
      localStorage.setItem(
        "user",
        JSON.stringify({ username: "admin", password: "password" })
      );
    users = localStorage.getItem("user");

    var usernameMatch = users.match(/(?<="username":")([^"]+)/);
    var passwordMatch = users.match(/(?<="password":")([^"]+)/);

    var usernameMatched = usernameMatch && usernameMatch[0] === username.value;
    var passwordMatched = passwordMatch && passwordMatch[0] === password.value;

    if (usernameMatched && passwordMatched) {
      login_form.reset();
      error_box.style.display = "none";
      localStorage.setItem("is-authenticated", true);
      window.location.href = "admin.html";
    } else {
      error_box.style.display = "block";
      error_msg.innerHTML = "User Not Found!";
    }
  }
});

function validateInput(x) {
  error_box.style.display = "none";
  if (x.value == "") {
    x.classList.add("error");
    containsError = true;
  }
  if (x.value != "") {
    x.classList.remove("error");
    containsError = false;
  }
}
