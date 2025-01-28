import { navBarHTML } from "./components/AmazonHeader.js";

document.querySelector("header").innerHTML = navBarHTML;

// Hamburger Menu: Toggle.
let burgerMenuToggled = false;

document.querySelector(".js-hamburger-menu").addEventListener("click", () => {
  burgerMenuToggled = !burgerMenuToggled;
  burgerMenuHtml();
});

const burgerMenuHtml = () => {
  const navElement = document.querySelector("nav");

  if (burgerMenuToggled) {
    navElement.querySelector(".js-burger-toggle").classList.remove("hidden");
    return;
  }
  navElement.querySelector(".js-burger-toggle").classList.add("hidden");
};
