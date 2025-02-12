import { products } from "../data/products.js";

export const renderProductsGrid = () => {
  document.querySelector("main").innerHTML = products.reduce((accum, curr) => {
    return (accum += `<div class="border-grayborder flex flex-col items-center justify-center border-r-1 border-b-1 border-solid pt-10 pr-[25px] pb-[25px] pl-[25px]">
    <div class="mb-5 flex h-[180px] items-center justify-center">
      <img
        src="${curr.image}"
        class="max-h-full max-w-full grow"
      />
    </div>

    <div class="mb-[5px] line-clamp-2 h-10 leading-[19px] w-full">
      ${curr.name}
    </div>

    <div class="mb-2.5 flex w-full items-center justify-start gap-1.5">
      <img
        src="images/ratings/rating-${curr.rating.stars * 10}.png"
        alt="Rating ${curr.rating.stars * 10} out of 5."
        class="w-25"
      />
      <p class="mt-[3px] cursor-pointer text-[#017cb6]">${curr.rating.count}</p>
    </div>

    <div class="mb-2.5 w-full text-start font-bold">$${(curr.priceCents / 100).toFixed(2)}</div>

    <div class="mb-4.25 flex w-full">
      <select class="js-select-quantity border-quantityborder focus:outline-amazondthird cursor-pointer rounded-[8px] border-[1px] border-solid bg-[rgb(240,240,240)] pt-0.75 pr-1.25 pb-0.75 pl-1.25 text-[15px] shadow-(--amazon-shadow)">
        <option selected value="1">
          1
        </option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>

    <div class="js-added-to-cart text-addedmsg flex w-full items-center justify-start gap-1.25 text-[16px] opacity-0">
      <img src="images/icons/checkmark.png" alt="Checkmark Icon" class="h-5" />
      <p>Added</p>
    </div>

    <div class="w-full">
      <button data-product-id="${curr.id}" data-product-name="${curr.name}" data-product-price="${curr.priceCents}" class="js-add-to-cart-btn bg-amazonbtn border-amazonbtnborder w-full cursor-pointer rounded-[50px] border-1 border-solid p-[8px] text-[13px] leading-4 font-[400] shadow-(--amazon-shadow) hover:bg-[rgb(247,202,0)] hover:border-[rgb(242,194,0)]">
        Add to Cart
      </button>
    </div>
  </div>`);
  }, "");
};
