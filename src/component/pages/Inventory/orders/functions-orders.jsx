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
  let productAmount = numberWithCommas(Number(item.orders_product_amount));
  let discountAmount = numberWithCommas(Number(item.sales_discount));

  finalAmount = (productAmount - discountAmount).toFixed(2);
  return finalAmount;
};

// compute Remaining Quantity in modal
export const modalComputeAmountWithDiscount = (amount, discount) => {
  let finalAmount = 0;
  let productAmount = numberWithCommas(Number(amount));
  let discountAmount = numberWithCommas(Number(discount));

  finalAmount = productAmount - discountAmount;
  return finalAmount;
};
