import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import ReportPettyCashList from "./ReportSalesInvoicesList.jsx";
import { StoreContext } from "../../../../../../store/StoreContext.jsx";
import { setIsAdd } from "../../../../../../store/StoreAction.jsx";
import Header from "../../../../../partials/Header.jsx";
import Navigation from "../../../../../partials/Navigation.jsx";
import Footer from "../../../../../partials/Footer.jsx";
import ModalSuccess from "../../../../../partials/modals/ModalSuccess.jsx";
import ModalError from "../../../../../partials/modals/ModalError.jsx";
import BreadCrumbs from "../../../../../partials/BreadCrumbs.jsx";
import ModalAddSalesInvoices from "./ModalAddSalesInvoices.jsx";

const ReportSalesInvoices = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };

  return (
    <>
      <Header />
      <Navigation menu="inventory" />{" "}
      <div className="wrapper ">
        <p className="uppercase text-center pt-5 mb-0 text-black text-lg hidden print:block">
          sales invoices blotter
        </p>
        <div className="flex items-center justify-between whitespace-nowrap overflow-auto gap-2 print:hidden">
          <BreadCrumbs />

          {(store.credentials.data.role_is_developer === 1 ||
            store.credentials.data.role_is_admin === 1) && (
            <div className="flex items-center gap-1 self-baseline print:hidden">
              <button type="button" className="btn-primary" onClick={handleAdd}>
                <FaPlusCircle />
                <span>Add</span>
              </button>
            </div>
          )}
        </div>

        <hr className="print:hidden" />
        <div className="w-full pt-5 pb-20 print:pt-0">
          <ReportPettyCashList setItemEdit={setItemEdit} />
        </div>
        <Footer />
      </div>
      {store.isAdd && <ModalAddSalesInvoices item={itemEdit} />}
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default ReportSalesInvoices;
