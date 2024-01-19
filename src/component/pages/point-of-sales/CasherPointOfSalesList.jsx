import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React from "react";
import { AiFillPrinter } from "react-icons/ai";
import { FaEdit, FaSearch, FaTrash } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import * as Yup from "yup";
import {
  setError,
  setIsAdd,
  setIsConfirm,
  setMessage,
} from "../../../store/StoreAction";
import { StoreContext } from "../../../store/StoreContext";
import useQueryData from "../../custom-hooks/useQueryData";
import {
  AssociateMemberId,
  GetFocus,
  formatDate,
  notMemberId,
  numberWithCommas,
  pesoSign,
  wholeSaleDiscountId,
} from "../../helpers/functions-general";
import { queryData } from "../../helpers/queryData";
import { queryDataInfinite } from "../../helpers/queryDataInfinite";
import NoData from "../../partials/NoData";
import ServerError from "../../partials/ServerError";
import ButtonSpinner from "../../partials/spinners/ButtonSpinner";
import TableSpinner from "../../partials/spinners/TableSpinner";
import { computeFinalAmount } from "../Inventory/orders/functions-orders";
import CasherPointOfSalesListPrint from "./CasherPointOfSalesListPrint";
import SearchMember from "./SearchMember";
import { getDataPayNow, getTotalAmountPending } from "./functions-pos";
import ModalEditSearchPOS from "./modal/ModalEditSearchPOS";
import ModalPayNow from "./modal/ModalPayNow";
import SearchAddProduct from "./search/SearchAddProduct";

