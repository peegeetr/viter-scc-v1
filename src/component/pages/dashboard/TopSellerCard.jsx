import React from "react";
import { StoreContext } from "../../../store/StoreContext";
import useQueryData from "../../custom-hooks/useQueryData";
const TopSellerCard = () => {
  const { store, dispatch } = React.useContext(StoreContext);

  // use if not loadmore button undertime
  const {
    isLoading,
    isFetching,
    error,
    data: role,
  } = useQueryData(
    `/v1/roles`, // endpoint
    "get", // method
    "role" // key
  );

  return (
    <>
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
    </>
  );
};

export default TopSellerCard;
