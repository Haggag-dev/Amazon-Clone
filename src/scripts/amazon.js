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

  navElement.querySelector(".js-burger-toggle").classList.toggle("max-h-[88px]");
};

// Added to Cart Animation

const addedToCartAnimation = () => {
  let timeoutId;
  return () => {
    document.querySelector(".js-added-to-cart").classList.remove("opacity-0");

    if (timeoutId) clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      document.querySelector(".js-added-to-cart").classList.add("opacity-0");
    }, 2000);
  };
};

document
  .querySelector(".js-add-to-cart-btn")
  .addEventListener("click", addedToCartAnimation());
