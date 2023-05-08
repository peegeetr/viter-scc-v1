import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import { setIsAdd } from "../../../../../store/StoreAction";
import { StoreContext } from "../../../../../store/StoreContext";
import BreadCrumbs from "../../../../partials/BreadCrumbs";
import Footer from "../../../../partials/Footer";
import Header from "../../../../partials/Header";
import ModalError from "../../../../partials/modals/ModalError";
import ModalSuccess from "../../../../partials/modals/ModalSuccess";
import Navigation from "../../../../partials/Navigation";
import ModalAddPatronage from "./ModalAddPatronage";
import PatronageList from "./PatronageList";

const Patronage = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };
  return (
    <>
      <Header />
      <Navigation menu="account" />
      <div className="wrapper">
        <div className="flex items-center justify-between whitespace-nowrap overflow-auto gap-2">
          <BreadCrumbs param={`${location.search}`} />{" "}
          {/* <div className="flex items-center gap-1">
            <button type="button" className="btn-primary" onClick={handleAdd}>
              <FaPlusCircle />
              <span>Add</span>
            </button>
          </div> */}
        </div>
        <hr />

        <div className="w-full pb-20 mt-3 ">
          <PatronageList setItemEdit={setItemEdit} />
        </div>
        <Footer />
      </div>

      {store.isAdd && <ModalAddPatronage item={itemEdit} />}
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default Patronage;
