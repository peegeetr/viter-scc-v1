import React from "react";
import { StoreContext } from "../../../../store/StoreContext";
import { setIsAdd } from "../../../../store/StoreAction";
import Header from "../../../partials/Header";
import Navigation from "../../../partials/Navigation";
import { FaFileInvoiceDollar, FaPlusCircle } from "react-icons/fa";
import OrdersList from "./OrdersList";
import Footer from "../../../partials/Footer";
import ModalAddOrders from "./ModalAddOrders";
import BreadCrumbs from "../../../partials/BreadCrumbs";
import ModalSuccess from "../../../partials/modals/ModalSuccess";
import ModalError from "../../../partials/modals/ModalError";
import ModalManagerAddOrders from "./ModalManagerAddOrders";
import { Link } from "react-router-dom";
import { getUserType } from "../../../helpers/functions-general";

const Orders = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);
  const urlLink = getUserType(store);

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
          <BreadCrumbs />

          {store.credentials.data.role_is_member === 0 && (
            <div className="flex items-center gap-1 self-baseline">
              <button type="button" className="btn-primary" onClick={handleAdd}>
                <FaPlusCircle />
                <span>Add</span>
              </button>
              <Link
                to={`${urlLink}/inventory/orders/invoice`}
                type="button"
                className="btn-primary"
              >
                <FaFileInvoiceDollar />
                <span>Invoice</span>
              </Link>
            </div>
          )}
        </div>

        <hr />
        <div className="w-full pt-5 pb-20">
          <OrdersList setItemEdit={setItemEdit} />
        </div>
        <Footer />
      </div>
      {store.credentials.data.role_is_developer === 1 ||
      store.credentials.data.role_is_admin === 1 ||
      store.credentials.data.role_is_manager === 1
        ? store.isAdd && (
            <ModalManagerAddOrders item={itemEdit} arrKey="orders" />
          )
        : store.isAdd && <ModalAddOrders item={itemEdit} arrKey="orders" />}
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default Orders;
