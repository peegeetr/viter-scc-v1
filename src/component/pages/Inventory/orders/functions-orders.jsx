import { setError, setMessage } from "../../../../store/StoreAction";
import {
  numberWithCommas,
  removeComma,
} from "../../../helpers/functions-general";
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
  const sales_discount = removeComma(`${values.sales_discount}`);

  const orders_product_amount =
    Number(orders_product_quantity) *
    Number(
      item
        ? item.suppliers_products_scc_price
        : items.suppliers_products_scc_price
    );

  if (Number(sales_discount) > Number(orders_product_amount)) {
    dispatch(setError(true));
    dispatch(setMessage("Invalid Discount Amount"));
    invalidAmount = true;
  }

  const newQty =
    getRemaningQuantity(item ? item : items, stocksGroupProd, orderGroupProd) +
    Number(item.orders_product_quantity) -
    Number(orders_product_quantity);

  const qty =
    getRemaningQuantity(item ? item : items, stocksGroupProd, orderGroupProd) +
    Number(item.orders_product_quantity);

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
      modalComputeAmountWithDiscount(
        orders_product_amount,
        values.sales_discount
      )
  ) {
    dispatch(setError(true));
    dispatch(setMessage("Insufficient amount"));
    invalidAmount = true;
  }
  const sales_member_change =
    sales_receive_amount - (orders_product_amount - sales_discount);

  list.push({
    sales_member_change: sales_member_change,
    orders_product_amount: orders_product_amount,
    sales_discount: sales_discount,
    sales_receive_amount: sales_receive_amount,
    orders_product_quantity: orders_product_quantity,
  });

  return {
    list,
    invalidAmount,
  };
};
