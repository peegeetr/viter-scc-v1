import React from "react";
import CapitalDeatilsLinks from "../CapitalDeatilsLinks";
import { StoreContext } from "../../../../../../store/StoreContext";
import PageNotFound from "../../../../../partials/PageNotFound";

const AdminCapitalShare = () => {
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
      <CapitalDeatilsLinks />
    </>
  );
};

export default AdminCapitalShare;
