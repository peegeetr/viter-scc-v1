import React from "react";
import { FaSignOutAlt, FaTimes, FaUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { setIsLogout, setIsShow } from "../../store/StoreAction";
import { StoreContext } from "../../store/StoreContext";
import Logo from "../svg/Logo.jsx";
import ModalLogout from "./modals/ModalLogout.jsx";
import { devBaseImgUrl } from "../helpers/functions-general";

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
      <div className="fixed z-30 bg-primary w-full flex justify-between items-center h-16 px-3 border-solid border-b-2 border-primary print:hidden">
        <div className="w-[50rem] flex text-white items-center ">
          {/* <Logo />{" "}
          <h1 className="hidden xs:block ml-4">
            Sambahayan Consumer Cooperative
          </h1> */}
        </div>
        <div className="flex justify-between items-center gap-3">
          {store.credentials.data.role_is_developer !== 1 &&
          store.credentials.data.members_picture !== "" ? (
            <img
              src={devBaseImgUrl + "/" + store.credentials.data.members_picture}
              alt="member photo"
              className="rounded-full w-9 h-9 text-white hidden md:block object-cover object-center"
            />
          ) : (
            <FaUserCircle className="w-9 h-9 text-white hidden md:block" />
          )}
          <div className="hidden md:block leading-normal text-white min-w-[6rem]">
            <h4>
              Hi <span>{name},</span>
            </h4>
            <span>{store.credentials.data.role_name}</span>
          </div>
          {store.credentials.data.role_is_cashier !== 1 ? (
            <>
              <span className="border-l-2 h-12 border-white"></span>
              <div
                className="hidden md:block btn-action-table hover:bg-white hover:text-primary"
                onClick={handleLogout}
              >
                <FaSignOutAlt className="w-5 h-5 hidden md:block " />
              </div>
              <span
                className="btn-action-table md:hidden hover:bg-white hover:text-primary"
                onClick={handleShow}
              >
                {store.isShow ? <FaTimes /> : <GiHamburgerMenu />}
              </span>
            </>
          ) : (
            <>
              <span className="border-l-2 h-12 border-white"></span>
              <div
                className=" btn-action-table hover:bg-white hover:text-primary"
                onClick={handleLogout}
              >
                <FaSignOutAlt className="w-5 h-5 " />
              </div>
            </>
          )}
        </div>
      </div>
      {/* if print */}
      <div className="pt-4 bg-white h-22 border-solid border-b-2 border-primary hidden print:block">
        <span className="flex justify-center pb-2">
          <Logo />
        </span>
        <small className="flex justify-center text-center ">
          Sambahayan Consumer Cooperative
        </small>
        <small className="flex justify-center text-center pb-2">
          Sitio Subac, Santo Nino San Pablo CIty, Laguna Region IV-A
          (CALABARZON)
          <br />
          CDA REG. NO. 9520-100400033760
          <br />
          TIN NO. 620-402-542-00000
        </small>
      </div>

      {store.isLogout && <ModalLogout />}
    </>
  );
};

export default Header;
