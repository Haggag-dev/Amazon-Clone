const saveToStorage = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export let cart = JSON.parse(localStorage.getItem("cart")) || [
  {
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
    shippingId: 1,
  },
  {
    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
    shippingId: 2,
  },
];

export const calculateCartQuantity = () =>
  cart.reduce((accum, curr) => (accum += curr.quantity), 0);

export const updateItemQuantity = (id, quantity) => {
  for (let i = 0; i < cart.length; i++)
    if (id === cart[i].id) {
      cart[i].quantity = quantity;
      saveToStorage();
      return;
    }
};

export const updateShippingId = (id, shippingId) => {
  for (let i = 0; i < cart.length; i++)
    if (id === cart[i].id) {
      cart[i].shippingId = shippingId;
      saveToStorage();
      return;
    }
};

export const addProductToCart = (btnIndex) => {
  return () => {
    const addToCartElement = document.querySelectorAll(".js-add-to-cart-btn");
    const product = addToCartElement[btnIndex].dataset;

    let quantity;

    const select = document.querySelectorAll(".js-select-quantity")[btnIndex];
    quantity = Number(select.options[select.selectedIndex].value);

    for (let i = 0; i < cart.length; i++) {
      if (product.productId === cart[i].id) {
        cart[i].quantity += quantity;
        return;
      }
    }

    cart.push({
      id: product.productId,
      quantity,
    });
    saveToStorage();
  };
};

export const deleteFromCart = (itemId) => {
  const filteredCart = cart.filter((cartItem) => cartItem.id !== itemId);
  cart = filteredCart;
  saveToStorage();
};

export const getShippingId = (productId) => {
  for (let i = 0; i < cart.length; i++)
    if (productId === cart[i].id) return cart[i].shippingId;
};
