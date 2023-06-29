import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import { setIsAdd } from "../../../../../store/StoreAction";
import { StoreContext } from "../../../../../store/StoreContext";
import BreadCrumbs from "../../../../partials/BreadCrumbs";
import Footer from "../../../../partials/Footer";
import Header from "../../../../partials/Header";
import ModalError from "../../../../partials/modals/ModalError";
import ModalSuccess from "../../../../partials/modals/ModalSuccess";
import Navigation from "../../../../partials/Navigation";
import CapitalShareList from "./CapitalShareList";
import ModalAddCapitalShare from "./ModalAddCapitalShare";
import useQueryData from "../../../../custom-hooks/useQueryData";
import { getUrlParam } from "../../../../helpers/functions-general";
import { checkCapitalShare } from "./functions-capital-share";

const CapitalShare = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);
  const memberid = getUrlParam().get("memberid");
  let empid = memberid === null ? store.credentials.data.members_aid : memberid;

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };

  // use if not loadmore button undertime
  const { data: totalCapital, isLoading: loadingCapital } = useQueryData(
    `/v1/capital-share/read-total-capital/${empid}`, // endpoint
    "get", // method
    "capital-share" // key
  );
  // use if not loadmore button undertime
  const { data: subscribeCapital, isLoading } = useQueryData(
    `/v1/subscribe-capital/active-by-id/${empid}`, // endpoint
    "get", // method
    "subscribeCapital" // key
  );

  return (
    <>
      <Header />
      <Navigation menu="members" />
      <div className="wrapper ">
        <div className="flex items-center justify-between whitespace-nowrap overflow-auto gap-2">
          <BreadCrumbs param={`${location.search}`} />{" "}
          {!checkCapitalShare(totalCapital, subscribeCapital).result &&
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
          <CapitalShareList
            setItemEdit={setItemEdit}
            totalCapital={
              checkCapitalShare(totalCapital, subscribeCapital).totalCapital
            }
            subscribeCapital={
              checkCapitalShare(totalCapital, subscribeCapital).totalAmount
            }
            remainingAmount={
              checkCapitalShare(totalCapital, subscribeCapital).remainingAmount
            }
            loadingCapital={loadingCapital}
            loadingSubsC={isLoading}
          />
        </div>
        <Footer />
      </div>

      {store.isAdd && <ModalAddCapitalShare item={itemEdit} />}
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default CapitalShare;
