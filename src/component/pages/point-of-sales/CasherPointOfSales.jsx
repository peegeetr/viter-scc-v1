import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import { setIsAdd } from "../../../store/StoreAction.jsx";
import { StoreContext } from "../../../store/StoreContext.jsx";
import Footer from "../../partials/Footer.jsx";
import Header from "../../partials/Header.jsx";
import ModalError from "../../partials/modals/ModalError.jsx";
import ModalSuccess from "../../partials/modals/ModalSuccess.jsx";
import ModalAddCasherPointOfSales from "./ModalAddCasherPointOfSales.jsx";
import CasherPointOfSalesList from "./CasherPointOfSalesList.jsx";

const CasherPointOfSales = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  return (
    <>
      <Header />
      <div className="wrapper !m-0 !px-[1.50rem] pt-[4rem] ">
        <CasherPointOfSalesList />
        <Footer />
      </div>
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default CasherPointOfSales;
