import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { FaEraser } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import { useInView } from "react-intersection-observer";
import {
  setIsAdd,
  setIsConfirm,
  setIsRestore,
} from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import {
  formatDate,
  numberWithCommas,
} from "../../../helpers/functions-general";
import { queryDataInfinite } from "../../../helpers/queryDataInfinite";
import Loadmore from "../../../partials/Loadmore";
import NoData from "../../../partials/NoData";
import SearchBar from "../../../partials/SearchBar";
import ServerError from "../../../partials/ServerError";
import ModalDeleteRestore from "../../../partials/modals/ModalDeleteRestore";
import TableSpinner from "../../../partials/spinners/TableSpinner";
import StatusActive from "../../../partials/status/StatusActive";
import StatusPending from "../../../partials/status/StatusPending";

const SalesList = ({ setItemEdit }) => {
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
    queryKey: ["sales", onSearch, store.isSearch],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/v1/sales/search/${search.current.value}`, // search endpoint
        `/v1/sales/page/${pageParam}`, // list endpoint
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
    dispatch(setIsConfirm(true));
    setItemEdit(item);
  };
  const handleView = (item) => {
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };

  const handleRestore = (item) => {
    dispatch(setIsRestore(true));
    setId(item.sales_aid);
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

      <div className="text-center overflow-x-auto z-0">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th className="min-w-[10rem]">Name</th>
              <th className="min-w-[8rem]">Sale Number</th>
              <th className="min-w-[8rem]">Product Name</th>
              <th className="min-w-[5rem] text-right pr-4">Quantity</th>
              <th className="min-w-[6rem] text-right pr-4">Total Amount</th>
              <th className="min-w-[10rem] text-right pr-4">Recieve Amount</th>
              <th className="min-w-[12rem]">Recieve Payment Date</th>
              <th>Status</th>

              {store.credentials.data.role_is_member === 0 && (
                <th className="max-w-[5rem] text-right">Actions</th>
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
                    <td>{`${item.members_last_name}, ${item.members_first_name}`}</td>
                    <td className="uppercase">{item.sales_number}</td>
                    <td>{item.suppliers_products_name}</td>

                    <td className="text-right pr-4">
                      {item.orders_product_quantity}
                    </td>
                    <td className="text-right pr-4 font-bold text-primary ">
                      {item.sales_is_paid === 1 ? (
                        <span
                          className="cursor-pointer underline tooltip-action-table"
                          onClick={() => handleView(item)}
                          data-tooltip="Receipt"
                        >
                          {numberWithCommas(
                            Number(item.orders_product_amount).toFixed(2)
                          )}
                        </span>
                      ) : (
                        numberWithCommas(
                          Number(item.orders_product_amount).toFixed(2)
                        )
                      )}
                    </td>
                    <td className=" text-right pr-4">
                      {numberWithCommas(
                        Number(item.sales_receive_amount).toFixed(2)
                      )}
                    </td>
                    <td>
                      {item.sales_date === ""
                        ? "N/A"
                        : `${formatDate(item.sales_date)} ${
                            item.sales_date.split(" ")[1]
                          }`}
                    </td>
                    <td>
                      {item.sales_is_paid === 1 ? (
                        <StatusActive text="Paid" />
                      ) : (
                        <StatusPending />
                      )}
                    </td>

                    {store.credentials.data.role_is_member === 0 && (
                      <td className="text-right">
                        {store.credentials.data.role_is_casher === 0 ? (
                          item.sales_is_paid === 1 ? (
                            <button
                              type="button"
                              className="btn-action-table tooltip-action-table"
                              data-tooltip="void"
                              onClick={() => handleRestore(item)}
                            >
                              <FaEraser />
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="btn-action-table tooltip-action-table"
                              data-tooltip="payment"
                              onClick={() => handleEdit(item)}
                            >
                              <GiReceiveMoney />
                            </button>
                          )
                        ) : (
                          item.sales_is_paid === 0 && (
                            <button
                              type="button"
                              className="btn-action-table tooltip-action-table"
                              data-tooltip="payment"
                              onClick={() => handleEdit(item)}
                            >
                              <GiReceiveMoney />
                            </button>
                          )
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
          mysqlApiDelete={`/v1/sales/${id}`}
          mysqlApiRestore={`/v1/sales/active/${id}`}
          msg={
            isDel
              ? "Are you sure you want to delete "
              : "Are you sure you want to void "
          }
          item={`${dataItem.suppliers_products_name} of ${dataItem.members_last_name}, ${dataItem.members_first_name}`}
          orderId={`${dataItem.orders_aid}`}
          arrKey="sales"
        />
      )}
    </>
  );
};

export default SalesList;
