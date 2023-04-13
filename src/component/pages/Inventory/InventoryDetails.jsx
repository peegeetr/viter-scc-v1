import React from "react";
import Header from "../../partials/Header";
import Navigation from "../../partials/Navigation";
import Footer from "../../partials/Footer";
import { StoreContext } from "../../../store/StoreContext";
import CategoryLink from "./categories/CategoryLink";
import OrderLink from "./orders/OrderLink";
import ProductLink from "./products/ProductLink";
import ReportsLink from "./reports/ReportsLink";
import SalesLink from "./sales/SalesLink";
import StocksLink from "./stocks/StocksLink";
import SuppliersLink from "./suppliers/SuppliersLink";

const InventoryDetails = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  return (
    <>
      <Header />
      <Navigation menu="inventory" />
      <div className="wrapper">
        <h4 className="text-xl mb-3">Inventory</h4>
        {/* <BreadCrumbs /> */}
        <hr />
        <ul className="pt-2 pb-20 relative">
          <li className="py-1">
            <CategoryLink />{" "}
          </li>
          <li className="py-1">
            <OrderLink />
          </li>
          <li className="py-1">
            <ProductLink />
          </li>
          <li className="py-1">
            <ReportsLink />
          </li>
          <li className="py-1">
            <SalesLink />
          </li>
          <li className="py-1">
            <StocksLink />
          </li>
          <li className="py-1">
            <SuppliersLink />
          </li>
        </ul>
        <Footer />
      </div>
    </>
  );
};

export default InventoryDetails;