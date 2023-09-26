import React from "react";
import { StoreContext } from "../../../../../../store/StoreContext";
import Header from "../../../../../partials/Header";
import Navigation from "../../../../../partials/Navigation";
import BreadCrumbs from "../../../../../partials/BreadCrumbs";
import Footer from "../../../../../partials/Footer";
import ModalSuccess from "../../../../../partials/modals/ModalSuccess";
import ModalError from "../../../../../partials/modals/ModalError";
import SupplierProductHistoryList from "./SupplierProductHistoryList";
import { FaPlusCircle } from "react-icons/fa";
import {
  setError,
  setIsAdd,
  setMessage,
} from "../../../../../../store/StoreAction";
import ModalAddSuppliersProductsHistory from "./ModalAddSuppliersProductsHistory";
import {
  getPriceMarkup,
  getUrlParam,
} from "../../../../../helpers/functions-general";
import useQueryData from "../../../../../custom-hooks/useQueryData";
import TableSpinner from "../../../../../partials/spinners/TableSpinner";

const SupplierProductHistory = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const supplierId = getUrlParam().get("supplierId");
  const supplierProductId = getUrlParam().get("supplierProductId");

  // use if not loadmore button undertime
  const { data: supplierProductName, isLoading } = useQueryData(
    `/v1/suppliers-product/${supplierProductId}`, // endpoint
    "get", // method
    "productName" // key
  );
  let productName =
    supplierProductName?.count > 0 &&
    supplierProductName?.data[0].suppliers_products_name;

  // use if not loadmore button undertime
  const { data: priceMarkup } = useQueryData(
    `/v1/suppliers-product/read-price-markup`, // endpoint
    "get", // method
    "read-price-markup" // key
  );

  // get the percentage then / 100 to get how much the percent
  const getPercent = getPriceMarkup(priceMarkup);

  const handleAdd = () => {
    if (!getPercent.isHaveActive) {
      dispatch(setError(true));
      dispatch(
        setMessage(
          "You can't add new product. Please active or create a new markup"
        )
      );
      return;
    }
    dispatch(setIsAdd(true));
  };
  return (
    <>
      <Header />
      <Navigation menu="inventory" />
      <div className="wrapper ">
        <div className="flex items-center justify-between whitespace-nowrap overflow-auto gap-2 ">
          <BreadCrumbs param={`?supplierId=${supplierId}`} />

          {(store.credentials.data.role_is_admin === 1 ||
            store.credentials.data.role_is_developer === 1 ||
            store.credentials.data.role_is_manager === 1) &&
            supplierProductName?.count > 0 &&
            supplierId !== "" && (
              <div className="flex items-center gap-1 self-baseline">
                <button
                  type="button"
                  className="btn-primary print:hidden"
                  onClick={handleAdd}
                >
                  <FaPlusCircle />
                  <span>Add</span>
                </button>
              </div>
            )}
        </div>
        <hr className="print:hidden" />

        <div className="w-full pb-20 mt-3 ">
          {isLoading ? (
            <TableSpinner />
          ) : (
            supplierProductName?.count > 0 &&
            supplierId !== "" && (
              <SupplierProductHistoryList productName={productName} />
            )
          )}
        </div>
        <Footer />
      </div>

      {store.isAdd && <ModalAddSuppliersProductsHistory percent={getPercent} />}
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default SupplierProductHistory;
