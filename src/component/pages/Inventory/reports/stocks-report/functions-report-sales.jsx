// compute Remaining Quantity
export const computeStockReportTotal = (result) => {
  let totalOty = 0;
  let supplierPrice = 0;

  // supplier
  let totalSupplierPriceAmount = 0;

  result?.pages.map((page) =>
    page?.data.map((item) => {
      totalOty = Number(item.stocksQuntity);
      supplierPrice = Number(item.product_history_price);
      totalSupplierPriceAmount += supplierPrice * totalOty;
    })
  );

  return {
    totalOty,
    totalSupplierPriceAmount,
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

// get beenifits leave
export const getProductRemaningQty = (item, orderGroupProd) => {
  let remaingQunatity = 0;
  let stockQuantity = 0;
  let orderQuantity = 0;
  // check if leave type aid is equal
  stockQuantity = item.stocksQuntity;
  orderGroupProd?.data.map((oqItem) => {
    // check if leave type aid is equal
    if (item.suppliers_products_aid === Number(oqItem.orders_product_id)) {
      orderQuantity = oqItem.orderQuantity;
    }
  });

  remaingQunatity = Number(stockQuantity) - Number(orderQuantity);
  return remaingQunatity;
};
