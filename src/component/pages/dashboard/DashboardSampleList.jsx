import React from "react";
import AnnouncementCard from "./AnnouncementCard";
const DashboardSampleList = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[75%_24%] ">
        <AnnouncementCard />
        <div className="flex flex-col ">
          <div className="rounded-md mb-4  border px-2">
            <div className="flex items-center justify-between">
              <h2 className="p-3 my-2 text-md py-1 rounded-t-md text-primary">
                Top Sellers
              </h2>
              {/* <span className="text-primary">
              <BsFillPinAngleFill className=" animate-bounce" />
            </span> */}
            </div>
            {/* <Leave /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardSampleList;
