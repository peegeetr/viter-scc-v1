import React from "react";
import Footer from "../../partials/Footer.jsx";
import Header from "../../partials/Header.jsx";
import Navigation from "../../partials/Navigation.jsx"; 

import UserLink from "./users/UserLink.jsx";

const SettingsLink = () => {
  return (
    <>
      <Header />
      <Navigation menu="settings" />
      <div className="wrapper"> 
          <h4 className="text-xl mb-3">Settings</h4>
          {/* <BreadCrumbs /> */} 
        <hr />
        <ul className="pt-2 pb-20 relative">
          <li className="py-1">
            <UserLink />
          </li> 
        </ul>
        <Footer />
      </div>
    </>
  );
};

export default SettingsLink;
