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
export const computeTotalAmount = (result, empid) => {
  let totalPaid = 0;
  let totalPending = 0;
  let totalDraft = 0;
  let totalDiscount = 0;
  let totalOty = 0;
  let totalAmount = 0;
  let finalPaidAmount = 0;
  let finalAmount = 0;
  result?.data.map((item) => {
    if (Number(item.sales_member_id) === Number(empid)) {
      if (item.sales_is_paid === 1) {
        totalPaid += Number(item.orders_product_amount);
      }
      if (item.sales_is_paid === 0 && item.orders_is_draft === 0) {
        totalPending += Number(item.orders_product_amount);
      }
      if (item.orders_is_draft === 1) {
        totalDraft += Number(item.orders_product_amount);
      }
      totalDiscount += Number(item.sales_discount);
      totalOty += Number(item.orders_product_quantity);
      totalAmount += Number(item.orders_product_amount);
      finalPaidAmount = totalPaid - totalDiscount;
      finalAmount = totalAmount - totalDiscount;
    }
  });
  return {
    finalPaidAmount,
    totalPending,
    totalDraft,
    totalDiscount,
    totalOty,
    finalAmount,
  };
};
