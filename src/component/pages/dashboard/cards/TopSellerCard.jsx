import React from "react";
import TopSellerList from "../../Inventory/reports/top-seller/TopSellerList";
const TopSellerCard = () => {
  return (
    <>
      <div className="">
        <div className="border mb-4 !pt-2 p-4 rounded-md">
          <TopSellerList menu="overview" />
        </div>
      </div>
    </>
  );
};

export default TopSellerCard;
