import { numberWithCommas } from "../../../helpers/functions-general";

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

// compute Remaining Quantity in modal
export const modalComputeAmountWithDiscount = (amount, discount) => {
  let finalAmount = 0;
  let productAmount = Number(amount);
  let discountAmount = Number(discount);

  finalAmount = productAmount - discountAmount;
  return finalAmount.toFixed(2);
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

  result?.data.map((item) => {
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
  });
  finalAmount = finalPaidAmount + totalPending;

  return {
    totalPending,
    finalPaidAmount,
    finalAmount,
    finalPaidAmount,
    totalOty,
    finalDiscount,
  };
};