const CasherPointOfSalesList = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);
  const [isPayAll, setIsPayAll] = React.useState(false);
  const [search, setSearch] = React.useState("scc-000-2023");

  // search Product
  const [loadingProduct, setLoadingProduct] = React.useState(false);
  const [isSearchProduct, setIsSearchProduct] = React.useState(false);
  const [searchProduct, setSearchProduct] = React.useState("");
  const [dataClient, setDataProduct] = React.useState([]);
  const [productBarcode, setProductBarcode] = React.useState("");

  const onSearch = React.useRef("0");
  let delId = 0;
  let counter = 1;
  let totalAmount = 0;
  GetFocus("searchNewProduct");

  // use if not loadmore button undertime
  const { data: memberSearch, isLoading } = useQueryData(
    `/v1/pos/search-member-approved`, // endpoint
    "post", // method
    "search-member-approved",
    { search },
    search
  );

  let memberName =
    memberSearch?.count > 0
      ? `${memberSearch?.data[0].members_last_name} ${memberSearch?.data[0].members_first_name}`
      : "Not Found";
  let memberId =
    memberName === "Not Found" ? 0 : memberSearch?.data[0].members_aid;

  // use if with loadmore button and search bar
  const {
    data: result,
    error,
    isFetching,
    fetchNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["pos-order", memberId],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/v1/pos/orders/filter/${memberId}`, // filter endpoint
        `/v1/pos/orders/filter/${memberId}`, // list endpoint
        search // search boolean
      ),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total) {
        return lastPage.page + lastPage.count;
      }
      return;
    },
    // refetchOnWindowFocus: false,
    cacheTime: 200,
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        delId !== 0
          ? `/v1/pos/delete/orders/${delId}`
          : `/v1/pos/create/orders`,
        delId !== 0 ? "delete" : "post",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["pos-order"] });
      // show success box
      setLoadingProduct(false);
      setIsSearchProduct(false);
      setSearchProduct("");
      setDataProduct([]);
      setProductBarcode("");

      if (data.success) {
        delId = 0;
      }
      // show error box
      if (!data.success) {
        dispatch(setError(true));
        dispatch(setMessage(data.error));
      }
    },
  });

  const handlePayNow = () => {
    if (memberId === 0) {
      dispatch(setError(true));
      dispatch(setMessage(`Please choose member.`));
      return;
    }
    if (result?.pages[0].count === 0) {
      dispatch(setError(true));
      dispatch(setMessage(`Please add order before paying`));
      return;
    }
    dispatch(setIsConfirm(true));
    setItemEdit(getDataPayNow(result, memberId));
    setIsPayAll(true);
  };

  const handlePay = (item) => {
    dispatch(setIsConfirm(true));
    setItemEdit(item);
    setIsPayAll(false);
  };

  const handleEdit = (item) => {
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };

  const handleDelete = (item) => {
    delId = item.orders_aid;
    // // // mutate data
    mutation.mutate({});
  };

  const initVal = {
    posMember: "",
    search: "",
  };

  const yupSchema = Yup.object({
    search: Yup.string().required("Required"),
  });

  return (
    <>
      <CasherPointOfSalesListPrint memberName={memberName} result={result} />

      <div className="print:hidden">
        <div className="whitespace-nowrap gap-2 pt-8 pb-5 ">
          <div className="grid md:grid-cols-2 items-center ">
            <div className="relative md:w-[20rem]">
              <SearchMember setSearch={setSearch} onSearch={onSearch} />
            </div>
            <Formik
              initialValues={initVal}
              validationSchema={yupSchema}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                const orders_member_id = memberId;

                const newValSearch =
                  productBarcode === "" ? values.search : productBarcode;

                mutation.mutate({
                  ...values,
                  orders_member_id,
                  notMemberId: notMemberId,
                  associateMemberId: AssociateMemberId,
                  search: newValSearch,
                });
                resetForm();
              }}
            >
              {(props) => {
                props.values.posMember = memberId;
                return (
                  <Form>
                    <div className="relative md:mt-0 mt-5 ">
                      <div className="flex justify-end">
                        <SearchAddProduct
                          label="Search to add product"
                          name="search"
                          disabled={mutation.isLoading}
                          endpoint={`/v1/pos/search-product`}
                          setSearch={setSearchProduct}
                          setIsSearch={setIsSearchProduct}
                          setLoading={setLoadingProduct}
                          setData={setDataProduct}
                          search={searchProduct}
                          isSearch={isSearchProduct}
                          loading={loadingProduct}
                          data={dataClient}
                          setProductBarcode={setProductBarcode}
                          id="searchNewProduct"
                        />

                        <button
                          type="submit"
                          disabled={mutation.isLoading}
                          className="btn-action-table rounded-tl-none rounded-bl-none border-l-0 bg-primary text-white border-primary"
                        >
                          {mutation.isLoading || loadingProduct ? (
                            <ButtonSpinner color="stroke-primary" />
                          ) : (
                            <FaSearch />
                          )}
                        </button>
                      </div>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>{" "}
        <p className="text-lg mb-0 pr-8 font-bold">
          Sold to :{" "}
          {status === "loading" || isLoading ? "Loading..." : memberName}
        </p>
        <p className="text-lg mb-0 pr-8 font-bold">
          Total : {pesoSign}{" "}
          {status === "loading" || isLoading
            ? "Loading..."
            : numberWithCommas(
                getTotalAmountPending(result?.pages[0]).toFixed(2)
              )}
        </p>
        <div className="w-full pt-3 pb-20">
          <div className="relative text-center overflow-x-auto z-0">
            {(status === "loading" || isLoading || isFetching) && (
              <TableSpinner />
            )}
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th className="min-w-[6rem]">Order #</th>
                  <th className="min-w-[10rem]">Name</th>
                  <th className="min-w-[6rem]">Date</th>
                  <th className="min-w-[8rem]">Product</th>
                  <th className="min-w-[3rem] text-center">Qty</th>
                  <th className="min-w-[6rem] text-right">SRP Price</th>
                  <th className="min-w-[6rem] text-right">Discounted</th>
                  <th className="min-w-[6rem] text-right pr-4">Total Price</th>
                  <th className="min-w-[15rem] ">Remarks</th>

                  <th className="max-w-[5rem]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {(status === "loading" ||
                  isLoading ||
                  result?.pages[0].data.length === 0) && (
                  <tr className="text-center relative">
                    <td colSpan="100%" className="p-10">
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
                      totalAmount +=
                        Number(item.orders_product_amount) -
                        Number(item.sales_discount);
                      return (
                        <tr key={key}>
                          <td> {counter++}.</td>
                          <td className="uppercase">{item.orders_number}</td>
                          <td>{`${item.members_last_name}, ${item.members_first_name}`}</td>
                          <td>{`${formatDate(item.orders_date)}`}</td>
                          <td>{item.suppliers_products_name}</td>
                          <td className="text-center">
                            {item.orders_product_quantity}
                          </td>
                          <td className="text-right">
                            {pesoSign}
                            {numberWithCommas(
                              Number(item.orders_product_srp).toFixed(2)
                            )}
                          </td>
                          <td className="text-right">
                            {item.orders_is_discounted ===
                            wholeSaleDiscountId ? (
                              "Wholesale"
                            ) : (
                              <>
                                {pesoSign}
                                {numberWithCommas(
                                  Number(item.sales_discount).toFixed(2)
                                )}
                              </>
                            )}
                          </td>
                          <td className="text-right pr-4">
                            {pesoSign}{" "}
                            {numberWithCommas(computeFinalAmount(item))}
                          </td>
                          <td>{item.orders_remarks}</td>

                          <td>
                            <div className="flex items-center gap-1">
                              {/* if the qty morethan qty pending or normal actions */}
                              {/* {getRemaningQuantity(
                                item,remainingQuantity
                              ) >= Number(item.orders_product_quantity) && (
                                <> */}
                              <button
                                type="button"
                                className="btn-action-table tooltip-action-table"
                                data-tooltip="Accept"
                                onClick={() => handlePay(item)}
                              >
                                <GiReceiveMoney />
                              </button>
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
                              {/* </>
                              )} */}
                              {/* if have remaning qty is lessthan of the qty pending or insufficient qty */}
                              {/* {getRemaningQuantity(
                                item,remainingQuantity
                              ) < Number(item.orders_product_quantity) &&
                                getRemaningQuantity(
                                  item,remainingQuantity
                                ) !== 0 && (
                                  <>
                                    <button
                                      type="button"
                                      className="btn-action-table tooltip-action-table"
                                      data-tooltip="Edit"
                                      onClick={() => handleEdit(item)}
                                    >
                                      <FaEdit />
                                    </button>{" "}
                                    <button
                                      type="button"
                                      className="btn-action-table tooltip-action-table"
                                      data-tooltip="Delete"
                                      onClick={() => handleDelete(item)}
                                    >
                                      <FaTrash />
                                    </button>
                                  </>
                                )} */}

                              {/* if don't have remaning qty or sold out */}
                              {/* {getRemaningQuantity(
                                item,remainingQuantity
                              ) <= 0 && (
                                <button
                                  type="button"
                                  className="btn-action-table tooltip-action-table"
                                  data-tooltip="Delete"
                                  onClick={() => handleDelete(item)}
                                >
                                  <FaTrash />
                                </button>
                              )} */}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
          {result?.pages[0].data.length > 0 && (
            <div className="flex justify-end mt-5 ">
              <button
                type="button"
                className="btn-primary mr-4"
                onClick={handlePayNow}
              >
                <GiReceiveMoney />
                <span>Pay now</span>
              </button>
              <button
                type="button"
                className="btn-primary print:hidden"
                onClick={() => window.print()}
              >
                <AiFillPrinter />
                <span>Print</span>
              </button>
            </div>
          )}
        </div>
      </div>
      {store.isAdd && (
        <ModalEditSearchPOS
          item={itemEdit}
          arrKey="pos-order"
          memberName={memberName}
        />
      )}
      {store.isConfirm && (
        <ModalPayNow
          item={itemEdit}
          result={result?.pages[0].data}
          isPayAll={isPayAll}
          setSearch={setSearch}
          onSearch={onSearch}
        />
      )}
    </>
  );
};

export default CasherPointOfSalesList;
