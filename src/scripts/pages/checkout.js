import { html as headerHTML } from "../components/CheckoutHeader.js";
import { html as checkoutSummaryHTML } from "../components/CheckoutSummary.js";
import { html as checkoutDetailsHTML } from "../components/CheckoutDetails.js";
import { cart } from "../data/cart.js";
import { addOrder } from "../data/orders.js";

// Loading the checkout header HTML.
document.querySelector("header").innerHTML = headerHTML;

// Loading the checkout details HTML.
document.querySelector("section").innerHTML =
  checkoutDetailsHTML + checkoutSummaryHTML;

export const placeOrder = async () => {
  try {
    const url = "https://supersimplebackend.dev/orders";
    const jsonCart = JSON.stringify({ cart });

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonCart,
    });

    const order = await response.json();

    addOrder(order);

    console.log(order)
    // window.location.href = "orders.html";
  } catch (err) {
    console.log(err);
  }
};

document.querySelector(".js-place-order").addEventListener("click", placeOrder);
