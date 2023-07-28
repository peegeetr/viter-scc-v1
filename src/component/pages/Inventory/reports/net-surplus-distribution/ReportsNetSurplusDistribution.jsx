import React from "react";
import BreadCrumbs from "../../../../partials/BreadCrumbs";
import Footer from "../../../../partials/Footer";
import Header from "../../../../partials/Header";
import Navigation from "../../../../partials/Navigation";
import { StoreContext } from "../../../../../store/StoreContext";
import ReportDividendCapitalShareLink from "./dividend/ReportDividendCapitalShareLink";
import ReportDetailedCapitalShareLink from "./capital-share-detailed/ReportDetailedCapitalShareLink";
import ReportPatronageLink from "./patronage/ReportPatronageLink";

const ReportsNetSurplusDistribution = () => {
  const { store, dispatch } = React.useContext(StoreContext);

  return (
    <>
      <Header />
      <Navigation menu="inventory" />{" "}
      <div className="wrapper">
        <div className="flex items-center justify-between whitespace-nowrap overflow-auto gap-2 ">
          <BreadCrumbs />
        </div>

        <hr className="print:hidden" />
        <div className="w-full pt-5 pb-20">
          <ReportDetailedCapitalShareLink />
          <ReportDividendCapitalShareLink />
          <ReportPatronageLink />
        </div>
        <Footer />
      </div>
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default ReportsNetSurplusDistribution;
