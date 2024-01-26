import {
  formatDate,
  numberWithCommas,
} from "../../../../helpers/functions-general";
import { getMonthName } from "../report-function";

export const getTotalProfit = (sales, amount) => {
  const profitWithComma = (sales - amount).toFixed(3);
  const profit = Number(sales - amount);

  return { profitWithComma, profit };
};

export const getTransactionTotalProfit = (readTotal, item, month, year) => {
  const sales = Number(item.totalSales);
  const discount = Number(item.totalDiscount);

  const totalSale = sales - discount;

  const finalTotal = (
    totalSale - getTransactionSupplierPrice(readTotal, item, month, year)
  ).toFixed(3);

  return finalTotal;
};

export const getTransactionDate = (month, item, year) => {
  let date = "";

  if (month === "all" || month === "other-date") {
    date = formatDate(item.orders_date);
  }
  if (year !== "all" && month === "all") {
    date = item.orders_date.split("-")[0];
  }
  if (month !== "other-date" && month !== "all") {
    date = `${getMonthName(month)} (${item.orders_date.split("-")[0]})`;
  }

  return date;
};

export const getTransactionType = (month, year) => {
  let val = "date";

  if (year !== "all" && month === "all") {
    val = "year";
  }
  if (month === "all" && year !== "all") {
    val = "year";
  }
  if (month !== "other-date" && month !== "all") {
    val = "month-year";
  }

  return val;
};

export const getTransactionTotalFilterByType = (
  readTotal,
  dateFrom,
  dateTo,
  month,
  year
) => {
  let supplierAmount = 0;

  if (readTotal?.count > 0) {
    for (let i = 0; i < readTotal?.count; i++) {
      // for date filter

      if (month === "all" && year === "all") {
        let supAmount =
          Number(readTotal?.data[i].supplierPrice) *
          Number(readTotal?.data[i].totalQty);
        supplierAmount += supAmount;
      }

      if (
        readTotal?.data[i].orders_date >= dateFrom &&
        readTotal?.data[i].orders_date <= dateTo &&
        (month === "other-date" || (month === "all" && year === "all"))
      ) {
        let supAmount =
          Number(readTotal?.data[i].supplierPrice) *
          Number(readTotal?.data[i].totalQty);
        supplierAmount += supAmount;
      }

      // for month and all year filter
      if (
        readTotal?.data[i].month === Number(month) &&
        month !== "all" &&
        month !== "other-date" &&
        year === "all"
      ) {
        let supAmount =
          Number(readTotal?.data[i].supplierPrice) *
          Number(readTotal?.data[i].totalQty);
        supplierAmount += supAmount;
      }

      // for month and year filter
      if (
        readTotal?.data[i].month === Number(month) &&
        readTotal?.data[i].year === Number(year) &&
        month !== "all" &&
        month !== "other-date" &&
        year !== "all"
      ) {
        let supAmount =
          Number(readTotal?.data[i].supplierPrice) *
          Number(readTotal?.data[i].totalQty);
        supplierAmount += supAmount;
      }

      // for year filter
      if (
        readTotal?.data[i].year === Number(year) &&
        year !== "all" &&
        month === "all" &&
        month !== "other-date"
      ) {
        let supAmount =
          Number(readTotal?.data[i].supplierPrice) *
          Number(readTotal?.data[i].totalQty);
        supplierAmount += supAmount;
      }
    }
  }
  return supplierAmount;
};

export const getTransactionSupplierPrice = (readTotal, item, month, year) => {
  let supplierAmount = 0;

  if (readTotal?.count > 0) {
    for (let i = 0; i < readTotal?.count; i++) {
      // for date filter
      if (
        readTotal?.data[i].orders_date === item.orders_date &&
        (month === "other-date" || (month === "all" && year === "all"))
      ) {
        let supAmount =
          Number(readTotal?.data[i].supplierPrice) *
          Number(readTotal?.data[i].totalQty);
        supplierAmount += supAmount;
      }

      // for month and all year filter
      if (
        readTotal?.data[i].month === item.month &&
        readTotal?.data[i].year === item.year &&
        month !== "all" &&
        month !== "other-date" &&
        year === "all"
      ) {
        let supAmount =
          Number(readTotal?.data[i].supplierPrice) *
          Number(readTotal?.data[i].totalQty);
        supplierAmount += supAmount;
      }

      // for month and year filter
      if (
        readTotal?.data[i].month === item.month &&
        readTotal?.data[i].year === item.year &&
        month !== "all" &&
        month !== "other-date" &&
        year !== "all"
      ) {
        let supAmount =
          Number(readTotal?.data[i].supplierPrice) *
          Number(readTotal?.data[i].totalQty);
        supplierAmount += supAmount;
      }

      // for all year filter
      if (
        readTotal?.data[i].year === item.year &&
        year !== "all" &&
        month === "all" &&
        month !== "other-date"
      ) {
        let supAmount =
          Number(readTotal?.data[i].supplierPrice) *
          Number(readTotal?.data[i].totalQty);
        supplierAmount += supAmount;
      }
    }
  }
  return supplierAmount;
};

export const getTransactionFinalTotal = (readTotal) => {
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
      qty += Number(readTotal?.data[i].totalQty);
      sales += Number(readTotal?.data[i].totalSales);
      discount += Number(readTotal?.data[i].totalDiscount);

      let supAmount =
        Number(readTotal?.data[i].supplierPrice) *
        Number(readTotal?.data[i].totalQty);

      supplierAmount += supAmount;

      let profit = Number(readTotal?.data[i].totalSales) - Number(supAmount);

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
