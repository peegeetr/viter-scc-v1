import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import {
  setError,
  setIsAdd,
  setMessage,
} from "../../../../../../store/StoreAction";
import { StoreContext } from "../../../../../../store/StoreContext";
import useQueryData from "../../../../../custom-hooks/useQueryData";
import { getUrlParam } from "../../../../../helpers/functions-general";
import BreadCrumbs from "../../../../../partials/BreadCrumbs";
import Footer from "../../../../../partials/Footer";
import Header from "../../../../../partials/Header";
import Navigation from "../../../../../partials/Navigation";
import ModalError from "../../../../../partials/modals/ModalError";
import ModalSuccess from "../../../../../partials/modals/ModalSuccess";
import { checkCapitalShare } from "../functions-capital-share";
import ModalAddCapitalShare from "./ModalAddCapitalShare";
import TransactionCapitalShareList from "./TransactionCapitalShareList";
import ModalViewCapitalShare from "./ModalViewCapitalShare";

const TransactionCapitalShare = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [isSubscribeCapital, setIsSubscribeCapital] = React.useState(false);
  const [itemEdit, setItemEdit] = React.useState(null);
  const memberid = getUrlParam().get("memberid");

  // use if not loadmore button undertime read-capital-total
  const { data: memberName, isLoading } = useQueryData(
    `/v1/members/name/${memberid}`, // endpoint
    "get", // method
    "memberName" // key
  );

  // use if not loadmore button undertime
  const { data: totalCapital } = useQueryData(
    `/v1/capital-share/read-total-capital/${memberid}`, // endpoint
    "get", // method
    "capital-share" // key
  );

  // use if not loadmore button undertime
  const { data: subscribeCapital } = useQueryData(
    `/v1/subscribe-capital/active-by-id/${memberid}`, // endpoint
    "get", // method
    "subscribeCapital", // key
    {},
    isSubscribeCapital
  );

  // use if not loadmore button undertime
  const { data: activeAmortization } = useQueryData(
    `/v1/capital-amortization/read-all-active-by-id/${memberid}`, // endpoint
    "get", // method
    "activeAmortization" // key
  );

  const handleAdd = () => {
    if (
      activeAmortization?.count === 0 ||
      activeAmortization?.data.length === 0
    ) {
      dispatch(setError(true));
      dispatch(setMessage(`You don't have active amortization.`));
      return;
    }
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };

  return (
    <>
      <Header />
      <Navigation menu="members" />
      <div className="wrapper ">
        <div className="flex items-center justify-between whitespace-nowrap overflow-auto gap-2">
          <BreadCrumbs param={`${location.search}`} />
          {checkCapitalShare(totalCapital, subscribeCapital).result === true &&
            subscribeCapital?.count > 0 && (
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  className="btn-primary"
                  onClick={handleAdd}
                >
                  <FaPlusCircle />
                  <span>Add</span>
                </button>
              </div>
            )}
        </div>
        <hr />

        <div className="w-full pb-20 mt-3 ">
          <TransactionCapitalShareList
            setItemEdit={setItemEdit}
            totalCapital={checkCapitalShare(totalCapital, subscribeCapital)}
            memberName={memberName}
            isLoading={isLoading}
            menu="members"
          />
        </div>
        <Footer />
      </div>

      {store.isAdd && (
        <ModalAddCapitalShare
          amount={activeAmortization?.data}
          raminingAmount={
            checkCapitalShare(totalCapital, subscribeCapital).remainingAmount
          }
          total={checkCapitalShare(totalCapital, subscribeCapital).totalCapital}
        />
      )}
      {store.isConfirm && (
        <ModalViewCapitalShare item={itemEdit} setIsSubscribeCapital />
      )}
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default TransactionCapitalShare;
