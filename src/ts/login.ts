const username: HTMLInputElement | null = document.getElementById(
  "username"
) as HTMLInputElement;
const password: HTMLInputElement | null = document.getElementById(
  "password"
) as HTMLInputElement;
const error_msg: HTMLElement | null = document.querySelector(".error-msg");
const error_box: HTMLElement | null = document.querySelector(".error-box");

const login_form: HTMLFormElement | null = document.getElementById(
  "login-form"
) as HTMLFormElement;

if (login_form && username && password && error_msg && error_box) {
  login_form.addEventListener("submit", (e: Event) => {
    e.preventDefault();
    let containsError: boolean = false;

    if (username.value === "") {
      username.classList.add("error");
      containsError = true;
    }
    if (password.value === "") {
      password.classList.add("error");
      containsError = true;
    }
    if (!containsError) {
      let users: string | null = localStorage.getItem("user");
      if (!users) {
        localStorage.setItem(
          "user",
          JSON.stringify({ username: "admin", password: "password" })
        );
      }
      users = localStorage.getItem("user");

      const usernameMatch =
        typeof users === "string"
          ? users.match(/(?<="username":")([^"]+)/)
          : null;
      const passwordMatch =
        typeof users === "string"
          ? users.match(/(?<="password":")([^"]+)/)
          : null;

      const usernameMatched: boolean =
        usernameMatch && usernameMatch[0] === username.value;
      const passwordMatched: boolean =
        passwordMatch && passwordMatch[0] === password.value;

      if (usernameMatched && passwordMatched) {
        login_form.reset();
        error_box.style.display = "none";
        localStorage.setItem("is-authenticated", "true");
        window.location.href = "admin.html";
      } else {
        error_box.style.display = "block";
        error_msg.innerHTML = "User Not Found!";
      }
    }
  });

  function validateInput(x: HTMLInputElement): void {
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
