import { NumberFormatBase } from "react-number-format";
import { numberWithCommas, removeComma } from "../../helpers/functions-general";

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
