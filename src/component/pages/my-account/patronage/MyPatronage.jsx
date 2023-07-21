import React from "react";
import { setIsAdd } from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import BreadCrumbs from "../../../partials/BreadCrumbs";
import Footer from "../../../partials/Footer";
import Header from "../../../partials/Header";
import Navigation from "../../../partials/Navigation";
import ModalError from "../../../partials/modals/ModalError";
import ModalSuccess from "../../../partials/modals/ModalSuccess";

const MyPatronage = () => {
  const { store, dispatch } = React.useContext(StoreContext);

  return (
    <>
      <Header />
      <Navigation menu="myaccount" />
      <div className="wrapper">
        <div className="flex items-center justify-between whitespace-nowrap overflow-auto gap-2">
          <BreadCrumbs />
        </div>
        <hr className="print:hidden" />

        <div className="w-full pb-20 mt-3 ">
          {" "}
          <p className="text-primary">
            We'll be right back! We are just doing some improvement in this
            page. Thank you for understaning.
          </p>
          {/* <PatronageList setItemEdit={setItemEdit} /> */}
        </div>
        <Footer />
      </div>
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default MyPatronage;
