import React from "react";
import StatusAmount from "../../../../partials/status/StatusAmount";
import { computeTotalAmount } from "./functions-my-order";

const MemberTotalAmountOrders = ({ result, empid }) => {
  return (
    <>
      <div className=" grid xl:flex xs:grid-cols-2 items-center ">
        <StatusAmount
          text="draft"
          amount={computeTotalAmount(result, empid).totalDraft}
        />
        <StatusAmount
          text="pending"
          amount={computeTotalAmount(result, empid).totalPending}
        />

        <StatusAmount
          text="paid"
          amount={computeTotalAmount(result, empid).finalPaidAmount}
        />
        <StatusAmount
          text="discount"
          amount={computeTotalAmount(result, empid).totalDiscount}
        />
        <StatusAmount
          text="total"
          amount={computeTotalAmount(result, empid).finalAmount}
        />
        <StatusAmount
          text="qty"
          amount={computeTotalAmount(result, empid).totalOty}
        />
      </div>
    </>
  );
};

export default MemberTotalAmountOrders;
