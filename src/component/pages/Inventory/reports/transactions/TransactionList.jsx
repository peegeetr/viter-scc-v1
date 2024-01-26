import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { useInView } from "react-intersection-observer";
import useQueryData from "../../../../custom-hooks/useQueryData";
import {
  getDateNow,
  getUserType,
  numberWithCommas,
  pesoSign,
  yearNow,
} from "../../../../helpers/functions-general";
import { queryDataInfinite } from "../../../../helpers/queryDataInfinite";
import Loadmore from "../../../../partials/Loadmore";
import NoData from "../../../../partials/NoData";
import ServerError from "../../../../partials/ServerError";
import TableSpinner from "../../../../partials/spinners/TableSpinner";
import TransactionFilter from "./TransactionFilter";
import {
  getTotalProfit,
  getTransactionDate,
  getTransactionFinalTotal,
  getTransactionSupplierPrice,
  getTransactionTotalFilterByType,
  getTransactionTotalProfit,
  getTransactionType,
} from "./functions-transaction";
import { Link } from "react-router-dom";
import { SlArrowRight } from "react-icons/sl";
import { StoreContext } from "../../../../../store/StoreContext";

const TransactionList = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [isFilter, setFilter] = React.useState(false);
  const [isSubmit, setSubmit] = React.useState(false);
  const [month, setMonth] = React.useState("all");
  const [dateFrom, setDateFrom] = React.useState(getDateNow());
  const [dateTo, setDateTo] = React.useState(getDateNow());
  const [year, setYear] = React.useState("all");
  const [page, setPage] = React.useState(1);
  const urlLink = getUserType(store);
  let counter = 1;

  const { data: readTotal } = useQueryData(
    `/v1/report-transactions/read-all-order-by-product`, // endpoint
    "get", // method
    "read-all-order-by-product" // key
  );

  const { ref, inView } = useInView();
  // use if with loadmore button and search bar
  const {
    data: result,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["transaction", isSubmit, dateFrom, dateTo, month],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/v1/report-transactions/read-filter`, // search endpoint
        `/v1/report-transactions/page/${pageParam}`, // list endpoint
        isFilter, // search boolean
        "post",
        { dateFrom, dateTo, year, month }
      ),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total) {
        return lastPage.page + lastPage.count;
      }
      return;
    },
    // refetchOnWindowFocus: false,
    networkMode: "always",
    cacheTime: 200,
  });

  React.useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1);
      fetchNextPage();
    }
  }, [inView]);

  return (
    <>
      <TransactionFilter
        setFilter={setFilter}
        setSubmit={setSubmit}
        isSubmit={isSubmit}
        setMonth={setMonth}
        setDateFrom={setDateFrom}
        setDateTo={setDateTo}
        setYear={setYear}
        month={month}
        dateFrom={dateFrom}
        dateTo={dateTo}
        year={year}
        isFilter={isFilter}
      />

      <div className="mb-3 ">
        <ul className="">
          <li className="font-bold">
            <span className="bg-gray-100">
              Total Amount:
              <span className="ml-2 text-black">
                {pesoSign}{" "}
                {isFilter
                  ? getTransactionFinalTotal(result?.pages[0]).totalSales
                  : getTransactionFinalTotal(readTotal).totalSales}
              </span>
            </span>
          </li>
          <li className="font-bold ">
            <span className="bg-gray-100">
              Total Supplier:
              <span className="ml-2 text-black">
                {pesoSign}
                {isFilter
                  ? numberWithCommas(
                      Number(
                        getTransactionTotalFilterByType(
                          readTotal,
                          dateFrom,
                          dateTo,
                          month,
                          year
                        )
                      ).toFixed(3)
                    )
                  : getTransactionFinalTotal(readTotal).totalSupAmount}
              </span>
            </span>
          </li>

          <li className={`font-bold`}>
            <span
              className={` pr-1 ${
                (
                  isFilter
                    ? getTotalProfit(
                        getTransactionFinalTotal(result?.pages[0]).salesAmount,
                        getTransactionTotalFilterByType(
                          readTotal,
                          dateFrom,
                          dateTo,
                          month,
                          year
                        )
                      ).profit < 0
                    : getTransactionFinalTotal(readTotal).totalProfit < 0
                )
                  ? "text-alert bg-red-100"
                  : "text-primary bg-blue-100"
              }`}
            >
              Total Profit:
              <span className="ml-7">
                {pesoSign}
                {isFilter
                  ? getTotalProfit(
                      getTransactionFinalTotal(result?.pages[0]).salesAmount,
                      getTransactionTotalFilterByType(
                        readTotal,
                        dateFrom,
                        dateTo,
                        month,
                        year
                      )
                    ).profitWithComma
                  : getTransactionFinalTotal(readTotal).totalProfit}
              </span>
            </span>
          </li>
        </ul>
      </div>

      <div className="text-center overflow-x-auto z-0 print:overflow-hidden">
        <table>
          <thead>
            <tr>
              <th className="">#</th>
              <th className="min-w-[8rem]">Date</th>
              <th className="min-w-[8rem] text-right">Sales</th>
              <th className="min-w-[8rem] text-right">Discount</th>
              <th className="min-w-[8rem] text-right">Total</th>
              <th className="min-w-[8rem] text-right">Supplier Amount</th>
              <th className="min-w-[8rem] text-right">Total Profit</th>
              <th className=""></th>
            </tr>
          </thead>
          <tbody>
            {(status === "loading" || result?.pages[0].data.length === 0) && (
              <tr className="text-center relative">
                <td colSpan="100%" className="p-10">
                  {status === "loading" && <TableSpinner />}
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
            {result?.pages.map((page, key) => (
              <React.Fragment key={key}>
                {page.data.map((item, key) => {
                  return (
                    <tr key={key}>
                      <td> {counter++}.</td>
                      <td>{getTransactionDate(month, item, year)}</td>
                      <td className="text-right">
                        {pesoSign}
                        {numberWithCommas(Number(item.totalSales).toFixed(3))}
                      </td>
                      <td className="text-right">
                        {pesoSign}
                        {numberWithCommas(
                          Number(item.totalDiscount).toFixed(3)
                        )}
                      </td>
                      <td className="text-right">
                        {pesoSign}
                        {numberWithCommas(
                          (
                            Number(item.totalSales) - Number(item.totalDiscount)
                          ).toFixed(3)
                        )}
                      </td>
                      <td className="text-right">
                        {pesoSign}
                        {numberWithCommas(
                          Number(
                            getTransactionSupplierPrice(
                              readTotal,
                              item,
                              month,
                              year
                            )
                          ).toFixed(3)
                        )}
                      </td>
                      <td className="text-right">
                        {pesoSign}
                        {numberWithCommas(
                          getTransactionTotalProfit(
                            readTotal,
                            item,
                            month,
                            year
                          )
                        )}
                      </td>
                      <td className="text-right">
                        <Link
                          to={`${urlLink}/inventory/reports/transactions/view?type=${getTransactionType(
                            month,
                            year
                          )}&date=${item.orders_date}`}
                          target="_blank"
                          data-tooltip="View"
                        >
                          <button
                            type="button"
                            className="btn-action-table tooltip-action-table"
                            data-tooltip="View"
                          >
                            <SlArrowRight className="inline" />
                          </button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-center">
        <Loadmore
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
          result={result?.pages[0]}
          setPage={setPage}
          page={page}
          refView={ref}
        />
      </div>
    </>
  );
};

export default TransactionList;
