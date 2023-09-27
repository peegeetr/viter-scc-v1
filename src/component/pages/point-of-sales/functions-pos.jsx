import { numberWithCommas, removeComma } from "../../helpers/functions-general";
import { getRemaningQuantity } from "../Inventory/products/functions-product";

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

export const getTotalAmountPending = (result) => {
  let finalResult = 0;
  result?.data.map((item) => {
    finalResult +=
      Number(item.orders_product_amount) - Number(item.sales_discount);
  });
  return finalResult;
};

export const checkInsufficientQty = (item, stocksGroupProd, orderGroupProd) => {
  let sQty = 0;
  let oQty = 0;
  let result = 0;

  if (getRemaningQuantity(item, stocksGroupProd, orderGroupProd) <= 0) {
    sQty += 1;
  }

  if (
    getRemaningQuantity(item, stocksGroupProd, orderGroupProd) <
    Number(item.orders_product_quantity)
  ) {
    oQty += 1;
  }

  result = oQty + sQty;

  return result;
};
