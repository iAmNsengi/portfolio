"use strict";
let token = localStorage.getItem("token");
const body = document.getElementsByTagName("body")[0];
try {
  fetch("https://nsengi.onrender.com/api/v1/messages", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((response) => {
    if (response.status == 401) window.location.href = "login.html";
    if (response.status == 200) {
      body.style.display = "block";
    }
  });
} catch (error) {
  console.log(error);
}
