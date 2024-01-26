import { setError, setMessage } from "../../../../store/StoreAction";
import {
  AssociateMemberId,
  notMemberId,
  numberWithCommas,
  otherDiscountId,
  removeComma,
  wholeSaleDiscountId,
} from "../../../helpers/functions-general";
import { getRemaningQuantity } from "../../Inventory/products/functions-product";

export const getTotaWithDiscount = (readPriceMarkup, values, totalPrice) => {
  let result = 0;
  let amount = 0;
  let sales_discount = 0;

  if (totalPrice !== "") {
    amount = numberWithCommas(
      Number(
        Number(removeComma(values.orders_product_quantity)) * Number(totalPrice)
      ).toFixed(2)
    );

    if (values.orders_is_discounted === wholeSaleDiscountId) {
      sales_discount = Number(getWholeSaleDiscount(readPriceMarkup, amount));
    }

    if (values.orders_is_discounted === otherDiscountId) {
      sales_discount = Number(values.sales_discount);
    }
  }
  result = (amount - sales_discount).toFixed(2);

  return result;
};

export const showWholeSale = (item) => {
  let result = false;
  if (
    item.suppliers_products_ws_retail_price !== "" ||
    item.suppliers_products_ws_scc_price !== ""
  ) {
    result = true;
    return result;
  }
};

export const getDiscount = (values) => {
  let discount = 0;

  if (values.orders_is_discounted === otherDiscountId) {
    discount = Number(removeComma(values.sales_discount));
  }
  return discount;
};

export const getChange = (values, item, isPayAll) => {
  let changeTotal = 0;

  if (!isPayAll) {
    changeTotal = numberWithCommas(
      (
        Number(removeComma(values.sales_receive_amount)) -
        Number(
          Number(item.orders_product_amount) - Number(item.sales_discount)
        ).toFixed(2)
      ).toFixed(2)
    );
  }

  if (isPayAll) {
    changeTotal = numberWithCommas(
      (
        Number(removeComma(values.sales_receive_amount)) -
        Number(item.totalAmount).toFixed(2)
      ).toFixed(2)
    );
  }

  return changeTotal;
};

export const getWholeSale = (values, item) => {
  let amount = 0;
  let isTrueAmount = false;

  // non member
  if (
    values.orders_is_discounted !== wholeSaleDiscountId &&
    (Number(item.orders_member_id) === notMemberId ||
      Number(item.orders_member_id) === AssociateMemberId)
  ) {
    const retailPrice =
      item.suppliers_products_retail_price === ""
        ? item.suppliers_products_scc_price
        : item.suppliers_products_retail_price;

    amount = Number(retailPrice) * Number(values.orders_product_quantity);
    isTrueAmount = true;
  }

  // member
  if (
    !isTrueAmount &&
    values.orders_is_discounted !== wholeSaleDiscountId &&
    (Number(item.orders_member_id) !== notMemberId ||
      Number(item.orders_member_id) !== AssociateMemberId)
  ) {
    amount =
      Number(item.suppliers_products_scc_price) *
      Number(values.orders_product_quantity);
    isTrueAmount = true;
  }

  // non member whole sale
  if (
    !isTrueAmount &&
    values.orders_is_discounted === wholeSaleDiscountId &&
    (Number(item.orders_member_id) === notMemberId ||
      Number(item.orders_member_id) === AssociateMemberId)
  ) {
    const retailWsPrice = item.suppliers_products_ws_retail_price;

    amount = Number(retailWsPrice) * Number(values.orders_product_quantity);
    isTrueAmount = true;
  }

  // member whole sale
  if (
    !isTrueAmount &&
    values.orders_is_discounted === wholeSaleDiscountId &&
    (Number(item.orders_member_id) !== notMemberId ||
      Number(item.orders_member_id) !== AssociateMemberId)
  ) {
    const memberWsPrice = item.suppliers_products_ws_scc_price;
    amount = Number(memberWsPrice) * Number(values.orders_product_quantity);
  }

  return amount;
};

