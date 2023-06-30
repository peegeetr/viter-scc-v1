import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import { setIsAdd, setIsRestore } from "../../../../../../store/StoreAction";
import { StoreContext } from "../../../../../../store/StoreContext";
import useQueryData from "../../../../../custom-hooks/useQueryData";
import {
  formatDate,
  getTime,
  getUrlParam,
  numberWithCommas,
  pesoSign,
} from "../../../../../helpers/functions-general";
import { queryDataInfinite } from "../../../../../helpers/queryDataInfinite";
import Loadmore from "../../../../../partials/Loadmore";
import NoData from "../../../../../partials/NoData";
import SearchBar from "../../../../../partials/SearchBar";
import ServerError from "../../../../../partials/ServerError";
import ModalDeleteRestore from "../../../../../partials/modals/ModalDeleteRestore";
import TableSpinner from "../../../../../partials/spinners/TableSpinner";
import { computeTotalCapital } from "../functions-capital-share";
import StatusAmount from "../../../../../partials/status/StatusAmount";

const TransactionCapitalShareList = ({ setItemEdit, totalCapital }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [dataItem, setData] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [isDel, setDel] = React.useState(false);
  const [onSearch, setOnSearch] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const memberid = getUrlParam().get("memberid");
  let counter = 1;
  const search = React.useRef(null);
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
    queryKey: ["capital-share", onSearch, store.isSearch],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/v1/capital-share/search/${search.current.value}/${empid}`, // search endpoint
        `/v1/capital-share/page/${pageParam}/${empid}`, // list endpoint
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

  const handleEdit = (item) => {
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };

  const handleDelete = (item) => {
    dispatch(setIsRestore(true));
    setId(item.capital_share_aid);
    setData(item);
    setDel(true);
  };

  // use if not loadmore button undertime read-capital-total
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
      <div className="relative overflow-x-auto z-0">
        <div className="xl:flex items-center xl:mt-4 mb-2 text-primary">
          {result?.pages[0].count > 0 ? (
            <StatusAmount
              text="Paid Capital Share"
              amount={totalCapital.totalCapital}
              type="paid"
            />
          ) : (
            <StatusAmount
              text="Subscribes Capital Share "
              amount={computeTotalCapital(result?.pages[0])}
            />
          )}

          <StatusAmount
            text="Remaining Capital "
            amount={totalCapital.remainingAmount}
            type="pending"
          />
          <StatusAmount
            text="Subscribes Capital Share "
            amount={totalCapital.subscribeC}
          />
          <StatusAmount
            text="Membership Fee "
            amount={totalCapital.memberFee}
          />
        </div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th className="min-w-[15rem]">Date</th>
              <th className="min-w-[15rem]">Official Receipt</th>
              <th className="min-w-[15rem]">Paid up Capital</th>
              {(store.credentials.data.role_is_developer === 1 ||
                store.credentials.data.role_is_admin === 1) && (
                <th className="!w-[5rem]">Actions</th>
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
                    <td>{`${formatDate(item.capital_share_date)} ${getTime(
                      item.capital_share_date
                    )}`}</td>
                    <td>{item.capital_share_or}</td>
                    <td>
                      {pesoSign}{" "}
                      {numberWithCommas(
                        Number(item.capital_share_paid_up).toFixed(2)
                      )}
                    </td>
                    {(store.credentials.data.role_is_developer === 1 ||
                      store.credentials.data.role_is_admin === 1) && (
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

      {store.isRestore && (
        <ModalDeleteRestore
          id={id}
          isDel={isDel}
          mysqlApiDelete={`/v1/capital-share/${id}`}
          msg={"Are you sure you want to delete "}
          item={`${dataItem.capital_share_date}`}
          arrKey="capital-share"
        />
      )}
    </>
  );
};

export default TransactionCapitalShareList;
