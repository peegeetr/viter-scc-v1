import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { useInView } from "react-intersection-observer";
import { StoreContext } from "../../../../../store/StoreContext";
import useQueryData from "../../../../custom-hooks/useQueryData";
import {
  formatDate,
  getUrlParam,
  numberWithCommas,
  pesoSign,
} from "../../../../helpers/functions-general";
import { queryDataInfinite } from "../../../../helpers/queryDataInfinite";
import Loadmore from "../../../../partials/Loadmore";
import NoData from "../../../../partials/NoData";
import ServerError from "../../../../partials/ServerError";
import TableSpinner from "../../../../partials/spinners/TableSpinner";
import StatusActive from "../../../../partials/status/StatusActive";
import StatusInactive from "../../../../partials/status/StatusInactive";
import StatusPending from "../../../../partials/status/StatusPending";
import SearchBar from "../../../../partials/SearchBar";
import { SlArrowRight } from "react-icons/sl";
import { setIsAdd } from "../../../../../store/StoreAction";
import ModalViewDividend from "./modal/ModalViewDividend";

const MemberDividendList = ({ memberName, isLoading, menu }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);
  const [onSearch, setOnSearch] = React.useState(false);
  const [filter, setFilter] = React.useState(false);
  const [value, setValue] = React.useState([]);
  const [page, setPage] = React.useState(1);
  let counter = 1;
  const search = React.useRef(null);
  const memberid = getUrlParam().get("memberid");
  // use if with loadmore button and search bar
  let empid =
    menu === "members" ? memberid : store.credentials.data.members_aid;

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
    queryKey: ["file", onSearch, store.isSearch],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/v1/file/search`, // search endpoint
        `/v1/file/page/${pageParam}`, // list endpoint
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

  const handleView = (item) => {
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };

  return (
    <>
      {isLoading ? (
        <TableSpinner />
      ) : memberName?.data.length > 0 ? (
        <>
          {menu === "members" && (
            <p className="m-0 text-primary">
              <span className="pr-4 font-bold">Member Name :</span>
              {isLoading === "loading"
                ? "Loading..."
                : `${memberName?.data[0].members_last_name}, ${memberName?.data[0].members_first_name}`}
            </p>
          )}
          <div className="relative mt-3 text-center overflow-x-auto z-0 w-full max-w-[500px]">
            <SearchBar
              search={search}
              dispatch={dispatch}
              store={store}
              result={result?.pages}
              isFetching={isFetching}
              setOnSearch={setOnSearch}
              onSearch={onSearch}
            />

            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th className="min-w-[5rem] w-[5rem]">Year</th>
                  <th className="min-w-[10rem] w-[15rem]">Dividend</th>
                  <th className=" "></th>
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
                    {page.data.map((item, key) => (
                      <tr key={key}>
                        <td> {counter++}.</td>
                        <td>2023</td>
                        <td>100,000.00</td>
                        <td>
                          {" "}
                          <div className="flex items-center justify-end pr-2">
                            <button
                              type="button"
                              className="btn-action-table tooltip-action-table"
                              data-tooltip="View Details"
                              onClick={() => handleView(item)}
                            >
                              <SlArrowRight />
                            </button>
                          </div>
                        </td>
                        {/* <td>{item.files_name}</td>
                        <td>{item.files_date}</td> */}
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
      ) : (
        // ModalViewDividend
        <NoData />
      )}
      {store.isAdd && <ModalViewDividend item={itemEdit} />}
    </>
  );
};

export default MemberDividendList;
