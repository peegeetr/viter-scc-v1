import React from "react";
import AnnouncementCard from "./cards/AnnouncementCard";
import TopSellerCard from "./cards/TopSellerCard";
const DashboardSampleList = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[70%_30%] ">
        <AnnouncementCard />
        <TopSellerCard />
      </div>
    </>
  );
};

export default DashboardSampleList;
