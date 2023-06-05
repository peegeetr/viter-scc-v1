import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { FaEdit, FaFileInvoiceDollar, FaTrash } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import { setIsAdd, setIsRestore } from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import { queryDataInfinite } from "../../../helpers/queryDataInfinite";
import Loadmore from "../../../partials/Loadmore";
import NoData from "../../../partials/NoData";
import SearchBar from "../../../partials/SearchBar";
import ServerError from "../../../partials/ServerError";
import ModalDeleteRestore from "../../../partials/modals/ModalDeleteRestore";
import TableSpinner from "../../../partials/spinners/TableSpinner";
import {
  formatDate,
  getTime,
  numberWithCommas,
  pesoSign,
} from "../../../helpers/functions-general";
import StatusActive from "../../../partials/status/StatusActive";
import StatusPending from "../../../partials/status/StatusPending";
import StatusQuantity from "../../../partials/status/StatusQuantity";

const OrdersList = ({ setItemEdit }) => {
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
    queryKey: ["orders", onSearch, store.isSearch],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/v1/orders/search/${search.current.value}`, // search endpoint
        `/v1/orders/page/${pageParam}`, // list endpoint
        store.isSearch // search boolean
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

  const handleEdit = (item) => {
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };

  const handleDelete = (item) => {
    dispatch(setIsRestore(true));
    setId(item.orders_aid);
    setData(item);
    setDel(true);
  };

  // console.log(result);
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
              <th className="min-w-[10rem]">Order Number</th>
              <th className="min-w-[10rem]">Name</th>
              <th className="min-w-[8rem]">Date</th>
              <th className="min-w-[8rem]">Product</th>
              <th className="min-w-[8rem] text-center">Quantity</th>
              <th className="min-w-[8rem] text-right">SRP Price</th>
              <th className="min-w-[8rem] text-right pr-4">Total Price</th>
              <th>Status</th>

              {store.credentials.data.role_is_member === 0 && (
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
            {/* use only for updating important records */}
            {status !== "loading" && isFetching && <TableSpinner />}
            {/* use only for updating important records */}
            {result?.pages.map((page, key) => (
              <React.Fragment key={key}>
                {page.data.map((item, key) => (
                  <tr key={key}>
                    <td> {counter++}.</td>
                    <td className="uppercase">{item.orders_number}</td>
                    <td>{`${item.members_last_name}, ${item.members_first_name}`}</td>
                    <td>{`${formatDate(item.orders_date)} ${getTime(
                      item.orders_date
                    )}`}</td>
                    <td>{item.suppliers_products_name}</td>
                    <td className="text-center">
                      {item.orders_product_quantity}
                    </td>
                    <td className="text-right">
                      {pesoSign}
                      {numberWithCommas(
                        Number(item.suppliers_products_scc_price).toFixed(2)
                      )}
                    </td>
                    <td className="text-right pr-4">
                      {pesoSign}{" "}
                      {numberWithCommas(
                        Number(item.orders_product_amount).toFixed(2)
                      )}
                    </td>
                    <td>
                      {item.orders_is_paid === 1 ? (
                        <StatusActive text="Paid" />
                      ) : (
                        <StatusPending />
                      )}
                    </td>

                    {store.credentials.data.role_is_member === 0 && (
                      <td>
                        {item.orders_is_paid === 0 && (
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
                        )}
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

      {store.isRestore && (
        <ModalDeleteRestore
          id={id}
          isDel={isDel}
          mysqlApiDelete={`/v1/orders/${id}`}
          msg={"Are you sure you want to delete this file"}
          item={`${dataItem.orders_number}`}
          arrKey="orders"
        />
      )}
    </>
  );
};

export default OrdersList;
