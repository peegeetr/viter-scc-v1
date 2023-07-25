import React from "react";
import { StoreContext } from "../../../../store/StoreContext";
import BreadCrumbs from "../../../partials/BreadCrumbs";
import Footer from "../../../partials/Footer";
import Header from "../../../partials/Header";
import Navigation from "../../../partials/Navigation";
import ModalError from "../../../partials/modals/ModalError";
import ModalSuccess from "../../../partials/modals/ModalSuccess";
import CasherPointOfSalesListV2 from "../../point-of-sales/CasherPointOfSalesListV2";

const PointOfSalesV2 = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);

  return (
    <>
      <Header />
      <Navigation menu="inventory" />
      <div className="wrapper">
        <BreadCrumbs />
        <hr className="print:hidden" /> <CasherPointOfSalesListV2 />
        <Footer />
      </div>
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default PointOfSalesV2;
