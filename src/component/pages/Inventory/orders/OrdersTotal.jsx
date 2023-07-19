import React from "react";
import StatusAmount from "../../../partials/status/StatusAmount";
import { computeInventoryOrderTotalOrderAmount } from "./functions-orders";

const OrdersTotal = ({ result, isLoading }) => {
  return (
    <>
      <div className=" grid xl:flex xs:grid-cols-2 items-center mt-2 ">
        <StatusAmount
          text="pending"
          amount={computeInventoryOrderTotalOrderAmount(result).totalPending}
          type="pending"
          isLoading={isLoading}
        />

        <StatusAmount
          text="paid"
          amount={computeInventoryOrderTotalOrderAmount(result).finalPaidAmount}
          type="paid"
          isLoading={isLoading}
        />
        <StatusAmount
          text="discount"
          amount={computeInventoryOrderTotalOrderAmount(result).finalDiscount}
          type="discount"
          isLoading={isLoading}
        />
        <StatusAmount
          text="total"
          amount={computeInventoryOrderTotalOrderAmount(result).finalAmount}
          type="total"
          isLoading={isLoading}
        />
        <StatusAmount
          text="qty"
          amount={computeInventoryOrderTotalOrderAmount(result).totalOty}
          type="qty"
          isLoading={isLoading}
        />
      </div>
    </>
  );
};

export default OrdersTotal;
