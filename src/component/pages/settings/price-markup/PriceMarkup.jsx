import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import { setIsAdd } from "../../../../store/StoreAction.jsx";
import { StoreContext } from "../../../../store/StoreContext.jsx";
import BreadCrumbs from "../../../partials/BreadCrumbs.jsx";
import Footer from "../../../partials/Footer.jsx";
import Header from "../../../partials/Header.jsx";
import Navigation from "../../../partials/Navigation.jsx";
import ModalError from "../../../partials/modals/ModalError.jsx";
import ModalSuccess from "../../../partials/modals/ModalSuccess.jsx";
import ModalAddPriceMarkup from "./ModalAddPriceMarkup.jsx";
import PriceMarkupList from "./PriceMarkupList.jsx";

const PriceMarkup = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };
  return (
    <>
      <Header />
      <Navigation menu="settings" />
      <div className="wrapper">
        <div className="flex items-center justify-between whitespace-nowrap overflow-auto gap-2">
          <BreadCrumbs />
          <button
            type="button"
            className="btn-primary print:hidden"
            onClick={handleAdd}
          >
            <FaPlusCircle />
            <span>Add</span>
          </button>
        </div>

        <hr className="print:hidden" />
        <div className="w-full pt-5 pb-20">
          <PriceMarkupList setItemEdit={setItemEdit} />
        </div>
        <Footer />
      </div>
      {store.isAdd && <ModalAddPriceMarkup item={itemEdit} />}
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default PriceMarkup;