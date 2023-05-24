import React from "react";
import MyCapitalShareLink from "./capital-share/MyCapitalShareLink";
import { StoreContext } from "../../../store/StoreContext";
import MyPatronageLink from "./patronage/MyPatronageLink";
import MySavingsLink from "./savings/MySavingsLink";
import MyProfileLink from "./profile/MyProfileLink";
import { setStartIndex } from "../../../store/StoreAction";

const MyAccountDetailsLink = () => {
  const { store, dispatch } = React.useContext(StoreContext);

  return (
    <>
      <div
        className="group flex items-center justify-between border-b border-solid border-gray-300"
        onClick={() => dispatch(setStartIndex(0))}
      >
        <MyProfileLink />
      </div>
      {/* <div
        className="group flex items-center justify-between border-b border-solid border-gray-300"
        onClick={() => dispatch(setStartIndex(0))}
      >
        <MySavingsLink />
      </div> */}
      <div
        className="group flex items-center justify-between border-b border-solid border-gray-300"
        onClick={() => dispatch(setStartIndex(0))}
      >
        <MyCapitalShareLink />
      </div>
      <div
        className="group flex items-center justify-between border-b border-solid border-gray-300"
        onClick={() => dispatch(setStartIndex(0))}
      >
        <MyPatronageLink />
      </div>
    </>
  );
};

export default MyAccountDetailsLink;
