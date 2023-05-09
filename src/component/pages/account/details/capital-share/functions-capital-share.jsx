// compute capital
export const computeTotalCapital = (result) => {
  let finalAmount = 0;
  result?.data.map((item) => {
    finalAmount += Number(item.capital_share_paid_up);
  });
  return finalAmount;
};
