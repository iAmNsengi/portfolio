"use strict";

let token: string | null = localStorage.getItem("token");
const body: HTMLBodyElement = document.getElementsByTagName("body")[0];

try {
  fetch("https://nsengi.onrender.com/api/v1/messages", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((response: Response) => {
    if (response.status == 401) {
      window.location.replace("login.html");
    }
    if (response.status == 200) {
      body.style.display = "block";
    }
  });
} catch (error) {
  console.log(error);
}
