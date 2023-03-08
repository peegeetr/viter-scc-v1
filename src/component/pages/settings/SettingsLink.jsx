import React from "react";
import BreadCrumbs from "../../partials/BreadCrumbs.jsx";
import Footer from "../../partials/Footer.jsx";
import Header from "../../partials/Header.jsx";
import Navigation from "../../partials/Navigation.jsx";
import MovementLink from "./movement/MovementLink.jsx";

import UserLink from "./users/UserLink.jsx";

const SettingsLink = () => {
  return (
    <>
      <Header />
      <Navigation menu="settings" />
      <div className="wrapper">
        <div className="min-h-[30px]">
          <h4 className="text-xl leading-[1.5rem]">Settings</h4>
          <BreadCrumbs />
        </div>
        <hr />
        <ul className="pt-2 pb-20 relative">
          <li className="py-1">
            <UserLink />
          </li>
          <li className="py-1">
            <MovementLink />
          </li>
        </ul>
        <Footer />
      </div>
    </>
  );
};

export default SettingsLink;
