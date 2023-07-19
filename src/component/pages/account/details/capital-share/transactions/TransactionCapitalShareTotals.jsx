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
      <div className="xl:flex items-center xl:mt-4  text-primary">
        {result?.pages[0].count > 0 ? (
          <StatusAmount
            text="Paid Capital Share"
            amount={totalCapital.totalCapital}
            type="paid"
            isLoading={isLoading}
          />
        ) : (
          <StatusAmount
            text="Paid Capital Share"
            amount={0}
            type="paid"
            isLoading={isLoading}
          />
        )}

        <StatusAmount
          text="Remaining Capital "
          amount={totalCapital.remainingAmount}
          type="pending"
          isLoading={isLoading}
        />
        <StatusAmount
          text="Subscribes Capital Share "
          amount={totalCapital.subscribeC}
          type=""
          isLoading={isLoading}
        />
        <StatusAmount
          text="Membership Fee "
          amount={totalCapital.memberFee}
          type=""
          isLoading={isLoading}
        />
        <StatusAmount
          text="Penalty Fee "
          amount={isFilter ? penalty?.totalPenalty : totalCapital.penalty}
          type="penalty"
          isLoading={isLoading}
        />
      </div>
    </>
  );
};

export default TransactionCapitalShareTotals;
