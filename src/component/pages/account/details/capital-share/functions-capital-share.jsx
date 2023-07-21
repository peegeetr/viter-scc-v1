import { formatDate } from "../../../../helpers/functions-general";
import {
  getMonth,
  getMonthName,
} from "../../../Inventory/reports/report-function";

// compute capital
export const checkCapitalShare = (capital, subscribeCapital, penaltyById) => {
  let totalCapital = 0;
  let avg = 0;
  let penalty = 0;
  let paid = 0;
  let subscribeC = 0;
  let memberFee = 0;
  let remainingAmount = 0;
  let result = false;
  let isComplete = false;
  // subscribe capital penalty
  penaltyById?.data.map((pItem) => {
    // subscribe capital penalty amount
    penalty = Number(pItem.totalPenalty);
  });

  capital?.data.map((cItem) => {
    // member fee
    memberFee = Number(cItem.members_member_fee);
    // total capital share
    totalCapital = Number(cItem.totalPaidUp);
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
  if (totalCapital === subscribeC) {
    isComplete = true;
  }

  remainingAmount = subscribeC - totalCapital;
  avg = paid / 12;
  return {
    isComplete,
    result,
    totalCapital,
    subscribeC,
    remainingAmount,
    memberFee,
    avg,
    penalty,
  };
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
export const getTotalPaidUp = (
  capital,
  subscribeCapital,
  amount,
  penaltyById
) => {
  let totalCapital = 0;
  let totalAmount = 0;
  let penalty = 0;
  let result = false;

  penaltyById?.data.map((pItem) => {
    penalty = Number(pItem.totalPenalty);
  });

  capital?.data.map((cItem) => {
    totalCapital =
      Number(cItem.totalPaidUp) - Number(cItem.members_member_fee) - penalty;
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
export const getCapitalShareByMonth = (item, capital, count, lastCount) => {
  let isLastAid = false;
  let result = 0;
  let penalty = 0;
  let list = [];
  capital?.map((cItem) => {
    if (count === 1 && capital.length === lastCount) {
      isLastAid = true;
    }
    if (cItem.month === item.month_aid) {
      if (cItem.capital_share_is_penalty === 0) {
        result = cItem.capital_share_total;
      }

      if (cItem.capital_share_is_penalty === 1) {
        penalty = Number(cItem.capital_share_paid_up);
      }

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
        isLastAid: isLastAid,
      };
    }
  });

  return { result, list, penalty };
};

// get total paid up
export const getMonthYear = (date) => {
  let newDate = formatDate(date);

  let result = `${newDate.split(" ")[0]} ${newDate.split(" ")[2]}`;

  return result;
};
