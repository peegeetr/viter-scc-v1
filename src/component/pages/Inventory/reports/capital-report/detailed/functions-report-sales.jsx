export const getYearList = () => {
  const d = new Date();
  let currentYear = d.getFullYear();
  let yearCount = 10;
  let list = [];

  for (let i = 0; i < yearCount; i++) {
    currentYear--;
    list.push({ year: `${Number(currentYear) + 1}` });
  }
  return list;
};

// compute capital
export const checkReportCapitalShare = (capital) => {
  let totalCapital = 0;
  let avg = 0;
  let paid = 0;
  let subscribeC = 0;
  let memberFee = 0;
  let remainingAmount = 0;
  let result = false;
  capital?.data.map((cItem) => {
    // total capital share
    totalCapital = Number(cItem.totalPaidUp) - Number(cItem.members_member_fee);
    // member fee
    memberFee = Number(cItem.members_member_fee);
    // total capital initial pay not include
    paid = Number(cItem.total);
    // subscribe capital amount
    subscribeC = Number(cItem.subscribe_capital_amount);
  });

  // check if total capital is lessthan subscribe capital
  if (totalCapital < subscribeC) {
    result = true;
  }

  remainingAmount = subscribeC - totalCapital;
  avg = paid / 12;
  return { result, totalCapital, subscribeC, remainingAmount, memberFee, avg };
};
