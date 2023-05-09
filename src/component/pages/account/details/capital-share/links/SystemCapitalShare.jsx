import React from "react";
import CapitalShare from "../CapitalShare";
import { StoreContext } from "../../../../../../store/StoreContext";
import PageNotFound from "../../../../../partials/PageNotFound";

const SystemCapitalShare = () => {
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
      <CapitalShare />
    </>
  );
};

export default SystemCapitalShare;
