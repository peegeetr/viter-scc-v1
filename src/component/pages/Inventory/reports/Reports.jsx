import React from "react";
import { StoreContext } from "../../../../store/StoreContext";
import BreadCrumbs from "../../../partials/BreadCrumbs";
import Footer from "../../../partials/Footer";
import Header from "../../../partials/Header";
import Navigation from "../../../partials/Navigation";
import ReportSalesLink from "./sales-report/ReportsLink";
import TopSellerLink from "./top-seller/ReportsLink";
import ReportDetailedCapitalShareLink from "./capital-report/detailed/ReportDetailedCapitalShareLink";

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

        <hr />
        <div className="w-full pt-5 pb-20">
          <TopSellerLink />
          <ReportSalesLink />
          <ReportDetailedCapitalShareLink />
        </div>
        <Footer />
      </div>
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default Reports;
