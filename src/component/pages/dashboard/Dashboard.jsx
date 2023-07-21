import React from "react";
import { StoreContext } from "../../../store/StoreContext.jsx";
import Footer from "../../partials/Footer.jsx";
import Header from "../../partials/Header.jsx";
import Navigation from "../../partials/Navigation.jsx";
import ModalError from "../../partials/modals/ModalError.jsx";
import ModalSuccess from "../../partials/modals/ModalSuccess.jsx";
import DashboardList from "./DashboardList.jsx";

const Dashboard = () => {
  const { store, dispatch } = React.useContext(StoreContext);

  const name =
    store.credentials.data.role_is_developer === 1
      ? store.credentials.data.user_system_name
      : store.credentials.data.members_first_name;

  return (
    <>
      <Header />
      <Navigation menu="dashboard" />
      <div className="wrapper">
        <div className="flex items-center justify-between whitespace-nowrap overflow-auto gap-2 ">
          <h4 className="text-xl mb-3">Hello {name}!</h4>
        </div>

        <hr className="print:hidden" />
        <div className=" w-full pt-5 pb-20">
          <DashboardList />
        </div>
        <Footer />
      </div>
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default Dashboard;
