import React from "react";
import { RiUserSharedFill } from "react-icons/ri";
import { SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";
import { StoreContext } from "../../../../../store/StoreContext";
import {
  getUrlParam,
  getUserType,
} from "../../../../helpers/functions-general";
import { setIsSearch, setStartIndex } from "../../../../../store/StoreAction";

const MyOrderLink = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const memberid = getUrlParam().get("memberid");
  const urlLink = getUserType(store);
  const handleShow = () => {
    dispatch(setIsSearch(false));
  };
  return (
    <>
      <Link
        onClick={handleShow}
        to={`${urlLink}/members/details/orders?memberid=${memberid}`}
        className="w-full py-2"
      >
        <div className="flex items-center">
          <span className="text-lg mr-4">
            <RiUserSharedFill />
          </span>
          <span className="text-md font-bold">Orders</span>
        </div>
        <p className="ml-[35px] my-0">
          Manage what actions and capabilities every members are can perform in
          the system.
        </p>
      </Link>

      <Link
        onClick={handleShow}
        to={`${urlLink}/members/details/orders?memberid=${memberid}`}
        className="btn-action-table group-hover:bg-primary group-hover:text-white"
      >
        <SlArrowRight className="inline" />
      </Link>
    </>
  );
};

export default MyOrderLink;
