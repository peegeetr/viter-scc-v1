import React from "react";
import useQueryData from "../../../../custom-hooks/useQueryData";
import { getUrlParam } from "../../../../helpers/functions-general";
import BreadCrumbs from "../../../../partials/BreadCrumbs";
import Footer from "../../../../partials/Footer";
import Header from "../../../../partials/Header";
import Navigation from "../../../../partials/Navigation";
import ModalError from "../../../../partials/modals/ModalError";
import ModalSuccess from "../../../../partials/modals/ModalSuccess";
import SetupCapitalShareList from "../../../account/details/capital-share/setup/SetupCapitalShareList";
import { StoreContext } from "../../../../../store/StoreContext";

const MyAccountSetupCapitalShare = () => {
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
  // use if not loadmore button undertime
  const { data: membersSubscribeCapital } = useQueryData(
    `/v1/members/read-subscribe-capital-by-id/${store.credentials.data.members_aid}`,
    "get", // method
    "membersSubscribeCapital" // key
  );

  return (
    <>
      <Header />
      <Navigation menu="myaccount" />
      <div className="wrapper ">
        <div className="flex items-center justify-between whitespace-nowrap overflow-auto gap-2">
          <BreadCrumbs param={`${location.search}`} />{" "}
        </div>
        <hr className="print:hidden" />

        <div className="w-full pb-20 mt-3 ">
          <SetupCapitalShareList
            members={members}
            isLoading={isLoading}
            error={error}
            subscribeCapital={membersSubscribeCapital}
          />
        </div>
        <Footer />
      </div>

      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default MyAccountSetupCapitalShare;
