import React from "react";
import StatusAmount from "../../../../partials/status/StatusAmount";
import { computeStockReportTotal } from "./functions-report-sales";

const StockReportTotal = ({ result }) => {
  return (
    <>
      <div className=" grid xl:flex xs:grid-cols-2 items-center ">
        <StatusAmount
          text="Supplier total amount"
          amount={computeStockReportTotal(result).totalSupplierPriceAmount}
          qty={`(${computeStockReportTotal(result).totalOty})`}
        />
        <StatusAmount
          text="SCC sales"
          amount={computeStockReportTotal(result).finalAmount}
          type="paid"
        />
        <StatusAmount
          text="Supplier total Amount"
          amount={computeStockReportTotal(result).totalSupplierPriceAmount}
          type="discount"
        />
      </div>
    </>
  );
};

export default StockReportTotal;
