const modal: HTMLElement | null = document.getElementById("myModal");

const btn: NodeListOf<Element> = document.querySelectorAll(".open-modal");

const span: HTMLElement | null = document.getElementsByClassName(
  "close"
)[0] as HTMLElement;

if (modal && span) {
  btn.forEach((element: Element) => {
    element.addEventListener("click", () => {
      modal.style.display = "block";
    });
  });

  span.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event: MouseEvent) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
}
