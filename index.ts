const hamburger: Element | null = document.querySelector(".hamburger");
const navMenu: Element | null = document.querySelector(".nav-menu");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", mobileMenu);
}

function mobileMenu(): void {
  if (hamburger instanceof Element && navMenu instanceof Element) {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  }
}

const navLink: NodeListOf<Element> = document.querySelectorAll(".nav-link");

navLink.forEach((n: Element) => n.addEventListener("click", closeMenu));

function closeMenu(): void {
  if (hamburger instanceof Element && navMenu instanceof Element) {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  }
}

const dynamicText: Element | null = document.querySelector(".whoAmI");
const words: string[] = [
  "Python Developer",
  "React.Js Developer",
  "Django Developer",
  "Piano Player",
];

let wordIndex: number = 0;
let charIndex: number = 0;
let isDeleting: boolean = false;

const typeEffect = (): void => {
  if (dynamicText instanceof Element) {
    const currentWord: string = words[wordIndex];
    const currentChar: string = currentWord.substring(0, charIndex);
    dynamicText.textContent = currentChar;
    dynamicText.classList.add("stop-blinking");

    if (!isDeleting && charIndex < currentWord.length) {
      charIndex++;
      setTimeout(typeEffect, 200);
    } else if (isDeleting && charIndex > 0) {
      charIndex--;
      setTimeout(typeEffect, 100);
    } else {
      isDeleting = !isDeleting;
      dynamicText.classList.remove("stop-blinking");
      wordIndex = !isDeleting ? (wordIndex + 1) % words.length : wordIndex;
      setTimeout(typeEffect, 1200);
    }
  }
};

typeEffect();

window.onscroll = function () {
  scrollFunction();
};

let slideIndex: number = 1;
showSlides(slideIndex);

function plusSlides(n: number): void {
  showSlides((slideIndex += n));
}

function currentSlide(n: number): void {
  showSlides((slideIndex = n));
}

function showSlides(n: number): void {
  let i: number;
  let slides: HTMLCollectionOf<Element> =
    document.getElementsByClassName("mySlides");
  let dots: HTMLCollectionOf<Element> = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    if (slides[i] instanceof HTMLElement) {
      (slides[i] as HTMLElement).style.display = "none";
    }
  }
  for (i = 0; i < dots.length; i++) {
    if (dots[i] instanceof HTMLElement) {
      (dots[i] as HTMLElement).className = (
        dots[i] as HTMLElement
      ).className.replace(" active", "");
    }
  }
  if (
    slides[slideIndex - 1] instanceof HTMLElement &&
    dots[slideIndex - 1] instanceof HTMLElement
  ) {
    (slides[slideIndex - 1] as HTMLElement).style.display = "flex";
    (dots[slideIndex - 1] as HTMLElement).className += " active";
  }
}

let mybutton: HTMLElement | null = document.getElementById("myBtn");

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction(): void {
  let winScroll: number =
    document.body.scrollTop || document.documentElement.scrollTop;
  let height: number =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let scrolled: number = (winScroll / height) * 100;
  let myBar: HTMLElement | null = document.getElementById("myBar");
  if (myBar) {
    myBar.style.width = scrolled + "%";
  }
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    if (mybutton instanceof HTMLElement) {
      mybutton.style.display = "block";
    }
  } else {
    if (mybutton instanceof HTMLElement) {
      mybutton.style.display = "none";
    }
  }
}

function topFunction(): void {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function isInViewport(element: Element): boolean {
  let rect: DOMRect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
