import { removeComma } from "../../../../../helpers/functions-general";

export const getHistoryTotalPrice = (values, percent) => {
  const suplierPrice = removeComma(`${values.product_history_price}`);

  let memberPriceTotal = 0;
  let retailPriceTotal = 0;
  let memberWsPriceTotal = 0;
  let retailWsPriceTotal = 0;

  // computation if Default percent
  if (values.suppliers_products_is_other_percent === "0") {
    // computation of retail price
    const retailPercent =
      Number(suplierPrice) * Number(percent.retailPercent).toFixed(3);
    retailPriceTotal = retailPercent + Number(suplierPrice);

    // computation of member price
    const memberPercent =
      Number(suplierPrice) * Number(percent.memberPercent).toFixed(3);
    memberPriceTotal = memberPercent + Number(suplierPrice);

    // computation of retail whole sale price
    const retailWsPercent =
      Number(suplierPrice) * Number(percent.retailWsPercent).toFixed(3);
    retailWsPriceTotal = retailWsPercent + Number(suplierPrice);

    // computation of member whole sale price
    const memberWsPercent =
      Number(suplierPrice) * Number(percent.memberWsPercent).toFixed(3);
    memberWsPriceTotal = memberWsPercent + Number(suplierPrice);
  }

  // computation if other percent
  if (values.suppliers_products_is_other_percent === "1") {
    // computation of retail price
    const getPercentRetail =
      Number(values.suppliers_products_retail_percent) / 100;
    const retailPercent = Number(suplierPrice) * getPercentRetail.toFixed(3);
    retailPriceTotal = retailPercent + Number(suplierPrice);

    // computation of member price
    const getPercentMember =
      Number(values.suppliers_products_member_percent) / 100;
    const memberPercent =
      Number(suplierPrice) * Number(getPercentMember).toFixed(3);
    memberPriceTotal = memberPercent + Number(suplierPrice);

    // computation of retail whole sale price
    const getPercentRetailWs =
      Number(values.suppliers_products_ws_retail_percent) / 100;
    const retailWsPercent =
      Number(suplierPrice) * Number(getPercentRetailWs).toFixed(3);
    retailWsPriceTotal = retailWsPercent + Number(suplierPrice);

    // computation of member whole sale price
    const getPercentMemberWs =
      Number(values.suppliers_products_ws_member_percent) / 100;
    const memberWsPercent =
      Number(suplierPrice) * Number(getPercentMemberWs).toFixed(3);
    memberWsPriceTotal = memberWsPercent + Number(suplierPrice);
  }

  return {
    retailPriceTotal,
    memberPriceTotal,
    retailWsPriceTotal,
    memberWsPriceTotal,
  };
};

export const getHistoryValuePrice = (values, percent) => {
  const product_history_price = Number(
    removeComma(`${values.product_history_price}`)
  );

  const product_history_retail_price = getHistoryTotalPrice(
    values,
    percent
  ).retailPriceTotal;

  const product_history_scc_price = getHistoryTotalPrice(
    values,
    percent
  ).memberPriceTotal;

  const product_history_ws_retail_price = getHistoryTotalPrice(
    values,
    percent
  ).retailWsPriceTotal;

  const product_history_ws_member_price = getHistoryTotalPrice(
    values,
    percent
  ).memberWsPriceTotal;

  const suppliers_products_member_percent =
    values.suppliers_products_is_other_percent === "1"
      ? values.suppliers_products_member_percent
      : percent.member;
  const suppliers_products_retail_percent =
    values.suppliers_products_is_other_percent === "1"
      ? values.suppliers_products_retail_percent
      : percent.retail;
  const suppliers_products_ws_member_percent =
    values.suppliers_products_is_other_percent === "1"
      ? values.suppliers_products_ws_member_percent
      : percent.memberWs;
  const suppliers_products_ws_retail_percent =
    values.suppliers_products_is_other_percent === "1"
      ? values.suppliers_products_ws_retail_percent
      : percent.retailWs;

  const value = {
    product_history_price,
    product_history_retail_price,
    product_history_scc_price,
    product_history_ws_retail_price,
    product_history_ws_member_price,
    suppliers_products_member_percent,
    suppliers_products_retail_percent,
    suppliers_products_ws_member_percent,
    suppliers_products_ws_retail_percent,
  };

  return value;
};
