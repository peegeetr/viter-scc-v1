import React from "react";
import { StoreContext } from "../../../../../../store/StoreContext";
import PageNotFound from "../../../../../partials/PageNotFound";
import ReportBlotter from "../ReportBlotter";

const ManagerReportBlotter = () => {
  const { store } = React.useContext(StoreContext);
  const sccToken = JSON.parse(localStorage.getItem("sccToken"));

  if (sccToken.isDev === true) {
    return <PageNotFound />;
  }
  if (store.credentials.data.role_is_manager !== 1) {
    return <PageNotFound />;
  }
  return (
    <>
      <ReportBlotter />
    </>
  );
};

export default ManagerReportBlotter;
