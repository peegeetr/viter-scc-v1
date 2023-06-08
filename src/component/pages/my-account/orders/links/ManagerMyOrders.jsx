import React from "react";
import MyOrders from "../MyOrders";
import { StoreContext } from "../../../../../store/StoreContext";
import PageNotFound from "../../../../partials/PageNotFound";

const ManagerMyOrders = () => {
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
      <MyOrders />
    </>
  );
};

export default ManagerMyOrders;
