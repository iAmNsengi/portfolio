"use strict";
const modal = document.getElementById("myModal");
const btn = document.querySelectorAll(".open-modal");
const span = document.getElementsByClassName("close")[0];
var messagesTable = document.getElementById("messages-table");
if (modal && span) {
  btn.forEach((element) => {
    element.addEventListener("click", () => {
      modal.style.display = "block";
    });
  });
  span.onclick = function () {
    modal.style.display = "none";
  };
  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
}

// messages section
document.addEventListener("DOMContentLoaded", async (e) => {
  const response = await fetch("https://nsengi.onrender.com/api/v1/messages", {
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).catch((err) => {
    console.log(error);
    return;
  });

  if (response.status == 401) window.location.replace("./login.html");
  else if (response.status == 200) {
    const data = await response.text();
    const jsonData = JSON.parse(data);

    //  putting data in the table
    let rows = "";
    jsonData.messages.forEach((item, index) => {
      rows += `
        <tr>
        <td>${index + 1}</td>
        <td> ${item.sender_name}</td>
        <td> ${item.sender_email}</td>
        <td> ${item.sender_phone}</td>
        <td> ${item.message_content}</td>
        `;
    });
    messagesTable.innerHTML = rows;
  }
});
