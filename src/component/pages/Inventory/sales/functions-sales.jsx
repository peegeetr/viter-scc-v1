import { removeComma } from "../../../helpers/functions-general";

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
        totalPending += Number(item.orders_product_amount);
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
      result?.length > 0 ? Number(result[0].price_markup_whole_sale) / 100 : 0;
  }

  const percent = Number(totalAmount) * Number(wholeSalePercent).toFixed(3);

  return percent;
};
