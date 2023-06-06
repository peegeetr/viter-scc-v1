import React from "react";
import { setIsSearch, setStartIndex } from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import CapitalShareLink from "./capital-share/CapitalShareLink";
import PatronageLink from "./patronage/PatronageLink";
import ProfileLink from "./profile/ProfileLink";
import SavingsLink from "./savings/SavingsLink";
import { getUrlParam } from "../../../helpers/functions-general";
import useQueryData from "../../../custom-hooks/useQueryData";

const DetailsLink = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const memberid = getUrlParam().get("memberid");
  const { data: memberName, isLoading: loadingmemberName } = useQueryData(
    `/v1/members/name/${memberid}`, // endpoint
    "get", // method
    "memberName" // key
  );
  const handleShow = () => {
    dispatch(setStartIndex(0));
    dispatch(setIsSearch(false));
  };

  return (
    <>
      {memberid !== null && (
        <p className="text-primary">
          <span className="pr-4 font-bold">Member Name :</span>
          {loadingmemberName === "loading"
            ? "Loading..."
            : `${memberName?.data[0].members_last_name}, ${memberName?.data[0].members_first_name}`}
        </p>
      )}
      <div
        className="group flex items-center justify-between border-b border-solid border-gray-300"
        onClick={handleShow}
      >
        <ProfileLink />
      </div>
      <div
        className="group flex items-center justify-between border-b border-solid border-gray-300"
        onClick={handleShow}
      >
        <SavingsLink />
      </div>
      <div
        className="group flex items-center justify-between border-b border-solid border-gray-300"
        onClick={handleShow}
      >
        <CapitalShareLink />
      </div>
      <div
        className="group flex items-center justify-between border-b border-solid border-gray-300"
        onClick={handleShow}
      >
        <PatronageLink />
      </div>
    </>
  );
};

export default DetailsLink;
