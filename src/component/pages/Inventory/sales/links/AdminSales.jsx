import React from "react";
import Sales from "../Sales";
import { StoreContext } from "../../../../../store/StoreContext";
import PageNotFound from "../../../../partials/PageNotFound";

const AdminSales = () => {
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
      <Sales />
    </>
  );
};

export default AdminSales;