import {
  getMonth,
  getMonthName,
} from "../../../Inventory/reports/report-function";

// compute capital
export const checkCapitalShare = (capital, subscribeCapital) => {
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
  });

  // subscribe capital
  subscribeCapital?.data.map((scItem) => {
    // subscribe capital amount
    subscribeC = Number(scItem.subscribe_capital_amount);
  });

  // check if total capital is lessthan subscribe capital
  if (totalCapital < subscribeC) {
    result = true;
  }

  remainingAmount = subscribeC - totalCapital;
  avg = paid / 12;
  return { result, totalCapital, subscribeC, remainingAmount, memberFee, avg };
};

// compute capital
export const getTotalPaidCapital = (item) => {
  let total = "";
  let avg = 0;
  total = Number(item.capital_share_paid_up);
  if (item.capital_share_is_initial_pay === 1) {
    total = "";
  }

  return { total, avg };
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

// get total paid up
export const getCapitalShareByMonth = (item, capital) => {
  let result = "";
  let list = [];
  capital?.map((cItem) => {
    if (cItem.month === item.month_aid) {
      result = cItem.capital_share_total;
      list = {
        capital_share_paid_up: cItem.capital_share_paid_up,
        capital_share_or: cItem.capital_share_or,
        capital_share_date: cItem.capital_share_date,
        capital_share_is_initial_pay: cItem.capital_share_is_initial_pay,
        capital_share_total: cItem.capital_share_total,
        capital_share_aid: cItem.capital_share_aid,
        capital_share_member_id: cItem.capital_share_member_id,
        month: getMonthName(cItem.month),
        year: cItem.year,
      };
    }
  });

  return { result, list };
};
