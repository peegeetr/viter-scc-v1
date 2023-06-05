import React from "react";
import { StoreContext } from "../../../../store/StoreContext.jsx";
import BreadCrumbs from "../../../partials/BreadCrumbs.jsx";
import Footer from "../../../partials/Footer.jsx";
import Header from "../../../partials/Header.jsx";
import Navigation from "../../../partials/Navigation.jsx";
import DetailsLink from "./DetailsLink.jsx";

const Deatils = () => {
  const { store, dispatch } = React.useContext(StoreContext); // use if not loadmore button undertime
  return (
    <>
      <Header />
      <Navigation menu="members" />
      <div className="wrapper">
        <BreadCrumbs />

        <hr />
        <div className="w-full pt-5 pb-20">
          <DetailsLink />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Deatils;
