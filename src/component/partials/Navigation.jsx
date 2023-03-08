import React from "react";
import { AiFillSetting } from "react-icons/ai";
import {
  FaBusinessTime,
  FaCalendarAlt,
  FaCalendarCheck,
  FaEye,
  FaInfoCircle,
  FaNewspaper,
  FaTasks,
  FaUserCheck,
  FaUsers,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import { setIsShow } from "../../store/StoreAction";
import { StoreContext } from "../../store/StoreContext";
import { devNavUrl } from "../helpers/functions-general";

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
              menu === "members"
                ? "active"
                : "hover:bg-gradient-to-r hover:from-gray-300 hover:to-gray-300"
            }
          >
            <Link
              to={`${devNavUrl}/admin/members`}
              className="w-full flex items-center !p-4 md:justify-center lg:justify-start tooltip-navigation"
              onClick={handleShow}
              data-tooltip="Overviews"
            >
              <MdDashboard className="mr-4 w-4 h-4 md:mr-0 lg:mr-4" />
              <span className="md:hidden lg:block">Members</span>
            </Link>
          </li>

          <li
            className={
              menu === "settings"
                ? "active"
                : "hover:bg-gradient-to-r hover:from-primary hover:to-secondary"
            }
          >
            <Link
              to={`${devNavUrl}/admin/settings`}
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
