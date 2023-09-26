import React from "react";
import { MdFilterAlt } from "react-icons/md";
import { SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";
import { StoreContext } from "../../../../store/StoreContext";
import { getUserType } from "../../../helpers/functions-general";
import BreadCrumbs from "../../../partials/BreadCrumbs";
import Footer from "../../../partials/Footer";
import Header from "../../../partials/Header";
import Navigation from "../../../partials/Navigation";
import ModalError from "../../../partials/modals/ModalError";
import ModalSuccess from "../../../partials/modals/ModalSuccess";
import ProductsList from "./ProductsList";

const Products = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const urlLink = getUserType(store);

  return (
    <>
      <Header />
      <Navigation menu="inventory" />
      <div className="wrapper">
        <div className="flex items-center justify-between whitespace-nowrap overflow-auto gap-2 ">
          <BreadCrumbs />

          <Link
            to={`${urlLink}/inventory/products/filter`}
            type="button"
            className="btn-primary print:hidden"
          >
            <span>Price List</span>
            <SlArrowRight className="inline" />
          </Link>
        </div>

        <hr className="print:hidden" />
        <div className="w-full pt-5 pb-20 print:pt-0">
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
