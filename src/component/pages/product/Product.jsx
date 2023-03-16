import React from "react";
import Footer from "../../partials/Footer.jsx";
import Header from "../../partials/Header.jsx";
import Navigation from "../../partials/Navigation.jsx";
import ProductList from "./ProductList.jsx";
import { FaPlusCircle } from "react-icons/fa";
import { setIsAdd } from "../../../store/StoreAction.jsx";
import { StoreContext } from "../../../store/StoreContext.jsx";
import ModalAddFileUpload from "./ModalAddFileUpload.jsx";
import ModalSuccess from "../../partials/modals/ModalSuccess.jsx";
import ModalError from "../../partials/modals/ModalError.jsx";

const Product = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };

  return (
    <>
      <Header />
      <Navigation menu="product" />
      <div className="wrapper">
        <div className="flex items-center justify-between whitespace-nowrap overflow-auto gap-2 ">
          <h4 className="text-xl mb-3">Products</h4>

          <div className="flex items-center gap-1 self-baseline">
            <button type="button" className="btn-primary" onClick={handleAdd}>
              <FaPlusCircle />
              <span>Add</span>
            </button>
          </div>
        </div>

        <hr />
        <div className="w-full pt-5 pb-20">
          <ProductList setItemEdit={setItemEdit} />
        </div>
        <Footer />
      </div>
      {store.isAdd && <ModalAddProduct item={itemEdit} />}
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default Product;
