import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import { setIsAdd } from "../../../../../../store/StoreAction";
import { StoreContext } from "../../../../../../store/StoreContext";
import {
  numberWithCommas,
  pesoSign,
} from "../../../../../helpers/functions-general";

const ModalViewDividend = ({ item }) => {
  const { store, dispatch } = React.useContext(StoreContext);

  const handleClose = () => {
    dispatch(setIsAdd(false));
  };

  return (
    <>
      <div
        className={` fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-dark z-50 bg-opacity-50 animate-fadeIn show`}
      >
        <div className="p-1 w-[550px] rounded-b-2xl animate-slideUp ">
          <div className="flex justify-between items-center bg-primary p-3 rounded-t-2xl">
            <h3 className="text-white text-sm">Dividend details for 2023</h3>
            <button
              type="button"
              className="text-gray-200 text-base"
              onClick={handleClose}
            >
              <FaTimesCircle />
            </button>
          </div>
          <div className="bg-white p-4 rounded-b-2xl">
            <div className="grid grid-cols-[1fr_3rem_9rem] gap-1 items-center">
              <p className="mb-0 py-1 pl-2 bg-blue-100">
                Total Average Shares Months
              </p>
              <p className="mb-0 text-center py-1 pl-2 bg-blue-100">100% </p>
              <p className="mb-0 text-right py-1 pr-2 bg-blue-100">
                {pesoSign}
                {numberWithCommas(Number(1000000000.0).toFixed(2))}
              </p>
              <p className="mb-0 py-1 pl-2 bg-blue-100">
                Dividend - Interest on Share Capital
              </p>
              <p className="mb-0 text-center py-1 pl-2 bg-blue-100">100% </p>
              <p className="mb-0 text-right py-1 pr-2 bg-blue-100">
                {pesoSign}
                {numberWithCommas(Number(1000000000.0).toFixed(2))}
              </p>
              <p className="mb-0 py-1 pl-2 bg-blue-100 ">Patronage Refund</p>
              <p className="mb-0 text-center py-1 pl-2 bg-blue-100">100% </p>
              <p className="mb-0 text-right py-1 pr-2 bg-blue-100">
                {pesoSign}
                {numberWithCommas(Number(1000000000.0).toFixed(2))}
              </p>
              <p className="mb-0 py-1 pl-2 bg-blue-100 ">
                Net Surplus for Distribution
              </p>
              <p className="mb-0 text-center py-1 pl-2 bg-blue-100">100% </p>
              <p className="mb-0 text-right py-1 pr-2 bg-blue-100">
                {pesoSign}
                {numberWithCommas(Number(1000000000.0).toFixed(2))}
              </p>
            </div>

            <div className="grid grid-cols-[1fr_15rem] items-center mt-5 justify-center">
              <p className="mb-0 mr-5">Rate of interest on share capital = </p>
              <div>
                <p className="mb-0 border-b-2 ">
                  Rate of interest on share capital
                </p>
                <p>Rate of interest on share capital</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalViewDividend;
