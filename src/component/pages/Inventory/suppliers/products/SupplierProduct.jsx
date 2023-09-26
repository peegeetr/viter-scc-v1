import React from "react";
import { StoreContext } from "../../../../../store/StoreContext";
import Header from "../../../../partials/Header";
import Navigation from "../../../../partials/Navigation";
import BreadCrumbs from "../../../../partials/BreadCrumbs";
import Footer from "../../../../partials/Footer";
import ModalSuccess from "../../../../partials/modals/ModalSuccess";
import ModalError from "../../../../partials/modals/ModalError";
import SupplierProductList from "./SupplierProductList";
import { FaPlusCircle } from "react-icons/fa";
import {
  setError,
  setIsAdd,
  setMessage,
} from "../../../../../store/StoreAction";
import ModalAddSuppliersProducts from "./ModalAddSuppliersProducts";
import useQueryData from "../../../../custom-hooks/useQueryData";
import { getPriceMarkup } from "../../../../helpers/functions-general";

const SupplierProduct = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);

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
    setItemEdit(null);
  };
  return (
    <>
      <Header />
      <Navigation menu="inventory" />
      <div className="wrapper ">
        <div className="flex items-center justify-between whitespace-nowrap overflow-auto gap-2 ">
          {/* <h4 className="text-xl mb-3">Suppliers</h4> */}
          <BreadCrumbs />

          {(store.credentials.data.role_is_admin === 1 ||
            store.credentials.data.role_is_developer === 1 ||
            store.credentials.data.role_is_manager === 1) && (
            <div className="flex items-center gap-1 self-baseline print:hidden">
              <button type="button" className="btn-primary" onClick={handleAdd}>
                <FaPlusCircle />
                <span>Add</span>
              </button>
            </div>
          )}
        </div>
        <hr className="print:hidden" />

        <div className="w-full pb-20 mt-3 ">
          <SupplierProductList setItemEdit={setItemEdit} />
        </div>
        <Footer />
      </div>

      {store.isAdd && (
        <ModalAddSuppliersProducts item={itemEdit} percent={getPercent} />
      )}
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default SupplierProduct;
