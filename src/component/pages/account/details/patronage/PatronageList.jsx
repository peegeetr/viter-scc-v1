import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { useInView } from "react-intersection-observer";
import { StoreContext } from "../../../../../store/StoreContext";
import {
  formatDate,
  getTime,
  getUrlParam,
  numberWithCommas,
} from "../../../../helpers/functions-general";
import { queryDataInfinite } from "../../../../helpers/queryDataInfinite";
import Loadmore from "../../../../partials/Loadmore";
import NoData from "../../../../partials/NoData";
import SearchBar from "../../../../partials/SearchBar";
import ServerError from "../../../../partials/ServerError";
import TableSpinner from "../../../../partials/spinners/TableSpinner";
import StatusActive from "../../../../partials/status/StatusActive";
import StatusPending from "../../../../partials/status/StatusPending";
import useQueryData from "../../../../custom-hooks/useQueryData";

const PatronageList = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [dataItem, setData] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [isDel, setDel] = React.useState(false);
  const [onSearch, setOnSearch] = React.useState(false);
  const [page, setPage] = React.useState(1);
  let counter = 1;
  const search = React.useRef(null);
  const memberid = getUrlParam().get("memberid");
  const { ref, inView } = useInView();
  // use if with loadmore button and search bar
  let empid = memberid === null ? store.credentials.data.members_aid : memberid;
  const {
    data: result,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["patronage", onSearch, store.isSearch],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/v1/patronage/search/by-employee-id/${search.current.value}/${empid}`, // search endpoint
        `/v1/patronage/page/by-employee-id/${pageParam}/${empid}`, // list endpoint
        store.isSearch // search boolean
      ),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total) {
        return lastPage.page + lastPage.count;
      }
      return;
    },
    refetchOnWindowFocus: false,
    networkMode: "always",
    cacheTime: 200,
  });

  React.useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1);
      fetchNextPage();
    }
  }, [inView]);

  // use if not loadmore button undertime
  const { data: memberName, isLoading: loadingmemberName } = useQueryData(
    `/v1/members/name/${empid}`, // endpoint
    "get", // method
    "memberName" // key
  );

  return (
    <>
      {memberid !== null && (
        <p className="text-primary">
          <span className="pr-4 font-bold">Member Name :</span>
          {loadingmemberName === "loading"
            ? "Loading..."
            : `${memberName?.data[0].members_last_name}, ${memberName?.data[0].members_first_name}`}
        </p>
      )}
      <SearchBar
        search={search}
        dispatch={dispatch}
        store={store}
        result={result?.pages}
        isFetching={isFetching}
        setOnSearch={setOnSearch}
        onSearch={onSearch}
      />
      <div className="relative text-center overflow-x-auto z-0">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th className="min-w-[10rem]">Recieve Payment Date</th>
              <th className="min-w-[10rem]">Product Name</th>
              <th className="min-w-[8rem]">Official Receipt</th>
              <th className="min-w-[5rem] text-right pr-4">Quantity</th>
              <th className="min-w-[5rem] text-right pr-4">SRP Amount</th>
              <th className="min-w-[5rem] text-right pr-4">Total Amount</th>
              <th>Status</th>
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
                {page.data.map((item, key) => (
                  <tr key={key}>
                    <td> {counter++}.</td>
                    <td>
                      {item.sales_date === ""
                        ? "N/A"
                        : `${formatDate(item.sales_date)} ${getTime(
                            item.sales_date
                          )}`}
                    </td>
                    <td>{item.suppliers_products_name}</td>
                    <td>{item.sales_or === "" ? "N/A" : item.sales_or}</td>
                    <td className=" text-right pr-4">
                      {item.orders_product_quantity}
                    </td>
                    <td className=" text-right pr-4">
                      &#8369;{" "}
                      {numberWithCommas(
                        Number(item.orders_product_amount).toFixed(2)
                      )}
                    </td>
                    <td className=" text-right pr-4">
                      &#8369;{" "}
                      {numberWithCommas(
                        Number(item.sales_receive_amount).toFixed(2)
                      )}
                    </td>
                    <td>
                      {item.sales_is_paid === 1 ? (
                        <StatusActive text="Paid" />
                      ) : (
                        <StatusPending />
                      )}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
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

export default PatronageList;
