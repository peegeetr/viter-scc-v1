// compute undertime
export const computeTotalCapital = (capitalShare) => {
  let finalAmount = 0;
  capitalShare?.data.map((capitalItem) => {
    finalAmount += Number(capitalItem.capital_share_total_amount);
  });
  console.log(finalAmount);
  return finalAmount;
};
