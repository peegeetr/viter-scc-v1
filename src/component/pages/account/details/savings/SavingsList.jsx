import React from "react";
import { FaArchive, FaEdit, FaHistory, FaTrash } from "react-icons/fa";
import { StoreContext } from "../../../../../store/StoreContext";
import NoData from "../../../../partials/NoData";
import ServerError from "../../../../partials/ServerError";
import TableSpinner from "../../../../partials/spinners/TableSpinner";
import StatusActive from "../../../../partials/status/StatusActive";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { queryDataInfinite } from "../../../../helpers/queryDataInfinite";
import { setIsAdd, setIsRestore } from "../../../../../store/StoreAction";
import ModalDeleteRestore from "../../../../partials/modals/ModalDeleteRestore";
import SearchBar from "../../../../partials/SearchBar";
import Loadmore from "../../../../partials/Loadmore";
import {
  formatDate,
  getUrlParam,
  numberWithCommas,
} from "../../../../helpers/functions-general";
import { computeTotalSavings } from "./functions-savings";

const SavingsList = ({ setItemEdit }) => {
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
    queryKey: ["savings", onSearch, store.isSearch],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/v1/savings/search/${search.current.value}/${empid}`, // search endpoint
        `/v1/savings/page/${pageParam}/${empid}`, // list endpoint
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
  });

  React.useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1);
      fetchNextPage();
    }
  }, [inView]);

  const handleEdit = (item) => {
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };

  const handleDelete = (item) => {
    dispatch(setIsRestore(true));
    setId(item.savings_aid);
    setData(item);
    setDel(true);
  };
  return (
    <>
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
        {status !== "loading" && result?.pages[0].data.length > 0 && (
          <div className="text-center my-4 text-primary font-bold">
            <p>
              <span className="mr-4">Total Saving :</span>
              {computeTotalSavings(result?.pages[0])}
            </p>
          </div>
        )}
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th className="w-[15rem]">OR number</th>
              <th className="w-[15rem]">Date</th>
              <th className="w-[15rem]">Saving Deposit</th>
              <th className="w-[15rem]">Withdrawal</th>
              {store.credentials.data.role_is_member === 0 && (
                <th className="max-w-[5rem]">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {(status === "loading" || result?.pages[0].data.length === 0) && (
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
                    <td>{counter++}.</td>
                    <td>{item.savings_or}</td>
                    <td>{formatDate(item.savings_date)}</td>
                    <td
                      className={
                        item.savings_deposite > 0 ? "text-green-500" : ""
                      }
                    >
                      {item.savings_deposite > 0
                        ? numberWithCommas(item.savings_deposite)
                        : ""}
                    </td>
                    <td
                      className={
                        item.savings_withdrawal > 0 ? "text-orange-500" : ""
                      }
                    >
                      {item.savings_withdrawal > 0
                        ? numberWithCommas(item.savings_withdrawal)
                        : ""}
                    </td>
                    {/* <td>{numberWithCommas(item.savings_interest)}</td> */}
                    {store.credentials.data.role_is_member === 0 && (
                      <td>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            className="btn-action-table tooltip-action-table"
                            data-tooltip="Edit"
                            onClick={() => handleEdit(item)}
                          >
                            <FaEdit />
                          </button>
                          <button
                            type="button"
                            className="btn-action-table tooltip-action-table"
                            data-tooltip="Delete"
                            onClick={() => handleDelete(item)}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    )}
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

      {store.isRestore && (
        <ModalDeleteRestore
          id={id}
          isDel={isDel}
          mysqlApiDelete={`/v1/savings/${id}`}
          msg={"Are you sure you want to delete "}
          item={`${dataItem.savings_date}`}
          arrKey="savings"
        />
      )}
    </>
  );
};

export default SavingsList;
