import * as cartModule from "../data/cart.js";
import * as productModule from "../data/products.js";
import formatCurrency from "../utils/money.js";
import { updateOrderButton, updatePrice } from "./CheckoutSummary.js";
import dayjs from "https://unpkg.com/dayjs@1.11.13/esm/index.js";
import { getShippingDay } from "../data/shippingOptions.js";
import { updateCheckedRadio } from "./CheckoutSummary.js";

// Shipping dates.
const getShippingDate = (shippingDays) => {
  let shippingDate = dayjs().add(shippingDays, "day");
  const deliveryDate = shippingDate.format("dddd, MMMM D");
  return deliveryDate;
};

export const updateDeliveryDate = (productId) => {
  let shippingId = cartModule.getShippingId(productId);

  updateCheckedRadio(productId, shippingId || "1");

  document.querySelector(`.js-delivery-date-${productId}`).innerHTML =
    getShippingDate(getShippingDay(shippingId));
};

const emptyCartHTML = `<div class="grid5:col-[1] grid5:row-[1] mb-18">
          <p class="mb-2.5">Your cart is empty.</p>
          <a href="index.html">
            <button
              class="bg-amazonbtn border-amazonbtnborder cursor-pointer rounded-[8px] border-1 border-solid pt-2 pr-3.75 pb-2 pl-3.75 leading-4 font-[400] text-[rgb(33,33,33)] shadow-(--amazon-shadow)"
            >
              View Products
            </button>
          </a>
        </div>`;

export let html = emptyCartHTML;

if (cartModule.cart.length > 0)
  html =
    '<div class="js-products-html flex flex-col">' +
    cartModule.cart.reduce((accum, cartItem) => {
      const product = productModule.getProduct(
        cartItem.productId,
        productModule.products,
      );

      return (accum += `<div
          class="js-item-card-${cartItem.productId} border-grayborder mb-3 grid4:col-start-1 rounded-[5px] border-1 border-solid pt-4.5 pr-4.5 pb-4.5 pl-4.5"
        >
          <h3 class="mt-1.25 mb-5.5 text-[19px] font-bold text-[rgb(0,118,0)]">
            Delivery date: <span class="js-delivery-date-${cartItem.productId}"></span>
          </h3>

          <div
            class="grid5:grid-cols-[100px_1fr_1fr] grid5:gap-x-25px grid grid-cols-[100px_1fr] gap-x-6.25 gap-y-7.5"
          >
            <div class="flex col-start-1 max-h-[100px] max-w-[100%] ml-auto mr-auto">
              <img
                src="../../${product.image}"
                alt="${product.name}"
              />
            </div>

            <div>
              <p class="font-bold">
              ${product.name}
              </p>

              <p class="mb-2.5 font-bold text-[rgb(177,39,4)]">$${formatCurrency(product.priceCents)}</p>
              <p>
                Quantity: <span class="js-item-quantity-${cartItem.productId}">${cartItem.quantity}</span>
                <span class="js-update-quantity-button-${cartItem.productId} ml-0.75 cursor-pointer text-[#017cb6] hover:text-red-700"
                  >Update</span
                >
                <input class="js-change-quantity-${cartItem.productId} hidden border-1 pl-0.5" name="change-quantity-${cartItem.productId}" type="number" min="1" max="10" value="${cartItem.quantity}"/>
                <span class="js-save-quantity-button-${cartItem.productId} js-save-price hidden ml-0.75 cursor-pointer text-[#017cb6] hover:text-red-700"
                  >Save</span
                >
                <span class="js-delete-item ml-0.75 cursor-pointer text-[#017cb6] hover:text-red-700"
                  >Delete</span
                >
              </p>
            </div>

            <div
              class="grid5:col-span-1 grid5:col-start-3 col-span-2 flex flex-col"
            >
              <p class="mb-2.5 font-bold">Choose a delivery option:</p>

              <div class="flex items-center mb-3">
                <input
                  class="js-shipping-${cartItem.productId}-1 ml-0 mr-1.25 scale-[1.1] cursor-pointer appearance-none w-4 h-4 border-1 border-gray-500 rounded-full checked:bg-blue-600"
                  type="radio"
                  data-product-id="${cartItem.productId}"
                  data-shipping-id="1"
                  name="shipping-${cartItem.productId}"
                  value="0"
                />
                <div class="flex flex-col">
                  <p class="font-[500] text-[rgb(0,118,0)]">
                    ${getShippingDate(7)}
                  </p>
                  <span class="text-[rgb(120,120,120)]"
                    >FREE Shipping</span
                  ></div
                >
              </div>

              <div class="flex items-center mb-3">
                <input
                  class="js-shipping-${cartItem.productId}-2 ml-0 mr-1.25 scale-[1.1] cursor-pointer appearance-none w-4 h-4 border-1 border-gray-500 rounded-full checked:bg-blue-600"
                  type="radio"
                  data-product-id="${cartItem.productId}"
                  data-shipping-id="2"
                  name="shipping-${cartItem.productId}"
                  value="499"
                />
                <div class="flex flex-col">
                  <p class="font-[500] text-[rgb(0,118,0)]">
                  ${getShippingDate(3)}
                  </p>
                  <span class="text-[15px] text-[rgb(120,120,120)]"
                    >$4.99 - Shipping</span
                  ></div
                >
              </div>

              <div class="flex items-center mb-3">
                <input
                  class="js-shipping-${cartItem.productId}-3 ml-0 mr-1.25 scale-[1.1] cursor-pointer appearance-none w-4 h-4 border-1 border-gray-500 rounded-full  checked:bg-blue-600"
                  type="radio"
                  data-product-id="${cartItem.productId}"
                  data-shipping-id="3"
                  name="shipping-${cartItem.productId}"
                  value="999"
                />
                <div class="flex flex-col">
                  <p class="font-[500] text-[rgb(0,118,0)]">
                  ${getShippingDate(1)}
                  </p>
                  <span class="text-[15px] text-[rgb(120,120,120)]"
                    >$9.99 - Shipping</span
                  ></div
                >
              </div>
            </div>
          </div>
        </div>`);
    }, "") +
    "</div>";

