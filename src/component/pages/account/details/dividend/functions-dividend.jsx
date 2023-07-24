export const getYearListDividend = () => {
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

export const getComputeDividend = (item, dividend) => {
  let totalASM = 0;
  let rate = 0;
  let myDividend = 0;
  let result = 0;
  // read all dividend by group year
  dividend?.data.map((dItem) => {
    if (item.year === dItem.year) {
      // All Member Total Average Shares Months
      totalASM += Number(dItem.allMemTotal) / 12;
    }
  });
  // Rate of Interest on Share Capital
  rate = Number(item.net_surplus_dividend) / totalASM;
  // my Total Average Shares Months
  myDividend = Number(item.total) / 12;

  result = myDividend * rate;

  return { result, rate, myDividend, totalASM };
};
