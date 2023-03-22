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

// Total quantity
export const computeTotalSold = (item, PatronageId) => {
  let finalAmount = item.patronage_product_quantity;

  PatronageId?.data.map((pItem) => {
    if (item.patronage_product_id === pItem.product_aid)
      finalAmount =
        Number(pItem.product_sold_quantity) +
        Number(item.patronage_product_quantity);
  });
  console.log(finalAmount);
  return finalAmount;
};
