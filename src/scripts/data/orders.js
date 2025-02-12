import dayjs from "https://unpkg.com/dayjs@1.11.13/esm/index.js";

export let orders = JSON.parse(localStorage.getItem("orders")) || [];

const saveToStorage = () => {
  localStorage.setItem("orders", JSON.stringify(orders));
};

export const addOrder = (order) => {
  orders.unshift(order);
  saveToStorage();
};

export const formatOrderDate = (date) => {
  return dayjs(date).format("MMMM D");
};
