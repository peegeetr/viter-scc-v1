import React from "react";
import { StoreContext } from "../../../../store/StoreContext";
import PageNotFound from "../../../partials/PageNotFound";
import MyAccount from "../MyAccount";

const CasherMyAccount = () => {
  const { store } = React.useContext(StoreContext);
  const sccToken = JSON.parse(localStorage.getItem("sccToken"));

  if (sccToken.isDev === true) {
    return <PageNotFound />;
  }
  if (store.credentials.data.role_is_casher !== 1) {
    return <PageNotFound />;
  }
  return (
    <>
      <MyAccount />
    </>
  );
};

export default CasherMyAccount;
