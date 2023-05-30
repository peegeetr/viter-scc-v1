import React from "react";
import { setIsSearch, setStartIndex } from "../../../../store/StoreAction.jsx";
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

  const handleShow = () => {
    dispatch(setStartIndex(0));
    dispatch(setIsSearch(false));
  };
  return (
    <>
      <Header />
      <Navigation menu="settings" />
      <div className="wrapper">
        <BreadCrumbs />

        <hr />
        <ul className="pt-2 pb-20 relative">
          <li className="py-1" onClick={handleShow}>
            <SystemUserLink />
          </li>
          <li className="py-1" onClick={handleShow}>
            <OtherUserLink />
          </li>
          {store.credentials.data.role_is_developer === 1 && (
            <li className="py-1" onClick={handleShow}>
              <RoleLink />
            </li>
          )}
        </ul>
        <Footer />
      </div>
    </>
  );
};

export default UserPage;
