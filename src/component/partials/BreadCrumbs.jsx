import React from "react";
import { Link, useLocation } from "react-router-dom";
import { setStartIndex } from "../../store/StoreAction";
import { StoreContext } from "../../store/StoreContext";
import { getUserType } from "../helpers/functions-general";

const BreadCrumbs = ({ param = "" }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const location = useLocation();
  const urlLink = getUserType(
    store.credentials.data.role_is_developer,
    store.credentials.data.role_is_admin
  );

  const removeDev =
    store.credentials.data.role_is_developer === 1
      ? "/system"
      : store.credentials.data.role_is_admin === 1
      ? "/admin"
      : "/member";
  let currentLink = "";

  const crumbs = location.pathname
    .replace(`${removeDev}`, "")
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb, key) => {
      currentLink += `/${crumb}`;

      return (
        <li
          className="text-primary after:mr-2 after:content-['>'] last:after:hidden last:text-dark last:pointer-events-none"
          key={key}
          onClick={() => dispatch(setStartIndex(0))}
        >
          <Link
            to={`${urlLink}${currentLink}${param}`}
            className="mr-2 text-base font-medium hover:text-primary capitalize"
          >
            {crumb}
          </Link>
        </li>
      );
    });

  return (
    <>
      <ul className="my-2 flex items-center">
        {/* <span className="mr-1 text-primary">
          {crumbs.length === 1 ? "" : <AiFillSetting />}
        </span> */}
        {crumbs.length === 1 ? "" : crumbs}
      </ul>
    </>
  );
};

export default BreadCrumbs;
