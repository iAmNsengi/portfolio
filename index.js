"use strict";
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
if (hamburger && navMenu) {
    hamburger.addEventListener("click", mobileMenu);
}
function mobileMenu() {
    if (hamburger instanceof Element && navMenu instanceof Element) {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    }
}
const navLink = document.querySelectorAll(".nav-link");
navLink.forEach((n) => n.addEventListener("click", closeMenu));
function closeMenu() {
    if (hamburger instanceof Element && navMenu instanceof Element) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }
}
const dynamicText = document.querySelector(".whoAmI");
const words = [
    "Python Developer",
    "React.Js Developer",
    "Django Developer",
    "Piano Player",
];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeEffect = () => {
    if (dynamicText instanceof Element) {
        const currentWord = words[wordIndex];
        const currentChar = currentWord.substring(0, charIndex);
        dynamicText.textContent = currentChar;
        dynamicText.classList.add("stop-blinking");
        if (!isDeleting && charIndex < currentWord.length) {
            charIndex++;
            setTimeout(typeEffect, 200);
        }
        else if (isDeleting && charIndex > 0) {
            charIndex--;
            setTimeout(typeEffect, 100);
        }
        else {
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
let slideIndex = 1;
showSlides(slideIndex);
function plusSlides(n) {
    showSlides((slideIndex += n));
}
function currentSlide(n) {
    showSlides((slideIndex = n));
}
function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
        if (slides[i] instanceof HTMLElement) {
            slides[i].style.display = "none";
        }
    }
    for (i = 0; i < dots.length; i++) {
        if (dots[i] instanceof HTMLElement) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
    }
    if (slides[slideIndex - 1] instanceof HTMLElement &&
        dots[slideIndex - 1] instanceof HTMLElement) {
        slides[slideIndex - 1].style.display = "flex";
        dots[slideIndex - 1].className += " active";
    }
}
let mybutton = document.getElementById("myBtn");
window.onscroll = function () {
    scrollFunction();
};
function scrollFunction() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    let myBar = document.getElementById("myBar");
    if (myBar) {
        myBar.style.width = scrolled + "%";
    }
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        if (mybutton instanceof HTMLElement) {
            mybutton.style.display = "block";
        }
    }
    else {
        if (mybutton instanceof HTMLElement) {
            mybutton.style.display = "none";
        }
    }
}
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
function isInViewport(element) {
    let rect = element.getBoundingClientRect();
    return (rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth));
}
