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

const addToCartElement = document.querySelectorAll(
  ".js-add-to-cart-btn",
);

// To relocate into cart.js later. (Saving the items into the cart.)
const addProductToCart = (btnIndex) => {
  return () => {
    const product = addToCartElement[btnIndex].dataset;
    let quantity;

    const select = document.querySelectorAll(".js-select-quantity")[btnIndex];
    quantity = Number(select.options[select.selectedIndex].value);

    for (let i = 0; i < cartModule.cart.length; i++) {
      if (product.productId === cartModule.cart[i].id) {
        cartModule.cart[i].quantity += quantity;
        return;
      }
    }

    cartModule.cart.push({
      id: product.productId,
      name: product.productName,
      priceCents: product.productPrice,
      quantity,
    });
  };
};

// Change the cart quantity in the header.

const displayQuantityElement = document.querySelector(".js-display-quantity");
const mobileDisplayQuantityElement = document.querySelector(
  ".js-mobile-display-quantity",
);

const totalCartQuantity = () => {
  if (cartModule.cart.length <= 0) {
    displayQuantityElement.innerText = 0;
    mobileDisplayQuantityElement.innerText = 0;
    return;
  }

  const quantity = cartModule.cart.reduce(
    (accum, curr) => (accum += curr.quantity),
    0,
  );
  mobileDisplayQuantityElement.innerText = quantity;
  displayQuantityElement.innerText = quantity;
};

for (let i = 0; i < addToCartElement.length; i++) {
  addToCartElement[i].addEventListener("click", addedToCartAnimation(i));
  addToCartElement[i].addEventListener("click", addProductToCart(i));
  addToCartElement[i].addEventListener("click", totalCartQuantity);
}
