import React from "react";
import { StoreContext } from "../../../../store/StoreContext";
import Footer from "../../../partials/Footer";
import Header from "../../../partials/Header";
import Navigation from "../../../partials/Navigation";
import ModalError from "../../../partials/modals/ModalError";
import ModalSuccess from "../../../partials/modals/ModalSuccess";
import BreadCrumbs from "../../../partials/BreadCrumbs";
import CasherPointOfSalesList from "../../point-of-sales/CasherPointOfSalesList";

const PointOfSales = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);

  return (
    <>
      <Header />
      <Navigation menu="inventory" />
      <div className="wrapper">
        <BreadCrumbs />
        <hr /> <CasherPointOfSalesList />
        <Footer />
      </div>
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default PointOfSales;
