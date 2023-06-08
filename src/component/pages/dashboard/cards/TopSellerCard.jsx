import React from "react";
import { StoreContext } from "../../../../store/StoreContext";
import useQueryData from "../../../custom-hooks/useQueryData";
import { BsFillPinAngleFill } from "react-icons/bs";
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
        <p className="flex items-center m-2 font-bold text-primary">
          <BsFillPinAngleFill className="animate-bounce mr-2 " />
          Top Seller
        </p>
        {/* <Leave /> */}
      </div>
    </>
  );
};

export default TopSellerCard;
