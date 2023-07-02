import React from "react";
import MyCapitalShare from "../MyCapitalShare";
import { StoreContext } from "../../../../../store/StoreContext";
import PageNotFound from "../../../../partials/PageNotFound";
import CapitalDeatilsLinks from "../../../account/details/capital-share/CapitalDeatilsLinks";

const MemberMyCapitalShare = () => {
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
      <MyCapitalShare />
    </>
  );
};

export default MemberMyCapitalShare;
