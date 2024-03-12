import "froala-editor/js/froala_editor.pkgd.min.js"; // Import Froala Editor JavaScript file
import "froala-editor/css/froala_editor.pkgd.min.css"; // Import Froala Editor CSS file
import FroalaEditor from "froala-editor"; // Import Froala Editor module

const modal: HTMLElement | null = document.getElementById("myModal");
const btnOpenProjectModal: HTMLCollectionOf<Element> =
  document.getElementsByClassName(
    "openProjectModal"
  ) as HTMLCollectionOf<Element>;

const btn: NodeListOf<Element> = document.querySelectorAll(".open-modal");
const span: HTMLCollectionOf<Element> = document.getElementsByClassName(
  "close"
) as HTMLCollectionOf<Element>;

var messagesTable: HTMLElement | null =
  document.getElementById("messages-table");
var projectsTable: HTMLElement | null =
  document.getElementById("projects-table");
var blogsTable: HTMLElement | null = document.getElementById("blogs-table");

const projectForm: HTMLElement | null = document.getElementById("projectForm");
const blogForm: HTMLElement | null = document.getElementById("blogForm");

const deleteMessageForm: HTMLCollectionOf<Element> =
  document.getElementsByClassName(
    "deleteMessageForm"
  ) as HTMLCollectionOf<Element>;
const projectDeleteForm: HTMLCollectionOf<Element> =
  document.getElementsByClassName(
    "projectDeleteForm"
  ) as HTMLCollectionOf<Element>;
const blogDeleteForm: HTMLCollectionOf<Element> =
  document.getElementsByClassName(
    "blogDeleteForm"
  ) as HTMLCollectionOf<Element>;
const projectUpdateForm: HTMLCollectionOf<Element> =
  document.getElementsByClassName(
    "projectUpdateForm"
  ) as HTMLCollectionOf<Element>;
const blogUpdateForm: HTMLCollectionOf<Element> =
  document.getElementsByClassName(
    "blogUpdateForm"
  ) as HTMLCollectionOf<Element>;

const messagesCount: HTMLCollectionOf<Element> =
  document.getElementsByClassName(
    "messages-count"
  ) as HTMLCollectionOf<Element>;
const projectsCount: HTMLCollectionOf<Element> =
  document.getElementsByClassName(
    "projects-count"
  ) as HTMLCollectionOf<Element>;
