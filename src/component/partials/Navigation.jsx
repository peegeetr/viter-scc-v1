import React from "react";
import { AiFillSetting } from "react-icons/ai";
import { TbFileDownload } from "react-icons/tb";
import { FaUserCheck, FaBusinessTime, FaUsers } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import { setIsShow } from "../../store/StoreAction";
import { StoreContext } from "../../store/StoreContext";
import {
  devNavUrl,
  UrlOtherUser,
  UrlSystem,
} from "../helpers/functions-general";

const Navigation = ({ menu }) => {
  const { store, dispatch } = React.useContext(StoreContext);

  const handleShow = () => {
    dispatch(setIsShow(!store.isShow));
  };

  return (
    <>
      <nav
        className={`${
          store.isShow ? "" : "-translate-x-44"
        } duration-200 ease-in fixed z-20 min-h-full bg-gradient-to-t from-gray-200 to-gray-100 w-44 md:w-20 md:-translate-x-0 lg:w-44`}
      >
        <ul className="text-sm mt-16 text-dark">
          <li
            className={
              menu === "dashboard"
                ? "active"
                : "hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:text-white"
            }
          >
            <Link
              to={`${devNavUrl}/${UrlSystem}/dashboard`}
              className="w-full flex items-center !p-4 md:justify-center lg:justify-start tooltip-navigation"
              onClick={handleShow}
              data-tooltip="Dashboard"
            >
              <MdDashboard className="mr-4 w-4 h-4 md:mr-0 lg:mr-4" />
              <span className="md:hidden lg:block">Announcement</span>
            </Link>
          </li>
          <li
            className={
              menu === "account"
                ? "active"
                : "hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:text-white"
            }
          >
            <Link
              to={`${devNavUrl}/${UrlSystem}/account`}
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
              menu === "myaccount"
                ? "active"
                : "hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:text-white"
            }
          >
            <Link
              to={`${devNavUrl}/${UrlOtherUser}/account/details`}
              className="w-full flex items-center !p-4 md:justify-center lg:justify-start tooltip-navigation"
              onClick={handleShow}
              data-tooltip="My Account"
            >
              <FaUserCheck className="mr-4 w-4 h-4 md:mr-0 lg:mr-4" />
              <span className="md:hidden lg:block">My Account</span>
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
              to={`${devNavUrl}/${UrlSystem}/application`}
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
              menu === "fileUpload"
                ? "active"
                : "hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:text-white"
            }
          >
            <Link
              to={`${devNavUrl}/${UrlSystem}/file-upload`}
              className="w-full flex items-center !p-4 md:justify-center lg:justify-start tooltip-navigation"
              onClick={handleShow}
              data-tooltip="File Upload"
            >
              <TbFileDownload className="mr-4 w-4 h-4 md:mr-0 lg:mr-4" />
              <span className="md:hidden lg:block">File Upload</span>
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
              to={`${devNavUrl}/${UrlSystem}/settings`}
              className="w-full flex items-center !p-4 md:justify-center lg:justify-start tooltip-navigation"
              onClick={handleShow}
              data-tooltip="Settings"
            >
              <AiFillSetting className="mr-4 w-4 h-4 md:mr-0 lg:mr-4" />
              <span className="md:hidden lg:block">Settings</span>
            </Link>
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
    </>
  );
};

export default Navigation;
