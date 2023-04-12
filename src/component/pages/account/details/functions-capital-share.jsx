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
export const computeQuantity = (RemainingPatronage) => {
  let finalAmount = 0;
  RemainingPatronage?.data.map((sold) => {
    finalAmount += Number(sold.patronage_product_quantity);
  });
  return finalAmount;
};

// Total quantity
export const computeTotalSold = (item, PatronageId) => {
  let finalAmount = 0;

  PatronageId?.data.map((pItem) => {
    if (item.patronage_product_id === pItem.product_aid)
      finalAmount =
        Number(pItem.product_remaining_quantity) -
        Number(item.patronage_product_quantity);
  });
  console.log(finalAmount);
  return finalAmount;
};
