import React from "react";
import { setStartIndex } from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import CapitalShareLink from "./capital-share/CapitalShareLink";
import PatronageLink from "./patronage/PatronageLink";
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
      <div
        className="group flex items-center justify-between border-b border-solid border-gray-300"
        onClick={() => dispatch(setStartIndex(0))}
      >
        <PatronageLink />
      </div>
    </>
  );
};

export default DetailsLink;
