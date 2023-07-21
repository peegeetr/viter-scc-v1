import React from "react";
import { StoreContext } from "../../../../../store/StoreContext.jsx";
import Header from "../../../../partials/Header.jsx";
import Navigation from "../../../../partials/Navigation.jsx";
import BreadCrumbs from "../../../../partials/BreadCrumbs.jsx";
import Footer from "../../../../partials/Footer.jsx";
import {
  setIsSearch,
  setStartIndex,
} from "../../../../../store/StoreAction.jsx";
import TransactionCapitalShareLink from "./transactions/TransactionCapitalShareLink.jsx";
import SetupCapitalShareLink from "./setup/SetupCapitalShareLink.jsx";

const CapitalDeatilsLinks = () => {
  const { store, dispatch } = React.useContext(StoreContext); // use if not loadmore button undertime
  const handleShow = () => {
    dispatch(setStartIndex(0));
    dispatch(setIsSearch(false));
  };
  return (
    <>
      <Header />
      <Navigation menu="members" />
      <div className="wrapper">
        <BreadCrumbs param={`${location.search}`} />

        <hr className="print:hidden" />
        <p></p>
        <div className="w-full pt-5 pb-20">
          <div
            className="group flex items-center justify-between border-b border-solid border-gray-300"
            onClick={handleShow}
          >
            <SetupCapitalShareLink menu="members" />
          </div>
          <div
            className="group flex items-center justify-between border-b border-solid border-gray-300"
            onClick={handleShow}
          >
            <TransactionCapitalShareLink menu="members" />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default CapitalDeatilsLinks;
