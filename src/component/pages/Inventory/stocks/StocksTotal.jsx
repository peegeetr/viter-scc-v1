import React from "react";
import StatusAmount from "../../../partials/status/StatusAmount";
import { computeStockTotalAmount } from "./functions-stocks";

const StocksTotal = ({ result }) => {
  return (
    <>
      <div className=" grid xl:flex xs:grid-cols-2 items-center mt-2 ">
        <StatusAmount
          text="pending"
          amount={computeStockTotalAmount(result).finalPendingAmount}
          type="pending"
        />

        <StatusAmount
          text="paid"
          amount={computeStockTotalAmount(result).finalPaidAmount}
          type="paid"
        />
        <StatusAmount
          text="total"
          amount={computeStockTotalAmount(result).finalAmount}
          type="total"
        />
        <StatusAmount
          text="qty"
          amount={computeStockTotalAmount(result).totalOty}
          type="qty"
        />
      </div>
    </>
  );
};

export default StocksTotal;
