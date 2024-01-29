import React from "react";
import { StoreContext } from "../../../../store/StoreContext";
import {
  AssociateMemberId,
  formatDate,
  getDateNow,
  getUrlParam,
  notMemberId,
  pesoSign,
} from "../../../helpers/functions-general";
import SccLogo from "../../../svg/SccLogo";
import { getTotalDataInvoice } from "../functions-pos";
import ServerError from "../../../partials/ServerError";
import NoData from "../../../partials/NoData";
import TableSpinner from "../../../partials/spinners/TableSpinner";

const PosInvoiceList = ({ isLoading, error, result }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const memberId = getUrlParam().get("memberId");
  let counter = 1;

  console.log("result", result);

  let memberName =
    result?.count > 0
      ? `${result?.data[0].members_last_name} ${result?.data[0].members_first_name}`
      : "Not Found";
  return (
    <>
      <div className="px-5">
        <div className="border-gray-100 border-solid border-b-[2px] ">
          <div className="flex justify-between items-center border-primary border-solid border-t-[8px] pt-5">
            <ul className="">
              <li className="pb-2 text-4xl">
                <SccLogo />
              </li>
            </ul>
            <ul>
              <li className="text-primary font-bold text-4xl ">Invoice</li>
              <li className=" ">Date : {formatDate(getDateNow())}</li>
            </ul>
          </div>

          <ul className="mt-5">
            <li>1118 Alvarez Street, Purok 3, Brgy. San Jose,</li>
            <li>San Pablo City, Laguna 4000, Philippines</li>
            <li>TIN NO. 620-402-542-00000</li>
          </ul>

          <ul className="mt-5 flex justify-between mb-3">
            <li className="font-bold ">
              Bill To :
              <br />
              <span className="font-normal bg-gray-200 p-1 rounded ">
                {Number(memberId) === notMemberId ||
                Number(memberId) === AssociateMemberId
                  ? "Customer"
                  : memberName}
              </span>
            </li>
            <li className="font-bold">
              Due :
              <br />
              <span className="bg-gray-200 font-normal text-left">
                <input className="w-3/4 p-1 bg-gray-200 font-normal text-left" />
              </span>
            </li>
          </ul>
        </div>

        <div className="relative text-center overflow-x-auto z-0 mt-5 ">
          <table>
            <thead>
              <tr className="border-white text-primary">
                <th className="bg-white text-[14px] ">#</th>
                <th className="bg-white text-[14px]">Item/Description</th>
                <th className="bg-white text-[14px]">Remarks</th>
                <th className="bg-white text-[14px]">Order Date</th>
                <th className="bg-white text-[14px] text-center">Qty</th>
                <th className="bg-white text-[14px] text-right">Discount</th>
                <th className="bg-white text-[14px] text-right">Unit price</th>
                <th className="bg-white text-[14px] text-right">Total price</th>
              </tr>
            </thead>
            <tbody className="ulternate-color-table">
              {(isLoading || result?.data.length === 0) && (
                <tr className="text-center relative">
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
              {result?.data.map((item, key) => (
                <tr key={key} className="border-white ">
                  <td className="text-[14px]">{counter++}.</td>
                  <td className="text-[14px] max-w-[10rem]">
                    {item.suppliers_products_name}
                  </td>
                  <td className="text-[14px] max-w-[10rem]">
                    {item.orders_remarks}
                  </td>
                  <td className="text-[14px] w-[7rem]"> {item.orders_date} </td>
                  <td className="text-[14px] text-center">
                    {item.orders_product_quantity}
                  </td>
                  <td className="text-[14px] w-[7rem] text-right">
                    {pesoSign} {Number(item.orders_is_discounted).toFixed(2)}
                  </td>
                  <td className="text-[14px] w-[7rem] text-right">
                    {pesoSign} {Number(item.orders_product_srp).toFixed(2)}
                  </td>
                  <td className="text-[14px] w-[7rem] text-right">
                    {pesoSign} {Number(item.orders_product_amount).toFixed(2)}
                  </td>
                </tr>
              ))}
              <tr className="border-white !bg-blue-50 ">
                <td colSpan={6} className="text-[14px]">
                  Note :
                </td>
                <td className="text-[14px] text-right font-bold">Subtotal :</td>
                <td className="text-[14px] text-right font-bold">
                  {pesoSign}
                  {Number(getTotalDataInvoice(result, memberId).amount).toFixed(
                    2
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-right text-2xl  mt-5 text-primary">
          Total: {pesoSign}
          {Number(getTotalDataInvoice(result, memberId).amount).toFixed(2)}
        </p>

        <p className="font-bold text-[14px] mb-0">Payment Details</p>
        <div className="grid grid-cols-2 border-solid border-[2px] ">
          <ul className="border-gray-200 border-solid border-r-[2px] text-[14px]">
            <li className="pl-3 pt-3">
              Bank Name :
              <span className="pl-2 font-semibold">Chinabank Corporation</span>
            </li>
            <li className="pl-3">
              Name :
              <span className="pl-2  font-semibold">
                Sambahayan Consumers Cooperative
              </span>
            </li>
            <li className="pl-3 ">
              Account Number :
              <span className="pl-2 font-semibold">106500004658</span>
            </li>
          </ul>
          <ul className="border-gray-200 text-[14px] pl-3">
            <li className=" pt-3">Gcash</li>
            <li className="font-semibold">Charlene Kyle Abrigo</li>
            <li className="font-semibold pb-3">09566914441</li>
          </ul>
        </div>
        <p className="text-2xl mt-5 ">Thank you for your business!</p>
      </div>
    </>
  );
};

export default PosInvoiceList;
