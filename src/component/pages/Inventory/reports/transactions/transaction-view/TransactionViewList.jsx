import React from "react";
import useQueryData from "../../../../../custom-hooks/useQueryData";
import {
  formatDate,
  getUrlParam,
  numberWithCommas,
  pesoSign,
} from "../../../../../helpers/functions-general";
import NoData from "../../../../../partials/NoData";
import ServerError from "../../../../../partials/ServerError";
import TableSpinner from "../../../../../partials/spinners/TableSpinner";
import StatusActive from "../../../../../partials/status/StatusActive";
import StatusPending from "../../../../../partials/status/StatusPending";
import { computeFinalAmount } from "../../../orders/functions-orders";
import { getMonthName } from "../../report-function";
import { getTransactionViewFinalTotal } from "./functions-transaction-view";

const TransactionViewList = () => {
  const valType = getUrlParam().get("type");
  const valDate = getUrlParam().get("date");
  let counter = 1;
  const {
    isLoading,
    error,
    data: result,
  } = useQueryData(
    `/v1/report-transactions-view/read-by-type`, // endpoint
    "post", // method
    "read-all-order-by-product", // key
    { date: valDate, type: valType },
    valDate,
    valType
  );

  return (
    <>
      {valType === "date" && (
        <p className="mb-0 text-center font-bold text-2xl">
          {formatDate(valDate)}
        </p>
      )}
      {valType === "month" && (
        <p className="mb-0 text-center font-bold text-2xl">
          {getMonthName(valDate.split("-")[1])}
        </p>
      )}
      {valType === "month-year" && (
        <p className="mb-0 text-center font-bold text-2xl">
          {`${getMonthName(valDate.split("-")[1])} (${valDate.split("-")[0]})`}
        </p>
      )}
      <div className="my-3 print:my-0 print:mb-3">
        <ul className="sm:flex justify-evenly">
          <li className="font-bold">
            <span className="bg-gray-100">
              Total Amount:
              <span className="text-black">
                {pesoSign}{" "}
                {isLoading
                  ? "Loading"
                  : getTransactionViewFinalTotal(result).totalSales}
              </span>
            </span>
          </li>
          <li className="font-bold ">
            <span className="bg-gray-100">
              Total Supplier:
              <span className="text-black">
                {pesoSign}

                {isLoading
                  ? "Loading"
                  : getTransactionViewFinalTotal(result).totalSupAmount}
              </span>
            </span>
          </li>

          <li className={`font-bold`}>
            <span
              className={` pr-1 ${
                getTransactionViewFinalTotal(result).totalProfit < 0
                  ? "text-alert bg-red-100"
                  : "text-primary bg-blue-100"
              }`}
            >
              Total Profit:
              <span className="">
                {pesoSign}

                {isLoading
                  ? "Loading"
                  : getTransactionViewFinalTotal(result).totalProfit}
              </span>
            </span>
          </li>
        </ul>
      </div>
      <div className="text-center overflow-x-auto z-0 print:overflow-hidden">
        {/* use only for updating important records */}
        {isLoading && <TableSpinner />}
        {/* use only for updating important records */}
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th className="min-w-[2rem]">Status</th>
              <th className="min-w-[8rem]">Name</th>
              <th className="min-w-[6rem]">Pay Date</th>
              <th className="min-w-[8rem]">Supplier</th>
              <th className="min-w-[8rem]">Category</th>
              <th className="min-w-[7rem]">Product</th>
              <th className="min-w-[6rem] text-center pr-4">Qty</th>
              <th className="min-w-[6rem] text-right pr-4">Discounted</th>
              <th className="min-w-[7rem] text-right pr-4">Total Amnt.</th>
              <th className="min-w-[6rem] text-right pr-4">Supplier Price</th>
              <th className="!w-[10rem] text-right pr-4">Profit</th>
            </tr>
          </thead>
          <tbody>
            {(isLoading || result?.data.length === 0) && (
              <tr className="text-center relative">
                <td colSpan="100%" className="p-10">
                  {!isLoading && <TableSpinner />}
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

            {result?.data.map((item, key) => {
              return (
                <tr key={key}>
                  <td> {counter++}.</td>
                  <td>
                    {item.sales_is_paid === 1 ? (
                      <StatusActive text="Paid" />
                    ) : (
                      <StatusPending />
                    )}
                  </td>
                  <td>{`${item.members_last_name}, ${item.members_first_name}`}</td>
                  <td>
                    {item.sales_date === ""
                      ? "N/A"
                      : `${formatDate(item.sales_date)}`}
                  </td>

                  <td>{item.suppliers_company_name}</td>
                  <td>{item.product_category_name}</td>
                  <td>{item.suppliers_products_name}</td>
                  <td className="text-center ">
                    {item.orders_product_quantity}
                  </td>
                  <td className="text-right pr-4">
                    {pesoSign}
                    {numberWithCommas(Number(item.sales_discount).toFixed(2))}
                  </td>
                  <td className="text-right font-bold text-primary  pr-4">
                    <span
                      className="cursor-pointer underline tooltip-action-table"
                      onClick={() => handleView(item)}
                      data-tooltip="Details"
                    >
                      {pesoSign} {numberWithCommas(computeFinalAmount(item))}
                    </span>
                  </td>
                  <td className="text-right pr-4">
                    {pesoSign}{" "}
                    {numberWithCommas(
                      Number(item.orders_suplier_price).toFixed(2)
                    )}{" "}
                  </td>
                  <td className="text-right pr-4">
                    {pesoSign}{" "}
                    {numberWithCommas(
                      (
                        Number(computeFinalAmount(item)) -
                        Number(item.orders_suplier_price)
                      ).toFixed(3)
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TransactionViewList;
