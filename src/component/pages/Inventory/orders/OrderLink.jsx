import React from "react";
import { MdOutlineInventory } from "react-icons/md";
import { SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";
import { setIsSearch, setStartIndex } from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import { getUserType } from "../../../helpers/functions-general";

const OrderLink = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const urlLink = getUserType(store);

  const handleShow = () => {
    dispatch(setStartIndex(0));
    dispatch(setIsSearch(false));
  };
  return (
    <div
      className="group flex items-center justify-between border-b border-solid border-gray-300"
      onClick={handleShow}
    >
      <Link to={`${urlLink}/inventory/orders`} className="w-full py-2">
        <div className="flex items-center">
          <span className="text-lg mr-4">
            <MdOutlineInventory />
          </span>
          <span className="text-md font-bold">Orders</span>
        </div>
        <p className="ml-[35px] my-0">
          Adding new orders and monitor other order statuses.
        </p>
      </Link>

      <Link
        to={`${urlLink}/inventory/orders`}
        className="btn-action-table group-hover:bg-primary group-hover:text-white"
      >
        <SlArrowRight className="inline" />
      </Link>
    </div>
  );
};

export default OrderLink;
