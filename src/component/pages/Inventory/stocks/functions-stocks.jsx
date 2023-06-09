// compute totals amount
export const computeStockTotalAmount = (result) => {
  let totalPaid = 0;
  let totalPending = 0;
  let totalOty = 0;
  let finalPaidAmount = 0;
  let finalPendingAmount = 0;
  let finalAmount = 0;
  result?.data.map((item) => {
    if (item.stocks_is_pending === 0) {
      totalPaid =
        Number(item.stocks_suplier_price) * Number(item.stocks_quantity);
      finalPaidAmount += Number(totalPaid);
    }
    if (item.stocks_is_pending === 1) {
      totalPending =
        Number(item.stocks_suplier_price) * Number(item.stocks_quantity);
      finalPendingAmount += Number(totalPending);
    }

    totalOty += Number(item.stocks_quantity);
  });
  finalAmount = finalPaidAmount + finalPendingAmount;

  return { totalOty, finalAmount, finalPaidAmount, finalPendingAmount };
};
