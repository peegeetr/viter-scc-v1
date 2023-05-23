import React from "react";
import { StoreContext } from "../../../../../store/StoreContext";
import PageNotFound from "../../../../partials/PageNotFound";
import Header from "../../../../partials/Header";
import Footer from "../../../../partials/Footer";
import ModalSuccess from "../../../../partials/modals/ModalSuccess";

const CasherPointOfSales = () => {
  const { store } = React.useContext(StoreContext);
  const sccToken = JSON.parse(localStorage.getItem("sccToken"));

  if (sccToken.isDev === true) {
    return <PageNotFound />;
  }
  if (store.credentials.data.role_is_casher !== 1) {
    return <PageNotFound />;
  }
  return (
    <>
      <Header />
      <div className="wrapper ml-0">
        <div className="w-full pt-5 pb-20">
          <p className="text-primary">
            We'll be right back! We are just doing some improvement in this
            page. Thank you for understaning.
          </p>
          {/* <PointOfSalesList setItemEdit={setItemEdit} /> */}
        </div>
        <Footer />
      </div>
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default CasherPointOfSales;
