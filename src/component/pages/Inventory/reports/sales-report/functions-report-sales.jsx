// compute Remaining Quantity
export const computeSccSales = (result) => {
  let totalOty = 0;
  let supplierPrice = 0;
  let sccPriceAmount = 0;
  let totalSupplierAmount = 0;
  let finalAmount = 0;
  let pendingAmount = 0;
  result?.pages.map((page) =>
    page?.data.map((item) => {
      if (item.sales_is_paid === 1) {
        totalOty = Number(item.orders_product_quantity);
        supplierPrice = Number(item.orders_suplier_price);
        totalSupplierAmount = totalOty * supplierPrice;
        sccPriceAmount =
          Number(item.orders_product_amount) - Number(item.sales_discount);
        finalAmount += sccPriceAmount - totalSupplierAmount;
      }
      if (item.sales_is_paid === 0) {
        totalOty = Number(item.orders_product_quantity);
        supplierPrice = Number(item.orders_suplier_price);
        totalSupplierAmount = totalOty * supplierPrice;
        sccPriceAmount =
          Number(item.orders_product_amount) - Number(item.sales_discount);
        pendingAmount += sccPriceAmount - totalSupplierAmount;
      }
    })
  );
  return { finalAmount, totalSupplierAmount, pendingAmount };
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
  finalAmount += sccPriceAmount - amount;

  return finalAmount;
};
