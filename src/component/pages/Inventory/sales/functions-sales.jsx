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
  result?.data.map((item) => {
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
  });
  finalAmount = finalPaidAmount + totalPending;
  finalReceivedAmount = totalReceived - totalChange;

  return {
    totalPending,
    finalPaidAmount,
    finalAmount,
    finalPaidAmount,
    totalOty,
    finalDiscount,
    finalReceivedAmount,
  };
};

// totalReceived += Number(item.sales_receive_amount);
// totalChange += Number(item.sales_member_change);
