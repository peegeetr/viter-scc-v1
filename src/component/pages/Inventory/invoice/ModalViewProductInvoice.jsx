import React from "react";
import { AiFillPrinter } from "react-icons/ai";
import { FaTimesCircle } from "react-icons/fa";
import { setIsAdd } from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import useQueryData from "../../../custom-hooks/useQueryData";
import { formatDate, getDateNow } from "../../../helpers/functions-general";
import NoData from "../../../partials/NoData";
import ServerError from "../../../partials/ServerError";
import TableSpinner from "../../../partials/spinners/TableSpinner";
import SccLogo from "../../../svg/SccLogo";

const ModalViewProductInvoice = ({ item }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  let totalAmount = 0;
  let counter = 0;
  const handleClose = () => {
    dispatch(setIsAdd(false));
  };

  // use if not loadmore button undertime
  const {
    data: memberPendingOrder,
    isLoading,
    error,
  } = useQueryData(
    `/v1/orders/pending/by-member-id/${item.members_aid}`, // endpoint
    "get", // method
    "memberPendingOrder" // key
  );
  return (
    <>
      <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-dark bg-opacity-50 z-50 print:bg-white print:block print:p-2">
        <div className="p-1 w-[550px] min-w-[350px] rounded-b-2xl print:w-[400px] print:mr-2">
          <div className="flex justify-between items-center bg-primary p-3 rounded-t-2xl print:hidden">
            <h3 className="text-white text-sm">Receipt</h3>
            <button
              type="button"
              className="text-gray-200 text-base"
              onClick={handleClose}
            >
              <FaTimesCircle />
            </button>
          </div>
          <div className="print:block hidden border-t-4 border-primary">
            <div className="">
              <div className=" flex items-center justify-between mt-8">
                <button
                  type="button"
                  className="text-gray-200 w-1/2 text-center"
                  onClick={handleClose}
                >
                  <SccLogo />
                </button>
                <div className="w-1/2 ml-16">
                  <p className="text-[2rem] m-0 font-bold  text-primary">
                    Invoice
                  </p>
                  <p className="m-0 font-bold">
                    Date:{" "}
                    <span className="text-pink-500 ">
                      {formatDate(getDateNow())}
                    </span>
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <p>
                  FWC Training Center
                  <br />
                  Sitio Subac, Santo Nino San Pablo CIty
                  <br /> Laguna Region IV-A (CALABARZON)
                  <br /> CDA REG. NO. 9520-100400033760
                  <br /> TIN NO. 620-402-542-00000
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-b-2xl p-4  print:p-0 print:mt-4 ">
            <div className="flex justify-between items-center print:block">
              <div className="print:grid print:grid-cols-2">
                <div className="font-bold ">
                  <p className="mb-0 hidden print:block">Bill To: </p>
                  <p className="print:pl-8 mb-0 text-gray-600">
                    <span className="print:hidden text-black">Bill To: </span>
                    {`Lumabas, Cyrene`}
                  </p>
                </div>
                <div className="font-bold ">
                  <p className="mb-0 hidden print:block">Due:</p>
                  <p className="print:pl-8 mb-0 text-gray-600 ">
                    <span className="print:hidden text-black">Due: </span>
                    {formatDate(getDateNow())}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 print:hidden">
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => window.print()}
                >
                  <AiFillPrinter />
                  <span>Print</span>
                </button>
              </div>
            </div>
            {/* table */}
            <div className="text-center overflow-x-auto z-0 mt-4 print:overflow-x-visible  ">
              <table className="">
                <thead>
                  <tr>
                    <th className="print:hidden">#</th>
                    <th className="print:bg-white min-w-[6rem] ">Product</th>
                    <th className="print:bg-white min-w-[6rem] ">Date Order</th>
                    <th className="print:bg-white min-w-[2rem] ">Qty</th>
                    <th className="print:bg-white min-w-[6rem]  text-right pr-4 ">
                      Unit Price
                    </th>
                    <th className="print:bg-white !w-[3rem] text-right pr-4 ">
                      Total Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {(isLoading || memberPendingOrder?.data.length === 0) && (
                    <tr className="text-center ">
                      <td colSpan="100%" className="p-10">
                        {isLoading && <TableSpinner />}
                        <NoData />
                      </td>
                    </tr>
                  )}
                  {error && (
                    <tr className="text-center ">
                      <td colSpan="100%" className="p-10">
                        <ServerError />
                      </td>
                    </tr>
                  )}
                  {memberPendingOrder?.data.map((item, key) => {
                    counter++;
                    totalAmount += Number(item.orders_product_amount);
                    return (
                      <tr key={key}>
                        <td className="print:hidden">{counter}.</td>
                        <td className="capitalize">
                          {item.suppliers_products_name}
                        </td>
                        <td>{item.orders_date.split(" ")[0]}</td>
                        <td>{item.orders_product_quantity}</td>
                        <td className="pr-4 text-right">
                          &#8369; {item.suppliers_products_scc_price}
                        </td>
                        <td className=" pr-4 text-right">
                          &#8369; {item.orders_product_amount}
                        </td>
                      </tr>
                    );
                  })}
                  <tr className="border-b-0">
                    <td colSpan={6} className="text-right font-bold">
                      Subtotal Total:{" "}
                      <span className="ml-4 pr-2">&#8369; {totalAmount}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalViewProductInvoice;
