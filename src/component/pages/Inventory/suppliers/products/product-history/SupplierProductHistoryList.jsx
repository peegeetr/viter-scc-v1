import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { FaArchive, FaHistory, FaTrash } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import {
  setIsConfirm,
  setIsRestore,
} from "../../../../../../store/StoreAction";
import { StoreContext } from "../../../../../../store/StoreContext";
import {
  formatDate,
  getUrlParam,
  numberWithCommas,
  pesoSign,
} from "../../../../../helpers/functions-general";
import { queryDataInfinite } from "../../../../../helpers/queryDataInfinite";
import Loadmore from "../../../../../partials/Loadmore";
import NoData from "../../../../../partials/NoData";
import SearchBar from "../../../../../partials/SearchBar";
import ServerError from "../../../../../partials/ServerError";
import ModalConfirm from "../../../../../partials/modals/ModalConfirm";
import ModalDeleteRestore from "../../../../../partials/modals/ModalDeleteRestore";
import TableSpinner from "../../../../../partials/spinners/TableSpinner";
import StatusActive from "../../../../../partials/status/StatusActive";
import StatusInactive from "../../../../../partials/status/StatusInactive";

const SupplierProductHistoryList = ({ productName }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [dataItem, setData] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [isDel, setDel] = React.useState(false);
  const [onSearch, setOnSearch] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const supplierProductId = getUrlParam().get("supplierProductId");
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
    queryKey: ["product-history", onSearch, store.isSearch],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/v1/product-history/search-by-id/${supplierProductId}`, // search endpoint
        `/v1/product-history/page-by-id/${pageParam}/${supplierProductId}`, // list endpoint
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

  const handleDelete = (item) => {
    dispatch(setIsRestore(true));
    setId(item.product_history_aid);
    setData(item);
    setDel(true);
  };

  const handleArchive = (item) => {
    dispatch(setIsConfirm(true));
    setId(item.product_history_aid);
    setData(item);
    setDel(null);
  };

  const handleRestore = (item) => {
    dispatch(setIsRestore(true));
    setId(item.product_history_aid);
    setData(item);
    setDel(null);
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

      <p className="mt-2 font-semibold">
        Product Name :{" "}
        <span className="ml-2 capitalize font-light">{productName}</span>
      </p>
      <div className="text-center overflow-x-auto z-0">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th className="min-w-[10rem] w-[5rem] text-right pr-8">
                Supplier Price
              </th>
              <th className="min-w-[10rem] w-[5rem] text-right pr-8">
                SCC Price
              </th>
              <th className="min-w-[15rem] ">Date</th>
              <th className="min-w-[15rem] ">Status</th>
              <th className="max-w-[5rem] ">Actions</th>
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
                    <td className=" pr-8 text-right">
                      {pesoSign}{" "}
                      {numberWithCommas(
                        Number(item.product_history_price).toFixed(2)
                      )}
                    </td>
                    <td className=" pr-8 text-right">
                      {pesoSign}{" "}
                      {numberWithCommas(
                        Number(item.product_history_scc_price).toFixed(2)
                      )}
                    </td>
                    <td>{formatDate(item.product_history_date)}</td>
                    <td>
                      {item.product_history_is_active === 1 ? (
                        <StatusActive />
                      ) : (
                        <StatusInactive />
                      )}
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        {item.product_history_is_active === 1 && (
                          <>
                            <button
                              type="button"
                              className="btn-action-table tooltip-action-table"
                              data-tooltip="Archive"
                              onClick={() => handleArchive(item)}
                            >
                              <FaArchive />
                            </button>
                          </>
                        )}
                        {item.product_history_is_active === 0 && (
                          <>
                            <button
                              type="button"
                              className="btn-action-table tooltip-action-table"
                              data-tooltip="Restore"
                              onClick={() => handleRestore(item)}
                            >
                              <FaHistory />
                            </button>
                            <button
                              type="button"
                              className="btn-action-table tooltip-action-table"
                              data-tooltip="Delete"
                              onClick={() => handleDelete(item)}
                            >
                              <FaTrash />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
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
        <ModalConfirm
          id={id}
          isDel={isDel}
          mysqlApiArchive={`/v1/product-history/active/${id}`}
          msg={"Are you sure you want to archive "}
          item={`${formatDate(dataItem.product_history_date)}`}
          dataItem={dataItem}
          arrKey="product-history"
        />
      )}

      {store.isRestore && (
        <ModalDeleteRestore
          id={id}
          isDel={isDel}
          mysqlApiDelete={`/v1/product-history/${id}`}
          mysqlApiRestore={`/v1/product-history/active/${id}`}
          msg={"Are you sure you want to delete "}
          item={`${formatDate(dataItem.product_history_date)}`}
          dataItem={dataItem}
          arrKey="product-history"
        />
      )}
    </>
  );
};

export default SupplierProductHistoryList;
