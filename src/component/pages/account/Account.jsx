import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import { setIsAdd } from "../../../store/StoreAction.jsx";
import { StoreContext } from "../../../store/StoreContext.jsx";
import BreadCrumbs from "../../partials/BreadCrumbs.jsx";
import Footer from "../../partials/Footer.jsx";
import Header from "../../partials/Header.jsx";
import Navigation from "../../partials/Navigation.jsx";
import AccountList from "./AccountList.jsx";
import ModalAddAccount from "./ModalAddAccount.jsx";

const Account = () => {
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
        <div className="flex items-center justify-between whitespace-nowrap overflow-auto gap-2 ">
          <h4 className="text-xl mb-3">Account</h4>  

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
          <AccountList setItemEdit={setItemEdit} />
        </div>
        <Footer />
      </div>
      {store.isAdd && <ModalAddAccount />}
    </>
  );
};

export default Account;
