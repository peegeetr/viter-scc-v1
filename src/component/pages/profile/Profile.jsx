import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import { setIsAdd } from "../../../store/StoreAction.jsx";
import { StoreContext } from "../../../store/StoreContext.jsx";
import BreadCrumbs from "../../partials/BreadCrumbs.jsx";
import Footer from "../../partials/Footer.jsx";
import Header from "../../partials/Header.jsx";
import Navigation from "../../partials/Navigation.jsx"; 
import ModalAddProfile from "./ModalAddProfile.jsx";
import ProfileList from "./ProfileList.jsx";

const Profile = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);
 

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };
  return (
    <>
     <Header />
      <Navigation menu="profile" />
      
      <div className="wrapper">
        <div className="flex items-center justify-between whitespace-nowrap overflow-auto gap-2 ">
          <h4 className="text-xl mb-3">Profile</h4>  

          <BreadCrumbs />
          <div className="flex items-center gap-1 self-baseline">
            <button type="button" className="btn-primary" onClick={handleAdd}>
              <FaPlusCircle />
              <span>Add</span>
            </button>
          </div>
        </div>
        <hr />

        <div className="w-full pt-5 pb-20">
          <ProfileList setItemEdit={setItemEdit} />
        </div>
        <Footer />
      </div>
      {store.isAdd && <ModalAddProfile />}
    </>
  );
};

export default Profile;
