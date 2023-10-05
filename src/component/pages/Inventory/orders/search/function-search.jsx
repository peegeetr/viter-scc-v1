import {
  AssociateMemberId,
  notMemberId,
} from "../../../../helpers/functions-general";

// get beenifits leave
export const getOrderRemaningQuantity = (
  item,
  stocksGroupProd,
  orderGroupProd
) => {
  let remaingQunatity = 0;
  let stockQuantity = 0;
  let orderQuantity = 0;

  // referral source
  if (stocksGroupProd?.data.length > 0) {
    const result = stocksGroupProd?.data.filter(
      (sqItem) =>
        Number(sqItem.stocks_product_id) === item.suppliers_products_aid
    );
    stockQuantity = result?.length > 0 ? `${result[0].stockQuantity}` : "";
  }
  // referral source
  if (orderGroupProd?.data.length > 0) {
    const result = orderGroupProd?.data.filter(
      (oqItem) =>
        Number(oqItem.orders_product_id) === item.suppliers_products_aid
    );
    orderQuantity = result?.length > 0 ? `${result[0].orderQuantity}` : "";
  }

  remaingQunatity = Number(stockQuantity) - Number(orderQuantity);

  return remaingQunatity;
};
export const getOrderProductPrice = (propsVal, item) => {
  let price = 0;
  if (
    (Number(propsVal.orders_member_id) === notMemberId ||
      Number(propsVal.orders_member_id) === AssociateMemberId) &&
    item.suppliers_products_retail_price !== ""
  ) {
    price = item.suppliers_products_retail_price;
  } else {
    price = item.product_history_scc_price;
  }
  return price;
};
