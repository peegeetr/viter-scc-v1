import React from "react";
import { RiUserSharedFill } from "react-icons/ri";
import { SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";
import { StoreContext } from "../../../../../store/StoreContext";
import {
  devNavUrl,
  getUrlParam,
  getUserType,
  UrlSystem,
} from "../../../../helpers/functions-general";

const ProfileLink = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const memberid = getUrlParam().get("memberid");

  const urlLink = getUserType(
    store.credentials.data.role_is_developer,
    store.credentials.data.role_is_admin
  );
  return (
    <>
      <Link
        to={
          store.credentials.data.role_is_developer === 1
            ? `${urlLink}/account/details/profile?memberid=${memberid}`
            : `${urlLink}/details/profile`
        }
        className="w-full py-2"
      >
        <div className="flex items-center">
          <span className="text-lg mr-4">
            <RiUserSharedFill />
          </span>
          <span className="text-md font-bold">Profile</span>
        </div>
        <p className="ml-[35px] my-0">
          Manage what actions and capabilities every account are can perform in
          the system.
        </p>
      </Link>
      <Link
        to={
          store.credentials.data.role_is_developer === 1
            ? `${urlLink}/account/details/profile?memberid=${memberid}`
            : `${urlLink}/details/profile`
        }
        className="btn-action-table group-hover:bg-primary group-hover:text-white"
      >
        <SlArrowRight className="inline" />
      </Link>
    </>
  );
};

export default ProfileLink;
