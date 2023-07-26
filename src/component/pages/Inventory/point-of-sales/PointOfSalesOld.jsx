import React from "react";
import { StoreContext } from "../../../../store/StoreContext";
import BreadCrumbs from "../../../partials/BreadCrumbs";
import Footer from "../../../partials/Footer";
import Header from "../../../partials/Header";
import Navigation from "../../../partials/Navigation";
import ModalError from "../../../partials/modals/ModalError";
import ModalSuccess from "../../../partials/modals/ModalSuccess";
import CasherPointOfSalesListOld from "../../point-of-sales-old/CasherPointOfSalesListOld";

const PointOfSaleOld = () => {
  const { store, dispatch } = React.useContext(StoreContext);

  return (
    <>
      <Header />
      <Navigation menu="inventory" />
      <div className="wrapper">
        <BreadCrumbs />
        <hr className="print:hidden" /> <CasherPointOfSalesListOld />
        <Footer />
      </div>
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default PointOfSaleOld;
