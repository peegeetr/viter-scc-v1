import {
  AssociateMemberId,
  notMemberId,
} from "../../../../helpers/functions-general";

// get beenifits leave
export const getOrderRemaningQuantity = (
  item,remainingQuantity
) => { 
  let remaingQunatity = 0; 
  if (remainingQuantity?.data.length > 0) {
    const result = remainingQuantity?.data.filter(
      (qItem) =>
        Number(qItem.stocks_product_id) === Number(item.suppliers_products_aid)
    );
    remaingQunatity = result?.length > 0 ? `${result[0].totalQty}` : "0";
  } 

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
