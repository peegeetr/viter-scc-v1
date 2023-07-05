import React from "react";
import TopSellerList from "../../Inventory/reports/top-seller/TopSellerList";
const TopSellerCard = () => {
  return (
    <>
      <div className="rounded-md mb-4 border !pt-2 p-4">
        <TopSellerList menu="overview" />
      </div>
    </>
  );
};

export default TopSellerCard;
