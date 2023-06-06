import React from "react";
import MyCapitalShareLink from "./capital-share/MyCapitalShareLink";
import { StoreContext } from "../../../store/StoreContext";
import MyPatronageLink from "./patronage/MyPatronageLink";
import MySavingsLink from "./savings/MySavingsLink";
import MyProfileLink from "./profile/MyProfileLink";
import { setIsSearch, setStartIndex } from "../../../store/StoreAction";

const MyAccountDetailsLink = () => {
  const { store, dispatch } = React.useContext(StoreContext);

  const handleShow = () => {
    dispatch(setStartIndex(0));
    dispatch(setIsSearch(false));
  };
  return (
    <>
      <div
        className="group flex items-center justify-between border-b border-solid border-gray-300"
        onClick={handleShow}
      >
        <MyProfileLink />
      </div>
      <div
        className="group flex items-center justify-between border-b border-solid border-gray-300"
        onClick={handleShow}
      >
        <MySavingsLink />
      </div>
      <div
        className="group flex items-center justify-between border-b border-solid border-gray-300"
        onClick={handleShow}
      >
        <MyCapitalShareLink />
      </div>
      <div
        className="group flex items-center justify-between border-b border-solid border-gray-300"
        onClick={handleShow}
      >
        <MyPatronageLink />
      </div>
    </>
  );
};

export default MyAccountDetailsLink;
