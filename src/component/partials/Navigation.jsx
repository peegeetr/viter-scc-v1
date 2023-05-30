import React from "react";
import { AiFillSetting } from "react-icons/ai";
import { TbFileDownload } from "react-icons/tb";
import {
  FaUserCheck,
  FaBusinessTime,
  FaUsers,
  FaShoppingCart,
  FaSignOutAlt,
} from "react-icons/fa";
import { MdDashboard, MdOutlineInventory } from "react-icons/md";
import { Link } from "react-router-dom";
import {
  setIsLogout,
  setIsSearch,
  setIsShow,
  setStartIndex,
} from "../../store/StoreAction";
import { StoreContext } from "../../store/StoreContext";
import { getUserType } from "../helpers/functions-general";

const Navigation = ({ menu }) => {
  const { store, dispatch } = React.useContext(StoreContext);

  const handleShow = () => {
    dispatch(setIsShow(!store.isShow));
    dispatch(setIsSearch(false));
    dispatch(setStartIndex(0));
  };
  const handleLogout = () => {
    dispatch(setIsLogout(true));
  };

  return (
    <>
      <div className="print:hidden">
        <nav
          className={`${
            store.isShow ? "" : "-translate-x-44 "
          } duration-200 ease-in fixed z-20 min-h-full bg-gradient-to-t from-gray-200 to-gray-100 w-44 md:w-20 md:-translate-x-0 lg:w-44 print:hidden`}
        >
          <ul className="text-sm mt-16 text-dark print:hidden">
            <li
              className={
                menu === "dashboard"
                  ? "active"
                  : "hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:text-white"
              }
            >
              <Link
                to={`${getUserType(store)}/dashboard`}
                className="w-full flex items-center !p-4 md:justify-center lg:justify-start tooltip-navigation"
                onClick={handleShow}
                data-tooltip="Dashboard"
              >
                <MdDashboard className="mr-4 w-4 h-4 md:mr-0 lg:mr-4" />
                <span className="md:hidden lg:block">Announcement</span>
              </Link>
            </li>
            {(store.credentials.data.role_is_admin === 1 ||
              store.credentials.data.role_is_developer === 1) && (
              <>
                <li
                  className={
                    menu === "application"
                      ? "active"
                      : "hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:text-white"
                  }
                >
                  <Link
                    to={`${getUserType(store)}/application`}
                    className="w-full flex items-center !p-4 md:justify-center lg:justify-start tooltip-navigation"
                    onClick={handleShow}
                    data-tooltip="Application"
                  >
                    <FaBusinessTime className="mr-4 w-4 h-4 md:mr-0 lg:mr-4" />
                    <span className="md:hidden lg:block">Application</span>
                  </Link>
                </li>
                <li
                  className={
                    menu === "members"
                      ? "active"
                      : "hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:text-white"
                  }
                >
                  <Link
                    to={`${getUserType(store)}/members`}
                    className="w-full flex items-center !p-4 md:justify-center lg:justify-start tooltip-navigation"
                    onClick={handleShow}
                    data-tooltip="Members"
                  >
                    <FaUsers className="mr-4 w-4 h-4 md:mr-0 lg:mr-4" />
                    <span className="md:hidden lg:block">Members</span>
                  </Link>
                </li>
              </>
            )}
            {store.credentials.data.role_is_developer === 0 && (
              <li
                className={
                  menu === "myaccount"
                    ? "active"
                    : "hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:text-white"
                }
              >
                <Link
                  to={`${getUserType(store)}/details`}
                  className="w-full flex items-center !p-4 md:justify-center lg:justify-start tooltip-navigation"
                  onClick={handleShow}
                  data-tooltip="My Account"
                >
                  <FaUserCheck className="mr-4 w-4 h-4 md:mr-0 lg:mr-4" />
                  <span className="md:hidden lg:block">My Account</span>
                </Link>
              </li>
            )}

            <li
              className={
                menu === "files"
                  ? "active"
                  : "hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:text-white"
              }
            >
              <Link
                to={`${getUserType(store)}/file-upload`}
                className="w-full flex items-center !p-4 md:justify-center lg:justify-start tooltip-navigation"
                onClick={handleShow}
                data-tooltip="File Upload"
              >
                <TbFileDownload className="mr-4 w-4 h-4 md:mr-0 lg:mr-4" />
                <span className="md:hidden lg:block">Files</span>
              </Link>
            </li>
            {store.credentials.data.role_is_member === 1 && (
              <li
                className={
                  menu === "Order"
                    ? "active"
                    : "hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:text-white"
                }
              >
                <Link
                  to={`${getUserType(store)}/details/patronage`}
                  className="w-full flex items-center !p-4 md:justify-center lg:justify-start tooltip-navigation"
                  onClick={handleShow}
                  data-tooltip="File Upload"
                >
                  <FaShoppingCart className="mr-4 w-4 h-4 md:mr-0 lg:mr-4" />
                  <span className="md:hidden lg:block">Order</span>
                </Link>
              </li>
            )}

            {store.credentials.data.role_is_member === 0 && (
              <>
                <li
                  className={
                    menu === "inventory"
                      ? "active"
                      : "hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:text-white"
                  }
                >
                  <Link
                    to={`${getUserType(store)}/inventory`}
                    className="w-full flex items-center !p-4 md:justify-center lg:justify-start tooltip-navigation"
                    onClick={handleShow}
                    data-tooltip="Inventory"
                  >
                    <MdOutlineInventory className="mr-4 w-4 h-4 md:mr-0 lg:mr-4" />
                    <span className="md:hidden lg:block">Inventory</span>
                  </Link>
                </li>
              </>
            )}
            {(store.credentials.data.role_is_admin === 1 ||
              store.credentials.data.role_is_developer === 1) && (
              <li
                className={
                  menu === "settings"
                    ? "active"
                    : "hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:text-white"
                }
              >
                <Link
                  to={`${getUserType(store)}/settings`}
                  className="w-full flex items-center !p-4 md:justify-center lg:justify-start tooltip-navigation"
                  onClick={handleShow}
                  data-tooltip="Settings"
                >
                  <AiFillSetting className="mr-4 w-4 h-4 md:mr-0 lg:mr-4" />
                  <span className="md:hidden lg:block">Settings</span>
                </Link>
              </li>
            )}

            <li
              className={
                menu === "logout"
                  ? "active"
                  : "hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:text-white md:hidden absolute w-full bottom-0"
              }
              onClick={() => dispatch(setIsSearch(false))}
            >
              <button
                className="w-full flex items-center !p-4 md:justify-center lg:justify-start tooltip-navigation disabled:cursor-not-allowed"
                onClick={handleLogout}
                data-tooltip="Logout"
              >
                <FaSignOutAlt className="mr-4 w-4 h-4 md:mr-0 lg:mr-4" />
                <span className="md:hidden lg:block">Logout</span>
              </button>
            </li>
          </ul>
        </nav>
        <span
          className={`${
            store.isShow ? "" : "-translate-x-full"
          } fixed z-10 w-screen h-screen bg-dark/50 md:hidden`}
          onClick={handleShow}
          // onTouchMoveCapture={handleShow}
        ></span>
      </div>
    </>
  );
};

export default Navigation;
