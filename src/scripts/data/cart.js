// Make an array of objects, where each object has the productId, name, and quantity ordered.
export const cart = [
  {
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
    priceCents: 1090,
    image: "images/products/athletic-cotton-socks-6-pairs.jpg",
    quantity: 2,
  },
  {
    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    name: "Intermediate Size Basketball",
    priceCents: 2095,
    image: "images/products/intermediate-composite-basketball.jpg",
    quantity: 1,
  },
];

// Save the product to cart.

// export const addProductToCart = (btnIndex) => {
//   return () => {
//     const product = addToCartElement[btnIndex].dataset;
//     let quantity;

//     const select = document.querySelectorAll(".js-select-quantity")[btnIndex];
//     quantity = Number(select.options[select.selectedIndex].value);

//     for (let i = 0; i < cart.length; i++) {
//       if (product.productId === cart[i].id) {
//         cart[i].quantity += quantity;
//         return;
//       }
//     }

//     cart.push({
//       id: product.productId,
//       name: product.productName,
//       priceCents: product.productPrice,
//       quantity,
//     });
//   };
// };
