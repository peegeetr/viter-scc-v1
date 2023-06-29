import React from "react";
import { GrMoney } from "react-icons/gr";
import { SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";
import { StoreContext } from "../../../../store/StoreContext";
import { getUserType } from "../../../helpers/functions-general";

const SubscribeCapitalLink = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const link = getUserType(store);

  return (
    <div className="group flex items-center justify-between border-b border-solid border-gray-300">
      <Link to={`${link}/settings/subscribe-capital`} className="w-full py-1">
        <div className="flex items-center">
          <span className="text-lg mr-4">
            <GrMoney />
          </span>
          <span className=" font-bold">Subscibe Capital</span>
        </div>
        <p className="ml-[35px] my-0">
          Reference list for different types of rates for Holidays, Overtime,
          and Rest days.
        </p>
      </Link>

      <Link
        to={`${link}/settings/subscribe-capital`}
        className="btn-action-table group-hover:bg-primary group-hover:text-white"
      >
        <SlArrowRight className="inline" />
      </Link>
    </div>
  );
};

export default SubscribeCapitalLink;