// Item quantity functionalities. (CRUD)
if (cartModule.cart.length > 0) {
  document.addEventListener("DOMContentLoaded", () => {
    const updateQuantity = (id) => {
      return () => {
        document
          .querySelector(`.js-update-quantity-button-${id}`)
          .classList.add("hidden");

        document
          .querySelector(`.js-item-quantity-${id}`)
          .classList.add("hidden");

        document
          .querySelector(`.js-change-quantity-${id}`)
          .classList.remove("hidden");

        document
          .querySelector(`.js-save-quantity-button-${id}`)
          .classList.remove("hidden");
      };
    };

    const saveQuantity = (id) => {
      return () => {
        document
          .querySelector(`.js-update-quantity-button-${id}`)
          .classList.remove("hidden");

        const savedQuantitySpan = document.querySelector(
          `.js-item-quantity-${id}`,
        );
        const inputQuantitySpan = document.querySelector(
          `.js-change-quantity-${id}`,
        );
        savedQuantitySpan.innerHTML = inputQuantitySpan.value;
        savedQuantitySpan.classList.remove("hidden");
        inputQuantitySpan.classList.add("hidden");

        document
          .querySelector(`.js-save-quantity-button-${id}`)
          .classList.add("hidden");

        cartModule.updateItemQuantity(id, Number(savedQuantitySpan.innerHTML));

        document.querySelector(".js-header-item-quantity").innerHTML =
          cartModule.calculateCartQuantity();

        document.querySelector(".js-order-quantity").innerHTML =
          cartModule.calculateCartQuantity();
      };
    };

    const deleteItem = (id) => {
      return () => {
        document.querySelector(`.js-item-card-${id}`).remove();
        cartModule.deleteFromCart(id);

        const totatCartQuantity = cartModule.calculateCartQuantity();
        document.querySelector(".js-header-item-quantity").innerHTML =
          totatCartQuantity;

        document.querySelector(".js-order-quantity").innerHTML =
          totatCartQuantity;

        if (totatCartQuantity === 0) {
          document.querySelector(".js-products-html").remove();
          document
            .querySelector("section")
            .insertAdjacentHTML("afterbegin", emptyCartHTML);

          updateOrderButton();
        }

        updatePrice();
      };
    };

    cartModule.cart.forEach((cartItem) => {
      cartItem.deliveryOptionId = cartItem.deliveryOptionId || "1";
      updateDeliveryDate(cartItem.productId);

      const htmlCard = document.querySelector(
        `.js-item-card-${cartItem.productId}`,
      );
      htmlCard
        .querySelector(`.js-update-quantity-button-${cartItem.productId}`)
        .addEventListener("click", updateQuantity(cartItem.productId));

      htmlCard
        .querySelector(`.js-save-quantity-button-${cartItem.productId}`)
        .addEventListener("click", saveQuantity(cartItem.productId));

      htmlCard
        .querySelector(`.js-delete-item`)
        .addEventListener("click", deleteItem(cartItem.productId));
    });
  });
}
