import React from "react";
import { StoreContext } from "../../../../store/StoreContext";
import BreadCrumbs from "../../../partials/BreadCrumbs";
import Footer from "../../../partials/Footer";
import Header from "../../../partials/Header";
import Navigation from "../../../partials/Navigation";
import ModalError from "../../../partials/modals/ModalError";
import ModalSuccess from "../../../partials/modals/ModalSuccess";
import CasherPointOfSalesList from "../../point-of-sales/CasherPointOfSalesList";
import { AiFillPrinter } from "react-icons/ai";

const PointOfSales = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [isGeneralPrint, setIsGeneralPrint] = React.useState(false);

  const handlePrint = () => {
    setIsGeneralPrint(false);
    window.print();
  };

  return (
    <>
      <div className="print:hidden">
        <Header />
      </div>
      <Navigation menu="inventory" />
      <div className="wrapper">
        <BreadCrumbs />
        <hr className="print:hidden" />
        <CasherPointOfSalesList />
        <Footer />
      </div>
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default PointOfSales;
