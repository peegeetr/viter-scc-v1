import React from "react";
import { StoreContext } from "../../../../../../store/StoreContext";
import PageNotFound from "../../../../../partials/PageNotFound";
import ProductsView from "../ProductsView";

const SystemProductsView = () => {
  const { store } = React.useContext(StoreContext);
  const sccToken = JSON.parse(localStorage.getItem("sccToken"));
  if (sccToken.isDev === false) {
    return <PageNotFound />;
  }
  if (store.credentials.data.role_is_developer !== 1) {
    return <PageNotFound />;
  }
  return (
    <>
      <ProductsView />
    </>
  );
};

export default SystemProductsView;
