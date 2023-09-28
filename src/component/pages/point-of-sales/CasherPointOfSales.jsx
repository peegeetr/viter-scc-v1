import React from "react";
import { StoreContext } from "../../../store/StoreContext.jsx";
import Footer from "../../partials/Footer.jsx";
import Header from "../../partials/Header.jsx";
import PageNotFound from "../../partials/PageNotFound.jsx";
import ModalError from "../../partials/modals/ModalError.jsx";
import ModalSuccess from "../../partials/modals/ModalSuccess.jsx";
import CasherPointOfSalesList from "./CasherPointOfSalesList.jsx";

const CasherPointOfSales = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const sccToken = JSON.parse(localStorage.getItem("sccToken"));

  if (sccToken.isDev === true) {
    return <PageNotFound />;
  }
  if (store.credentials.data.role_is_cashier !== 1) {
    return <PageNotFound />;
  }
  return (
    <>
      <div className="print:hidden">
        <Header menu="cashier" />
      </div>

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
