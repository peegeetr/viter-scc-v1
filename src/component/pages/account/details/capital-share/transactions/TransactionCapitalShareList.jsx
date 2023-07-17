import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { useInView } from "react-intersection-observer";
import { StoreContext } from "../../../../../../store/StoreContext";
import { getUrlParam } from "../../../../../helpers/functions-general";
import { queryDataInfinite } from "../../../../../helpers/queryDataInfinite";
import Loadmore from "../../../../../partials/Loadmore";
import NoData from "../../../../../partials/NoData";
import SearchBar from "../../../../../partials/SearchBar";
import ServerError from "../../../../../partials/ServerError";
import TableSpinner from "../../../../../partials/spinners/TableSpinner";
import { getMonth } from "../../../../Inventory/reports/report-function";
import TransactionCapitalShareBody from "./TransactionCapitalShareBody";
import TransactionCapitalShareTotals from "./TransactionCapitalShareTotals";

const TransactionCapitalShareList = ({
  setItemEdit,
  totalCapital,
  memberName,
  isLoading,
  menu,
}) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [onSearch, setOnSearch] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const memberid = getUrlParam().get("memberid");
  const search = React.useRef(null);
  const { ref, inView } = useInView();
  // use if with loadmore button and search bar
  let empid =
    menu === "members" ? memberid : store.credentials.data.members_aid;
  const {
    data: result,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["capital-share", onSearch, store.isSearch],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/v1/capital-share/search-by-id/${empid}`, // search endpoint
        `/v1/capital-share/page/${pageParam}/${empid}`, // list endpoint
        store.isSearch, // search boolean
        "post",
        { search: search.current.value }
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
      {isLoading ? (
        <TableSpinner />
      ) : memberName?.data.length > 0 ? (
        <>
          {menu === "members" && (
            <p className="text-primary">
              <span className="pr-4 font-bold">Member Name :</span>
              {isLoading === "loading"
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
          <div className="relative overflow-x-auto z-0">
            <TransactionCapitalShareTotals
              result={result}
              totalCapital={totalCapital}
              isLoading={status === "loading"}
            />

            <table>
              <thead>
                <tr>
                  <th>Year</th>
                  {getMonth()?.map((yItem, key) => {
                    return (
                      <th key={key} className="text-center min-w-[10rem] ">
                        {`${yItem.month_name}`}
                      </th>
                    );
                  })}
                  <th className="text-center min-w-[10rem]">Total</th>
                  <th className="text-center min-w-[10rem] ">Average Share</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {(status === "loading" ||
                  result?.pages[0].data.length === 0) && (
                  <tr className="text-center ">
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
                        <tr key={key} className="text-right">
                          <TransactionCapitalShareBody
                            item={item}
                            setItemEdit={setItemEdit}
                          />
                        </tr>
                      );
                    })}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
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
          </div>
        </>
      ) : (
        <NoData />
      )}
    </>
  );
};

export default TransactionCapitalShareList;
