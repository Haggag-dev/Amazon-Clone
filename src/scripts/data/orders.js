import dayjs from "https://unpkg.com/dayjs@1.11.13/esm/index.js";

export let orders = JSON.parse(localStorage.getItem("orders")) || [
  {
    id: "27cba69d-4c3d-4098-b42d-ac7fa62b7664",
    orderTimeMs: dayjs().toISOString(),
    totalCostCents: 3506,
    products: [
      {
        cartItemId: "79b6831d-f135-44b4-a709-42f3305f7e68",
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 1,
        estimatedDeliveryTime: dayjs().add(7, "day").toISOString(),
      },
      {
        cartItemId: "dc804e77-cd81-4383-84e6-78f50c19d4b2",
        productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
        quantity: 2,
        estimatedDeliveryTime: dayjs().add(3, "day").toISOString(),
      },
    ],
  },
];

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
