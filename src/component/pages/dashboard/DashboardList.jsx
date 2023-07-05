import React from "react";
import AnnouncementCard from "./cards/AnnouncementCard";
import TopSellerCard from "./cards/TopSellerCard";
const DashboardList = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[30%_70%] ">
        <TopSellerCard />
        <AnnouncementCard />
      </div>
    </>
  );
};

export default DashboardList;
