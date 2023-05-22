import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import { setIsAdd } from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import {
  formatDate,
  getTime,
  numberWithCommas,
} from "../../../helpers/functions-general";

const ModalViewSales = ({ item }) => {
  const { store, dispatch } = React.useContext(StoreContext);

  const handleClose = () => {
    dispatch(setIsAdd(false));
  };

  return (
    <>
      <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-dark bg-opacity-50 z-50">
        <div className="p-1 w-[350px] rounded-b-2xl">
          <div className="flex justify-between items-center bg-primary p-3 rounded-t-2xl">
            <h3 className="text-white text-sm">Receipt</h3>
            <button
              type="button"
              className="text-gray-200 text-base"
              onClick={handleClose}
            >
              <FaTimesCircle />
            </button>
          </div>

          <div className="bg-white p-4 rounded-b-2xl">
            <div className="grid grid-cols-2 pl-3 text-primary">
              <p className="mb-0">Name:</p>
              <p className="mb-0 text-black ml-2">
                {`${item.members_last_name}, ${item.members_first_name}`}
              </p>
              <p className="mb-0">Recieve Date:</p>
              <p className="mb-0 text-black ml-2">
                {`${formatDate(item.sales_date)} 
                `}
              </p>
              <p className="mb-0">Time:</p>
              <p className="mb-0 text-black ml-2">
                {`${getTime(item.sales_date)}
                `}
              </p>
              <p className="mb-0">Official Receipt:</p>
              <p className="mb-0 text-black ml-2 uppercase">{item.sales_or}</p>
              <p className="mb-0">Order Number:</p>
              <p className="mb-0 text-black ml-2 uppercase">
                {item.orders_number}
              </p>
              <p className="mb-0">Product Name:</p>
              <p className="mb-0 text-black ml-2 capitalize">
                {item.suppliers_products_name}
              </p>
              <p className="mb-0">SRP Amountp:</p>
              <p className="mb-0 text-black ml-2">
                &#8369;{" "}
                {numberWithCommas(
                  Number(item.suppliers_products_scc_price).toFixed(2)
                )}
              </p>
              <p className="mb-0">Total Amount:</p>
              <p className="mb-0 text-black ml-2">
                &#8369;{" "}
                {numberWithCommas(
                  Number(item.orders_product_amount).toFixed(2)
                )}
              </p>
              <p className="mb-0">Recieve Amount:</p>
              <p className="mb-0 text-black ml-2">
                &#8369;{" "}
                {numberWithCommas(Number(item.sales_receive_amount).toFixed(2))}
              </p>
              <p className="">Change:</p>
              <p className="text-black ml-2">
                &#8369;{" "}
                {numberWithCommas(Number(item.sales_member_change).toFixed(2))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalViewSales;