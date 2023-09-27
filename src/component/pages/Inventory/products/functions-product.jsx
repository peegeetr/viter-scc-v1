import { setError, setMessage } from "../../../../store/StoreAction";

// get beenifits leave
export const getRemaningQuantity = (item, stocksGroupProd, orderGroupProd) => {
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

  console.log(
    "remaingQunatity",
    remaingQunatity > 0,
    item.suppliers_products_name
  );
  return remaingQunatity;
};

// check if have pending order
export const getPendingOrders = (pendingAllOrder, item, dispatch) => {
  let havePending = false;
  pendingAllOrder?.data.map((poItem) => {
    // check if leave type aid is equal
    if (item.suppliers_products_aid === Number(poItem.orders_product_id)) {
      dispatch(setError(true));
      dispatch(
        setMessage(
          `You cannot update "${item.suppliers_products_name}" because it has pending order.`
        )
      );
      havePending = true;
    }
  });
  return havePending;
};
