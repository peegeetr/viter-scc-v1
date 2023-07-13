import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import { setIsAdd } from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import {
  formatDate,
  getTime,
  numberWithCommas,
  pesoSign,
} from "../../../helpers/functions-general";
import { computeFinalAmount } from "../orders/functions-orders";

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
            <h3 className="text-white text-sm">Details</h3>
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
              <p className="mb-0">Order Date:</p>
              <p className="mb-0 text-black ml-2">
                {formatDate(item.orders_date)}
              </p>
              <p className="mb-0"> </p>
              <p className="mb-0 text-black ml-2">
                {getTime(item.orders_date)}
              </p>
              <p className="mb-0">Recieve Date:</p>
              <p className="mb-0 text-black ml-2">
                {item.sales_is_paid === 1
                  ? `${formatDate(item.sales_date)}`
                  : "N/A"}
              </p>
              <p className="mb-0"> </p>
              <p className="mb-0 text-black ml-2">
                {item.sales_is_paid === 1
                  ? `${getTime(item.sales_date)}`
                  : "N/A"}
              </p>
              <p className="mb-0">Sales invoice #:</p>
              <p className="mb-0 text-black ml-2 uppercase">
                {item.sales_is_paid === 1 ? item.sales_or : "N/A"}
              </p>
              <p className="mb-0">Order Number:</p>
              <p className="mb-0 text-black ml-2 uppercase">
                {item.orders_number}
              </p>
              <p className="mb-0">Sales Number:</p>
              <p className="mb-0 text-black ml-2 uppercase">
                {item.sales_number}
              </p>
              <p className="mb-0">Product Name:</p>
              <p className="mb-0 text-black ml-2 capitalize">
                {item.suppliers_products_name}
              </p>
              <p className="mb-0">SRP Amount:</p>
              <p className="mb-0 text-black ml-2">
                {pesoSign}{" "}
                {numberWithCommas(Number(item.orders_product_srp).toFixed(2))}
              </p>
              <p className="mb-0">Discounted:</p>
              <p className="mb-0 text-black ml-2">
                {pesoSign}{" "}
                {item.sales_is_paid === 1
                  ? numberWithCommas(Number(item.sales_discount).toFixed(2))
                  : "0.00"}
              </p>
              <p className="mb-0">Total Amount:</p>
              <p className="mb-0 text-black ml-2">
                {pesoSign}{" "}
                {item.sales_is_paid === 1 ? computeFinalAmount(item) : "0.00"}
              </p>
              <p className="mb-0">Recieve Amount:</p>
              <p className="mb-0 text-black ml-2">
                {pesoSign}{" "}
                {item.sales_is_paid === 1
                  ? numberWithCommas(
                      Number(item.sales_receive_amount).toFixed(2)
                    )
                  : "0.00"}
              </p>
              <p className="mb-0">Change:</p>
              <p className="mb-0 text-black ml-2">
                {pesoSign}{" "}
                {item.sales_is_paid === 1
                  ? numberWithCommas(
                      Number(item.sales_member_change).toFixed(2)
                    )
                  : "0.00"}
              </p>
              <p className="">Remarks:</p>
              <p className="text-black ml-2">{item.orders_remarks}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalViewSales;
