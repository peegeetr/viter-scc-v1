import React from "react";
import StatusAmount from "../../../../partials/status/StatusAmount";
import { computeTotalAmount } from "./functions-my-order";

const MemberTotalAmountOrders = ({ result, isLoading }) => {
  return (
    <>
      <div className=" grid xl:flex xs:grid-cols-2 items-center ">
        <StatusAmount
          text="draft"
          amount={computeTotalAmount(result).totalDraft}
          type="draft"
          isLoading={isLoading}
        />
        <StatusAmount
          text="pending"
          amount={computeTotalAmount(result).totalPending}
          type="pending"
          isLoading={isLoading}
        />

        <StatusAmount
          text="paid"
          amount={computeTotalAmount(result).finalPaidAmount}
          type="paid"
          isLoading={isLoading}
        />
        <StatusAmount
          text="discount"
          amount={computeTotalAmount(result).totalDiscount}
          type="discount"
          isLoading={isLoading}
        />
        <StatusAmount
          text="total"
          amount={computeTotalAmount(result).finalAmount}
          type="total"
          isLoading={isLoading}
        />
        <StatusAmount
          text="qty"
          amount={computeTotalAmount(result).totalOty}
          type="qty"
          isLoading={isLoading}
        />
      </div>
    </>
  );
};

export default MemberTotalAmountOrders;
