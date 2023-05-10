import React from "react";
import { AiFillSetting } from "react-icons/ai";
import { TbFileDownload } from "react-icons/tb";
import { FaUserCheck, FaBusinessTime, FaUsers } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import { setIsSearch, setIsShow, setStartIndex } from "../../store/StoreAction";
import { StoreContext } from "../../store/StoreContext";
import {
  devNavUrl,
  getUserType,
  UrlAdmin,
  UrlSystem,
} from "../helpers/functions-general";

const Navigation = ({ menu }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const urlLink = getUserType(
    store.credentials.data.role_is_developer,
    store.credentials.data.role_is_admin
  );

  const handleShow = () => {
    dispatch(setIsShow(!store.isShow));
    dispatch(setIsSearch(false));
    dispatch(setStartIndex(0));
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
                to={`${urlLink}/dashboard`}
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
                    menu === "account"
                      ? "active"
                      : "hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:text-white"
                  }
                >
                  <Link
                    to={`${urlLink}/account`}
                    className="w-full flex items-center !p-4 md:justify-center lg:justify-start tooltip-navigation"
                    onClick={handleShow}
                    data-tooltip="Account"
                  >
                    <FaUsers className="mr-4 w-4 h-4 md:mr-0 lg:mr-4" />
                    <span className="md:hidden lg:block">Members</span>
                  </Link>
                </li>

                <li
                  className={
                    menu === "application"
                      ? "active"
                      : "hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:text-white"
                  }
                >
                  <Link
                    to={`${urlLink}/application`}
                    className="w-full flex items-center !p-4 md:justify-center lg:justify-start tooltip-navigation"
                    onClick={handleShow}
                    data-tooltip="Application"
                  >
                    <FaBusinessTime className="mr-4 w-4 h-4 md:mr-0 lg:mr-4" />
                    <span className="md:hidden lg:block">Application</span>
                  </Link>
                </li>
              </>
            )}
            {store.credentials.data.role_is_developer !== 1 && (
              <li
                className={
                  menu === "myaccount"
                    ? "active"
                    : "hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:text-white"
                }
              >
                <Link
                  to={`${urlLink}/details`}
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
                menu === "fileUpload"
                  ? "active"
                  : "hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:text-white"
              }
            >
              <Link
                to={`${urlLink}/file-upload`}
                className="w-full flex items-center !p-4 md:justify-center lg:justify-start tooltip-navigation"
                onClick={handleShow}
                data-tooltip="File Upload"
              >
                <TbFileDownload className="mr-4 w-4 h-4 md:mr-0 lg:mr-4" />
                <span className="md:hidden lg:block">Files</span>
              </Link>
            </li>

            {(store.credentials.data.role_is_admin === 1 ||
              store.credentials.data.role_is_developer === 1) && (
              <>
                <li
                  className={
                    menu === "inventory"
                      ? "active"
                      : "hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:text-white"
                  }
                >
                  <Link
                    to={`${urlLink}/inventory`}
                    className="w-full flex items-center !p-4 md:justify-center lg:justify-start tooltip-navigation"
                    onClick={handleShow}
                    data-tooltip="Inventory"
                  >
                    <AiFillSetting className="mr-4 w-4 h-4 md:mr-0 lg:mr-4" />
                    <span className="md:hidden lg:block">Inventory</span>
                  </Link>
                </li>
                <li
                  className={
                    menu === "settings"
                      ? "active"
                      : "hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:text-white"
                  }
                >
                  <Link
                    to={`${urlLink}/settings`}
                    className="w-full flex items-center !p-4 md:justify-center lg:justify-start tooltip-navigation"
                    onClick={handleShow}
                    data-tooltip="Settings"
                  >
                    <AiFillSetting className="mr-4 w-4 h-4 md:mr-0 lg:mr-4" />
                    <span className="md:hidden lg:block">Settings</span>
                  </Link>
                </li>
              </>
            )}
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
