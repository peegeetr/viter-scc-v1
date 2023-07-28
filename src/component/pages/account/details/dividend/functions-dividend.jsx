export const getComputeDividend = (item, dividend) => {
  let total = 0;
  let totalASM = 0;
  let rate = 0;
  let myDividend = 0;
  let result = 0;
  console.log(dividend);
  // read all dividend by group year
  dividend?.data.map((dItem) => {
    if (item.year === dItem.year) {
      total = Number(dItem.allMemTotal) / 12;
      // All Member Total Average Shares Months
      totalASM += total;
    }
  });
  // Rate of Interest on Share Capital
  rate = Number(item.net_surplus_dividend) / totalASM;
  // my Total Average Shares Months
  myDividend = Number(item.total) / 12;

  result = myDividend * rate;

  return { result, rate, myDividend, totalASM };
};
