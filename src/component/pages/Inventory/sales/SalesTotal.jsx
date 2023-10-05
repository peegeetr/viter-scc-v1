import React from "react";
import StatusAmount from "../../../partials/status/StatusAmount";
import { computeSalesTotalAmount } from "./functions-sales";

const SalesTotal = ({ result, isLoading }) => {
  return (
    <>
      <div className=" grid xl:flex xs:grid-cols-2 items-center mt-2 ">
        <StatusAmount
          text="pending"
          amount={computeSalesTotalAmount(result).totalPending}
          type="pending"
          isLoading={isLoading}
        />

        <StatusAmount
          text="paid"
          amount={computeSalesTotalAmount(result).finalPaidAmount}
          type="paid"
          isLoading={isLoading}
        />
        <StatusAmount
          text="total"
          amount={computeSalesTotalAmount(result).finalAmount}
          type="total"
          isLoading={isLoading}
          qty={`(${computeSalesTotalAmount(result).totalOty} Qty)`}
        />
        <StatusAmount
          text="discount"
          amount={computeSalesTotalAmount(result).finalDiscount}
          type="discount"
          isLoading={isLoading}
        />
      </div>
    </>
  );
};

export default SalesTotal;
