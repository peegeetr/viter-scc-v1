import { setError, setMessage } from "../../../../store/StoreAction";
import {
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
      result?.length > 0 ? Number(result[0].price_markup_whole_sale) / 100 : 0;
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
      result?.length > 0 ? Number(result[0].price_markup_whole_sale) / 100 : 0;
  }

  const percent = Number(productAmount) * Number(wholeSalePercent).toFixed(3);

  return percent;
};

export const getValueData = (
  values,
  item,
  stocksGroupProd,
  orderGroupProd,
  readPriceMarkup,
  dispatch
) => {
  let invalidAmount = false;
  let sales_discount = 0;
  const quantity = removeComma(`${values.orders_product_quantity}`);

  if (values.orders_is_discounted === "") {
    sales_discount = 0;
  }

  if (values.orders_is_discounted === otherDiscountId) {
    sales_discount = removeComma(`${Number(values.sales_discount)}`);
  }

  const newQty =
    getRemaningQuantity(item, stocksGroupProd, orderGroupProd) +
    Number(item.orders_product_quantity) -
    Number(quantity);

  const qty =
    getRemaningQuantity(item, stocksGroupProd, orderGroupProd) +
    Number(item.orders_product_quantity);

  const product_amount = Number(quantity) * Number(item.orders_product_srp);

  if (values.orders_is_discounted === wholeSaleDiscountId) {
    sales_discount = Number(
      getWholeSaleDiscount(readPriceMarkup, product_amount)
    );
  }

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
