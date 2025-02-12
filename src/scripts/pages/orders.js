import { renderHeader, updateCart } from "../components/AmazonHeader.js";
import { orders, formatOrderDate } from "../data/orders.js";
import { getProduct, products } from "../data/products.js";
import formatCurrency from "../utils/money.js";

const orderHeaderHTML = (orderDetails) => {
  return `<header
            class="grid3:flex-row grid3:items-center grid3:justify-between flex min-w-[200px] flex-col rounded-tl-[8px] rounded-tr-[8px] border-1 border-solid border-[rgb(213,217,217)] bg-[rgb(240,242,242)] p-3.75 leading-5.75"
          >
            <div class="grid3:flex">
              <div
              class="grid3:flex-col grid3:gap-x-0 grid3:mr-11.25 flex gap-x-[5px]"
              >
              <div class="font-[500] whitespace-nowrap">Order Placed:</div>
              <div>${formatOrderDate(orderDetails.orderTime)}</div>
              </div>

              <div class="grid3:flex-col grid3:gap-x-0 flex gap-x-[5px]">
              <div class="auto font-[500]">Total:</div>
              <div>$${formatCurrency(orderDetails.totalCostCents)}</div>
              </div>
              </div>

              <div class="grid3:flex-col grid3:gap-x-0 flex gap-x-[5px]">
              <div class="font-[500] whitespace-nowrap">Order ID:</div>
              <div class="shrink">${orderDetails.id}</div>
              </div>
        </header>`;
};

const orderProductHTML = (
  productDetails,
  productQuantity,
  orderArrivalDate,
) => {
  return `<div class="mb-6.25">
              <img
                src="${productDetails.image}"
                alt="${productDetails.name}"
                class="grid2:max-w-[110px] grid2:max-h-[110px] mx-auto max-h-[150px] max-w-[150px]"
              />
            </div>

            <div>
              <div class="mb-2.5 font-bold">
                ${productDetails.name}
              </div>
              <div class="mb-0.75">Arriving on: ${orderArrivalDate}</div>
              <div class="mb-3.75">Quantity: ${productQuantity}</div>
              <button
                data-product-id="${productDetails.id}"
                class="bg-amazonbtn grid2:w-[140px] border-amazonbtnborder mb-3.75 flex h-9 w-full cursor-pointer items-center justify-center rounded-[8px] border-1 border-solid p-[8px] shadow-(--amazon-shadow) hover:border-[rgb(242,194,0)] hover:bg-[rgb(247,202,0)]"
              >
                <img
                  src="images/icons/buy-again.png"
                  alt="Buy it again icon."
                  class="grid2:w-6.25 grid2:mr-3.75 mr-6.25 w-6.25"
                />
                <span class="text-[15px]">Buy it again</span>
                <span class="hidden text-[15px]">✔ Added</span>
              </button>
            </div>

            <div
              class="grid2:col-start-2 grid2:col-end-auto grid4:col-start-3 grid2:mb-7.5 mb-17.5"
            >
              <button
                class="grid2:w-[140px] grid2:p-2 grid4:w-full w-full cursor-pointer rounded-[8px] border-1 border-solid border-[#D5D9D9] p-3 text-[15px] shadow-(--amazon-shadow) hover:bg-[#F7FAFA]"
              >
                Track Package
              </button>
            </div>`;
};

const orderHTML = (order) => {
  let headerHTML = orderHeaderHTML(order);

  const productDetailsHTML = order.products.reduce((acc, product) => {
    return (acc += orderProductHTML(
      getProduct(product.productId, products),
      product.quantity,
      formatOrderDate(product.estimatedDeliveryTime),
    ));
  }, "");

  return `<section class="js-test font-body text-amazonfourth">
            ${headerHTML}

            <div
            class="grid2:grid-cols-[110px_1fr] grid2:pb-2 grid4:grid-cols-[110px_1fr_220px] grid4:gap-y-15 grid4:pb-10 grid grid-cols-1 gap-x-8.75 rounded-br-[8px] rounded-bl-[8px] border-1 border-t-0 border-solid border-[rgb(213,217,217)] pt-10 pr-6.25 pb-10 pl-6.25"
            >
                ${productDetailsHTML}
            </div>
        </section>`;
};

const renderOrdersGrid = () => {
  const ordersHTML = orders.reduce(
    (acc, order) => (acc += orderHTML(order)),
    "",
  );

  document.querySelector(".js-orders-grid").innerHTML =
    `<div class="js-test grid grid-cols-1 gap-y-12.5"> ${ordersHTML} </div>`;
};


renderHeader();
updateCart();
renderOrdersGrid();