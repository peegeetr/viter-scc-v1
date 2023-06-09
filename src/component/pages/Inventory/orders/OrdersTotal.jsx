import React from "react";
import StatusAmount from "../../../partials/status/StatusAmount";
import { computeInventoryOrderTotalOrderAmount } from "./functions-orders";

const OrdersTotal = ({ result }) => {
  return (
    <>
      <div className=" grid xl:flex xs:grid-cols-2 items-center mt-2 ">
        <StatusAmount
          text="pending"
          amount={computeInventoryOrderTotalOrderAmount(result).totalPending}
        />

        <StatusAmount
          text="paid"
          amount={computeInventoryOrderTotalOrderAmount(result).finalPaidAmount}
        />
        <StatusAmount
          text="discount"
          amount={computeInventoryOrderTotalOrderAmount(result).finalDiscount}
        />
        <StatusAmount
          text="total"
          amount={computeInventoryOrderTotalOrderAmount(result).finalAmount}
        />
        <StatusAmount
          text="qty"
          amount={computeInventoryOrderTotalOrderAmount(result).totalOty}
        />
      </div>
    </>
  );
};

export default OrdersTotal;
