import { setError, setMessage } from "../../../../store/StoreAction";
import { removeComma } from "../../../helpers/functions-general";
import { getRemaningQuantity } from "../../Inventory/products/functions-product";

// compute tota amount
export const getValidationMyOrder = (
  values,
  item,
  items,
  dispatch,
  stocksGroupProd,
  orderGroupProd
) => {
  let invalidAmount = false;
  let list = [];
  const orders_product_quantity = removeComma(
    `${values.orders_product_quantity}`
  );

  const orders_product_amount =
    Number(orders_product_quantity) *
    Number(
      item ? item.suppliers_products_scc_price : items.product_history_scc_price
    );

  if (
    Number(orders_product_quantity) >
      getRemaningQuantity(
        item ? item : items,
        stocksGroupProd,
        orderGroupProd
      ) ||
    getRemaningQuantity(
      item ? item : items,
      stocksGroupProd,
      orderGroupProd
    ) === 0
  ) {
    dispatch(setError(true));
    dispatch(setMessage("Insufficient Quantity"));
    invalidAmount = true;
  }
  list.push({
    orders_product_srp: items.product_history_scc_price,
    orders_product_amount: orders_product_amount,
    orders_product_quantity: orders_product_quantity,
  });

  return {
    list,
    invalidAmount,
  };
};
