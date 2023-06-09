import React from "react";
import { StoreContext } from "../../../store/StoreContext.jsx";
import Footer from "../../partials/Footer.jsx";
import Header from "../../partials/Header.jsx";
import Navigation from "../../partials/Navigation.jsx";
import MyAccountDetailsLink from "./MyAccountDetailsLink.jsx";

const MyAccount = () => {
  const { store, dispatch } = React.useContext(StoreContext);

  return (
    <>
      <Header />
      <Navigation menu="myaccount" />

      <div className="wrapper">
        <div className="flex items-center justify-between whitespace-nowrap overflow-auto gap-2 ">
          <h4 className="text-xl mb-3">My Account</h4>
        </div>
        <hr />

        <div className="w-full pt-5 pb-20">
          <MyAccountDetailsLink />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default MyAccount;
