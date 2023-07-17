import React from "react";
import StatusAmount from "../../../partials/status/StatusAmount";
import { computeStockTotalAmount } from "./functions-stocks";

const StocksTotal = ({ result, isLoading }) => {
  return (
    <>
      <div className=" grid xl:flex xs:grid-cols-2 items-center mt-2 ">
        <StatusAmount
          text="pending"
          amount={computeStockTotalAmount(result).finalPendingAmount}
          type="pending"
          isLoading={isLoading}
        />

        <StatusAmount
          text="paid"
          amount={computeStockTotalAmount(result).finalPaidAmount}
          type="paid"
          isLoading={isLoading}
        />
        <StatusAmount
          text="total"
          amount={computeStockTotalAmount(result).finalAmount}
          type="total"
          isLoading={isLoading}
        />
        <StatusAmount
          text="qty"
          amount={computeStockTotalAmount(result).totalOty}
          type="qty"
          isLoading={isLoading}
        />
      </div>
    </>
  );
};

export default StocksTotal;
