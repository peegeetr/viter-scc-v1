import React from "react";
import { StoreContext } from "../../../../store/StoreContext";
import BreadCrumbs from "../../../partials/BreadCrumbs";
import Footer from "../../../partials/Footer";
import Header from "../../../partials/Header";
import Navigation from "../../../partials/Navigation";
import ModalError from "../../../partials/modals/ModalError";
import ModalSuccess from "../../../partials/modals/ModalSuccess";
import ProductsList from "./ProductsList";
import { AiFillPrinter } from "react-icons/ai";

const Products = () => {
  const { store, dispatch } = React.useContext(StoreContext);

  return (
    <>
      <Header />
      <Navigation menu="inventory" />{" "}
      <div className="wrapper">
        <div className="flex items-center justify-between whitespace-nowrap overflow-auto gap-2 ">
          <BreadCrumbs />
          <button
            type="button"
            className="btn-primary print:hidden"
            onClick={() => window.print()}
          >
            <AiFillPrinter />
            <span>Print</span>
          </button>
        </div> 

        <hr className="print:hidden" />
        <div className="w-full pt-5 pb-20">
          <ProductsList />
        </div>
        <Footer />
      </div>
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default Products;
