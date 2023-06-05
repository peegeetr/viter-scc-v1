import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { StoreContext } from "../../../../store/StoreContext";
import BreadCrumbs from "../../../partials/BreadCrumbs";
import Header from "../../../partials/Header";
import ModalError from "../../../partials/modals/ModalError";
import ModalSuccess from "../../../partials/modals/ModalSuccess";
import Navigation from "../../../partials/Navigation";
import Footer from "../../../partials/Footer";
import PatronageList from "../../account/details/patronage/PatronageList";
import { setIsAdd } from "../../../../store/StoreAction";
import ModalAddMyOrder from "./ModalAddMyOrder";

const MyPatronage = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };

  return (
    <>
      <Header />
      <Navigation menu="myaccount" />
      <div className="wrapper">
        <div className="flex items-center justify-between whitespace-nowrap overflow-auto gap-2">
          <BreadCrumbs />
          <div className="flex items-center gap-1 self-baseline">
            <button type="button" className="btn-primary" onClick={handleAdd}>
              <FaShoppingCart />
              <span className="hidden xs:block">Order now</span>
            </button>
          </div>
        </div>
        <hr />

        <div className="w-full pb-20 mt-3 ">
          <PatronageList setItemEdit={setItemEdit} />
        </div>
        <Footer />
      </div>

      {store.isAdd && <ModalAddMyOrder item={itemEdit} arrKey="patronage" />}
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default MyPatronage;
