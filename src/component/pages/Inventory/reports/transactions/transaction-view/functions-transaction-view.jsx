import { numberWithCommas } from "../../../../../helpers/functions-general";

export const getTransactionViewFinalTotal = (readTotal) => {
  let qty = 0;
  let sales = 0;
  let discount = 0;
  let totalQty = 0;
  let totalSales = 0;
  let totalDiscount = 0;
  let supplierAmount = 0;
  let totalSupAmount = 0;
  let negativeProfit = 0;
  let positiveProfit = 0;
  let profitAmount = 0;
  let totalProfit = 0;

  if (readTotal?.count > 0) {
    for (let i = 0; i < readTotal?.count; i++) {
      // loop the result
      qty += Number(readTotal?.data[i].orders_product_quantity);
      sales += Number(readTotal?.data[i].orders_product_amount);
      discount += Number(readTotal?.data[i].sales_discount);

      let supAmount =
        Number(readTotal?.data[i].orders_suplier_price) *
        Number(readTotal?.data[i].orders_product_quantity);

      supplierAmount += supAmount;

      let profit =
        Number(readTotal?.data[i].orders_product_amount) - Number(supAmount);

      if (profit < 0) {
        negativeProfit = profit;
      }
      if (profit > 0) {
        positiveProfit = profit;
      }
      profitAmount += positiveProfit - negativeProfit;
    }
  }
  totalQty = numberWithCommas(Number(qty).toFixed(3));
  totalSales = numberWithCommas(Number(sales - discount).toFixed(3));
  const salesAmount = Number(sales - discount);
  totalDiscount = numberWithCommas(Number(discount).toFixed(3));
  totalProfit = numberWithCommas(Number(profitAmount - discount).toFixed(3));
  totalSupAmount = numberWithCommas(Number(supplierAmount).toFixed(3));

  return {
    totalDiscount,
    totalProfit,
    totalQty,
    totalSales,
    totalSupAmount,
    salesAmount,
  };
};
