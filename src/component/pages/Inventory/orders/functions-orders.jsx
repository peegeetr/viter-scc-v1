import { setError, setMessage } from "../../../../store/StoreAction";
import {
  AssociateMemberId,
  notMemberId,
  numberWithCommas,
  otherDiscountId,
  removeComma,
  wholeSaleDiscountId,
} from "../../../helpers/functions-general";
import { getTotaWithDiscount } from "../../point-of-sales/modal/functions-newpos";
import { getRemaningQuantity } from "../products/functions-product";

// compute sold
export const computeSoldProduct = (item, values, product) => {
  let finalAmount = 0;
  let sold = 0;
  product?.data.map((pItem) => {
    if (item && pItem.product_aid === Number(values.patronage_product_id)) {
      sold =
        Number(pItem.product_sold_quantity) -
        Number(values.patronage_product_quantity_old);

      finalAmount = sold + Number(values.patronage_product_quantity);
    }
    if (!item && pItem.product_aid === Number(values.patronage_product_id)) {
      finalAmount =
        Number(pItem.product_sold_quantity) +
        Number(values.patronage_product_quantity);
    }
  });
  return finalAmount;
};

// compute Remaining Quantity
export const computeRemainingQuantity = (item, values, product) => {
  let finalAmount = 0;
  let sold = 0;
  product?.data.map((pItem) => {
    if (item && pItem.product_aid === Number(values.patronage_product_id)) {
      sold =
        Number(pItem.product_remaining_quantity) +
        Number(values.patronage_product_quantity_old);

      finalAmount = sold - Number(values.patronage_product_quantity);
    }
    if (!item && pItem.product_aid === Number(values.patronage_product_id)) {
      finalAmount =
        Number(pItem.product_remaining_quantity) -
        Number(values.patronage_product_quantity);
    }
  });
  return finalAmount;
};

// compute Remaining Quantity
export const computeFinalAmount = (item) => {
  let finalAmount = 0;
  let productAmount = Number(item.orders_product_amount);
  let discountAmount = Number(item.sales_discount);

  finalAmount = productAmount - discountAmount;
  return finalAmount.toFixed(2);
};

// compute Remaining Quantity
export const getProductDetails = (item, stocksGroupProd, orderGroupProd) => {
  let finalResult = "";
  let result = item.suppliers_products_name;
  let remaining = getRemaningQuantity(item, stocksGroupProd, orderGroupProd);

  finalResult = `${result} (${remaining} pcs) `;

  return finalResult;
};

// compute Remaining Quantity in modal
export const modalComputeAmountWithDiscount = (amount, discount) => {
  let finalAmount = 0;
  let productAmount = Number(amount);
  let discountAmount = Number(discount);

  finalAmount = productAmount - discountAmount;
  return finalAmount.toFixed(2);
};

export const getTotaAmountOrder = (values, totalPrice) => {
  let result = 0;
  if (totalPrice !== "") {
    result =
      Number(removeComma(values.orders_product_quantity)) * Number(totalPrice);
  }
  return result;
};

// compute tota amount
export const computeInventoryOrderTotalOrderAmount = (result) => {
  let totaldiscount = 0;
  let totalPaid = 0;
  let totalPending = 0;
  let totalOty = 0;
  let finalPaidAmount = 0;
  let finalDiscount = 0;
  let finalAmountWithOutDiscount = 0;
  let finalAmount = 0;

  result?.pages.map((page) =>
    page?.data.map((item) => {
      if (item.orders_is_paid === 0) {
        totalPending += Number(item.orders_product_amount);
      }
      if (item.orders_is_paid === 1) {
        totalPaid = Number(item.orders_product_amount);
        totaldiscount = Number(item.sales_discount);
        finalAmountWithOutDiscount = totalPaid - totaldiscount;
        finalPaidAmount += finalAmountWithOutDiscount;
      }

      totalOty += Number(item.orders_product_quantity);
      finalDiscount += Number(item.sales_discount);
    })
  );
  finalAmount = finalPaidAmount + totalPending;

  return {
    totalPending,
    finalPaidAmount,
    finalAmount,
    totalOty,
    finalDiscount,
  };
};

// compute tota amount
export const getValidationOrderAdd = (
  values,
  item,
  items,
  dispatch,
  isPaid,
  stocksGroupProd,
  orderGroupProd
) => {
  let invalidAmount = false;
  let list = [];

  const orders_product_quantity = removeComma(
    `${values.orders_product_quantity}`
  );
  const sales_receive_amount = removeComma(`${values.sales_receive_amount}`);
  const sales_discount = getInventoryOrderDiscount(values).toFixed(2);

  const price = item
    ? getInventoryOrderPrice(values, item)
    : getInventoryOrderPrice(values, items);

  const orders_product_amount = Number(orders_product_quantity) * Number(price);

  if (Number(sales_discount) > Number(orders_product_amount)) {
    dispatch(setError(true));
    dispatch(setMessage("Invalid Discount Amount"));
    invalidAmount = true;
  }

  const newQty = item
    ? getRemaningQuantity(
        item ? item : items,
        stocksGroupProd,
        orderGroupProd
      ) - Number(orders_product_quantity)
    : getRemaningQuantity(item ? item : items, stocksGroupProd, orderGroupProd);

  const qty = item
    ? getRemaningQuantity(item ? item : items, stocksGroupProd, orderGroupProd)
    : getRemaningQuantity(item ? item : items, stocksGroupProd, orderGroupProd);

  if (
    Number(orders_product_quantity) === 0 ||
    Number(orders_product_quantity) > qty ||
    newQty <= -1
  ) {
    dispatch(setError(true));
    dispatch(setMessage("Insufficient quantity"));
    invalidAmount = true;
  }
  if (
    !item &&
    isPaid === "1" &&
    Number(sales_receive_amount) <
      modalComputeAmountWithDiscount(orders_product_amount, sales_discount)
  ) {
    dispatch(setError(true));
    dispatch(setMessage("Insufficient amount"));
    invalidAmount = true;
  }

  const sales_member_change = item
    ? 0
    : Number(sales_receive_amount) -
      (Number(orders_product_amount) - Number(sales_discount));

  list.push({
    sales_member_change: sales_member_change.toFixed(2),
    orders_product_amount: orders_product_amount,
    sales_discount: sales_discount,
    sales_receive_amount: sales_receive_amount,
    orders_product_quantity: orders_product_quantity,
    orders_product_srp: price,
  });

  return {
    list,
    invalidAmount,
  };
};

