import React from "react";
import { StoreContext } from "../../../../store/StoreContext";
import { setIsAdd } from "../../../../store/StoreAction";
import Header from "../../../partials/Header";
import Navigation from "../../../partials/Navigation";
import { FaPlusCircle } from "react-icons/fa";
import SuppliersList from "./SuppliersList";
import Footer from "../../../partials/Footer";
import ModalAddSuppliers from "./ModalAddSuppliers";
import BreadCrumbs from "../../../partials/BreadCrumbs";
import ModalSuccess from "../../../partials/modals/ModalSuccess";
import ModalError from "../../../partials/modals/ModalError";

const Suppliers = () => {
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
      <div className="wrapper">
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
        <div className="w-full pt-5 pb-20">
          <SuppliersList setItemEdit={setItemEdit} />
        </div>
        <Footer />
      </div>
      {store.isAdd && <ModalAddSuppliers item={itemEdit} />}
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default Suppliers;
