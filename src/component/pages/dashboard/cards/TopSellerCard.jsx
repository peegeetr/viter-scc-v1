import React from "react";
import { BsFillPinAngleFill } from "react-icons/bs";
import TopSellerList from "../../Inventory/reports/top-seller/TopSellerList";
const TopSellerCard = () => {
  return (
    <>
      <div className="rounded-md mb-4 border !pt-2 p-4">
        <p className="flex items-center mt-4 mb-6 font-bold text-primary">
          <BsFillPinAngleFill className="animate-bounce mr-2 " />
          Top Seller
        </p>
        <div className="mb-8">
          <TopSellerList />
        </div>
      </div>
    </>
  );
};

export default TopSellerCard;
