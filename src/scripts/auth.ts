let criteria: string | null = localStorage.getItem("is-authenticated");
if (!criteria) localStorage.setItem("is-authenticated", "false");
criteria = localStorage.getItem("is-authenticated");

console.log(criteria);
if (criteria === "false") {
  window.location.href = "login.html";
}
