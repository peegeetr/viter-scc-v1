import { NumberFormatBase } from "react-number-format";
import {
  AssociateMemberId,
  notMemberId,
  numberWithCommas,
  removeComma,
} from "../../helpers/functions-general";

// compute Remaining Quantity
export const getDataPayNow = (result, memberId) => {
  let amount = 0;
  let totalAmount = 0;
  let discount = 0;
  let name = "";
  result?.pages.map((page) =>
    page?.data.map((item) => {
      if (Number(memberId) === Number(item.orders_member_id)) {
        amount += Number(item.orders_product_amount);
        discount += Number(item.sales_discount);
        name = `${item.members_last_name}, ${item.members_first_name}`;
      }
    })
  );
  totalAmount = amount - discount;

  return { name, totalAmount, discount, amount };
};

export const getTotaAmountPOS = (values, totalPrice) => {
  let result = 0;
  if (totalPrice !== "") {
    result = numberWithCommas(
      Number(
        Number(removeComma(values.orders_product_quantity)) *
          Number(totalPrice) -
          Number(removeComma(values.sales_discount))
      ).toFixed(2)
    );
  }
  return result;
};

export const getTotaAmountProduct = (values, totalPrice) => {
  let result = 0;
  if (totalPrice !== "") {
    result = numberWithCommas(
      Number(
        Number(removeComma(values.orders_product_quantity)) * totalPrice
      ).toFixed(2)
    );
  }
  return result;
};

export const getProductPrice = (propsVal, item) => {
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

export const getValueDataOldPOS = (
  values,
  item,remainingQuantity,
  dispatch
) => {
  let invalidAmount = false;
  const quantity = removeComma(`${values.orders_product_quantity}`);

  const sales_discount = removeComma(`${values.sales_discount}`);

  const newQty =
    getRemaningQuantity(item, remainingQuantity) +
    Number(item.orders_product_quantity) -
    Number(quantity);

  const qty =
    getRemaningQuantity(item, remainingQuantity) +
    Number(item.orders_product_quantity);
    
  const product_amount = Number(quantity) * Number(item.orders_product_srp);

  if (Number(sales_discount) > product_amount) {
    dispatch(setError(true));
    dispatch(setMessage("Invalid Discount Amount"));
    invalidAmount = true;
  }

  if (Number(quantity) === 0 || Number(quantity) > qty || newQty <= -1) {
    dispatch(setError(true));
    dispatch(setMessage("Insufficient Quantity"));
    invalidAmount = true;
  }
  return { sales_discount, product_amount, quantity, invalidAmount };
};
