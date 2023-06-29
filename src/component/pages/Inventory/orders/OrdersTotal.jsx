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
          type="pending"
        />

        <StatusAmount
          text="paid"
          amount={computeInventoryOrderTotalOrderAmount(result).finalPaidAmount}
          type="paid"
        />
        <StatusAmount
          text="discount"
          amount={computeInventoryOrderTotalOrderAmount(result).finalDiscount}
          type="discount"
        />
        <StatusAmount
          text="total"
          amount={computeInventoryOrderTotalOrderAmount(result).finalAmount}
          type="total"
        />
        <StatusAmount
          text="qty"
          amount={computeInventoryOrderTotalOrderAmount(result).totalOty}
          type="qty"
        />
      </div>
    </>
  );
};

export default OrdersTotal;
