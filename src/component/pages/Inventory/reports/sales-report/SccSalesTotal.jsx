import React from "react";
import { computeSccSales } from "./functions-report-sales";
import StatusAmount from "../../../../partials/status/StatusAmount";

const SccSalesTotal = ({ result }) => {
  return (
    <>
      <div className=" grid xl:flex xs:grid-cols-2 items-center ">
        <StatusAmount
          text="Supplier Amount"
          amount={computeSccSales(result).totalSupplierPriceAmount}
          type="discount"
        />
        <StatusAmount
          text="SCC sales paid"
          amount={computeSccSales(result).finalAmount}
          type="paid"
        />
        <StatusAmount
          text="SCC sales pending"
          amount={computeSccSales(result).pendingAmount}
          type="pending"
        />
      </div>
    </>
  );
};

export default SccSalesTotal;
