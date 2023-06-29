// compute capital
export const computeTotalCapital = (result) => {
  let finalAmount = 0;
  result?.data.map((item) => {
    finalAmount += Number(item.capital_share_paid_up);
  });
  return finalAmount;
};
// compute capital
export const checkCapitalShare = (capital, subscribeCapital) => {
  let totalCapital = 0;
  let totalAmount = 0;
  let remainingAmount = 0;
  let result = false;
  capital?.data.map((cItem) => {
    totalCapital = Number(cItem.totalPaidUp);
  });
  subscribeCapital?.data.map((scItem) => {
    totalAmount = Number(scItem.subscribe_capital_amount);
  });

  if (totalCapital === totalAmount) {
    result = true;
  }
  remainingAmount = totalAmount - totalCapital;
  return { result, totalCapital, totalAmount, remainingAmount };
};
