import React from "react";
import BreadCrumbs from "../../../../../partials/BreadCrumbs";
import Footer from "../../../../../partials/Footer";
import Header from "../../../../../partials/Header";
import Navigation from "../../../../../partials/Navigation";
import ModalError from "../../../../../partials/modals/ModalError";
import ModalSuccess from "../../../../../partials/modals/ModalSuccess";
import ReportDividendCapitalShareList from "./ReportDividendCapitalShareList";
import { StoreContext } from "../../../../../../store/StoreContext";

const ReportDividendCapitalShare = () => {
  const { store, dispatch } = React.useContext(StoreContext);

  return (
    <>
      <Header />
      <Navigation menu="inventory" />
      <div className="wrapper print:pb-0 print:mb-0">
        <div className="flex items-center justify-between whitespace-nowrap overflow-auto gap-2 print:justify-center print:mt-5">
          <p className="hidden print:block text-sm text-black mb-0">
            Dividend Details
          </p>
        </div>
        <div className="flex items-center justify-between whitespace-nowrap overflow-auto gap-2 print:hidden ">
          <BreadCrumbs />
        </div>
        <hr className="print:hidden" />
        <div className="w-full pt-5 pb-20">
          <ReportDividendCapitalShareList />
        </div>
        <Footer />
      </div>
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default ReportDividendCapitalShare;
