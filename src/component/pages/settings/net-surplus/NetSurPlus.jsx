import React from "react";
import { StoreContext } from "../../../../store/StoreContext.jsx";
import BreadCrumbs from "../../../partials/BreadCrumbs.jsx";
import Footer from "../../../partials/Footer.jsx";
import Header from "../../../partials/Header.jsx";
import Navigation from "../../../partials/Navigation.jsx";
import NetSurPlusList from "./NetSurPlusList.jsx";

const NetSurPlus = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  return (
    <>
      <Header />
      <Navigation menu="settings" />
      <div className="wrapper">
        <BreadCrumbs />

        <hr />
        <div className="w-full pt-5 pb-20">
          <NetSurPlusList />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default NetSurPlus;
