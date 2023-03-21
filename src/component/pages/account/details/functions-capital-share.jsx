// compute capital
export const computeTotalCapital = (capitalShare) => {
  let finalAmount = 0;
  capitalShare?.data.map((capitalItem) => {
    finalAmount += Number(capitalItem.capital_share_paid_up);
  });
  console.log(finalAmount);
  return finalAmount;
};

// Total quantity
export const computeQuantity = (item) => {
  let finalAmount =
    Number(item.product_quantity) - Number(item.product_sold_quantity);
  return finalAmount;
};
