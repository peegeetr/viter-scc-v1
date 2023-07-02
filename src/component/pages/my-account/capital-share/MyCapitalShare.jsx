import React from "react";
import { StoreContext } from "../../../../store/StoreContext";
import BreadCrumbs from "../../../partials/BreadCrumbs";
import Footer from "../../../partials/Footer";
import Header from "../../../partials/Header";
import Navigation from "../../../partials/Navigation";
import ModalError from "../../../partials/modals/ModalError";
import ModalSuccess from "../../../partials/modals/ModalSuccess";
import { setIsSearch, setStartIndex } from "../../../../store/StoreAction";
import SetupCapitalShareLink from "../../account/details/capital-share/setup/SetupCapitalShareLink";
import TransactionCapitalShareLink from "../../account/details/capital-share/transactions/TransactionCapitalShareLink";

const MyCapitalShare = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const handleShow = () => {
    dispatch(setStartIndex(0));
    dispatch(setIsSearch(false));
  };
  return (
    <>
      <Header />
      <Navigation menu="myaccount" />
      <div className="wrapper">
        <BreadCrumbs param={`${location.search}`} />

        <hr />
        <p></p>
        <div className="w-full pt-5 pb-20">
          <div
            className="group flex items-center justify-between border-b border-solid border-gray-300"
            onClick={handleShow}
          >
            <SetupCapitalShareLink menu="myaccount" />
          </div>
          <div
            className="group flex items-center justify-between border-b border-solid border-gray-300"
            onClick={handleShow}
          >
            <TransactionCapitalShareLink menu="myaccount" />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default MyCapitalShare;
