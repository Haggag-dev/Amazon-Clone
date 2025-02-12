import { renderHeader, updateCart } from "../components/AmazonHeader.js";
import { orders } from '../data/orders.js'

renderHeader();
updateCart();

console.log(orders)

const renderOrderHeader = (orderDetails) => {
  const html = ` <header
            class="grid3:flex-row grid3:items-center grid3:justify-between flex min-w-[200px] flex-col rounded-tl-[8px] rounded-tr-[8px] border-1 border-solid border-[rgb(213,217,217)] bg-[rgb(240,242,242)] p-3.75 leading-5.75"
          >
            <div class="grid3:flex">
              <div
                class="grid3:flex-col grid3:gap-x-0 grid3:mr-11.25 flex gap-x-[5px]"
              >
                <div class="font-[500] whitespace-nowrap">Order Placed:</div>
                <div>February 11</div>
              </div>

              <div class="grid3:flex-col grid3:gap-x-0 flex gap-x-[5px]">
                <div class="auto font-[500]">Total:</div>
                <div>$58.00</div>
              </div>
            </div>

            <div class="grid3:flex-col grid3:gap-x-0 flex gap-x-[5px]">
              <div class="font-[500] whitespace-nowrap">Order ID:</div>
              <div class="shrink">e3e3c358-3021-5b62-10f1-92fc15fc8e77</div>
            </div>
          </header>`;
};
