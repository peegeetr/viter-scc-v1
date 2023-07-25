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

export const getDetailedAvgTotal = (result) => {
  let totalAmount = 0;

  result?.map((item) => {
    totalAmount += Number(item.total) / 12;
  });

  return totalAmount;
};

export const getDividendAvgTotal = (avg) => {
  let dividend70 = 0;
  let paidUp = 0;
  let totalAmount = 1;
  let rate = 0;

  avg?.map((aItem) => {
    paidUp = Number(aItem.total) / 12;
    totalAmount += paidUp;
    dividend70 = aItem.net_surplus_dividend;
  });

  rate = dividend70 / totalAmount;

  return rate;
};

export const getDividendAvgAllTotal = (avg, item) => {
  let myDividendASM = item.total / 12;
  let rate = getDividendAvgTotal(avg);
  let result = 0;
  result = myDividendASM * rate;

  return result;
};

export const getTotalDividend = (avg) => {
  let rate = getDividendAvgTotal(avg);
  let dividendByMem = 0;
  let myDividendASM = 0;
  let result = 0;

  avg?.map((aItem) => {
    myDividendASM = aItem.total / 12;
    dividendByMem = myDividendASM * rate;
    result += dividendByMem;
  });

  return result;
};