export const getWholeSaleDiscountOrder = (readPriceMarkup, val, price) => {
  let totalAmount = 0;
  if (
    val.orders_product_quantity !== "" ||
    Number(val.orders_product_quantity) !== 0
  ) {
    totalAmount =
      Number(removeComma(val.orders_product_quantity)) * Number(price);
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

export const getSelectedProduct = (
  item,
  stocksGroupProd,
  orderGroupProd,
  totalPrice,
  items
) => {
  let productDetails = "--";
  let result = "";
  if (item) {
    productDetails = getProductDetails(item, stocksGroupProd, orderGroupProd);
    result = numberWithCommas(Number(totalPrice).toFixed(2));
  }

  if (!item && items.suppliers_products_name !== undefined) {
    productDetails = getProductDetails(items, stocksGroupProd, orderGroupProd);
    result = numberWithCommas(Number(totalPrice).toFixed(2));
  }

  return { productDetails, result };
};

export const getInventoryWholeSales = (values, item) => {
  let amount = 0;
  let isTrueAmount = false;

  // non member
  if (
    values.orders_is_discounted !== wholeSaleDiscountId &&
    (Number(values.orders_member_id) === notMemberId ||
      Number(values.orders_member_id) === AssociateMemberId)
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
    (Number(values.orders_member_id) !== notMemberId ||
      Number(values.orders_member_id) !== AssociateMemberId)
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
    (Number(values.orders_member_id) === notMemberId ||
      Number(values.orders_member_id) === AssociateMemberId)
  ) {
    const retailWsPrice = item.suppliers_products_ws_retail_price;

    amount = Number(retailWsPrice) * Number(values.orders_product_quantity);
    isTrueAmount = true;
  }

  // member whole sale
  if (
    !isTrueAmount &&
    values.orders_is_discounted === wholeSaleDiscountId &&
    (Number(values.orders_member_id) !== notMemberId ||
      Number(values.orders_member_id) !== AssociateMemberId)
  ) {
    const memberWsPrice = item.suppliers_products_ws_scc_price;
    amount = Number(memberWsPrice) * Number(values.orders_product_quantity);
  }

  return amount;
};

export const getInventoryOrderPrice = (values, item) => {
  let price = 0;
  let isTrueAmount = false;

  // non member
  if (
    values.orders_is_discounted !== wholeSaleDiscountId &&
    (Number(values.orders_member_id) === notMemberId ||
      Number(values.orders_member_id) === AssociateMemberId)
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
    (Number(values.orders_member_id) !== notMemberId ||
      Number(values.orders_member_id) !== AssociateMemberId)
  ) {
    price =
      Number(item.suppliers_products_scc_price) *
      Number(values.orders_product_quantity);
    isTrueAmount = true;
  }

  // non member whole sale
  if (
    !isTrueAmount &&
    values.orders_is_discounted === wholeSaleDiscountId &&
    (Number(values.orders_member_id) === notMemberId ||
      Number(values.orders_member_id) === AssociateMemberId)
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
    (Number(values.orders_member_id) !== notMemberId ||
      Number(values.orders_member_id) !== AssociateMemberId)
  ) {
    price =
      item.suppliers_products_ws_scc_price === ""
        ? item.suppliers_products_scc_price
        : item.suppliers_products_ws_scc_price;
  }

  return price;
};

export const getInventoryOrderDiscount = (values) => {
  let discount = 0;

  if (values.orders_is_discounted === otherDiscountId) {
    discount = Number(removeComma(values.sales_discount));
  }
  return discount;
};

export const getChange = (price, discout, recieve) => {
  let result = 0;

  if (recieve !== "") {
    result = Number(recieve) - Number(price) - Number(discout);
  }
  return result;
};

export const showWholeSaleInOrder = (item, items) => {
  let result = false;
  if (
    item &&
    (item.suppliers_products_ws_retail_price !== "" ||
      item.suppliers_products_ws_scc_price !== "")
  ) {
    result = true;
  }

  if (
    !result &&
    (items.suppliers_products_ws_retail_price !== "" ||
      items.suppliers_products_ws_scc_price !== "")
  ) {
    result = true;
  }

  return result;
};
