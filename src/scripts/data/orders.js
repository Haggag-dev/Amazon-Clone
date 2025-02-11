let orders = JSON.parse(localStorage.getItem("orders")) || [];

const saveToStorage = () => {
  localStorage.setItem("orders", JSON.stringify(orders));
};

export const addOrder = (order) => {
  orders.unshift(order);
  saveToStorage();
};
