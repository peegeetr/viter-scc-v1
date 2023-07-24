import { removeComma } from "../../../helpers/functions-general";

// compute sold
export const computeNetSurplus = (values) => {
  let list = [];
  let generalRate = 0;
  let educTrainingRate = 0;
  let communityDevRate = 0;
  let optionalRate = 0;
  let dividendRate = 0;
  let patronageRate = 0;

  // values that need to remove comma
  const net_surplus_total_income = removeComma(
    `${values.net_surplus_total_income}`
  );
  const net_surplus_operating_expenses = removeComma(
    `${values.net_surplus_operating_expenses}`
  );
  const net_surplus_general_reserve_rate = removeComma(
    `${values.net_surplus_general_reserve_rate}`
  );
  const net_surplus_educ_training_rate = removeComma(
    `${values.net_surplus_educ_training_rate}`
  );
  const net_surplus_community_dev_rate = removeComma(
    `${values.net_surplus_community_dev_rate}`
  );
  const net_surplus_optional_fund_rate = removeComma(
    `${values.net_surplus_optional_fund_rate}`
  );
  const net_surplus_dividend_rate = removeComma(
    `${values.net_surplus_dividend_rate}`
  );
  const net_surplus_patronage_rate = removeComma(
    `${values.net_surplus_patronage_rate}`
  );

  // Net Surplus Before Distribution
  const net_surplus_before_amount =
    Number(net_surplus_total_income) - Number(net_surplus_operating_expenses);

  // Allocation of Net Surplus Rate
  generalRate = Number(net_surplus_general_reserve_rate) / 100;
  educTrainingRate = Number(net_surplus_educ_training_rate) / 100;
  communityDevRate = Number(net_surplus_community_dev_rate) / 100;
  optionalRate = Number(net_surplus_optional_fund_rate) / 100;
  dividendRate = Number(net_surplus_dividend_rate) / 100;
  patronageRate = Number(net_surplus_patronage_rate) / 100;

  // Allocation of Net Surplus Amounts
  // General Reserve Fund
  const net_surplus_general_reserve = net_surplus_before_amount * generalRate;
  // Educ & Training Fund
  const net_surplus_educ_training =
    net_surplus_before_amount * educTrainingRate;
  // Community Development Fund
  const net_surplus_community_dev =
    net_surplus_before_amount * communityDevRate;
  // Optional Fund
  const net_surplus_optional_fund = net_surplus_before_amount * optionalRate;

  // Total Amount of all Allocation of Net Surplus
  const totalNetAllocation =
    net_surplus_general_reserve +
    net_surplus_educ_training +
    net_surplus_community_dev +
    net_surplus_optional_fund;

  // Net Surplus for Distribution
  const net_surplus_distribution_amount =
    net_surplus_before_amount - totalNetAllocation;

  // Dividend - Interest on Share Capital
  const net_surplus_dividend = net_surplus_distribution_amount * dividendRate;
  // Patronage Refund
  const net_surplus_patronage_refund =
    net_surplus_distribution_amount * patronageRate;

  // New List
  list = {
    net_surplus_year: values.net_surplus_year,
    net_surplus_year_old: values.net_surplus_year_old,
    net_surplus_allocation: totalNetAllocation,
    net_surplus_before_amount: net_surplus_before_amount,
    net_surplus_distribution_amount: net_surplus_distribution_amount,
    net_surplus_operating_expenses: net_surplus_operating_expenses,
    net_surplus_total_income: net_surplus_total_income,
    net_surplus_general_reserve: net_surplus_general_reserve,
    net_surplus_general_reserve_rate: net_surplus_general_reserve_rate,
    net_surplus_educ_training: net_surplus_educ_training,
    net_surplus_educ_training_rate: net_surplus_educ_training_rate,
    net_surplus_community_dev: net_surplus_community_dev,
    net_surplus_community_dev_rate: net_surplus_community_dev_rate,
    net_surplus_optional_fund: net_surplus_optional_fund,
    net_surplus_optional_fund_rate: net_surplus_optional_fund_rate,
    net_surplus_dividend: net_surplus_dividend,
    net_surplus_dividend_rate: net_surplus_dividend_rate,
    net_surplus_patronage_refund: net_surplus_patronage_refund,
    net_surplus_patronage_rate: net_surplus_patronage_rate,
  };

  return list;
};
