import React from "react";
import StatusAmount from "../../../../partials/status/StatusAmount";
import { computeStockReportTotal } from "./functions-report-sales";

const StockReportTotal = ({ result, orderGroupProd, stocksGroupProd }) => {
  return (
    <>
      <div className=" grid xl:flex xs:grid-cols-2 items-center ">
        <StatusAmount
          text="Total Rem. amnt. "
          amount={
            computeStockReportTotal(result, orderGroupProd, stocksGroupProd)
              .totalRemAmount
          }
          type="pending"
          qty={`(${
            computeStockReportTotal(result, orderGroupProd, stocksGroupProd)
              .totalQty
          } qty)`}
        />
      </div>
    </>
  );
};

export default StockReportTotal;
