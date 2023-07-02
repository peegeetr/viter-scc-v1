import React from "react";
import MyAcccountTransactionCapitalShare from "../MyAcccountTransactionCapitalShare";
import { StoreContext } from "../../../../../../store/StoreContext";
import PageNotFound from "../../../../../partials/PageNotFound";

const MemberMyAcccountTransactionCapitalShare = () => {
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
      <MyAcccountTransactionCapitalShare />
    </>
  );
};

export default MemberMyAcccountTransactionCapitalShare;
