import React from "react";
import { setStartIndex } from "../../../../store/StoreAction.jsx";
import { StoreContext } from "../../../../store/StoreContext.jsx";
import BreadCrumbs from "../../../partials/BreadCrumbs.jsx";
import Footer from "../../../partials/Footer.jsx";
import Header from "../../../partials/Header.jsx";
import Navigation from "../../../partials/Navigation.jsx";
import OtherUserLink from "./other/OtherUserLink.jsx";
import RoleLink from "./role/RoleLink.jsx";
import SystemUserLink from "./system/SystemUserLink.jsx";

const UserPage = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  return (
    <>
      <Header />
      <Navigation menu="settings" />
      <div className="relative min-h-screen pt-20 ml-0 px-5 md:ml-20 lg:ml-40 lg:px-10 ">
        <BreadCrumbs />

        <hr />
        <ul className="pt-2 pb-20 relative">
          <li className="py-1" onClick={() => dispatch(setStartIndex(0))}>
            <SystemUserLink />
          </li>
          <li className="py-1" onClick={() => dispatch(setStartIndex(0))}>
            <OtherUserLink />
          </li>
          <li className="py-1" onClick={() => dispatch(setStartIndex(0))}>
            <RoleLink />
          </li>
        </ul>
        <Footer />
      </div>
    </>
  );
};

export default UserPage;
