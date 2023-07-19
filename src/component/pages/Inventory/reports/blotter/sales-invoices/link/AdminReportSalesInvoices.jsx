import React from "react";
import { StoreContext } from "../../../../../../../store/StoreContext";
import PageNotFound from "../../../../../../partials/PageNotFound";
import ReportSalesInvoices from "../ReportSalesInvoices";

const AdminReportSalesInvoices = () => {
  const { store } = React.useContext(StoreContext);
  const sccToken = JSON.parse(localStorage.getItem("sccToken"));

  if (sccToken.isDev === true) {
    return <PageNotFound />;
  }
  if (store.credentials.data.role_is_admin !== 1) {
    return <PageNotFound />;
  }
  return (
    <>
      <ReportSalesInvoices />
    </>
  );
};

export default AdminReportSalesInvoices;
