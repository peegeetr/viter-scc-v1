import { useInfiniteQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React from "react";
import { FaCheck, FaEdit } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { MdFilterAlt } from "react-icons/md";
import { useInView } from "react-intersection-observer";
import * as Yup from "yup";
import {
  setError,
  setIsAdd,
  setIsConfirm,
  setIsRestore,
  setMessage,
} from "../../../../../store/StoreAction";
import { StoreContext } from "../../../../../store/StoreContext";
import StatusPending from "../../../../partials/status/StatusPending";
import useQueryData from "../../../../custom-hooks/useQueryData";
import { InputText } from "../../../../helpers/FormInputs";
import {
  formatDate,
  getTime,
  getUrlParam,
  numberWithCommas,
  pesoSign,
} from "../../../../helpers/functions-general";
import { queryDataInfinite } from "../../../../helpers/queryDataInfinite";
import Loadmore from "../../../../partials/Loadmore";
import NoData from "../../../../partials/NoData";
import ServerError from "../../../../partials/ServerError";
import ModalConfirm from "../../../../partials/modals/ModalConfirm";
import ModalDeleteRestore from "../../../../partials/modals/ModalDeleteRestore";
import ButtonSpinner from "../../../../partials/spinners/ButtonSpinner";
import TableSpinner from "../../../../partials/spinners/TableSpinner";
import StatusActive from "../../../../partials/status/StatusActive";
import StatusInactive from "../../../../partials/status/StatusInactive";
import { getRemaningQuantity } from "../../../Inventory/products/functions-product";
import StatusAmount from "../../../../partials/status/StatusAmount";
const MemberOrdersList = ({ setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [dataItem, setData] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [isDel, setDel] = React.useState(false);
  const [onSearch, setOnSearch] = React.useState(false);
  const [filter, setFilter] = React.useState(false);
  const [startDate, setStartDate] = React.useState(false);
  const [endDate, setEndDate] = React.useState(false);
  const [page, setPage] = React.useState(1);
  let counter = 1;
  let totalPaidAmount = 0;
  let totalPendingAmount = 0;
  let totalDraftAmount = 0;
  let totalAmount = 0;
  let totalDiscount = 0;
  let totalOty = 0;
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
    // queryKey: ["my-order", onSearch, store.isSearch],
    queryKey: ["my-order", onSearch],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/v1/my-order/filter/by-member-id/${startDate}/${endDate}/${empid}`, // filter endpoint // filter
        `/v1/my-order/page/by-member-id/${pageParam}/${empid}`, // list endpoint
        filter // search boolean
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
  const handlePending = (item) => {
    // console.log(getRemaningQuantity(item, stocksGroupProd, orderGroupProd));
    if (
      getRemaningQuantity(item, stocksGroupProd, orderGroupProd) === 0 ||
      getRemaningQuantity(item, stocksGroupProd, orderGroupProd) <
        item.orders_product_quantity
    ) {
      dispatch(setError(true));
      dispatch(setMessage("Insufficient Quantity"));
      return;
    }
    dispatch(setIsConfirm(true));
    setId(item.orders_aid);
    setData(item);
    setDel(false);
  };
  const initVal = {
    member_id: "",
    start_date: "",
    end_date: "",
  };

  const yupSchema = Yup.object({
    start_date: Yup.string().required("Required"),
    end_date: Yup.string().required("Required"),
  });
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
      <Formik
        initialValues={initVal}
        validationSchema={yupSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setFilter(true);
          setOnSearch(!onSearch);
          setStartDate(values.start_date);
          setEndDate(values.end_date);
          // // refetch data of query
          // refetch();
        }}
      >
        {(props) => {
          return (
            <Form>
              <div className="lg:w-[50rem] grid gap-5 grid-cols-1 md:grid-cols-[1fr_1fr_150px] pt-2 pb-5 items-center print:hidden ">
                <div className="relative">
                  <InputText
                    label="From"
                    name="start_date"
                    type="text"
                    disabled={isFetching}
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "date")}
                  />
                </div>

                <div className="relative">
                  <InputText
                    label="To"
                    name="end_date"
                    type="text"
                    disabled={isFetching}
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "date")}
                  />
                </div>

                <button
                  className="btn-modal-submit relative"
                  type="submit"
                  disabled={isFetching || !props.dirty}
                >
                  {/* {isFetching && <ButtonSpinner />} */}
                  {status === "loading" && <ButtonSpinner />}
                  <MdFilterAlt className="text-lg" />
                  <span>Filter</span>
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>

      {/* <SearchBar
          search={search}
          dispatch={dispatch}
          store={store}
          result={result?.pages}
          isFetching={isFetching}
          setOnSearch={setOnSearch}
          onSearch={onSearch}
        />  */}
      <div className="relative text-center overflow-x-auto z-0 ">
        {/* use only for updating important records */}
        {status !== "loading" && isFetching && <TableSpinner />}
        {/* use only for updating important records */}
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th className="w-[3rem]">Status</th>
              <th className="min-w-[6rem] w-[6rem]">Pay Date</th>
              <th className="min-w-[8rem] w-[8rem]">Product</th>
              <th className="min-w-[8rem] w-[8rem]">Official Receipt</th>
              <th className="min-w-[3rem] w-[3rem] text-center">Qty</th>
              <th className="min-w-[6rem] w-[6rem] text-right">SRP Price</th>
              <th className="min-w-[6rem] w-[6rem] text-right">Discounted</th>
              <th className="min-w-[8rem] w-[8rem] text-right pr-4">
                Total Amnt.
              </th>
              <th className="min-w-[15rem] ">Remarks</th>
              {memberid === null && <th className="!w-[5rem]"></th>}
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
                  item.sales_is_paid === 1
                    ? (totalPaidAmount += Number(item.orders_product_amount))
                    : "";
                  item.sales_is_paid === 0 && item.orders_is_draft === 0
                    ? (totalPendingAmount += Number(item.orders_product_amount))
                    : "";
                  item.orders_is_draft === 1
                    ? (totalDraftAmount += Number(item.orders_product_amount))
                    : "";
                  totalAmount += Number(item.orders_product_amount);
                  totalDiscount += Number(item.sales_discount);
                  totalOty += Number(item.orders_product_quantity);
                  return (
                    <tr key={key}>
                      <td> {counter++}.</td>
                      <td>
                        {item.orders_is_draft === 1 ? (
                          <StatusInactive text="draft" />
                        ) : item.sales_is_paid === 1 ? (
                          <StatusActive text="Paid" />
                        ) : (
                          <StatusPending />
                        )}
                      </td>
                      <td>
                        {item.sales_date === ""
                          ? "N/A"
                          : `${formatDate(item.sales_date)} ${getTime(
                              item.sales_date
                            )}`}
                      </td>
                      <td>
                        {item.suppliers_products_name}
                        {getRemaningQuantity(
                          item,
                          stocksGroupProd,
                          orderGroupProd
                        ) === 0 &&
                          item.orders_is_draft === 1 && (
                            <StatusPending text="sold out" />
                          )}
                      </td>
                      <td>{item.sales_or === "" ? "N/A" : item.sales_or}</td>
                      <td className=" text-center">
                        {item.orders_product_quantity}
                      </td>
                      <td className=" text-right">
                        {pesoSign}{" "}
                        {numberWithCommas(
                          Number(item.suppliers_products_scc_price).toFixed(2)
                        )}
                      </td>
                      <td className="text-right">
                        {pesoSign}
                        {numberWithCommas(
                          Number(item.sales_discount).toFixed(2)
                        )}
                      </td>
                      <td className=" text-right pr-4">
                        {pesoSign}
                        {numberWithCommas(
                          (
                            Number(item.orders_product_amount) -
                            Number(item.sales_discount)
                          ).toFixed(2)
                        )}
                      </td>
                      <td>{item.orders_remarks}</td>

                      {memberid === null && (
                        <td>
                          <div className="flex justify-end items-center gap-1">
                            {item.orders_is_draft === 1 && (
                              <>
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
                                  data-tooltip="Submit"
                                  onClick={() => handlePending(item)}
                                >
                                  <FaCheck />
                                </button>
                              </>
                            )}
                            {item.sales_is_paid === 0 && (
                              <button
                                type="button"
                                className="btn-action-table tooltip-action-table"
                                data-tooltip="Cancel"
                                onClick={() => handleDelete(item)}
                              >
                                <ImCross />
                              </button>
                            )}
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })}
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

      <div className="text-right grid gap-2 grid-cols-[1fr_9rem] my-2">
        <StatusAmount text="draft" amount={totalDraftAmount} />
        <StatusAmount text="pending" amount={totalPendingAmount} />
        <StatusAmount text="paid" amount={totalPaidAmount - totalDiscount} />
        <StatusAmount text="amount" amount={totalAmount - totalDiscount} />
        <StatusAmount text="discount" amount={totalDiscount} />
        <StatusAmount text="qty" amount={totalOty} />
      </div>

      {store.isConfirm && (
        <ModalConfirm
          id={id}
          isDel={isDel}
          mysqlApiArchive={`/v1/my-order/active/${id}`}
          msg={"Are you sure you want to submit this "}
          item={`${dataItem.suppliers_products_name} order`}
          arrKey="my-order"
        />
      )}
      {store.isRestore && (
        <ModalDeleteRestore
          id={id}
          isDel={isDel}
          mysqlApiDelete={`/v1/orders/${id}`}
          msg={"Are you sure you want to cancel your"}
          item={`${dataItem.suppliers_products_name} order`}
          arrKey="my-order"
        />
      )}
    </>
  );
};

export default MemberOrdersList;
