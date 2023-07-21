import React from "react";
import { StoreContext } from "../../../../../../store/StoreContext";
import useQueryData from "../../../../../custom-hooks/useQueryData";
import { getUrlParam } from "../../../../../helpers/functions-general";
import BreadCrumbs from "../../../../../partials/BreadCrumbs";
import Footer from "../../../../../partials/Footer";
import Header from "../../../../../partials/Header";
import Navigation from "../../../../../partials/Navigation";
import ModalError from "../../../../../partials/modals/ModalError";
import ModalSuccess from "../../../../../partials/modals/ModalSuccess";
import SetupCapitalShareList from "./SetupCapitalShareList";

const SetupCapitalShare = () => {
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
    "membersSubscribeCapital"
  );
  // use if not loadmore button undertime
  const { data: membersSubscribeCapital } = useQueryData(
    `/v1/members/read-subscribe-capital-by-id/${memberid}`,
    "get", // method
    "membersSubscribeCapital", // key
    {},
    members
  );

  return (
    <>
      <Header />
      <Navigation menu="members" />
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
            menu="members"
          />
        </div>
        <Footer />
      </div>

      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default SetupCapitalShare;
