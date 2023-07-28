import React from "react";
import StatusAmount from "../../../../../partials/status/StatusAmount";
import { checkReportCapitalShare } from "../functions-report-netsurplus";

const ReportDetailedCapitalTotals = ({
  result,
  reportMemberFee,
  isLoading,
  isFilter,
}) => {
  // use if not loadmore button undertime

  const capitalShareTotal = checkReportCapitalShare(result, reportMemberFee);
  return (
    <>
      <div className="xl:flex items-center xl:mt-4  text-primary">
        <StatusAmount
          text="Paid Capital Share"
          amount={isFilter ? capitalShareTotal.totalCapital : 0}
          type="paid"
          isLoading={isLoading}
        />
        <StatusAmount
          text="Membership Fee "
          amount={isFilter ? capitalShareTotal.memberFee : 0}
          type=""
          isLoading={isLoading}
        />
        <StatusAmount
          text="Penalty Fee "
          amount={isFilter ? capitalShareTotal.penalty : 0}
          type="penalty"
          isLoading={isLoading}
        />
      </div>
    </>
  );
};

export default ReportDetailedCapitalTotals;
