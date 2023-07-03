import React from "react";
import { setIsAdd } from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import BreadCrumbs from "../../../partials/BreadCrumbs";
import Footer from "../../../partials/Footer";
import Header from "../../../partials/Header";
import Navigation from "../../../partials/Navigation";
import ModalError from "../../../partials/modals/ModalError";
import ModalSuccess from "../../../partials/modals/ModalSuccess";
import MemberOrdersList from "../../account/details/orders/MemberOrdersList";
import { FaShoppingCart } from "react-icons/fa";
import ModalAddMyOrder from "./ModalAddMyOrder";
import useQueryData from "../../../custom-hooks/useQueryData";

const MyOrders = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);

  // use if not loadmore button undertime
  const { data: memberName, isLoading } = useQueryData(
    `/v1/members/name/${store.credentials.data.members_aid}`, // endpoint
    "get", // method
    "memberName" // key
  );
  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };
  return (
    <>
      <Header />
      <Navigation menu="myaccount" />
      <div className="wrapper">
        <div className="flex items-center justify-between whitespace-nowrap overflow-auto gap-2">
          <BreadCrumbs />
          <div className="flex items-center gap-1 self-baseline">
            <button type="button" className="btn-primary" onClick={handleAdd}>
              <FaShoppingCart />
              <span className="hidden xs:block">Order now</span>
            </button>
          </div>
        </div>
        <hr />

        <div className="w-full pb-20 mt-3">
          <MemberOrdersList
            setItemEdit={setItemEdit}
            memberName={memberName}
            isLoading={isLoading}
            menu="myaccount"
          />
        </div>
        <Footer />
      </div>
      {store.isAdd && <ModalAddMyOrder item={itemEdit} arrKey="my-order" />}
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default MyOrders;
