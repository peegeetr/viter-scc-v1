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
  pesoSign,
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
import { computeFinalAmount } from "../orders/functions-orders";
import SalesTotal from "./SalesTotal";
import useQueryData from "../../../custom-hooks/useQueryData";
import { getRemaningQuantity } from "../products/functions-product";

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
        `/v1/sales/search`, // search endpoint
        `/v1/sales/page/${pageParam}`, // list endpoint
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

  // use if not loadmore button undertime
  const { data: stocksGroupProd } = useQueryData(
    `/v1/stocks/group-by-prod`, // endpoint
    "get", // method
    "stocksGroupProd" // key
  );
  // use if not loadmore button undertime
  const { data: orderGroupProd } = useQueryData(
    `/v1/orders/group-by-prod`, // endpoint
    "get", // method
    "orderGroupProd" // key
  );
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
      <SalesTotal result={result} />
      <div className="text-center overflow-x-auto z-0">
        {/* use only for updating important records */}
        {status !== "loading" && isFetching && <TableSpinner />}
        {/* use only for updating important records */}
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th className="min-w-[9rem] w-[5rem]">Status</th>
              <th className="min-w-[8rem]">Name</th>
              <th className="min-w-[5rem]">Sales #</th>
              <th className="min-w-[7rem]">Product</th>
              <th className="min-w-[3rem] text-center">Qty</th>
              <th className="min-w-[6rem] text-right pr-4">Discounted</th>
              <th className="min-w-[7rem] text-right pr-4">Total Amnt.</th>
              <th className="min-w-[8rem] pr-4">Remarks</th>
              <th className="min-w-[7rem] text-right pr-4">Received</th>
              <th className="min-w-[6rem]">Pay Date</th>
              <th className="max-w-[5rem] text-right">Actions</th>
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
                      <td>
                        {item.sales_is_paid === 1 ? (
                          <StatusActive text="paid" />
                        ) : getRemaningQuantity(
                            item,
                            stocksGroupProd,
                            orderGroupProd
                          ) <= 0 ? (
                          <StatusPending text="sold out" />
                        ) : getRemaningQuantity(
                            item,
                            stocksGroupProd,
                            orderGroupProd
                          ) < Number(item.orders_product_quantity) ? (
                          <StatusPending text="insufficient qty" />
                        ) : (
                          <StatusPending />
                        )}
                      </td>
                      <td>{`${item.members_last_name}, ${item.members_first_name}`}</td>
                      <td className="uppercase">{item.sales_number}</td>
                      <td>{item.suppliers_products_name}</td>

                      <td className="text-center ">
                        {item.orders_product_quantity}
                      </td>
                      <td className="text-right ">
                        {pesoSign}
                        {numberWithCommas(
                          Number(item.sales_discount).toFixed(2)
                        )}
                      </td>
                      <td className="text-right font-bold text-primary ">
                        <span
                          className="cursor-pointer underline tooltip-action-table"
                          onClick={() => handleView(item)}
                          data-tooltip="Details"
                        >
                          {pesoSign}{" "}
                          {numberWithCommas(computeFinalAmount(item))}
                        </span>
                      </td>
                      <td>{item.orders_remarks}</td>
                      <td className="text-right pr-4">
                        {pesoSign}{" "}
                        {numberWithCommas(
                          Number(item.sales_receive_amount).toFixed(2)
                        )}
                      </td>
                      <td>
                        {item.sales_date === ""
                          ? "N/A"
                          : `${formatDate(item.sales_date)}`}
                      </td>

                      <td className="text-right">
                        {item.sales_is_paid === 1 && (
                          <button
                            type="button"
                            className="btn-action-table tooltip-action-table"
                            data-tooltip="Void"
                            onClick={() => handleRestore(item)}
                          >
                            <FaEraser />
                          </button>
                        )}

                        {item.sales_is_paid === 0 &&
                          Number(
                            getRemaningQuantity(
                              item,
                              stocksGroupProd,
                              orderGroupProd
                            )
                          ) > 0 &&
                          getRemaningQuantity(
                            item,
                            stocksGroupProd,
                            orderGroupProd
                          ) >= Number(item.orders_product_quantity) && (
                            <button
                              type="button"
                              className="btn-action-table tooltip-action-table"
                              data-tooltip="Accept"
                              onClick={() => handleEdit(item)}
                            >
                              <GiReceiveMoney />
                            </button>
                          )}
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
