import React from "react";
import { RiUserSharedFill } from "react-icons/ri";
import { SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";
import { StoreContext } from "../../../../../store/StoreContext";
import {
  getUrlParam,
  getUserType,
} from "../../../../helpers/functions-general";

const ProfileLink = () => {
  const { store } = React.useContext(StoreContext);
  const memberid = getUrlParam().get("memberid");
  const urlLink = getUserType(store);
  return (
    <>
      <Link
        to={`${urlLink}/members/details/profile?memberid=${memberid}`}
        className="w-full py-2"
      >
        <div className="flex items-center">
          <span className="text-lg mr-4">
            <RiUserSharedFill />
          </span>
          <span className="text-md font-bold">Profile</span>
        </div>
        <p className="ml-[35px] my-0">
          Manage what actions and capabilities every members are can perform in
          the system.
        </p>
      </Link>
      <Link
        to={`${urlLink}/members/details/profile?memberid=${memberid}`}
        className="btn-action-table group-hover:bg-primary group-hover:text-white"
      >
        <SlArrowRight className="inline" />
      </Link>
    </>
  );
};

export default ProfileLink;
