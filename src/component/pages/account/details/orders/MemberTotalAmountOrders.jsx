import React from "react";
import StatusAmount from "../../../../partials/status/StatusAmount";
import { computeTotalAmount } from "./functions-my-order";

const MemberTotalAmountOrders = ({ result }) => {
  return (
    <>
      <div className=" grid xl:flex xs:grid-cols-2 items-center ">
        <StatusAmount
          text="draft"
          amount={computeTotalAmount(result).totalDraft}
          type="draft"
        />
        <StatusAmount
          text="pending"
          amount={computeTotalAmount(result).totalPending}
          type="pending"
        />

        <StatusAmount
          text="paid"
          amount={computeTotalAmount(result).finalPaidAmount}
          type="paid"
        />
        <StatusAmount
          text="discount"
          amount={computeTotalAmount(result).totalDiscount}
          type="discount"
        />
        <StatusAmount
          text="total"
          amount={computeTotalAmount(result).finalAmount}
          type="total"
        />
        <StatusAmount
          text="qty"
          amount={computeTotalAmount(result).totalOty}
          type="qty"
        />
      </div>
    </>
  );
};

export default MemberTotalAmountOrders;
