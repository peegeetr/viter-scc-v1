import React from "react";
import { StoreContext } from "../../../../../store/StoreContext";
import useQueryData from "../../../../custom-hooks/useQueryData";
import { getUrlParam } from "../../../../helpers/functions-general";
import BreadCrumbs from "../../../../partials/BreadCrumbs";
import Footer from "../../../../partials/Footer";
import Header from "../../../../partials/Header";
import Navigation from "../../../../partials/Navigation";
import ModalError from "../../../../partials/modals/ModalError";
import ModalSuccess from "../../../../partials/modals/ModalSuccess";
import MemberDividendList from "./MemberDividendList";

const MemberDividend = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const memberid = getUrlParam().get("memberid");

  // use if not loadmore button undertime
  const { data: memberName, isLoading } = useQueryData(
    `/v1/members/name/${memberid}`, // endpoint
    "get", // method
    "memberName" // key
  );
  return (
    <>
      <Header />
      <Navigation menu="members" />
      <div className="wrapper">
        <div className="flex items-center justify-between whitespace-nowrap overflow-auto gap-2">
          <BreadCrumbs param={`${location.search}`} />
        </div>
        <hr className="print:hidden" />

        <div className="w-full pb-20 mt-3 ">
          <MemberDividendList
            memberName={memberName}
            isLoading={isLoading}
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

export default MemberDividend;
