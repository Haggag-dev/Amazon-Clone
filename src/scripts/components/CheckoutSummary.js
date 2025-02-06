import { cart } from "../data/cart.js";

// Shipping dates.
const shippingDates = () => {
  // 11 days from today. FREE
  // 5 days from today. $4.99
  // 1 day from today (tommorow). $9.99
};

// Total initial price.
const updateInitialPrice = () => {
  const price = cart.reduce(
    (accum, cartItem) =>
      (accum +=
        cartItem.priceCents *
        Number(
          document.querySelector(`.js-item-quantity-${cartItem.id}`).innerHTML,
        )),
    0,
  );

  document.querySelector(".js-inital-price").dataset.initialPriceCents = price;
  document.querySelector(".js-inital-price").innerHTML =
    `$${(price / 100).toFixed(2)}`;
};

// Shipping Price
let shippingPrice = 0; // For initial DOM loading. To set it differently, when cleaning code at the end of the project. (LocalStorage accomodation)
const updateShippingPrice = (shippingPrice) => {
  document.querySelector(".js-shipping-price").innerHTML =
    `$${(shippingPrice / 100).toFixed(2)}`;

  document.querySelector(".js-shipping-price").dataset.shippingPriceCents =
    shippingPrice;
};

const calcShippingPrice = () => {
  const checkedRadio = document.getElementsByTagName("input");

  return Array.from(checkedRadio).reduce((accum, curr) => {
    if (curr.checked) return (accum += Number(curr.value));
    return accum;
  }, 0);
};

// Total before tax
const updateBeforeTax = () => {
  const initalPriceCents =
    document.querySelector(".js-inital-price").dataset.initialPriceCents;
  const shippingPriceCents =
    document.querySelector(".js-shipping-price").dataset.shippingPriceCents;

  const beforeTaxCents = Number(initalPriceCents) + Number(shippingPriceCents);
  document.querySelector(".js-before-tax").innerHTML =
    `$${(beforeTaxCents / 100).toFixed(2)}`;
  return beforeTaxCents;
};

// Estimated tax
const updateEstimatedTax = () => {
  const tax = updateBeforeTax();
  document.querySelector(".js-estimated-tax").innerHTML =
    `$${(tax * 0.001).toFixed(2)}`;
  return tax;
};

// Order total // To fix the decimal issue later on.
const updateTotal = () => {
  const orderTotal = updateBeforeTax() + updateEstimatedTax() * 0.1;
  document.querySelector(".js-order-total").innerHTML =
    `$${(orderTotal / 100).toFixed(2)}`;
};

const updatePrice = () => {
  updateInitialPrice();
  updateShippingPrice(calcShippingPrice());
  updateBeforeTax();
  updateEstimatedTax();
  updateTotal();
  updateOrderButton(); // To relocate later!! [TO-DO]
};

// Call functions accordingly.
addEventListener("DOMContentLoaded", () => {
  const radioButtons = document.querySelectorAll('input[type="radio"]');

  document
    .querySelectorAll(`.js-save-price`)
    .forEach((spanQuantityElement) =>
      spanQuantityElement.addEventListener("click", updatePrice),
    );

  radioButtons.forEach((button) =>
    button.addEventListener("change", () => {
      updatePrice();
    }),
  );
  updatePrice();
});

// Update Place Order Button
const updateOrderButton = () => {
  const button = document.querySelector(".js-place-order");
  button.classList.toggle("opacity-50", cart.length === 0);
};

export const html = `<div
          class="grid5:order-last border-grayborder order-first mb-2 max-h-[350px] rounded-[5px] border-1 border-solid pt-4.5 pr-4.5 pb-1.25 pl-4.5"
        >
          <h3 class="mb-3 text-lg font-bold">Order Summary</h3>

          <div class="mb-2.25 flex justify-between text-[15px]">
            <p>Items (<span>0</span>):</p>
            <p class="js-inital-price" data-initial-price-cents="0">$0.00</p>
          </div>

          <div class="mb-2.25 flex justify-between text-[15px]">
            <p>Shipping & handling:</p>
            <p class="js-shipping-price" data-shipping-price-cents="0">$0.00</p>
          </div>

          <div class="mb-2.25 flex justify-between text-[15px]">
            <p class="pt-2.25">Total before tax:</p>
            <p class="js-before-tax border-t-grayborder border-t-1 border-solid pt-2.25">
              $0.00
            </p>
          </div>

          <div class="mb-2.25 flex justify-between text-[15px]">
            <p>Estimated tax (10%):</p>
            <p class="js-estimated-tax">$0.00</p>
          </div>

          <div
            class="border-t-grayborder mb-2.25 flex justify-between border-t-1 border-solid pt-4.5 text-[18px] font-bold text-[rgb(177,39,4)]"
          >
            <p>Order total:</p>
            <p class="js-order-total">$0.00</p>
          </div>

          <button
            class="js-place-order bg-amazonbtn border-amazonbtnborder mt-5 mb-4.75 w-full cursor-pointer rounded-[8px] border-1 border-solid p-3 text-[13px] leading-4 font-[400] text-[rgb(33,33,33)] opacity-50 shadow-(--amazon-shadow)"
          >
            Place Your Order
          </button>
        </div>`;
