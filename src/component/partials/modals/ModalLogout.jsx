import React from "react";
import { FaQuestionCircle, FaTimesCircle } from "react-icons/fa";
import { setIsLogout } from "../../../store/StoreAction";
import { StoreContext } from "../../../store/StoreContext";
import { checkLocalStorage } from "../../helpers/CheckLocalStorage";
import {
  devNavUrl,
  getUserType,
  UrlOtherUser,
} from "../../helpers/functions-general";
import ButtonSpinner from "../spinners/ButtonSpinner";

const ModalLogout = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const link = getUserType(store.credentials.data.role_is_developer === 1);
  const [loading, setLoading] = React.useState(false);

  const handleClose = () => {
    dispatch(setIsLogout(false));
  };

  const handleYes = async () => {
    setLoading(true);
    setTimeout(() => {
      if (checkLocalStorage() !== null) {
        localStorage.removeItem("sccToken");
        store.credentials.data.role_is_developer === 1
          ? window.location.replace(`${link}/login`)
          : window.location.replace(`${link}/login`);
        window.location.replace(`${devNavUrl}/${UrlOtherUser}/login`);
        return;
      }
      setLoading(false);
    }, 400);
  };

  return (
    <>
      <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-dark bg-opacity-50 z-50">
        <div className="p-1 w-[350px] rounded-b-2xl">
          <div className="flex justify-end items-center bg-white p-3 pb-0 rounded-t-2xl">
            <button
              type="button"
              className="text-primary text-base"
              onClick={handleClose}
            >
              <FaTimesCircle />
            </button>
          </div>
          <div className="bg-white p-4 rounded-b-2xl text-center ">
            <span className="text-5xl text-red-700 ">
              <FaQuestionCircle className="my-0 mx-auto" />
            </span>
            <span className="text-sm font-bold">
              {"Are you sure you want to logout?"}
            </span>{" "}
            <br />
            <p className="">You can't undo this action.</p>
            <div className="flex items-center gap-1 pt-5">
              <button
                type="submit"
                className="btn-modal-submit"
                disabled={loading}
                onClick={handleYes}
              >
                {loading ? <ButtonSpinner /> : "Confirm"}
              </button>
              <button
                type="reset"
                className="btn-modal-cancel"
                disabled={loading}
                onClick={handleClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalLogout;
