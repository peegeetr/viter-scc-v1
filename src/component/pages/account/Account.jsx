import React from "react";
import { StoreContext } from "../../../store/StoreContext.jsx";
import BreadCrumbs from "../../partials/BreadCrumbs.jsx";
import Footer from "../../partials/Footer.jsx";
import Header from "../../partials/Header.jsx";
import ModalError from "../../partials/modals/ModalError.jsx";
import ModalSuccess from "../../partials/modals/ModalSuccess.jsx";
import Navigation from "../../partials/Navigation.jsx";
import AccountList from "./AccountList.jsx";

const Account = () => {  
  const { store, dispatch } = React.useContext(StoreContext); 
  return (
    <>
     <Header />
      <Navigation menu="account" />
      
      <div className="wrapper">
        <div className="flex items-center justify-between whitespace-nowrap overflow-auto gap-2 ">
          <h4 className="text-xl mb-3">Account</h4>  

          <BreadCrumbs /> 
        </div>
        <hr />

        <div className="w-full pt-5 pb-20">
          <AccountList />
        </div>
        <Footer />
      </div> 
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default Account;
