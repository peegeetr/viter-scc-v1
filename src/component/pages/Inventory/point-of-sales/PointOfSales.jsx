import React from "react";
import { StoreContext } from "../../../../store/StoreContext";
import Footer from "../../../partials/Footer";
import Header from "../../../partials/Header";
import Navigation from "../../../partials/Navigation";
import ModalError from "../../../partials/modals/ModalError";
import ModalSuccess from "../../../partials/modals/ModalSuccess";
import BreadCrumbs from "../../../partials/BreadCrumbs";

const PointOfSales = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);

  return (
    <>
      <Header />
      <Navigation menu="inventory" />
      <div className="wrapper">
        {/* <h4 className="text-xl mb-3">Point Of Sales</h4> */}
        <BreadCrumbs />

        <hr />
        <div className="w-full pt-5 pb-20">
          {" "}
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

export default PointOfSales;
