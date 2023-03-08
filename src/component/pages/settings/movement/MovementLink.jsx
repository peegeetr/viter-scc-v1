import React from "react";
import { FaUserCog } from "react-icons/fa";
import { SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";
import { devNavUrl, UrlAdmin } from "../../../helpers/functions-general";

const MovementLink = () => {
  return (
    <div className="group flex items-center justify-between border-b border-solid border-gray-300">
      <Link
        to={`${devNavUrl}/${UrlAdmin}/settings/movement`}
        className="w-full py-2"
      >
        <div className="flex items-center">
          <span className="text-lg mr-4">
            <FaUserCog />
          </span>
          <span className="text-md font-bold">Movement</span>
        </div>
        <p className="ml-[35px] my-0">
          Manage the Branch Code identifier assigned to different branches.
        </p>
      </Link>

      <Link
        to={`${devNavUrl}/${UrlAdmin}/settings/movement`}
        className="btn-action-table group-hover:bg-primary group-hover:text-white"
      >
        <SlArrowRight className="inline" />
      </Link>
    </div>
  );
};

export default MovementLink;
