let contact_form: HTMLFormElement | null = document.getElementById(
  "contact-form"
) as HTMLFormElement;
let contact_name: HTMLInputElement = document.getElementById(
  "contact-name"
) as HTMLInputElement;
let contact_email: HTMLInputElement  = document.getElementById(
  "contact-email"
) as HTMLInputElement;
let contact_phone: HTMLInputElement  = document.getElementById(
  "contact-phone"
) as HTMLInputElement;
let contact_message: HTMLInputElement = document.getElementById(
  "contact-message"
) as HTMLInputElement;
let mailformat: RegExp =
  /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
let containsError: boolean = true;

function validateInput(x: HTMLInputElement): void {
  if (x.value == "") {
    x.classList.add("error");
    containsError = true;
  }
  if (x.value != "") {
    x.classList.remove("error");
    containsError = false;
  }
}

function validateEmail(x: HTMLInputElement): void {
  if (!x.value.match(mailformat)) {
    x.classList.add("error");
    containsError = true;
  } else {
    x.classList.remove("error");
    containsError = false;
  }
}

if (
  contact_form &&
  contact_name &&
  contact_email &&
  contact_phone &&
  contact_message
) {
  contact_form.addEventListener("submit", (e) => {
    e.preventDefault();
    let name: string = contact_name.value;
    let email: string = contact_email.value;
    let phone: string = contact_phone.value;
    let message: string = contact_message.value;
    console.log(containsError);

    if (name == "") {
      contact_name.classList.add("error");
      containsError = true;
    }
    if (email == "") {
      contact_email.classList.add("error");
      containsError = true;
    }
    if (phone == "") {
      contact_phone.classList.add("error");
      containsError = true;
    }
    if (message == "") {
      contact_message.classList.add("error");
      containsError = true;
    }
    if (containsError == false) {
      let all_messages: any[] = JSON.parse(
        localStorage.getItem("arr-messages") || "[]"
      );
      let newObject: {
        name: string;
        email: string;
        phone: string;
        message: string;
      }[] = [
        {
          name: name,
          email: email,
          phone: phone,
          message: message,
        },
      ];

      let dataArray: any[] = [];
      if (all_messages) {
        dataArray = all_messages;
      }
      dataArray.push(newObject);
      localStorage.setItem("arr-messages", JSON.stringify(dataArray));
      alert("done");
      if (contact_form) {
        contact_form.reset();
      }
    }
  });
}
