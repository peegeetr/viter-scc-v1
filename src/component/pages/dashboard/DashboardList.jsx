import React from "react";
import AnnouncementCard from "./cards/AnnouncementCard";
import TopSellerCard from "./cards/TopSellerCard";
const DashboardList = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[30%_70%] ">
        <div>
          <TopSellerCard />
        </div>
        {/* <div>
          <TopSellerCard />
        </div>  */}
        <div className="">
          <AnnouncementCard />
          {/* <AnnouncementCard /> */}
        </div>
      </div>
    </>
  );
};

export default DashboardList;
