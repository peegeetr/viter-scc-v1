import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import { setIsAdd, setIsModalSearch } from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import BreadCrumbs from "../../../partials/BreadCrumbs";
import Footer from "../../../partials/Footer";
import Header from "../../../partials/Header";
import Navigation from "../../../partials/Navigation";
import ModalError from "../../../partials/modals/ModalError";
import ModalSuccess from "../../../partials/modals/ModalSuccess";
import ModalManagerAddOrders from "./ModalManagerAddOrders";
import OrdersList from "./OrdersList";

const Orders = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);

  const handleAdd = () => {
    dispatch(setIsModalSearch(false));
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
            <div className="flex items-center gap-1 self-baseline print:hidden">
              <button type="button" className="btn-primary" onClick={handleAdd}>
                <FaPlusCircle />
                <span>Add</span>
              </button>
            </div>
          )}
        </div>

        <hr className="print:hidden" />
        <div className="w-full pt-5 pb-20">
          <OrdersList setItemEdit={setItemEdit} />
        </div>
        <Footer />
      </div>
      {store.isAdd && <ModalManagerAddOrders item={itemEdit} arrKey="orders" />}
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default Orders;
