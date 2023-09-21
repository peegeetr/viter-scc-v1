import { removeComma } from "../../../../../helpers/functions-general";

export const getHistoryTotalPrice = (values, percent) => {
  const suplierPrice = removeComma(`${values.product_history_price}`);

  // computation of retail price
  const retailPercent =
    Number(suplierPrice) * Number(percent.retailPercent).toFixed(2);
  const retailPrice = retailPercent + Number(suplierPrice);

  // computation of retail price
  const memberPercent =
    Number(suplierPrice) * Number(percent.memberPercent).toFixed(2);
  const memberPrice = memberPercent + Number(suplierPrice);

  return { retailPrice, memberPrice };
};

export const getHistoryValuePrice = (values, percent) => {
  const product_history_price = Number(
    removeComma(`${values.product_history_price}`)
  );
  const product_history_retail_price = getHistoryTotalPrice(
    values,
    percent
  ).retailPrice;
  const product_history_scc_price = getHistoryTotalPrice(
    values,
    percent
  ).memberPrice;

  const value = {
    product_history_price,
    product_history_retail_price,
    product_history_scc_price,
  };

  return value;
};
