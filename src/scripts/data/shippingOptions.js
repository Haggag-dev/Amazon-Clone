export const shippingOptions = [
  {
    id: "1",
    days: 7,
  },
  {
    id: "2",
    days: 3,
  },
  {
    id: "3",
    days: 1,
  },
];

export const getShippingDay = (id) => {
  for(let i = 0; i < shippingOptions.length; i++) {
    if (shippingOptions[i].id === id) return shippingOptions[i].days;
  }
};

export default shippingOptions;
