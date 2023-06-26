import React from "react";
import MyProfile from "../MyProfile";
import { StoreContext } from "../../../../../store/StoreContext";
import PageNotFound from "../../../../partials/PageNotFound";

const CashierMyProfile = () => {
  const { store } = React.useContext(StoreContext);
  const sccToken = JSON.parse(localStorage.getItem("sccToken"));

  if (sccToken.isDev === true) {
    return <PageNotFound />;
  }
  if (store.credentials.data.role_is_cashier !== 1) {
    return <PageNotFound />;
  }
  return (
    <>
      <MyProfile />
    </>
  );
};

export default CashierMyProfile;
