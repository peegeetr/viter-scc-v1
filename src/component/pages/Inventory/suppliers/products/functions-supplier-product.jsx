import { removeComma } from "../../../../helpers/functions-general";

export const getTotalPrice = (values, percent) => {
  const suplierPrice = removeComma(`${values.suppliers_products_price}`);

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

export const getValuePrice = (values, percent) => {
  const suppliers_products_price = Number(
    removeComma(`${values.suppliers_products_price}`)
  );
  const suppliers_products_retail_price = getTotalPrice(
    values,
    percent
  ).retailPrice;
  const suppliers_products_scc_price = getTotalPrice(
    values,
    percent
  ).memberPrice;

  const value = {
    suppliers_products_price,
    suppliers_products_retail_price,
    suppliers_products_scc_price,
  };

  return value;
};
