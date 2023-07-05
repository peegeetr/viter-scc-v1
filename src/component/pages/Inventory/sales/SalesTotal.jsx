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
          type="pending"
        />

        <StatusAmount
          text="paid"
          amount={computeSalesTotalAmount(result).finalPaidAmount}
          type="paid"
        />
        <StatusAmount
          text="received"
          amount={computeSalesTotalAmount(result).finalReceivedAmount}
          type="received"
        />
        <StatusAmount
          text="total"
          amount={computeSalesTotalAmount(result).finalAmount}
          type="total"
        />
        <StatusAmount
          text="discount"
          amount={computeSalesTotalAmount(result).finalDiscount}
          type="discount"
        />
        <StatusAmount
          text="qty"
          amount={computeSalesTotalAmount(result).totalOty}
          type="qty"
        />
      </div>
    </>
  );
};

export default SalesTotal;
