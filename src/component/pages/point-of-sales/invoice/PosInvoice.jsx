import React from "react";
import { StoreContext } from "../../../../store/StoreContext";
import Header from "../../../partials/Header";
import Navigation from "../../../partials/Navigation";
import Footer from "../../../partials/Footer";
import PosInvoiceList from "./PosInvoiceList";
import ModalSuccess from "../../../partials/modals/ModalSuccess";
import ModalError from "../../../partials/modals/ModalError";
import BreadCrumbs from "../../../partials/BreadCrumbs";
import PosInvoiceListSmallVersion from "./PosInvoiceListSmallVersion";
import { AiFillPrinter } from "react-icons/ai";
import useQueryData from "../../../custom-hooks/useQueryData";
import {
  AssociateMemberId,
  getUrlParam,
  notMemberId,
} from "../../../helpers/functions-general";

const PosInvoice = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const memberId = getUrlParam().get("memberId");

  // use if not loadmore button undertime
  const {
    isLoading,
    error,
    data: result,
  } = useQueryData(
    `/v1/pos/orders/filter/${memberId}`, // endpoint
    "get", // method
    "invoice-by-member",
    {},
    memberId
  );

  let memberName =
    result?.count > 0
      ? `${result?.data[0].members_last_name} ${result?.data[0].members_first_name}`
      : "Not Found";

  const handlePrint = () => {
    document.title = `${
      Number(memberId) === notMemberId || Number(memberId) === AssociateMemberId
        ? "Customer"
        : memberName
    } Invoice`;
    setTimeout(() => {
      window.print();
      document.title = `SCC Information Management System`;
    }, 100);
  };
  return (
    <>
      <Header menu="" isPrintHeader="no" />
      <Navigation menu="inventory" />
      <div className="wrapper print:p-0 print:m-0">
        <div className="flex items-center justify-between whitespace-nowrap overflow-auto gap-2">
          <BreadCrumbs />
          <button
            type="button"
            className="btn-primary print:hidden"
            onClick={handlePrint}
          >
            <AiFillPrinter />
            <span>Print</span>
          </button>
        </div>

        <hr className="print:hidden" />
        <div className="w-full print:my-0 my-5 ">
          <PosInvoiceList result={result} />
        </div>
        <Footer />
      </div>
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default PosInvoice;
