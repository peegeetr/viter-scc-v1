import React from "react";
import MyAccountSetupCapitalShare from "../MyAccountSetupCapitalShare";
import { StoreContext } from "../../../../../../store/StoreContext";
import PageNotFound from "../../../../../partials/PageNotFound";

const MemberMyAccountSetupCapitalShare = () => {
  const { store } = React.useContext(StoreContext);
  const sccToken = JSON.parse(localStorage.getItem("sccToken"));

  if (sccToken.isDev === true) {
    return <PageNotFound />;
  }
  if (store.credentials.data.role_is_member !== 1) {
    return <PageNotFound />;
  }
  return (
    <>
      <MyAccountSetupCapitalShare />
    </>
  );
};

export default MemberMyAccountSetupCapitalShare;
