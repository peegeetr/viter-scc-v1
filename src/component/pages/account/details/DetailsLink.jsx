import React from "react";
import { RiUserSharedFill } from "react-icons/ri";
import { SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";
import { setStartIndex } from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import {
  devNavUrl,
  getUserType,
  UrlSystem,
} from "../../../helpers/functions-general";
import CapitalShareLink from "./capital-share/CapitalShareLink";
import ProfileLink from "./profile/ProfileLink";
import SavingsLink from "./savings/SavingsLink";

const DetailsLink = () => {
  const { store, dispatch } = React.useContext(StoreContext);

  return (
    <>
      <div
        className="group flex items-center justify-between border-b border-solid border-gray-300"
        onClick={() => dispatch(setStartIndex(0))}
      >
        <ProfileLink />
      </div>
      <div
        className="group flex items-center justify-between border-b border-solid border-gray-300"
        onClick={() => dispatch(setStartIndex(0))}
      >
        <SavingsLink />
      </div>
      <div
        className="group flex items-center justify-between border-b border-solid border-gray-300"
        onClick={() => dispatch(setStartIndex(0))}
      >
        <CapitalShareLink />
      </div>
    </>
  );
};

export default DetailsLink;
