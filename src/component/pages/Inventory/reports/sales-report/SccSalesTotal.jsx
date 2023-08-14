import React from "react";
import { computeSccSales } from "./functions-report-sales";
import StatusAmount from "../../../../partials/status/StatusAmount";

const SccSalesTotal = ({ result, isLoading }) => {
  return (
    <>
      <div className=" grid xl:flex xs:grid-cols-2 items-center ">
        <StatusAmount
          text="Pending profit"
          amount={computeSccSales(result).pendingAmount}
          type="pending"
          isLoading={isLoading}
        />
        <StatusAmount
          text="Paid profit"
          amount={computeSccSales(result).finalAmount}
          type="paid"
          isLoading={isLoading}
        />
        <StatusAmount
          text="Supplier Amount"
          amount={computeSccSales(result).totalSupplierPriceAmount}
          type="discount"
          isLoading={isLoading}
        />
      </div>
    </>
  );
};

export default SccSalesTotal;
