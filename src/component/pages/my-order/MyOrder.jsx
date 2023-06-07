import React from "react";
import { StoreContext } from "../../../store/StoreContext";
import Header from "../../partials/Header";
import Navigation from "../../partials/Navigation";
import BreadCrumbs from "../../partials/BreadCrumbs";
import MyOrderList from "./MyOrderList";
import Footer from "../../partials/Footer";
import ModalAddMyOrder from "./ModalAddMyOrder";
import ModalSuccess from "../../partials/modals/ModalSuccess";
import ModalError from "../../partials/modals/ModalError";
import { FaShoppingCart } from "react-icons/fa";
import { setIsAdd } from "../../../store/StoreAction";

const MyOrder = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);
  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };

  return (
    <>
      <Header />
      <Navigation menu="my-order" />
      <div className="wrapper">
        <div className="flex items-center justify-between whitespace-nowrap overflow-auto gap-2">
          <h4 className="text-xl mb-3">My Order</h4>
          <div className="flex items-center gap-1 self-baseline">
            <button type="button" className="btn-primary" onClick={handleAdd}>
              <FaShoppingCart />
              <span className="hidden xs:block">Order now</span>
            </button>
          </div>
        </div>
        <hr />

        <div className="w-full pb-20 mt-3 ">
          <MyOrderList setItemEdit={setItemEdit} />
        </div>
        <Footer />
      </div>

      {store.isAdd && <ModalAddMyOrder item={itemEdit} arrKey="my-order" />}
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default MyOrder;
