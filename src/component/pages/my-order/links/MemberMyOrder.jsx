import React from "react";
import MyOrder from "../MyOrder";
import { StoreContext } from "../../../../store/StoreContext";
import PageNotFound from "../../../partials/PageNotFound";

const MemberMyOrder = () => {
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
      <MyOrder />
    </>
  );
};

export default MemberMyOrder;
