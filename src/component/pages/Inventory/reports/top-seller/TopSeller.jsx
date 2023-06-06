import React from "react";
import { StoreContext } from "../../../../../store/StoreContext";
import Header from "../../../../partials/Header";
import Navigation from "../../../../partials/Navigation";
import Footer from "../../../../partials/Footer";
import ModalSuccess from "../../../../partials/modals/ModalSuccess";
import ModalError from "../../../../partials/modals/ModalError";
import TopSellerList from "./TopSellerList";
import BreadCrumbs from "../../../../partials/BreadCrumbs";

const TopSeller = () => {
  const { store, dispatch } = React.useContext(StoreContext);

  return (
    <>
      <Header />
      <Navigation menu="inventory" />
      <div className="wrapper">
        <div className="flex items-center justify-between whitespace-nowrap overflow-auto gap-2 ">
          <BreadCrumbs />
        </div>
        <hr />
        <div className="w-full pt-5 pb-20">
          <TopSellerList />
        </div>
        <Footer />
      </div>
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default TopSeller;
