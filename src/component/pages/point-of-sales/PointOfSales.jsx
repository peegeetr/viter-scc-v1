import React from "react";
import { StoreContext } from "../../../store/StoreContext";
import Footer from "../../partials/Footer";
import Header from "../../partials/Header";
import Navigation from "../../partials/Navigation";
import ModalError from "../../partials/modals/ModalError";
import ModalSuccess from "../../partials/modals/ModalSuccess";
import PointOfSalesList from "./PointOfSalesList";

const PointOfSales = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);

  return (
    <>
      <Header />
      <Navigation menu="point-of-sales" />
      <div className="wrapper">
        <h4 className="text-xl mb-3">Point Of Sales</h4>

        <hr />
        <div className="w-full pt-5 pb-20">
          <PointOfSalesList setItemEdit={setItemEdit} />
        </div>
        <Footer />
      </div>
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default PointOfSales;
