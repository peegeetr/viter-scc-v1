import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import { setIsAdd } from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import BreadCrumbs from "../../../partials/BreadCrumbs";
import Footer from "../../../partials/Footer";
import Header from "../../../partials/Header";
import Navigation from "../../../partials/Navigation";
import SalesList from "./SalesList";
import ModalUpdateSales from "./ModalUpdateSales";
import ModalSuccess from "../../../partials/modals/ModalSuccess";

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

        <hr />
        <div className="w-full pt-5 pb-20">
          <SalesList setItemEdit={setItemEdit} />
        </div>
        <Footer />
      </div>
      {store.isConfirm && <ModalUpdateSales item={itemEdit} />}
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default Sales;
