import { renderHeader } from "../components/AmazonHeader.js";
import {
  getOrder,
  getProductItem,
  formatDeliveryDate,
} from "../data/orders.js";
import { getProduct, products } from "../data/products.js";
import dayjs from "https://unpkg.com/dayjs@1.11.13/esm/index.js";

const getOrderState = (orderTime, estimatedDeliveryTime) => {
  const startDate = dayjs(orderTime);
  const endDate = dayjs(estimatedDeliveryTime);

  const totalDuration = endDate.diff(startDate, "hours");

  const durationPassed = dayjs().diff(startDate, "hours");

  const perc = (durationPassed / totalDuration) * 100;

  let state;

  switch (true) {
    case perc >= 0 && perc < 5:
      state = ["5%", "Preparing"];
      break;

    case perc >= 5 && perc < 40:
      state = [`${perc}%`, "Preparing"];
      break;

    case perc >= 40 && perc < 100:
      state = [`${perc}%`, "Shipped"];
      break;

    case perc >= 100:
      state = ["100%", "Delivered"];
      break;
  }

  return state;
};

const updateOrderState = (barState) => {
  setTimeout(() => {
    document.querySelector(".js-loading-container div").style.width =
      barState[0];
  }, 500);

  const stateCSS = `text-[rgb(6,125,98)]`;
  const currState = barState[1];
  document.querySelector(".js-state-txt").innerHTML = `
    <div class="font-[500] ${currState === "Preparing" ? stateCSS : ""}">Preparing</div>
    <div class="font-[500] ${currState === "Shipped" ? stateCSS : ""}">Shipped</div>
    <div class="font-[500] ${currState === "Delivered" ? stateCSS : ""}">Delivered</div>
  `;
};

const renderTrackingData = () => {
  const url = new URL(window.location.href);
  const orderId = url.searchParams.get("orderId");
  const productId = url.searchParams.get("productId");

  const order = getOrder(orderId);
  const product = getProductItem(order, productId);

  document.querySelector("main").innerHTML = `<a
    href="orders.html"
    class="mb-7.5 inline-block cursor-pointer text-[#017cb6] underline"
    >View all orders</a
    >
    <div class="mb-2.5 text-[25px] leading-[30px] font-bold">
    Arriving on ${formatDeliveryDate(product.estimatedDeliveryTime)}
    </div>
    <div class="mb-0.75 leading-4.75">
    ${getProduct(productId, products).name}
    </div>
    <div class="mb-0.75">Quantity: ${product.quantity}</div>

    <img
    src="${getProduct(productId, products).image}"
    alt="${getProduct(productId, products).name}"
    class="mt-6.25 mb-12.5 max-h-[150px] max-w-[150px]"
    />

    <div
    class="js-state-txt grid2:flex-row grid2:justify-between grid2:w-full grid2:mb-3.75 grid3:text-[20px] mb-1.25 flex flex-col text-[16px]"
    >
    <div class="font-[500] text-[rgb(6,125,98)]">Preparing</div>
    <div class="font-[500]">Shipped</div>
    <div class="font-[500]">Delivered</div>
    </div>

    <div
    class="js-loading-container h-[25px] w-full overflow-hidden rounded-[50px] border-1 border-solid border-[rgb(200,200,200)]"
    >
    <div
    class="h-full w-0 rounded-[50px] bg-[green] transition-[width] duration-1000"
    ></div>
    </div>`;

  updateOrderState(
    getOrderState(order.orderTime, product.estimatedDeliveryTime),
  );
};

renderHeader();
renderTrackingData();