export const getOrderSrpPrice = (values, item) => {
  let price = Number(item.orders_product_srp);
  let isTrueAmount = false;

  // non member
  if (
    values.orders_is_discounted !== wholeSaleDiscountId &&
    (Number(item.orders_member_id) === notMemberId ||
      Number(item.orders_member_id) === AssociateMemberId)
  ) {
    price =
      item.suppliers_products_retail_price === ""
        ? item.suppliers_products_scc_price
        : item.suppliers_products_retail_price;

    isTrueAmount = true;
  }

  // member
  if (
    !isTrueAmount &&
    values.orders_is_discounted !== wholeSaleDiscountId &&
    (Number(item.orders_member_id) !== notMemberId ||
      Number(item.orders_member_id) !== AssociateMemberId)
  ) {
    price = Number(item.suppliers_products_scc_price);
    isTrueAmount = true;
  }

  // non member whole sale
  if (
    !isTrueAmount &&
    values.orders_is_discounted === wholeSaleDiscountId &&
    (Number(item.orders_member_id) === notMemberId ||
      Number(item.orders_member_id) === AssociateMemberId)
  ) {
    price =
      item.suppliers_products_ws_retail_price === ""
        ? item.suppliers_products_scc_price
        : item.suppliers_products_ws_retail_price;

    isTrueAmount = true;
  }

  // member whole sale
  if (
    !isTrueAmount &&
    values.orders_is_discounted === wholeSaleDiscountId &&
    (Number(item.orders_member_id) !== notMemberId ||
      Number(item.orders_member_id) !== AssociateMemberId)
  ) {
    price =
      item.suppliers_products_ws_scc_price === ""
        ? item.suppliers_products_scc_price
        : item.suppliers_products_ws_scc_price;
  }

  return price;
};

export const getWholeSaleDiscountView = (readPriceMarkup, val, item) => {
  let totalAmount = 0;
  if (
    val.orders_product_quantity !== "" ||
    Number(val.orders_product_quantity) !== 0
  ) {
    totalAmount =
      Number(removeComma(val.orders_product_quantity)) *
      Number(item.orders_product_srp);
  }

  let wholeSalePercent = 0;
  // read Price Markup percent
  if (readPriceMarkup?.count > 0) {
    const result = readPriceMarkup?.data.filter(
      (markupItem) => markupItem.price_markup_is_active === 1
    );
    wholeSalePercent =
      result?.length > 0
        ? Number(result[0].price_markup_retail_whole_sale) / 100
        : 0;
  }

  const percent = Number(totalAmount) * Number(wholeSalePercent).toFixed(3);

  return percent;
};

export const getWholeSaleDiscount = (readPriceMarkup, productAmount) => {
  let wholeSalePercent = 0;
  // read Price Markup percent
  if (readPriceMarkup?.count > 0) {
    const result = readPriceMarkup?.data.filter(
      (markupItem) => markupItem.price_markup_is_active === 1
    );
    wholeSalePercent =
      result?.length > 0
        ? Number(result[0].price_markup_retail_whole_sale) / 100
        : 0;
  }

  const percent = Number(productAmount) * Number(wholeSalePercent).toFixed(3);

  return percent;
};

export const getValueData = (values, item, remainingQuantity, dispatch) => {
  let invalidAmount = false;
  let sales_discount = 0;
  const quantity = removeComma(`${values.orders_product_quantity}`);

  if (values.orders_is_discounted === "") {
    sales_discount = 0;
  }

  if (values.orders_is_discounted === otherDiscountId) {
    sales_discount = removeComma(`${values.sales_discount}`);
  }

  const newQty =
    getRemaningQuantity(item, remainingQuantity) +
    Number(item.orders_product_quantity) -
    Number(quantity);

  const qty =
    getRemaningQuantity(item, remainingQuantity) +
    Number(item.orders_product_quantity);

  const product_srp = getOrderSrpPrice(values, item);
  const product_amount = getWholeSale(values, item);

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
  return {
    sales_discount,
    product_amount,
    product_srp,
    quantity,
    invalidAmount,
  };
};
