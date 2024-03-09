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
