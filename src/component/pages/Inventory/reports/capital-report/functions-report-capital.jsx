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
export const checkReportCapitalShare = (capital, reportMemberFee) => {
  let paidCapital = 0;
  let totalCapital = 0;
  let penalty = 0;
  let memberFee = 0;

  reportMemberFee?.data.map((mItem) => {
    memberFee += Number(mItem.members_member_fee);
  });

  capital?.data.map((cItem) => {
    if (cItem.capital_share_is_penalty === 1) {
      penalty += Number(cItem.paidUp);
    }
    if (cItem.capital_share_is_penalty === 0) {
      paidCapital += Number(cItem.paidUp);
    }
  });

  totalCapital = paidCapital - memberFee;

  return {
    totalCapital,
    penalty,
    memberFee,
  };
};

export const getAvgTotal = (result, netsurplusForDis) => {
  let totalAmount = 0;
  let netCapital = 0;
  let finalAmount = 0;
  //
  if (netsurplusForDis?.length > 0) {
    netCapital = Number(netsurplusForDis[0].net_surplus_dividend);
  }
  result?.map((item) => {
    totalAmount += Number(item.total) / 12;
  });
  finalAmount = netCapital / totalAmount;

  //
  return finalAmount;
};
