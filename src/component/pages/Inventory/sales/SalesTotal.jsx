import React from "react";
import StatusAmount from "../../../partials/status/StatusAmount";
import { computeSalesTotalAmount } from "./functions-sales";

const SalesTotal = ({ result }) => {
  return (
    <>
      <div className=" grid xl:flex xs:grid-cols-2 items-center mt-2 ">
        <StatusAmount
          text="pending"
          amount={computeSalesTotalAmount(result).totalPending}
        />

        <StatusAmount
          text="paid"
          amount={computeSalesTotalAmount(result).finalPaidAmount}
        />
        <StatusAmount
          text="received"
          amount={computeSalesTotalAmount(result).finalReceivedAmount}
        />
        <StatusAmount
          text="total"
          amount={computeSalesTotalAmount(result).finalAmount}
        />
        <StatusAmount
          text="discount"
          amount={computeSalesTotalAmount(result).finalDiscount}
        />
        <StatusAmount
          text="qty"
          amount={computeSalesTotalAmount(result).totalOty}
        />
      </div>
    </>
  );
};

export default SalesTotal;
