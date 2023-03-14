import React from "react";
import { StoreContext } from "../../../../../store/StoreContext";
import useQueryData from "../../../../custom-hooks/useQueryData";
import { getUrlParam } from "../../../../helpers/functions-general";
import BreadCrumbs from "../../../../partials/BreadCrumbs";
import Footer from "../../../../partials/Footer";
import Header from "../../../../partials/Header";
import ModalError from "../../../../partials/modals/ModalError";
import ModalSuccess from "../../../../partials/modals/ModalSuccess";
import Navigation from "../../../../partials/Navigation";
import ProfileList from "./ProfileList";

const Profile = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const memberid = getUrlParam().get("memberid");

  // use if not loadmore button undertime
  const {
    isLoading,
    error,
    data: members,
  } = useQueryData(
    `/v1/members/${memberid}`,
    "get", // method
    "members" // key
  );
  return (
    <>
      <Header />
      <Navigation menu="account" />
      <div className="wrapper">
        <BreadCrumbs param={`${location.search}`} />
        <hr />

        <div className="w-full pb-20">
          <ProfileList
            members={members?.data}
            isLoading={isLoading}
            error={error}
          />
        </div>
        <Footer />
      </div>

      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default Profile;
