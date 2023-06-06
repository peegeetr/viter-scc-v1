// get beenifits leave
export const getRemaningQuantity = (item, stocksGroupProd, orderGroupProd) => {
  let remaingQunatity = 0;
  let stockQuantity = 0;
  let orderQuantity = 0;
  stocksGroupProd?.data.map((sqItem) => {
    // check if leave type aid is equal
    if (
      Number(item.suppliers_products_aid) === Number(sqItem.stocks_product_id)
    ) {
      stockQuantity = sqItem.stockQuantity;
    }
  });
  orderGroupProd?.data.map((oqItem) => {
    // check if leave type aid is equal
    if (
      Number(item.suppliers_products_aid) === Number(oqItem.orders_product_id)
    ) {
      orderQuantity = oqItem.orderQuantity;
    }
  });
  remaingQunatity = Number(stockQuantity) - Number(orderQuantity);
  return remaingQunatity;
};
