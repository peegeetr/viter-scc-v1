import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import { setIsAdd } from "../../../../../../store/StoreAction";
import { StoreContext } from "../../../../../../store/StoreContext";
import {
  numberWithCommas,
  pesoSign,
} from "../../../../../helpers/functions-general";
import { getComputeDividend } from "../functions-dividend";

const ModalViewDividend = ({ item, avgShareMonths }) => {
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
            <h3 className="text-white text-sm">
              Dividend details for {item.year}
            </h3>
            <button
              type="button"
              className="text-gray-200 text-base"
              onClick={handleClose}
            >
              <FaTimesCircle />
            </button>
          </div>
          <div className="bg-white p-4 rounded-b-2xl">
            <div className="grid grid-cols-[1fr_3rem_9rem] gap-1 gap-white items-center mb-4 bg-blue-100">
              <p className="mb-0 py-1 pl-2 border-2 ">
                Total Average Shares Months
              </p>
              <p className="mb-0 text-center py-1 pl-2">&nbsp;</p>
              <p className="mb-0 text-right py-1 pr-2">
                {pesoSign}
                {numberWithCommas(
                  Number(
                    getComputeDividend(item, avgShareMonths).totalASM
                  ).toFixed(2)
                )}
              </p>
              <p className="mb-0 py-1 pl-2 ">
                Dividend - Interest on Share Capital
              </p>
              <p className="mb-0 text-center py-1 pl-2 ">
                {item.net_surplus_dividend_rate}%{" "}
              </p>
              <p className="mb-0 text-right py-1 pr-2 ">
                {pesoSign}
                {numberWithCommas(Number(item.net_surplus_dividend).toFixed(2))}
              </p>
              <p className="mb-0 py-1 pl-2  ">Patronage Refund</p>
              <p className="mb-0 text-center py-1 pl-2 ">
                {item.net_surplus_patronage_rate}%{" "}
              </p>
              <p className="mb-0 text-right py-1 pr-2 ">
                {pesoSign}
                {numberWithCommas(
                  Number(item.net_surplus_patronage_refund).toFixed(2)
                )}
              </p>
              <p className="mb-0 py-1 pl-2  ">Net Surplus for Distribution</p>
              <p className="mb-0 text-center py-1 pl-2 ">100% </p>
              <p className="mb-0 text-right py-1 pr-2 ">
                {pesoSign}
                {numberWithCommas(
                  Number(item.net_surplus_distribution_amount).toFixed(2)
                )}
              </p>
              <p className="mb-0 py-1 pl-2  ">My Average Shares 2023</p>
              <p className="mb-0 text-center py-1 pl-2 ">&nbsp;</p>
              <p className="mb-0 text-right py-1 pr-2 ">
                {pesoSign}
                {numberWithCommas(Number(item.total / 12).toFixed(2))}
              </p>
            </div>
            <p className="text-primary mb-0 ml-3 font-semibold">
              Compution of interest on share capital
            </p>
            <div className="px-5 grid grid-cols-2 mt-2">
              <div>
                <div className="flex items-center">
                  <p className="mb-0 mr-5"> = </p>
                  <div>
                    <p className="mb-0 border-b-2 border-gray-500 ">
                      {numberWithCommas(
                        Number(item.net_surplus_dividend).toFixed(2)
                      )}
                    </p>
                    <p className="mb-0 ">
                      {numberWithCommas(
                        Number(
                          getComputeDividend(item, avgShareMonths).totalASM
                        ).toFixed(2)
                      )}
                    </p>
                  </div>
                </div>

                <p className="mb-0 mt-2">
                  <span className=" mr-4"> = </span>
                  {Number(
                    getComputeDividend(item, avgShareMonths).rate
                  ).toFixed(5)}
                </p>
              </div>

              <div>
                <p className="mb-0 ">
                  <span className=" mr-4"> = </span>
                  {numberWithCommas(
                    getComputeDividend(item, avgShareMonths).myDividend.toFixed(
                      2
                    )
                  )}
                  {" * "}
                  {Number(
                    getComputeDividend(item, avgShareMonths).rate
                  ).toFixed(5)}
                </p>

                <p className="mb-0 mt-2">
                  <span className=" mr-4"> = </span>
                  {pesoSign}
                  {numberWithCommas(
                    getComputeDividend(item, avgShareMonths).result.toFixed(2)
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalViewDividend;
