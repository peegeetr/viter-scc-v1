import React from "react";
import StatusAmount from "../../../../../partials/status/StatusAmount";

const TransactionCapitalShareTotals = ({
  result,
  totalCapital,
  isLoading,
  isFilter,
  penalty,
}) => {
  return (
    <>
      <div className="xl:flex items-center xl:mt-4 print:text-black text-primary print:grid print:grid-cols-3">
        <StatusAmount
          text="Paid Capital Share"
          amount={totalCapital.totalCapital}
          type="paid"
          isLoading={isLoading}
        />

        <StatusAmount
          text="Balance"
          amount={totalCapital.remainingAmount}
          type="pending"
          isLoading={isLoading}
        />
        <StatusAmount
          text="Subscribe Capital Share "
          amount={totalCapital.subscribeC}
          type=""
          isLoading={isLoading}
        />
        <StatusAmount
          text="Membership"
          amount={totalCapital.memberFee}
          type=""
          isLoading={isLoading}
        />
        <StatusAmount
          text="Penalty"
          amount={isFilter ? penalty?.totalPenalty : totalCapital.penalty}
          type="penalty"
          isLoading={isLoading}
        />
      </div>
    </>
  );
};

export default TransactionCapitalShareTotals;
