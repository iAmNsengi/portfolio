var modal = document.getElementById("myModal");

var btn = document.querySelectorAll(".open-modal");

var span = document.getElementsByClassName("close")[0];

btn.forEach((element) => {
  element.addEventListener("click", () => {
    modal.style.display = "block";
  });
});

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
