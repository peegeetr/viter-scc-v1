// compute Remaining Quantity
export const computeSccSales = (result) => {
  let totalOty = 0;
  let supplierPrice = 0;
  let sccPriceAmount = 0;
  let sccPricePendingAmount = 0;
  let totalSupplierAmount = 0;
  let finalAmount = 0;
  let pendingAmount = 0;
  let totalProfit = 0;
  let pendingNegativeAmount = 0;
  let finalNegativeAmount = 0;

  // supplier
  let totalSupplierPriceAmount = 0;

  result?.pages.map((page) =>
    page?.data.map((item) => {
      // quantity
      totalOty = Number(item.orders_product_quantity);
      // supplier price
      supplierPrice = Number(item.orders_suplier_price);
      // supplier price * quantity
      totalSupplierAmount = supplierPrice * totalOty;

      let psAmount =
        Number(item.orders_product_amount) - Number(item.sales_discount);

      totalProfit += psAmount - totalSupplierAmount;

      // if is paid
      if (item.sales_is_paid === 1) {
        // amount - discount
        sccPriceAmount =
          Number(item.orders_product_amount) - Number(item.sales_discount);

        if (sccPriceAmount !== 0) {
          let fAmount = sccPriceAmount - totalSupplierAmount;
          if (fAmount > 0) {
            finalAmount += sccPriceAmount - totalSupplierAmount;
          }
          if (fAmount <= 0) {
            finalNegativeAmount += fAmount;
          }
        }
      }

      // if is pending
      if (item.sales_is_paid === 0) {
        // amount - discount
        sccPricePendingAmount =
          Number(item.orders_product_amount) - Number(item.sales_discount);

        if (sccPricePendingAmount !== 0) {
          let pAmount = sccPricePendingAmount - totalSupplierAmount;
          if (pAmount > 0) {
            pendingAmount += pAmount;
          }
          if (pAmount <= 0) {
            pendingNegativeAmount += pAmount;
          }
        }
      }

      totalOty = Number(item.orders_product_quantity);
      supplierPrice = Number(item.orders_suplier_price);
      totalSupplierPriceAmount += totalOty * supplierPrice;
    })
  );

  return {
    finalAmount,
    totalSupplierAmount,
    pendingAmount,
    totalSupplierPriceAmount,
    totalProfit,
    pendingNegativeAmount,
    finalNegativeAmount,
  };
};

export const computeSccSalesByItem = (item) => {
  let totalOty = 0;
  let supplierPrice = 0;
  let finalAmount = 0;
  let sccPriceAmount = 0;
  let amount = 0;
  // with value
  totalOty = Number(item.orders_product_quantity);
  supplierPrice = Number(item.orders_suplier_price);
  amount = totalOty * supplierPrice;
  sccPriceAmount =
    Number(item.orders_product_amount) - Number(item.sales_discount);
  finalAmount = sccPriceAmount - amount;

  if (finalAmount < 0) {
    finalAmount = 0;
  }
  return finalAmount;
};

export const computeSupplierTotalAmount = (item) => {
  let totalOty = 0;
  let supplierPrice = 0;
  let finalAmount = 0;
  let sccPriceAmount = 0;
  let amount = 0;
  // with value
  totalOty = Number(item.orders_product_quantity);
  supplierPrice = Number(item.orders_suplier_price);
  amount = totalOty * supplierPrice;
  sccPriceAmount =
    Number(item.orders_product_amount) - Number(item.sales_discount);
  finalAmount = sccPriceAmount - amount;

  if (finalAmount < 0) {
    finalAmount = 0;
  }
  return finalAmount;
};
