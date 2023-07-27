// compute sold
export const computeSoldProduct = (item, values, product) => {
  let finalAmount = 0;
  let sold = 0;
  product?.data.map((pItem) => {
    if (item && pItem.product_aid === Number(values.patronage_product_id)) {
      sold =
        Number(pItem.product_sold_quantity) -
        Number(values.patronage_product_quantity_old);

      finalAmount = sold + Number(values.patronage_product_quantity);
    }
    if (!item && pItem.product_aid === Number(values.patronage_product_id)) {
      finalAmount =
        Number(pItem.product_sold_quantity) +
        Number(values.patronage_product_quantity);
    }
  });
  return finalAmount;
};

// compute Remaining Quantity
export const computeRemainingQuantity = (item, values, product) => {
  let finalAmount = 0;
  let sold = 0;
  product?.data.map((pItem) => {
    if (item && pItem.product_aid === Number(values.patronage_product_id)) {
      sold =
        Number(pItem.product_remaining_quantity) +
        Number(values.patronage_product_quantity_old);

      finalAmount = sold - Number(values.patronage_product_quantity);
    }
    if (!item && pItem.product_aid === Number(values.patronage_product_id)) {
      finalAmount =
        Number(pItem.product_remaining_quantity) -
        Number(values.patronage_product_quantity);
    }
  });
  return finalAmount;
};
export const getYearListPatronage = () => {
  const d = new Date();
  let currentYear = d.getFullYear();
  let yearCount = 10;
  let list = [];

  for (let i = 0; i < yearCount; i++) {
    currentYear--;
    list.push({ year: `${Number(currentYear) + 1}` });
  }
  return list;
};

export const getComputePatronage = (item, patronage) => {
  let totalPtaronage = 0;
  let rate = 0;
  let myDividend = 0;
  let result = 0;
  // read all patronage by group year
  patronage?.data.map((pItem) => {
    if (item.year === pItem.year) {
      // All Member Total Average Shares Months
      totalPtaronage +=
        Number(pItem.totalPatronage) - Number(pItem.totalDiscount);
    }
  });
  // Rate of Interest on Share Capital
  rate = Number(item.net_surplus_dividend) / totalPtaronage;
  // my Total Average Shares Months
  myDividend = Number(item.total) / 12;

  result = myDividend * rate;

  return { result, rate, myDividend, totalPtaronage };
};
