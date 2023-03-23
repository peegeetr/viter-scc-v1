import React from "react";
import { FaSignOutAlt, FaTimes, FaUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { setIsLogout, setIsShow } from "../../store/StoreAction";
import { StoreContext } from "../../store/StoreContext";
import Logo from "../svg/Logo.jsx";
import ModalLogout from "./modals/ModalLogout.jsx";

const Header = () => {
  const { store, dispatch } = React.useContext(StoreContext);

  const handleShow = () => {
    dispatch(setIsShow(!store.isShow));
  };

  const handleLogout = () => {
    dispatch(setIsLogout(!store.isLogout));
  };

  const name =
    store.credentials.data.role_is_developer === 1
      ? store.credentials.data.user_system_name.split(" ")[0]
      : store.credentials.data.members_first_name;

  return (
    <>
      <div className="fixed z-30 bg-primary w-full flex justify-between items-center h-16 px-3 border-solid border-b-2 border-primary">
        <div className="w-[50rem] flex text-white items-center ">
          <Logo /> <h1 className="ml-4">Sambahayan Consumer Cooperative</h1>
        </div>
        <div className="flex justify-between items-center gap-3">
          <FaUserCircle className="w-9 h-9 text-white hidden md:block" />
          <div className="hidden md:block leading-normal text-white min-w-[4rem]">
            <h4>
              Hi <span>{name},</span>
            </h4>
            <span>{store.credentials.data.role_name}</span>
          </div>
          <span className="border-l-2 h-12 border-white"></span>
          <button onClick={handleLogout}>
            <FaSignOutAlt className="w-5 h-5 text-white mx-5 hidden md:block" />
          </button>
          <span className="btn-action-table md:hidden" onClick={handleShow}>
            {store.isShow ? <FaTimes /> : <GiHamburgerMenu />}
          </span>
        </div>
      </div>

      {store.isLogout && <ModalLogout />}
    </>
  );
};

export default Header;
