import React from "react";
import StatusAmount from "../../../partials/status/StatusAmount";
import { computeStockTotalAmount } from "./functions-stocks";

const StocksTotal = ({ result, empid }) => {
  return (
    <>
      <div className=" grid xl:flex xs:grid-cols-2 items-center mt-2 ">
        <StatusAmount
          text="pending"
          amount={computeStockTotalAmount(result, empid).finalPendingAmount}
        />

        <StatusAmount
          text="paid"
          amount={computeStockTotalAmount(result, empid).finalPaidAmount}
        />
        <StatusAmount
          text="total"
          amount={computeStockTotalAmount(result, empid).finalAmount}
        />
        <StatusAmount
          text="qty"
          amount={computeStockTotalAmount(result, empid).totalOty}
        />
      </div>
    </>
  );
};

export default StocksTotal;
