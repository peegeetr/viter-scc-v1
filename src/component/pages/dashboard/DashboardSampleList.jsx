import React from "react";
import AnnouncementCard from "./AnnouncementCard";
import TopSellerCard from "./TopSellerCard";
const DashboardSampleList = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[75%_24%] ">
        <AnnouncementCard />
        <TopSellerCard />
      </div>
    </>
  );
};

export default DashboardSampleList;
