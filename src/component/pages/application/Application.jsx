import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import { setIsAdd } from "../../../store/StoreAction.jsx";
import { StoreContext } from "../../../store/StoreContext.jsx";
import BreadCrumbs from "../../partials/BreadCrumbs.jsx";
import Footer from "../../partials/Footer.jsx";
import Header from "../../partials/Header.jsx";
import ModalSuccess from "../../partials/modals/ModalSuccess.jsx";
import ModalError from "../../partials/modals/ModalError.jsx";
import Navigation from "../../partials/Navigation.jsx";
import ApplicationList from "./ApplicationList.jsx";
import ModalAddApplication from "./ModalAddApplication.jsx";

const Application = () => {
  const { store, dispatch } = React.useContext(StoreContext); 

  const handleAdd = () => {
    dispatch(setIsAdd(true)); 
  };
  return (
    <>
     <Header />
      <Navigation menu="application" />
      
      <div className="wrapper">
        <div className="flex items-center justify-between whitespace-nowrap overflow-auto gap-2 ">
          <h4 className="text-xl mb-3">Application</h4>  

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
          <ApplicationList />
        </div>
        <Footer />
      </div>
      {store.isAdd && <ModalAddApplication />}
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default Application;
