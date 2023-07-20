import React from "react";
import { StoreContext } from "../../../../store/StoreContext";
import BreadCrumbs from "../../../partials/BreadCrumbs";
import Footer from "../../../partials/Footer";
import Header from "../../../partials/Header";
import Navigation from "../../../partials/Navigation";
import ReportCapitalShareLink from "./capital-report/ReportCapitalShareLink";
import ReportSalesLink from "./sales-report/ReportSalesLink";
import TopSellerLink from "./top-seller/ReportsLink";
import ReportStocksLink from "./stocks-report/ReportStocksLink";
import ReportPettyCashLink from "./blotter/petty-cash/ReportPettyCashLink";
import ReportBlotterLink from "./blotter/ReportSalesLink";

const Reports = () => {
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
          <TopSellerLink />
          <ReportSalesLink />
          <ReportStocksLink />
          <ReportCapitalShareLink />
          <ReportBlotterLink />
        </div>
        <Footer />
      </div>
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default Reports;
