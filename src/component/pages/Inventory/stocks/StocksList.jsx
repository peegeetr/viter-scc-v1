import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { FaCheck, FaHistory, FaTrash } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import {
  setIsAdd,
  setIsConfirm,
  setIsRestore,
} from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import { formatDate } from "../../../helpers/functions-general";
import { queryDataInfinite } from "../../../helpers/queryDataInfinite";
import Loadmore from "../../../partials/Loadmore";
import NoData from "../../../partials/NoData";
import SearchBar from "../../../partials/SearchBar";
import ServerError from "../../../partials/ServerError";
import ModalConfirm from "../../../partials/modals/ModalConfirm";
import ModalDeleteRestore from "../../../partials/modals/ModalDeleteRestore";
import TableSpinner from "../../../partials/spinners/TableSpinner";
import StatusActive from "../../../partials/status/StatusActive";
import StatusPending from "../../../partials/status/StatusPending";
import ModalUpdateOR from "./ModalUpdateOR";

const StocksList = ({ setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [dataItem, setData] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [isDel, setDel] = React.useState(false);
  const [onSearch, setOnSearch] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const search = React.useRef(null);
  let counter = 1;
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
    queryKey: ["stocks", onSearch, store.isSearch],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/v1/stocks/search/${search.current.value}`, // search endpoint
        `/v1/stocks/page/${pageParam}`, // list endpoint
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

  const handlePending = (item) => {
    dispatch(setIsConfirm(true));
    setId(item.stocks_aid);
    setData(item);
    setDel(null);
  };

  const handleComplete = (item) => {
    dispatch(setIsRestore(true));
    setId(item.stocks_aid);
    setData(item);
    setDel(null);
  };

  const handleDelete = (item) => {
    dispatch(setIsRestore(true));
    setId(item.stocks_aid);
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

      <div className="text-center overflow-x-auto z-0">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th className="min-w-[8rem]">Stock Number</th>
              <th className="min-w-[8rem]">Product Number</th>
              <th className="min-w-[8rem]">Supplier</th>
              <th className="min-w-[8rem]">Product Name</th>
              <th className="min-w-[5rem]">Quantity</th>
              <th className="min-w-[10rem]">Official Receipt</th>
              <th className="min-w-[8rem]">Created date</th>
              <th>Status</th>

              {(store.credentials.data.role_is_admin === 1 ||
                store.credentials.data.role_is_developer === 1 ||
                store.credentials.data.role_is_manager === 1) && (
                <th className="max-w-[5rem]">Actions</th>
              )}
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
                    <td className="uppercase">{item.stocks_number}</td>
                    <td className="uppercase">
                      {item.suppliers_products_number}
                    </td>
                    <td>{item.suppliers_company_name}</td>
                    <td>{item.suppliers_products_name}</td>
                    <td>{item.stocks_quantity}</td>
                    <td>{item.stocks_or}</td>
                    <td>
                      {`${formatDate(item.stocks_created)} 
                      ${item.stocks_created.split(" ")[1]}`}
                    </td>
                    <td>
                      {item.stocks_is_pending === 1 ? (
                        <StatusPending />
                      ) : (
                        <StatusActive text="Paid" />
                      )}
                    </td>
                    {(store.credentials.data.role_is_admin === 1 ||
                      store.credentials.data.role_is_developer === 1 ||
                      store.credentials.data.role_is_manager === 1) && (
                      <td>
                        <div className="flex items-center gap-1">
                          {item.stocks_is_pending === 1 && (
                            <>
                              <button
                                type="button"
                                className="btn-action-table tooltip-action-table"
                                data-tooltip="Paid"
                                onClick={() => handlePending(item)}
                              >
                                <FaCheck />
                              </button>
                            </>
                          )}
                          {item.stocks_is_pending === 0 && (
                            <>
                              <button
                                type="button"
                                className="btn-action-table tooltip-action-table"
                                data-tooltip="Pending"
                                onClick={() => handleComplete(item)}
                              >
                                <FaHistory />
                              </button>
                            </>
                          )}
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

      {store.isConfirm && (
        <ModalUpdateOR
          id={id}
          isDel={isDel}
          mysqlApiArchive={`/v1/stocks/active/${id}`}
          msg={"Are you sure you complete the payment of "}
          item={`${dataItem.suppliers_products_name}`}
          arrKey="stocks"
        />
      )}

      {store.isRestore && (
        <ModalDeleteRestore
          id={id}
          isDel={isDel}
          mysqlApiDelete={`/v1/stocks/${id}`}
          mysqlApiRestore={`/v1/stocks/active/${id}`}
          msg={
            isDel
              ? "Are you sure you want to delete "
              : "Are you sure you want to restore payment "
          }
          item={`${dataItem.suppliers_products_name}`}
          arrKey="stocks"
        />
      )}
    </>
  );
};

export default StocksList;
