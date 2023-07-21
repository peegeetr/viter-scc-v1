import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import {
  setError,
  setIsAdd,
  setIsEditProfile,
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
import ModalAddSubscribeCapital from "./ModalAddSubscribeCapital";
import ModalViewCapitalShare from "./ModalViewCapitalShare";
import TransactionCapitalShareList from "./TransactionCapitalShareList";

const TransactionCapitalShare = () => {
  const { store, dispatch } = React.useContext(StoreContext);
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
    "subscribeCapital", //key
    {}, // fd
    totalCapital // if capital-share key reload
  );

  // use if not loadmore button undertime
  const { data: penaltyById } = useQueryData(
    `/v1/capital-share/read-capital-penalty/${memberid}`, // endpoint
    "get", // method
    "penaltyById", //key
    {}, // fd
    totalCapital // if capital-share key reload
  );

  // use if not loadmore button undertime
  const { data: activeAmortization } = useQueryData(
    `/v1/capital-amortization/read-all-active-by-id/${memberid}`, // endpoint
    "get", // method
    "activeAmortization", // key
    {}, // fd
    totalCapital // if capital-share key reload
  );

  const capitalShareTotal = checkCapitalShare(
    totalCapital,
    subscribeCapital,
    penaltyById
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
    if (capitalShareTotal.isComplete === true) {
      dispatch(setIsEditProfile(true));
      return;
    }
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };

  return (
    <>
      <Header />
      <Navigation menu="members" />
      <div className="wrapper print:pb-0 print:mb-0">
        <div className="flex items-center justify-between whitespace-nowrap overflow-auto gap-2 print:justify-center print:mt-5">
          <p className="hidden print:block text-sm text-black mb-0">
            Capital Share Details
          </p>
          <BreadCrumbs param={`${location.search}`} />
          {(capitalShareTotal.result === true ||
            capitalShareTotal.isComplete === true) &&
            subscribeCapital?.count > 0 && (
              <div className="flex items-center gap-1 print:hidden">
                <button
                  type="button"
                  className="btn-primary "
                  onClick={handleAdd}
                >
                  <FaPlusCircle />
                  <span>Add</span>
                </button>
              </div>
            )}
        </div>
        <hr className="print:hidden" />

        <div className="w-full pb-20 mt-3 print:mt-0">
          <TransactionCapitalShareList
            setItemEdit={setItemEdit}
            totalCapital={capitalShareTotal}
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
          raminingAmount={capitalShareTotal.remainingAmount}
          total={capitalShareTotal.totalCapital}
        />
      )}
      {store.isEditProfile && (
        <ModalAddSubscribeCapital
          subscribeCapital={capitalShareTotal.subscribeC}
        />
      )}
      {store.isConfirm && <ModalViewCapitalShare item={itemEdit} />}
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default TransactionCapitalShare;
