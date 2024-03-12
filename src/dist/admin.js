"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };

const modal = document.getElementById("myModal");
const btnOpenProjectModal = document.getElementsByClassName("openProjectModal");
const btn = document.querySelectorAll(".open-modal");
const span = document.getElementsByClassName("close");
var messagesTable = document.getElementById("messages-table");
var projectsTable = document.getElementById("projects-table");
var blogsTable = document.getElementById("blogs-table");
const projectForm = document.getElementById("projectForm");
const blogForm = document.getElementById("blogForm");
const deleteMessageForm = document.getElementsByClassName("deleteMessageForm");
const projectDeleteForm = document.getElementsByClassName("projectDeleteForm");
const blogDeleteForm = document.getElementsByClassName("blogDeleteForm");
const projectUpdateForm = document.getElementsByClassName("projectUpdateForm");
const blogUpdateForm = document.getElementsByClassName("blogUpdateForm");
const messagesCount = document.getElementsByClassName("messages-count");
const projectsCount = document.getElementsByClassName("projects-count");
const blogsCount = document.getElementsByClassName("blogs-count");
if (modal && span) {
  btn.forEach((element) => {
    element.addEventListener("click", () => {
      modal.style.display = "block";
    });
  });
  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
}
// messages section
document.addEventListener("DOMContentLoaded", (e) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(
      "https://nsengi.onrender.com/api/v1/messages",
      {
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    ).catch((err) => {
      console.log(err);
      return;
    });
    if (
      (response === null || response === void 0 ? void 0 : response.status) ==
      401
    )
      window.location.replace("./login.html");
    else if (
      (response === null || response === void 0 ? void 0 : response.status) ==
      200
    ) {
      const data = yield response.text();
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
            <input type="hidden" name="id" value = ${item._id} readonly />
            <button class="delete"><i class="fa fa-trash"></i></button>
        </form>
        </td>
        `;
      });
      if (messagesTable) {
        messagesTable.innerHTML = rows;
      }
      messagesCount[0].innerHTML = jsonData.messages.length + " Messages";
      Array.prototype.forEach.call(deleteMessageForm, (item) => {
        item.addEventListener("submit", (e) =>
          __awaiter(void 0, void 0, void 0, function* () {
            e.preventDefault();
            let check = confirm(
              "Are you sure you want to delete this message?"
            );
            if (check) {
              const formData = Object.fromEntries(
                new FormData(e.target).entries()
              );
              const id = formData.id;
              console.log(id);
              const resp = yield fetch(
                `https://nsengi.onrender.com/api/v1/messages/${id}`,
                {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                  },
                  body: JSON.stringify({
                    _id: id,
                  }),
                }
              ).catch((err) => {
                console.log(err);
              });
              if (resp && resp.status === 200) {
                console.log("Message Deleted!");
                alert("Message Deleted, Reload!");
              }
            }
          })
        );
      });
    }
  })
);
// projects section
document.addEventListener("DOMContentLoaded", (e) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(
      "https://nsengi.onrender.com/api/v1/projects",
      {
        headers: {
          Accept: "*/*",
          Authorization: "Bearer " + token,
        },
      }
    ).catch((err) => {
      console.log(err);
      return;
    });
    if (
      (response === null || response === void 0 ? void 0 : response.status) ==
      401
    )
      window.location.replace("./login.html");
    else if (
      (response === null || response === void 0 ? void 0 : response.status) ==
      200
    ) {
      const data = yield response.text();
      const jsonData = JSON.parse(data);
      let rows = "";
      jsonData.projects.forEach((item, index) => {
        rows += `
        <tr>
        <td>${index + 1}</td>
        <td> ${item.title}</td>
        <td> ${truncateText(item.link)}</td>
        <td>${item.description}</td>
        <td> <img src= "https://nsengi.onrender.com/${
          item.image
        }"  style="width: 50px !important; "height: 50px !important;"/></td>
        <td>
        <div>
            <button onclick="document.getElementById('project${
              item._id
            }').style.display = 'block';" type="button"  class="btn-add openProjectModal"><i class="fa fa-edit"></i></button>
        </div>
            <form method="POST" class="projectDeleteForm" >
            <input type="hidden" name="id" value =${item._id} readonly />
            <button type="submit" class="delete"><i class="fa fa-trash"></i></button>
            </form>
        </td>
        </tr>

        <div class="modal" id="project${item._id}">
          <form method="POST" class="modal-content projectUpdateForm">
            <span onclick="document.getElementById('project${
              item._id
            }').style.display = 'none';" class="close">&times;</span>
            <div class="form-control">
              <h4>Project Name</h4>
              <input
                type="text"
                name="projectName"
                value="${item.title}"
                />
            </div>
            </form>
            <div class="form-control">
              <h4>Project Link</h4>
              <input
                type="text"
                name="projectLink"
                value="${item.link}"
              />
            </div>
            <div class="form-control">
              <h4>Project Description</h4>
              <input
                type="text"
                name="projectDescription"
                value="${item.description}"
              />
            </div>
            <input type="hidden" name="id" value =${item._id} readonly />
          <input type="submit" value="Send Request"   class="update form-control" />
          </form>
        </div>
        `;
      });
      if (projectsTable) projectsTable.innerHTML = rows;
      projectsCount[0].innerHTML = jsonData.projects.length + " Projects";
      projectForm === null || projectForm === void 0
        ? void 0
        : projectForm.addEventListener("submit", (e) =>
            __awaiter(void 0, void 0, void 0, function* () {
              e.preventDefault();
              const myForm = Object.fromEntries(
                new FormData(e.target).entries()
              );
              const formData = new FormData();
              formData.append("image", myForm.projectImage);
              formData.append("title", myForm.projectName);
              formData.append("description", myForm.projectDescription);
              formData.append("link", myForm.projectLink);
              console.log(myForm.projectImage);
              try {
                const response = yield fetch(
                  "https://nsengi.onrender.com/api/v1/projects",
                  {
                    method: "POST",
                    headers: {
                      Authorization: "Bearer " + token,
                    },
                    body: formData,
                  }
                );
                if (!response.ok) {
                  const errorMessage = yield response.text();
                  throw new Error(errorMessage);
                }
                alert("Project Added successfully, Reload!!");
              } catch (error) {
                alert(error);
                console.log("Error:", error);
              }
            })
          );
      Array.prototype.forEach.call(projectUpdateForm, (item) => {
        item.addEventListener("submit", (e) =>
          __awaiter(void 0, void 0, void 0, function* () {
            e.preventDefault();
            let check = confirm(
              "Are you sure you want to update this Project?"
            );
            if (check) {
              const formData = Object.fromEntries(
                new FormData(e.target).entries()
              );
              const id = formData.id;
              const updatedData = {
                title: formData.projectName,
                link: formData.projectLink,
                description: formData.projectDescription,
              };
              try {
                const resp = yield fetch(
                  `https://nsengi.onrender.com/api/v1/projects/${id}`,
                  {
                    method: "PATCH",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: "Bearer " + token,
                    },
                    body: JSON.stringify(updatedData),
                  }
                );
                if (resp.ok) {
                  console.log("Project Updated!");
                  alert("Project Updated successfully, Reload!!");
                } else {
                  const errorMessage = yield resp.text();
                  throw new Error(errorMessage);
                }
              } catch (error) {
                console.error("Error:", error);
                alert(error);
              }
            }
          })
        );
      });
      Array.prototype.forEach.call(projectDeleteForm, (item) => {
        item.addEventListener("submit", (e) =>
          __awaiter(void 0, void 0, void 0, function* () {
            e.preventDefault();
            let check = confirm(
              "Are you sure you want to delete this Project?"
            );
            if (check) {
              const formData = Object.fromEntries(
                new FormData(e.target).entries()
              );
              const id = formData.id;
              console.log(id);
              const resp = yield fetch(
                `https://nsengi.onrender.com/api/v1/projects/${id}`,
                {
                  method: "DELETE",
                  headers: {
                    Authorization: "Bearer " + token,
                  },
                  body: JSON.stringify({
                    _id: id,
                  }),
                }
              ).catch((err) => {
                console.log(err);
              });
              if (resp && resp.status == 200) {
                console.log("Project Deleted!");
                alert("Project Deleted, Reload!");
              }
            }
          })
        );
      });
    }
  })
);
// blogs section
document.addEventListener("DOMContentLoaded", (e) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch("https://nsengi.onrender.com/api/v1/blogs", {
      headers: {
        Accept: "*/*",
        Authorization: "Bearer " + token,
      },
    }).catch((err) => {
      console.log(err);
      return;
    });
    if (
      (response === null || response === void 0 ? void 0 : response.status) ==
      401
    )
      window.location.replace("./login.html");
    else if (
      (response === null || response === void 0 ? void 0 : response.status) ==
      200
    ) {
      const data = yield response.text();
      const jsonData = JSON.parse(data);
      let rows = "";
      jsonData.blogs.forEach((item, index) => {
        rows += `
        <tr>
        <td>${index + 1}</td>
        <td> ${item.title}</td>
        <td> ${truncateText(item.author)}</td>
        <td ${truncateText(item.content)}</td>
        <td> <img src= "https://nsengi.onrender.com/${
          item.blogImage
        }"  style="width: 50px !important; "height: 50px !important;"/></td>
        <td>
        <div>
            <button onclick="document.getElementById('blog${
              item._id
            }').style.display = 'block';" type="button"  class="btn-add openBlogModal"><i class="fa fa-edit"></i></button>
        </div>
            <form method="POST" class="blogDeleteForm">
            <input type="hidden" name="id" value =${item._id} readonly />
            <button type="submit" class="delete"><i class="fa fa-trash"></i></button>
            </form>
        </td>
        </tr>

        <div class="modal" id="blog${item._id}">
          <form method="POST" class="blogUpdateForm">
            <span onclick="document.getElementById('blog${
              item._id
            }').style.display = 'none';" class="close">&times;</span>
            <div class="form-control">
              <h4>Blog Title</h4>
              <input
                type="text"
                name="blogTitle"
                value="${item.title}"
                />
            </div>
            </form>
            <div class="form-control">
              <h4>Blog Content</h4>
              <textarea
                type="text"
                name="blogContent"
                class="form-control"
                rows="15"
                columns="4"
                >
                ${item.content}
                </textarea>
            </div>
            <input type="hidden" name="id" value =${item._id} readonly />
          <button type="submit" onclick="alert('${
            item._id
          }')" class="update form-control" >Update </button>
          </form>
        </div>
        `;
      });
      if (blogsTable) blogsTable.innerHTML = rows;
      blogsCount[0].innerHTML = jsonData.blogs.length + " Blogs";
      blogForm === null || blogForm === void 0
        ? void 0
        : blogForm.addEventListener("submit", (e) =>
            __awaiter(void 0, void 0, void 0, function* () {
              e.preventDefault();
              const myForm = Object.fromEntries(
                new FormData(e.target).entries()
              );
              const formData = new FormData();
              formData.append("blogImage", myForm.blogImage);
              formData.append("title", myForm.blogTitle);
              formData.append("content", myForm.blogContent);
              formData.append("author", "Admin");
              console.log(myForm);
              try {
                const response = yield fetch(
                  "https://nsengi.onrender.com/api/v1/blogs",
                  {
                    method: "POST",
                    headers: {
                      Authorization: "Bearer " + token,
                    },
                    body: formData,
                  }
                );
                if (!response.ok) {
                  const errorMessage = yield response.text();
                  throw new Error(errorMessage);
                }
                alert("Blog Post Added successfully, Reload!!");
              } catch (error) {
                alert(error);
                console.log("Error:", error);
              }
            })
          );

      Array.prototype.forEach.call(blogUpdateForm, (item) => {
        item.addEventListener("submit", (e) =>
          __awaiter(void 0, void 0, void 0, function* () {
            e.preventDefault();
            let check = confirm("Are you sure you want to update this Blog?");
            if (check) {
              const formData = Object.fromEntries(
                new FormData(e.target).entries()
              );
              const id = formData.id;
              const updatedData = {
                title: formData.blogTitle,
                content: formData.blogContent,
              };
              try {
                const resp = yield fetch(
                  `https://nsengi.onrender.com/api/v1/projects/${id}`,
                  {
                    method: "PATCH",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: "Bearer " + token,
                    },
                    body: JSON.stringify(updatedData),
                  }
                );
                if (resp.ok) {
                  console.log("Project Updated!");
                  alert("Project Updated successfully, Reload!!");
                } else {
                  const errorMessage = yield resp.text();
                  throw new Error(errorMessage);
                }
              } catch (error) {
                console.error("Error:", error);
                alert(error);
              }
            }
          })
        );
      });
      Array.prototype.forEach.call(blogDeleteForm, (item) => {
        item.addEventListener("submit", (e) =>
          __awaiter(void 0, void 0, void 0, function* () {
            e.preventDefault();
            let check = confirm("Are you sure you want to delete this Blog?");
            if (check) {
              const formData = Object.fromEntries(
                new FormData(e.target).entries()
              );
              const id = formData.id;
              console.log(id);
              const resp = yield fetch(
                `https://nsengi.onrender.com/api/v1/blogs/${id}`, // Assuming id is the ID of the blog entry to delete
                {
                  method: "DELETE",
                  headers: {
                    Authorization: "Bearer " + token,
                  },
                  body: null, // DELETE requests typically don't have a body
                }
              );
              if (resp.status == 200) {
                console.log("Project Deleted!");
                alert("Project Deleted, Reload!");
              }
              if (!resp.ok) {
                alert("An error occured trying to save");
              }
            }
          })
        );
      });
    }
  })
);
function truncateText(text) {
  if (text.length > 15) {
    return text.substring(0, 15) + "...";
  }
  return text;
}
