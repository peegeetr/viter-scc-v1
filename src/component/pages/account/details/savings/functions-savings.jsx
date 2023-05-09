// compute capital
export const computeTotalSavings = (result) => {
  let finalAmount = 0;
  let savings = 0;
  let deposite = 0;
  result?.data.map((item) => {
    savings += Number(item.savings_deposite);
    deposite += Number(item.savings_withdrawal);
  });
  finalAmount = savings - deposite;
  return finalAmount;
};
