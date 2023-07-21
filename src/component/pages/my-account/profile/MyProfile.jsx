import React from "react";
import { StoreContext } from "../../../../store/StoreContext";
import useQueryData from "../../../custom-hooks/useQueryData";
import BreadCrumbs from "../../../partials/BreadCrumbs";
import Footer from "../../../partials/Footer";
import Header from "../../../partials/Header";
import ModalError from "../../../partials/modals/ModalError";
import ModalSuccess from "../../../partials/modals/ModalSuccess";
import Navigation from "../../../partials/Navigation";
import ProfileList from "../../account/details/profile/ProfileList";

const MyProfile = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  // use if not loadmore button undertime
  const {
    isLoading,
    error,
    data: members,
  } = useQueryData(
    `/v1/members/${store.credentials.data.members_aid}`,
    "get", // method
    "members" // key
  );
  return (
    <>
      <Header />
      <Navigation menu="myaccount" />
      <div className="wrapper">
        <BreadCrumbs />
        <hr className="print:hidden" />

        <div className="w-full pb-20">
          <ProfileList members={members} isLoading={isLoading} error={error} />
        </div>
        <Footer />
      </div>

      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default MyProfile;
