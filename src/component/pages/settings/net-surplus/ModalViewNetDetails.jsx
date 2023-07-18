import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import { setIsConfirm } from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import { numberWithCommas, pesoSign } from "../../../helpers/functions-general";
const ModalViewNetDetails = ({ item }) => {
  const { store, dispatch } = React.useContext(StoreContext);

  const handleClose = () => {
    dispatch(setIsConfirm(false));
  };

  return (
    <>
      <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-dark bg-opacity-50 z-50">
        <div className="p-1 w-[400px] rounded-b-2xl">
          <div className="flex justify-between items-center bg-primary p-3 rounded-t-2xl">
            <h3 className="text-white text-sm">
              Income Statement {item.net_surplus_created.split("-")[0]}
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
            <div className="grid grid-cols-2 gap-1 items-center">
              {/* Total Income */}
              <p className="mb-0">Total Income </p>
              <p className="mb-0 text-right">
                {pesoSign}
                {numberWithCommas(
                  Number(item.net_surplus_total_income).toFixed(2)
                )}
              </p>
              {/* less: Operating Expenses */}
              <p className="">Less: Operating Expenses </p>
              <p className=" text-right">
                {pesoSign}
                {numberWithCommas(
                  Number(item.net_surplus_operating_expenses).toFixed(2)
                )}
              </p>
            </div>
            {/* Net Surplus Before Distribution */}
            <div className="pt-1 border-t-2 grid grid-cols-2">
              {/* Net Surplus Before Distribution */}
              <p className="font-bold">Net Surplus Before Distribution </p>
              <p className=" font-bold text-right">
                {pesoSign}
                {numberWithCommas(
                  Number(item.net_surplus_before_amount).toFixed(2)
                )}
              </p>
            </div>

            {/* Allocation of Net Surplus */}
            <p className="mt-2 text-base font-semibold text-primary">
              Allocation of Net Surplus
            </p>
            <div className="grid grid-cols-[1fr_3rem_1fr] gap-1 items-center">
              {/* General Reserve Fund */}
              <p className="mb-0">General Reserve Fund </p>
              <p className="mb-0 text-center">
                {item.net_surplus_general_reserve_rate} %
              </p>
              <p className="mb-0 text-right">
                {pesoSign}
                {numberWithCommas(
                  Number(item.net_surplus_general_reserve).toFixed(2)
                )}
              </p>
              {/* Educ & Training Fund */}
              <p className="mb-0">Educ & Training Fund </p>
              <p className="mb-0 text-center">
                {item.net_surplus_educ_training_rate} %
              </p>
              <p className="mb-0 text-right">
                {pesoSign}
                {numberWithCommas(
                  Number(item.net_surplus_educ_training).toFixed(2)
                )}
              </p>
              {/* Community Development Fund */}
              <p className="mb-0 font-bold">Community Development Fund </p>
              <p className="mb-0 text-center">
                {item.net_surplus_community_dev_rate} %
              </p>
              <p className="mb-0 font-bold text-right">
                {pesoSign}
                {numberWithCommas(
                  Number(item.net_surplus_community_dev).toFixed(2)
                )}
              </p>
              {/* Optional Fund */}
              <p className="font-bold">Optional Fund </p>
              <p className="text-center">
                {item.net_surplus_optional_fund_rate} %
              </p>
              <p className="font-bold text-right">
                {pesoSign}
                {numberWithCommas(
                  Number(item.net_surplus_optional_fund).toFixed(2)
                )}
              </p>
            </div>
            {/* Optional Fund */}
            <p className="pt-1 border-t-2 font-bold text-right">
              {pesoSign}
              {numberWithCommas(Number(item.net_surplus_allocation).toFixed(2))}
            </p>

            {/* Net Surplus for Distribution */}
            <div className="grid grid-cols-2 gap-1 items-center">
              <p className="mb-0 font-bold ">Net Surplus for Distribution</p>
              <p className="mb-0 font-bold text-right">
                {pesoSign}
                {numberWithCommas(
                  Number(item.net_surplus_distribution_amount).toFixed(2)
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalViewNetDetails;
