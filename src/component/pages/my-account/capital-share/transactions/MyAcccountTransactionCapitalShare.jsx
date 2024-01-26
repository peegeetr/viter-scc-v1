import React from "react";
import { StoreContext } from "../../../../../store/StoreContext";
import useQueryData from "../../../../custom-hooks/useQueryData";
import BreadCrumbs from "../../../../partials/BreadCrumbs";
import Footer from "../../../../partials/Footer";
import Header from "../../../../partials/Header";
import Navigation from "../../../../partials/Navigation";
import ModalError from "../../../../partials/modals/ModalError";
import ModalSuccess from "../../../../partials/modals/ModalSuccess";
import { checkCapitalShare } from "../../../account/details/capital-share/functions-capital-share";
import TransactionCapitalShareList from "../../../account/details/capital-share/transactions/TransactionCapitalShareList";
import ModalViewCapitalShare from "../../../account/details/capital-share/transactions/ModalViewCapitalShare";

const MyAcccountTransactionCapitalShare = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);
  const [isLastId, setIsLastId] = React.useState(0);

  // use if not loadmore button undertime read-capital-total
  const { data: memberName, isLoading } = useQueryData(
    `/v1/members/name/${store.credentials.data.members_aid}`, // endpoint
    "get", // method
    "memberName" // key
  );
  // use if not loadmore button undertime
  const { data: totalCapital } = useQueryData(
    `/v1/capital-share/read-total-capital/${store.credentials.data.members_aid}`, // endpoint
    "get", // method
    "capital-share" // key
  );
  // use if not loadmore button undertime
  const { data: subscribeCapital } = useQueryData(
    `/v1/subscribe-capital/active-by-id/${store.credentials.data.members_aid}`, // endpoint
    "get", // method
    "subscribeCapital" // key
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
          <TransactionCapitalShareList
            setItemEdit={setItemEdit}
            totalCapital={checkCapitalShare(totalCapital, subscribeCapital)}
            memberName={memberName}
            isLoading={isLoading}
            menu="myaccount"
            setIsLastId={setIsLastId}
          />
        </div>
        <Footer />
      </div>

      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
      {store.isConfirm && (
        <ModalViewCapitalShare
          item={itemEdit}
          isLastId={isLastId}
          isMember="yes"
        />
      )}
    </>
  );
};

export default MyAcccountTransactionCapitalShare;
