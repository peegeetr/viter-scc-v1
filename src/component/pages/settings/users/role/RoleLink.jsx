import React from "react";
import { FaUsersCog } from "react-icons/fa";
import { SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";
import { StoreContext } from "../../../../../store/StoreContext";
import { devNavUrl, getUserType } from "../../../../helpers/functions-general";

const RoleLink = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  // const link = getUserType(store.credentials.data.role_is_developer === 1);
  const link = getUserType(1 === 1);
  return (
    <div className="group flex items-center justify-between border-b border-solid border-gray-300">
      <Link to={`${link}/settings/users/role`} className="w-full py-1">
        <div className="flex items-center">
          <span className="text-lg mr-4">
            <FaUsersCog />
          </span>
          <span className=" font-bold">Roles</span>
        </div>
        <p className="ml-[35px] my-0">
          Manage what actions and capabilities every account are can perform in
          the system.
        </p>
      </Link>

      <Link
        to={`${link}/settings/users/role`}
        className="btn-action-table group-hover:bg-primary group-hover:text-white"
      >
        <SlArrowRight className="inline" />
      </Link>
    </div>
  );
};

export default RoleLink;
