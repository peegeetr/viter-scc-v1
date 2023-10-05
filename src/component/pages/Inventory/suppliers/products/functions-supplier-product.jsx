import { removeComma } from "../../../../helpers/functions-general";

export const getTotalPrice = (values, percent) => {
  const suplierPrice = removeComma(`${values.suppliers_products_price}`);

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

export const getValuePrice = (values, percent) => {
  const suppliers_products_price = Number(
    removeComma(`${values.suppliers_products_price}`)
  );

  const suppliers_products_retail_price = getTotalPrice(
    values,
    percent
  ).retailPriceTotal;

  const suppliers_products_scc_price = getTotalPrice(
    values,
    percent
  ).memberPriceTotal;

  const suppliers_products_ws_retail_price = getTotalPrice(
    values,
    percent
  ).retailWsPriceTotal;

  const suppliers_products_ws_scc_price = getTotalPrice(
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
    suppliers_products_price,
    suppliers_products_retail_price,
    suppliers_products_scc_price,
    suppliers_products_ws_retail_price,
    suppliers_products_ws_scc_price,
    suppliers_products_member_percent,
    suppliers_products_retail_percent,
    suppliers_products_ws_member_percent,
    suppliers_products_ws_retail_percent,
  };

  return value;
};
