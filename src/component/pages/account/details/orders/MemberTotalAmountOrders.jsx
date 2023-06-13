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
        />
        <StatusAmount
          text="pending"
          amount={computeTotalAmount(result).totalPending}
        />

        <StatusAmount
          text="paid"
          amount={computeTotalAmount(result).finalPaidAmount}
        />
        <StatusAmount
          text="discount"
          amount={computeTotalAmount(result).totalDiscount}
        />
        <StatusAmount
          text="total"
          amount={computeTotalAmount(result).finalAmount}
        />
        <StatusAmount text="qty" amount={computeTotalAmount(result).totalOty} />
      </div>
    </>
  );
};

export default MemberTotalAmountOrders;
