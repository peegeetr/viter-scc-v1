import React from "react";
import { RiUserSharedFill } from "react-icons/ri";
import { SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";
import { StoreContext } from "../../../../../store/StoreContext";
import { devNavUrl, UrlSystem } from "../../../../helpers/functions-general";

const CapitalShareLink = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  return (
    <>
     <Link
        to={`${devNavUrl}/${UrlSystem}/account/details/capital-share`}
        className="w-full py-2"
      >
        <div className="flex items-center">
          <span className="text-lg mr-4">
            <RiUserSharedFill />
          </span>
          <span className="text-md font-bold">Share</span>
        </div>
        <p className="ml-[35px] my-0">
          Manage what actions and capabilities every account are can perform in
          the system.
        </p>
      </Link>

      <Link
        to={`${devNavUrl}/${UrlSystem}/account/details/capital-share`}
        className="btn-action-table group-hover:bg-primary group-hover:text-white"
      >
        <SlArrowRight className="inline" />
      </Link> 
      </>
  );
};

export default CapitalShareLink;
