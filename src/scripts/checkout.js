import { html as headerHTML } from "./components/CheckoutHeader.js";
import { html as checkoutDetailsHTML } from "./components/CheckoutDetails.js";
import { html as checkoutSummaryHTML } from "./components/CheckoutSummary.js";

// Loading the checkout header HTML.
document.querySelector("header").innerHTML = headerHTML;

// Loading the checkout details HTML.
document.querySelector("section").innerHTML =
  checkoutDetailsHTML + checkoutSummaryHTML;
