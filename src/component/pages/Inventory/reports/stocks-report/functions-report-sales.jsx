// get beenifits leave
// get beenifits leave
export const getProductRemaningQty = (item, ordersGroupProd) => {
  let remaingQunatity = 0;
  let stockQuantity = 0;
  let orderQuantity = 0;

  ordersGroupProd?.data.map((ordItem) => {
    // check if leave type aid is equal
    if (item.suppliers_products_aid === Number(ordItem.orders_product_id)) {
      orderQuantity = ordItem.orderQuantity;
    }
  });
  stockQuantity = item.stockQuantity;
  remaingQunatity = Number(stockQuantity) - Number(orderQuantity);
  return { remaingQunatity, stockQuantity };
};

// compute Remaining Quantity
export const computeStockReportTotal = (result, ordersGroupProd) => {
  let totalQty = 0;
  let pendingQty = 0;
  let sccPrice = 0;
  let totalRemAmount = 0;
  result?.pages.map((page) =>
    page?.data.map((item) => {
      // remainig quantity
      pendingQty = getProductRemaningQty(item, ordersGroupProd).remaingQunatity;

      totalQty += pendingQty;

      sccPrice = Number(item.suppliers_products_scc_price);

      totalRemAmount += sccPrice * pendingQty;
    })
  );

  return {
    totalQty,
    totalRemAmount,
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
