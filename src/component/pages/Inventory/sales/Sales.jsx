import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import { setIsAdd } from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import BreadCrumbs from "../../../partials/BreadCrumbs";
import Footer from "../../../partials/Footer";
import Header from "../../../partials/Header";
import Navigation from "../../../partials/Navigation";
import SalesList from "./SalesList";
import ModalAddOrders from "../orders/ModalAddOrders";
import ModalUpdateSales from "./ModalUpdateSales";
import ModalSuccess from "../../../partials/modals/ModalSuccess";

const Sales = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };

  return (
    <>
      <Header />
      <Navigation menu="inventory" />{" "}
      <div className="wrapper">
        <div className="flex items-center justify-between whitespace-nowrap overflow-auto gap-2 ">
          {/* <h4 className="text-xl mb-3">Sales</h4> */}
          <BreadCrumbs />

          {store.credentials.data.role_is_member === 0 && (
            <div className="flex items-center gap-1 self-baseline">
              <button type="button" className="btn-primary" onClick={handleAdd}>
                <FaPlusCircle />
                <span>Add</span>
              </button>
            </div>
          )}
        </div>

        <hr />
        <div className="w-full pt-5 pb-20">
          <SalesList setItemEdit={setItemEdit} />
        </div>
        <Footer />
      </div>
      {store.isAdd && <ModalAddOrders item={itemEdit} arrKey="sales" />}
      {store.isConfirm && <ModalUpdateSales item={itemEdit} />}
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default Sales;
