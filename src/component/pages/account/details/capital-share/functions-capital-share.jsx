// compute capital
export const checkCapitalShare = (capital, subscribeCapital) => {
  let totalCapital = 0;
  let subscribeC = 0;
  let memberFee = 0;
  let remainingAmount = 0;
  let result = false;
  capital?.data.map((cItem) => {
    totalCapital = Number(cItem.totalPaidUp) - Number(cItem.members_member_fee);
    memberFee = Number(cItem.members_member_fee);
  });
  subscribeCapital?.data.map((scItem) => {
    subscribeC = Number(scItem.subscribe_capital_amount);
  });

  if (totalCapital < subscribeC) {
    result = true;
  }
  remainingAmount = subscribeC - totalCapital;
  return { result, totalCapital, subscribeC, remainingAmount, memberFee };
};

// get total paid up
export const getTotalPaidUp = (capital, subscribeCapital, amount) => {
  let totalCapital = 0;
  let totalAmount = 0;
  let result = false;

  capital?.data.map((cItem) => {
    totalCapital = Number(cItem.totalPaidUp) - Number(cItem.members_member_fee);
  });

  // total paid capital + amortization amount
  totalAmount = totalCapital + Number(amount);

  // if subscribe capital ay mababa sa total paid capital
  if (Number(subscribeCapital) < totalAmount) {
    result = true;
  }
  return result;
};
