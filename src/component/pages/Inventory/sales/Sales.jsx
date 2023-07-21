import React from "react";
import { StoreContext } from "../../../../store/StoreContext";
import BreadCrumbs from "../../../partials/BreadCrumbs";
import Footer from "../../../partials/Footer";
import Header from "../../../partials/Header";
import Navigation from "../../../partials/Navigation";
import ModalSuccess from "../../../partials/modals/ModalSuccess";
import ModalUpdateSales from "./ModalUpdateSales";
import SalesList from "./SalesList";
import ModalViewSales from "./ModalViewSales";
import ModalError from "../../../partials/modals/ModalError";

const Sales = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);

  return (
    <>
      <Header />
      <Navigation menu="inventory" />{" "}
      <div className="wrapper">
        <div className="flex items-center justify-between whitespace-nowrap overflow-auto gap-2 ">
          <BreadCrumbs />
        </div>

        <hr className="print:hidden" />
        <div className="w-full pt-5 pb-20">
          <SalesList setItemEdit={setItemEdit} />
        </div>
        <Footer />
      </div>
      {store.isConfirm && <ModalUpdateSales item={itemEdit} />}
      {store.isAdd && <ModalViewSales item={itemEdit} />}
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default Sales;
