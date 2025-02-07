import { html as navBarHTML } from "./components/AmazonHeader.js";
import { html as productsHTML } from "./components/LoadProducts.js";
import * as cartModule from "./data/cart.js";

document.querySelector("header").innerHTML = navBarHTML;
document.querySelector("main").innerHTML = productsHTML;

// Hamburger Menu: Toggle.
let burgerMenuToggled = false;

document.querySelector(".js-hamburger-menu").addEventListener("click", () => {
  burgerMenuToggled = !burgerMenuToggled;
  burgerMenuHtml();
});

const burgerMenuHtml = () => {
  const navElement = document.querySelector("nav");

  navElement
    .querySelector(".js-burger-toggle")
    .classList.toggle("max-h-[88px]");
};

/* Add to cart UI interactivity. */

// Added to Cart Animation
const addedToCartAnimation = (btnIndex) => {
  let timeoutId;
  return () => {
    document
      .querySelectorAll(".js-added-to-cart")
      [btnIndex].classList.remove("opacity-0");

    if (timeoutId) clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      document
        .querySelectorAll(".js-added-to-cart")
        [btnIndex].classList.add("opacity-0");
    }, 2000);
  };
};

// Change the cart quantity in the header.
const displayQuantityElement = document.querySelector(".js-display-quantity");
const mobileDisplayQuantityElement = document.querySelector(
  ".js-mobile-display-quantity",
);

const updateCart = () => {
  if (cartModule.cart.length <= 0) {
    displayQuantityElement.innerText = 0;
    mobileDisplayQuantityElement.innerText = 0;
    return;
  }

  const quantity = cartModule.calculateCartQuantity();

  mobileDisplayQuantityElement.innerText = quantity;
  displayQuantityElement.innerText = quantity;
};

const addToCartElement = document.querySelectorAll(".js-add-to-cart-btn");
for (let i = 0; i < addToCartElement.length; i++) {
  addToCartElement[i].addEventListener("click", addedToCartAnimation(i));
  addToCartElement[i].addEventListener("click", cartModule.addProductToCart(i));
  addToCartElement[i].addEventListener("click", updateCart);
}
updateCart(); // When the page first loads
