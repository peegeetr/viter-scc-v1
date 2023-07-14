import React from "react";
import useQueryData from "../../../../../custom-hooks/useQueryData";
import StatusAmount from "../../../../../partials/status/StatusAmount";
import { checkCapitalShare } from "../../../../account/details/capital-share/functions-capital-share";

const ReportDetailedcCapitalTotals = ({ isMemberId }) => {
  // use if not loadmore button undertime

  // use if not loadmore button undertime
  const { data: totalCapital, isLoading } = useQueryData(
    `/v1/capital-share/read-total-capital/${isMemberId}`, // endpoint
    "get", // method
    "capital-share", // key
    {},
    isMemberId
  );

  // use if not loadmore button undertime
  const { data: subscribeCapital } = useQueryData(
    `/v1/subscribe-capital/active-by-id/${isMemberId}`, // endpoint
    "get", // method
    "subscribeCapital", // key
    {},
    isMemberId
  );
  return (
    <>
      <div className="xl:flex items-center xl:mt-4  text-primary">
        <StatusAmount
          text="Paid Capital Share"
          amount={
            checkCapitalShare(totalCapital, subscribeCapital).totalCapital
          }
          type="paid"
          isLoading={isLoading}
        />

        <StatusAmount
          text="Remaining Capital "
          amount={
            checkCapitalShare(totalCapital, subscribeCapital).remainingAmount
          }
          type="pending"
          isLoading={isLoading}
        />
        <StatusAmount
          text="Subscribes Capital Share "
          amount={checkCapitalShare(totalCapital, subscribeCapital).subscribeC}
          type=""
          isLoading={isLoading}
        />
        <StatusAmount
          text="Membership Fee "
          amount={checkCapitalShare(totalCapital, subscribeCapital).memberFee}
          type=""
          isLoading={isLoading}
        />
      </div>
      <div className="xl:flex items-center mb-2 text-primary">
        <StatusAmount
          text="Average Monthly Balance"
          amount={checkCapitalShare(totalCapital, subscribeCapital).avg}
          type=""
          isLoading={isLoading}
        />
      </div>
    </>
  );
};

export default ReportDetailedcCapitalTotals;
