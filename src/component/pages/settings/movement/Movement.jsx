import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import { setIsAdd } from "../../../../store/StoreAction.jsx";
import { StoreContext } from "../../../../store/StoreContext.jsx";
import BreadCrumbs from "../../../partials/BreadCrumbs.jsx";
import Footer from "../../../partials/Footer.jsx";
import Header from "../../../partials/Header.jsx";
import ModalError from "../../../partials/modals/ModalError";
import ModalSuccess from "../../../partials/modals/ModalSuccess";
import Navigation from "../../../partials/Navigation.jsx";
import ModalAddMovement from "./ModalAddMovement.jsx";
import MovementList from "./MovementList.jsx";
const Movement = () => {
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
      <div className="relative min-h-screen pt-20 ml-0 px-5 md:ml-20 lg:ml-40 lg:px-10">
        {/* <h4 className="text-xl">Settings</h4> */}

        <div className="flex items-center justify-between whitespace-nowrap overflow-auto gap-2 ">
          <BreadCrumbs />
          <div className="flex items-center gap-1 self-baseline">
            <button type="button" className="btn-primary" onClick={handleAdd}>
              <FaPlusCircle />
              <span>Add</span>
            </button>
          </div>
        </div>
        <hr />

        <div className="w-full pt-5 pb-20">
          <MovementList setItemEdit={setItemEdit} />
        </div>
        <Footer />
      </div>

      {store.isAdd && <ModalAddMovement itemEdit={itemEdit} />}
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default Movement;
