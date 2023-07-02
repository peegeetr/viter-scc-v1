import React from "react";
import { RiUserSharedFill } from "react-icons/ri";
import { SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";
import { StoreContext } from "../../../../../../store/StoreContext";
import {
  getUrlParam,
  getUserType,
} from "../../../../../helpers/functions-general";

const TransactionCapitalShareLink = ({ menu }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const memberid = getUrlParam().get("memberid");
  const urlLink = getUserType(store);
  return (
    <>
      <Link
        to={
          menu === "members"
            ? `${urlLink}/members/details/capital-share/transactions?memberid=${memberid}`
            : `${urlLink}/details/capital-share/transactions`
        }
        className="w-full py-2"
      >
        <div className="flex items-center">
          <span className="text-lg mr-4">
            <RiUserSharedFill />
          </span>
          <span className="text-md font-bold">Transactions</span>
        </div>
        <p className="ml-[35px] my-0">
          Manage the transaction of capital share.
        </p>
      </Link>

      <Link
        to={
          menu === "members"
            ? `${urlLink}/members/details/capital-share/transactions?memberid=${memberid}`
            : `${urlLink}/details/capital-share/transactions`
        }
        className="btn-action-table group-hover:bg-primary group-hover:text-white"
      >
        <SlArrowRight className="inline" />
      </Link>
    </>
  );
};

export default TransactionCapitalShareLink;
