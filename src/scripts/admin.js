"use strict";
const modal = document.getElementById("myModal");
const btn = document.querySelectorAll(".open-modal");
const span = document.getElementsByClassName("close")[0];

var messagesTable = document.getElementById("messages-table");
var projectsTable = document.getElementById("projects-table");

const projectForm = document.getElementById("projectForm");
const deleteMessageForm = document.getElementsByClassName("deleteMessageForm");

const messagesCount = document.getElementsByClassName("messages-count");
const projectsCount = document.getElementsByClassName("projects-count");

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
        <td>
         <form method="POST" class="deleteMessageForm">
            <input type="hidden" name="id" value = ${item._id} readonly>
            <button class="delete"><i class="fa fa-trash"></i></button>
        </form>
        </td>
        `;
    });
    messagesTable.innerHTML = rows;
    messagesCount[0].innerHTML = jsonData.messages.length + " Messages";

    console.log(messagesCount);

    Array.prototype.forEach.call(deleteMessageForm, (item) => {
      item.addEventListener("submit", async (e) => {
        e.preventDefault();
        let check = confirm("Are you sure you want to delete this message?");
        if (check == true) {
          const formData = Object.fromEntries(new FormData(e.target).entries());
          const id = formData.id;
          console.log(id);
          const resp = await fetch(
            `https://nsengi.onrender.com/api/v1/messages/${id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
              body: JSON.stringify({
                _id: id.value,
              }),
            }
          ).catch((err) => {
            console.log(err);
          });

          if (resp.status == 200) {
            console.log("Message Deleted!");
            alert("Message Deleted, Reload!");
          }
        }
      });
    });
  }
});

// projects section
// 1. getting all projects
document.addEventListener("DOMContentLoaded", async (e) => {
  const response = await fetch("https://nsengi.onrender.com/api/v1/projects", {
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
    jsonData.projects.forEach((item, index) => {
      rows += `
        <tr>
        <td>${index + 1}</td>
        <td> ${item.title}</td>
        <td> ${truncateText(item.link)}</td>
        <td>${item.description}</td>
        <td> <img src="https://nsengi.onrender.com/${
          item.image
        }"  style="width: 50px !important; "height: 50px !important;"/></td>
        <td>
         <form method="POST" class="projectEditForm">
            <input type="hidden" name="id" value = ${item._id} readonly>
            <button class="delete"><i class="fa fa-trash"></i></button>
            </form>
             <form method="POST" class="projectDeleteForm">
            <input type="hidden" name="id" value = ${item._id} readonly>
            <button class="edit"><i class="fa fa-edit"></i></button>
            </form>
        </td>
        `;
    });
    projectsTable.innerHTML = rows;
    projectsCount[0].innerHTML = jsonData.projects.length + " Projects";

    // 2. Adding a project

    projectForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const myForm = Object.fromEntries(new FormData(e.target).entries());

      const formData = new FormData();
      formData.append("title", myForm.projectName);
      formData.append("description", myForm.projectDescription);
      formData.append("link", myForm.projectLink);
      formData.append("image", myForm.projectImage);
      console.log(myForm.projectImage);
      console.log(formData);
      alert();
      try {
        const response = await fetch(
          "https://nsengi.onrender.com/api/v1/projects",
          {
            method: "POST",
            headers: {
              Authorization: "Bearer " + token,
            },
            body: formData,
          }
        );
        if (response.status == 400) {
          alert(response.statusText);
          console.log(response);
        } else if (response.status == 201) {
          alert("Project Added Successfully!");
        }
      } catch (error) {
        console.error("error", error);
        error_box.style.display = "block";
        error_msg.innerText = "An Internal Server Occured, Try Again Later";
      }
    });
    // 4. deleting Project
    Array.prototype.forEach.call(projectDeleteForm, (item) => {
      item.addEventListener("submit", async (e) => {
        e.preventDefault();
        let check = confirm("Are you sure you want to delete this Project?");
        if (check == true) {
          const formData = Object.fromEntries(new FormData(e.target).entries());
          const id = formData.id;
          console.log(id);
          const resp = await fetch(
            `https://nsengi.onrender.com/api/v1/projects/${id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
              body: JSON.stringify({
                _id: id.value,
              }),
            }
          ).catch((err) => {
            console.log(err);
          });

          if (resp.status == 200) {
            console.log("Project Deleted!");
            alert("Project Deleted, Reload!");
          }
        }
      });
    });
  }
});

function truncateText(text) {
  if (text.length > 15) {
    return text.substring(0, 15) + "...";
  }
  return text;
}
