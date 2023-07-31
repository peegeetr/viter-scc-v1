import React from "react";
import StatusAmount from "../../../../partials/status/StatusAmount";
import { computeStockReportTotal } from "./functions-report-sales";

const StockReportTotal = ({ result, ordersGroupProd, isLoading }) => {
  return (
    <>
      <div className=" grid xl:flex xs:grid-cols-2 items-center ">
        <StatusAmount
          text="Total Rem. amnt. "
          amount={
            computeStockReportTotal(result, ordersGroupProd).totalRemAmount
          }
          type="pending"
          isLoading={isLoading}
          qty={`(${
            computeStockReportTotal(result, ordersGroupProd).totalQty
          } qty)`}
        />
      </div>
    </>
  );
};

export default StockReportTotal;