const blogsCount: HTMLCollectionOf<Element> = document.getElementsByClassName(
  "blogs-count"
) as HTMLCollectionOf<Element>;

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
document.addEventListener("DOMContentLoaded", async (e) => {
  const response = await fetch("https://nsengi.onrender.com/api/v1/messages", {
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).catch((err) => {
    console.log(err);
    return;
  });

  if (response?.status == 401) window.location.replace("./login.html");
  else if (response?.status == 200) {
    const data: string = await response.text();
    const jsonData: any = JSON.parse(data);

    //  putting data in the table
    let rows: string = "";
    jsonData.messages.forEach((item: any, index: number) => {
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

    Array.prototype.forEach.call(deleteMessageForm, (item: any) => {
      item.addEventListener("submit", async (e: Event) => {
        e.preventDefault();
        let check: boolean = confirm(
          "Are you sure you want to delete this message?"
        );
        if (check) {
          const formData: any = Object.fromEntries(
            new FormData(e.target as HTMLFormElement).entries()
          );
          const id: string = formData.id;
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
      });
    });
  }
});

// projects section
document.addEventListener("DOMContentLoaded", async (e) => {
  const response = await fetch("https://nsengi.onrender.com/api/v1/projects", {
    headers: {
      Accept: "*/*",
      Authorization: "Bearer " + token,
    },
  }).catch((err) => {
    console.log(err);
    return;
  });

  if (response?.status == 401) window.location.replace("./login.html");
  else if (response?.status == 200) {
    const data: string = await response.text();
    const jsonData: any = JSON.parse(data);

    let rows: string = "";
    jsonData.projects.forEach((item: any, index: number) => {
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

    projectForm?.addEventListener("submit", async (e) => {
      e.preventDefault();
      const myForm: any = Object.fromEntries(
        new FormData(e.target as HTMLFormElement).entries()
      );
      const formData: FormData = new FormData();
      formData.append("image", myForm.projectImage);
      formData.append("title", myForm.projectName);
      formData.append("description", myForm.projectDescription);
      formData.append("link", myForm.projectLink);
      console.log(myForm.projectImage);

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

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage);
        }

        alert("Project Added Successfully!");
      } catch (error) {
        alert(error);
        console.log("Error:", error);
      }
    });

    Array.prototype.forEach.call(projectUpdateForm, (item: any) => {
      item.addEventListener("submit", async (e: Event) => {
        e.preventDefault();
        let check: boolean = confirm(
          "Are you sure you want to update this Project?"
        );
        if (check) {
          const formData: any = Object.fromEntries(
            new FormData(e.target as HTMLFormElement).entries()
          );
          const id: string = formData.id;
          const updatedData: any = {
            title: formData.projectName,
            link: formData.projectLink,
            description: formData.projectDescription,
          };

          try {
            const resp: Response = await fetch(
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
              alert("Project Updated Successfully!");
            } else {
              const errorMessage = await resp.text();
              throw new Error(errorMessage);
            }
          } catch (error) {
            console.error("Error:", error);
            alert(error);
          }
        }
      });
    });

    Array.prototype.forEach.call(projectDeleteForm, (item: any) => {
      item.addEventListener("submit", async (e: Event) => {
        e.preventDefault();
        let check: boolean = confirm(
          "Are you sure you want to delete this Project?"
        );
        if (check) {
          const formData: any = Object.fromEntries(
            new FormData(e.target as HTMLFormElement).entries()
          );
          const id: string = formData.id;
          console.log(id);
          const resp = await fetch(
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
      });
    });
  }
});

// blogs section
document.addEventListener("DOMContentLoaded", async (e) => {
  new FroalaEditor("#post-content", {});

  const response = await fetch("https://nsengi.onrender.com/api/v1/blogs", {
    headers: {
      Accept: "*/*",
      Authorization: "Bearer " + token,
    },
  }).catch((err) => {
    console.log(err);
    return;
  });

  if (response?.status == 401) window.location.replace("./login.html");
  else if (response?.status == 200) {
    const data: string = await response.text();
    const jsonData: any = JSON.parse(data);

    let rows: string = "";
    jsonData.blogs.forEach((item: any, index: number) => {
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

    blogForm?.addEventListener("submit", async (e) => {
      e.preventDefault();
      const myForm: any = Object.fromEntries(
        new FormData(e.target as HTMLFormElement).entries()
      );
      const formData: FormData = new FormData();
      formData.append("blogImage", myForm.blogImage);
      formData.append("title", myForm.blogTitle);
      formData.append("content", myForm.blogContent);
      formData.append("author", "Admin");
      console.log(myForm);

      try {
        const response = await fetch(
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
          const errorMessage = await response.text();
          throw new Error(errorMessage);
        }

        alert("Project Added Successfully!");
      } catch (error) {
        alert(error);
        console.log("Error:", error);
      }
    });

    Array.prototype.forEach.call(blogUpdateForm, (item: any) => {
      item.addEventListener("submit", async (e: Event) => {
        e.preventDefault();
        let check: boolean = confirm(
          "Are you sure you want to update this Blog?"
        );
        if (check) {
          const formData: any = Object.fromEntries(
            new FormData(e.target as HTMLFormElement).entries()
          );
          const id: string = formData.id;
          const updatedData: any = {
            title: formData.blogTitle,
            content: formData.blogContent,
          };

          try {
            const resp: Response = await fetch(
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
              alert("Project Updated Successfully!");
            } else {
              const errorMessage = await resp.text();
              throw new Error(errorMessage);
            }
          } catch (error) {
            console.error("Error:", error);
            alert(error);
          }
        }
      });
    });

    Array.prototype.forEach.call(blogDeleteForm, (item: any) => {
      item.addEventListener("submit", async (e: Event) => {
        e.preventDefault();
        let check: boolean = confirm(
          "Are you sure you want to delete this Blog?"
        );
        if (check) {
          const formData: any = Object.fromEntries(
            new FormData(e.target as HTMLFormElement).entries()
          );
          const id: string = formData.id;
          console.log(id);
          const resp: Response = await fetch(
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
      });
    });
  }
});

function truncateText(text: string): string {
  if (text.length > 15) {
    return text.substring(0, 15) + "...";
  }
  return text;
}
