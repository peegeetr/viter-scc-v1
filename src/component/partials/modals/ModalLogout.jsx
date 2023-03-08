import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { setIsLogout } from "../../../store/StoreAction";
import { StoreContext } from "../../../store/StoreContext";
import ButtonSpinner from "../spinners/ButtonSpinner";

const ModalLogout = ({
  id,
  isDel,
  mysqlApiDelete,
  mysqlApiArchive,
  msg,
  item,
}) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [loading, setLoading] = React.useState(false);
  const [show, setShow] = React.useState("show");

  const handleClose = () => {
    setShow("");
    setTimeout(() => {
      dispatch(setIsLogout(false));
    }, 500);
  };

  const handleYes = async () => {
    console.log("logout...");
  };

  return (
    <>
      <div
        className={`modal fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-dark z-50 animate-fadeIn ${show}`}
      >
        <div className="p-1 w-[350px] rounded-b-2xl animate-slideUp ">
          <div className="flex justify-end items-center bg-white p-3 pb-0 rounded-t-2xl">
            <button
              type="button"
              className="text-alert text-base"
              onClick={handleClose}
            ></button>
          </div>
          <div className="bg-white p-4 rounded-b-2xl text-center ">
            <span className="text-5xl text-alert block mb-4">
              <FaSignOutAlt className="my-0 mx-auto" />
            </span>

            <p>Are you sure you want to logout?</p>
            <div className="flex items-center gap-1 pt-5">
              <button
                type="submit"
                className="btn-modal-alert"
                disabled={loading}
                onClick={handleYes}
              >
                {loading ? <ButtonSpinner /> : "Logout"}
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
