import React from "react";
import { FaExclamationTriangle, FaTimesCircle } from "react-icons/fa";
import { setError } from "../../../store/StoreAction";
import { StoreContext } from "../../../store/StoreContext";
import { GetFocus } from "../../helpers/functions-general";

const ModalError = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  GetFocus("btnClose");
  const [show, setShow] = React.useState("show");

  const handleClose = () => {
    setShow("");
    setTimeout(() => {
      dispatch(setError(false));
    }, 500);
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
              className="text-primary text-base"
              onClick={handleClose}
            >
              <FaTimesCircle />
            </button>
          </div>
          <div className="bg-white p-4 rounded-b-2xl text-center ">
            <span className="text-5xl text-amber-400 ">
              <FaExclamationTriangle className="my-0 mx-auto" />
            </span>
            <span className="text-base font-bold">Error!</span>
            <p>{store.message}</p>
            <div className="flex items-center gap-1 pt-5">
              <button
                id="btnClose"
                type="reset"
                className="btn-modal-submit"
                onClick={handleClose}
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalError;
