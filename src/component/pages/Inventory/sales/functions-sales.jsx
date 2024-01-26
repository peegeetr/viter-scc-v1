import { setError, setMessage } from "../../../../store/StoreAction";
import {
  AssociateMemberId,
  notMemberId,
  otherDiscountId,
  removeComma,
  wholeSaleDiscountId,
} from "../../../helpers/functions-general";

// compute Remaining Quantity
export const computeSalesTotalAmount = (result) => {
  let totaldiscount = 0;
  let totalPaid = 0;
  let totalPending = 0;
  let totalOty = 0;
  let totalChange = 0;
  let totalReceived = 0;
  let finalPaidAmount = 0;
  let finalDiscount = 0;
  let finalAmountWithOutDiscount = 0;
  let finalReceivedAmount = 0;
  let finalAmount = 0;
  result?.pages.map((page) =>
    page?.data.map((item) => {
      if (item.sales_is_paid === 0) {
        totalPending +=
          Number(item.orders_product_amount) - Number(item.sales_discount);
      }
      if (item.sales_is_paid === 1) {
        totalPaid = Number(item.orders_product_amount);
        totaldiscount = Number(item.sales_discount);
        finalAmountWithOutDiscount = totalPaid - totaldiscount;
        finalPaidAmount += finalAmountWithOutDiscount;
      }

      totalReceived += Number(item.sales_receive_amount);
      totalChange += Number(item.sales_member_change);
      totalOty += Number(item.orders_product_quantity);
      finalDiscount += Number(item.sales_discount);
    })
  );

  finalAmount = finalPaidAmount + totalPending;
  finalReceivedAmount = totalReceived - totalChange;

  return {
    totalPending,
    finalPaidAmount,
    finalAmount,
    totalOty,
    finalDiscount,
    finalReceivedAmount,
  };
};

export const getWholeSaleDiscountInSale = (readPriceMarkup, item) => {
  let totalAmount = Number(item.orders_product_amount);

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

export const showWholeSaleInSales = (item) => {
  let result = false;
  if (
    item.suppliers_products_ws_retail_price !== "" ||
    item.suppliers_products_ws_scc_price !== ""
  ) {
    result = true;
  }

  return result;
};

export const getInventorySalesWholesales = (values, item) => {
  let amount = item.orders_product_srp;
  let isTrueAmount = false;

  amount = Number(item.orders_product_amount);

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

    amount = Number(retailPrice) * Number(item.orders_product_quantity);
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
      Number(item.orders_product_quantity);
    isTrueAmount = true;
  }

  // non member whole sale
  if (
    !isTrueAmount &&
    values.orders_is_discounted === wholeSaleDiscountId &&
    (Number(item.orders_member_id) === notMemberId ||
      Number(item.orders_member_id) === AssociateMemberId)
  ) {
    const retailWsPrice =
      item.suppliers_products_ws_retail_price === ""
        ? item.suppliers_products_scc_price
        : item.suppliers_products_ws_retail_price;

    amount = Number(retailWsPrice) * Number(item.orders_product_quantity);
    isTrueAmount = true;
  }

  // member whole sale
  if (
    !isTrueAmount &&
    values.orders_is_discounted === wholeSaleDiscountId &&
    (Number(item.orders_member_id) !== notMemberId ||
      Number(item.orders_member_id) !== AssociateMemberId)
  ) {
    const memberWsPrice =
      item.suppliers_products_ws_scc_price === ""
        ? item.suppliers_products_scc_price
        : item.suppliers_products_ws_scc_price;
    amount = Number(memberWsPrice) * Number(item.orders_product_quantity);
  }

  return amount;
};

export const getInventorySalesOrderSrpPrice = (values, item) => {
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

export const getInventorySalesDiscount = (values) => {
  let discount = 0;

  if (values.orders_is_discounted === otherDiscountId) {
    discount = Number(removeComma(values.sales_discount));
  }
  return discount;
};

export const getSalesChange = (price, discout, recieve) => {
  let result = 0;

  if (recieve !== "") {
    result = Number(price) - Number(recieve) - Number(discout);
  }
  return result;
};

export const getValidationSales = (values, item, dispatch) => {
  let invalidAmount = false;
  let list = [];

  const sales_receive_amount = removeComma(`${values.sales_receive_amount}`);
  const sales_discount = getInventorySalesDiscount(values).toFixed(2);
  const price = getInventorySalesOrderSrpPrice(values, item);

  const orders_product_amount = Number(
    getInventorySalesWholesales(values, item).toFixed(2)
  ).toFixed(2);

  const sales_member_change = Number(
    getSalesChange(
      getInventorySalesWholesales(values, item),
      getInventorySalesDiscount(values),
      values.sales_receive_amount
    )
  ).toFixed(2);

  const totalVal = Number(orders_product_amount) - Number(sales_discount);

  if (Number(sales_receive_amount) < Number(totalVal.toFixed(2))) {
    dispatch(setError(true));
    dispatch(setMessage("Insufficient amount"));
    invalidAmount = true;
  }

  list.push({
    sales_receive_amount: sales_receive_amount,
    sales_discount: sales_discount,
    orders_product_srp: price,
    sales_member_change: sales_member_change,
    orders_product_amount: orders_product_amount,
  });

  return { list, invalidAmount };
};
