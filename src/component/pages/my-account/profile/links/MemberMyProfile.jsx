import React from "react";
import MyProfile from "../MyProfile";
import { StoreContext } from "../../../../../store/StoreContext";
import PageNotFound from "../../../../partials/PageNotFound";

const MemberMyProfile = () => {
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
      <MyProfile />
    </>
  );
};

export default MemberMyProfile;
