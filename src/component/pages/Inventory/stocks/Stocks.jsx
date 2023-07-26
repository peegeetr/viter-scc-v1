import React from "react";
import { StoreContext } from "../../../../store/StoreContext";
import { setIsAdd } from "../../../../store/StoreAction";
import Header from "../../../partials/Header";
import Navigation from "../../../partials/Navigation";
import { FaPlusCircle } from "react-icons/fa";
import StocksList from "./StocksList";
import Footer from "../../../partials/Footer";
import ModalAddStocks from "./ModalAddStocks";
import BreadCrumbs from "../../../partials/BreadCrumbs";
import ModalSuccess from "../../../partials/modals/ModalSuccess";
import ModalError from "../../../partials/modals/ModalError";

const Stocks = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);
  const [isBarcode, setIsBarcode] = React.useState(null);

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };

  return (
    <>
      <Header />
      <Navigation menu="inventory" />{" "}
      <div className="wrapper">
        <div className="flex items-center justify-between whitespace-nowrap overflow-auto gap-2 ">
          {/* <h4 className="text-xl mb-3">Stocks</h4> */}
          <BreadCrumbs />

          {store.credentials.data.role_is_member === 0 && (
            <div className="flex items-center gap-1 self-baseline print:hidden">
              <button type="button" className="btn-primary" onClick={handleAdd}>
                <FaPlusCircle />
                <span>Add</span>
              </button>
            </div>
          )}
        </div>

        <hr className="print:hidden" />
        <div className="w-full pt-5 pb-20">
          <StocksList setItemEdit={setItemEdit} setIsBarcode={setIsBarcode} />
        </div>
        <Footer />
      </div>
      {store.isAdd && <ModalAddStocks item={itemEdit} isBarcode={isBarcode} />}
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default Stocks;
