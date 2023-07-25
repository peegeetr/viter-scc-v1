import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React from "react";
import { FaEdit, FaSearch, FaTrash } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import { useInView } from "react-intersection-observer";
import * as Yup from "yup";
import {
  setError,
  setIsAdd,
  setIsConfirm,
  setIsModalSearch,
  setIsRestore,
  setMessage,
  setSuccess,
} from "../../../store/StoreAction";
import { StoreContext } from "../../../store/StoreContext";
import useQueryData from "../../custom-hooks/useQueryData";
import { InputSelect } from "../../helpers/FormInputs";
import {
  formatDate,
  getDateNow,
  numberWithCommas,
  pesoSign,
  removeComma,
} from "../../helpers/functions-general";
import { queryData } from "../../helpers/queryData";
import { queryDataInfinite } from "../../helpers/queryDataInfinite";
import NoData from "../../partials/NoData";
import ServerError from "../../partials/ServerError";
import ModalDeleteRestore from "../../partials/modals/ModalDeleteRestore";
import TableSpinner from "../../partials/spinners/TableSpinner";
import StatusActive from "../../partials/status/StatusActive";
import StatusPending from "../../partials/status/StatusPending";
import { computeFinalAmount } from "../Inventory/orders/functions-orders";
import ModalPayNow from "./ModalPayNow";
import { getDataPayNow } from "./functions-pos";
import { getRemaningQuantity } from "../Inventory/products/functions-product";
import ModalEditSearchPOS from "./ModalEditSearchPOS";
const CasherPointOfSalesListV2 = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [isFilter, setFilter] = React.useState(false);
  const [isSubmit, setSubmit] = React.useState(false);
  const [itemEdit, setItemEdit] = React.useState(null);
  const [isPayAll, setIsPayAll] = React.useState(false);
  const [memberId, setMember] = React.useState(0);
  const [memberName, setMemberName] = React.useState("");
  const [items, setItems] = React.useState([]);
  const [totalPrice, setTotalPrice] = React.useState("");
  const [search, setSearch] = React.useState("0");
  const [dataItem, setData] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [isDel, setDel] = React.useState(false);
  let counter = 1;
  let totalAmount = 0;
  const { ref, inView } = useInView();
  const onSearch = React.useRef("0");
  // use if with loadmore button and search bar
  const {
    data: result,
    error,
    isFetching,
    fetchNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["pos-order", isSubmit],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/v1/pos/orders/filter/${memberId}`, // filter endpoint
        `/v1/pos/orders/${0}`, // list endpoint
        isFilter // search boolean
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
  // use if not loadmore button undertime
  const { data: memberApproved, isLoading: memberApprovedLoading } =
    useQueryData(
      `/v1/members/approved`, // endpoint
      "get", // method
      "memberApproved" // key
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

  // use if not loadmore button undertime
  const { data: ProductList } = useQueryData(
    `/v1/product/search/product`, // filter endpoint
    "post", // method
    "pos-order", // key
    { search },
    search
  );

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) => queryData(`/v1/pos/create/orders`, "post", values),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["pos-order"] });
      // show success box
      if (data.success) {
        dispatch(setSuccess(true));
        dispatch(setMessage(`Successfuly added.`));
      }
      // show error box
      if (!data.success) {
        dispatch(setError(true));
        dispatch(setMessage(data.error));
      }
    },
  });

  const handlePosOrder = async (e, props) => {
    setFilter(true);
    setSubmit(!isSubmit);
    setMember(e.target.value);
    setMemberName(e.target.options[e.target.selectedIndex].id);
  };

  const handleChange = (e) => {
    if (onSearch.current.value === "") {
      setSearch("0");
      dispatch(setIsModalSearch(false));
      return;
    }

    setSearch(onSearch.current.value);
    setItems(ProductList?.data[0]);
    dispatch(setIsModalSearch(true));
  };

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
  const initVal = {
    posMember: "",
  };

  const yupSchema = Yup.object({
    posMember: Yup.string().required("Required"),
  });
  return (
    <>
      <div className="whitespace-nowrap overflow-auto gap-2 pt-8 pb-5">
        <Formik
          initialValues={initVal}
          validationSchema={yupSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            // console.log(items);

            if (
              ProductList?.count === 0 &&
              items?.suppliers_products_aid === undefined
            ) {
              dispatch(setError(true));
              dispatch(setMessage("Please check if you have product."));
              return;
            }
            const orders_member_id = memberId;

            const newQty = getRemaningQuantity(
              items,
              stocksGroupProd,
              orderGroupProd
            );

            if (newQty <= 0) {
              dispatch(setError(true));
              dispatch(setMessage("Insufficient Quantity"));
              return;
            }
            mutation.mutate({
              ...values,
              items,
              orders_member_id,
            });
          }}
        >
          {(props) => {
            return (
              <Form>
                <div className="grid md:grid-cols-2 items-center ">
                  <div className="relative md:w-[20rem]">
                    <InputSelect
                      name="posMember"
                      label="Order to"
                      onChange={handlePosOrder}
                      disabled={status === "loading" || memberApprovedLoading}
                    >
                      <option value="" hidden>
                        {memberApprovedLoading ? "Loading..." : "--"}
                      </option>
                      {memberApproved?.data.map((cItem, key) => {
                        return (
                          <option
                            key={key}
                            value={cItem.members_aid}
                            id={`${cItem.members_last_name}, ${cItem.members_first_name} `}
                          >
                            {`${cItem.members_last_name}, ${cItem.members_first_name}`}
                          </option>
                        );
                      })}
                    </InputSelect>
                  </div>
                  <div className="relative md:mt-0 mt-5">
                    <div className="pb-2 flex">
                      <input
                        type="search"
                        name="search"
                        ref={onSearch}
                        onChange={handleChange}
                        autoComplete="off"
                        className="rounded-br-none rounded-tr-none"
                      />
                      <label className="capitalize">
                        search to add product
                      </label>
                      <button
                        type="submit"
                        className="btn-action-table rounded-tl-none rounded-bl-none border-l-0 bg-primary text-white border-primary"
                      >
                        <FaSearch />
                      </button>
                    </div>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>{" "}
      <div className="w-full pt-3 pb-20">
        <div className="relative text-center overflow-x-auto z-0">
          {status !== "loading" && isFetching && <TableSpinner />}
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Status</th>
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
                    totalAmount +=
                      Number(item.orders_product_amount) -
                      Number(item.sales_discount);
                    return (
                      <tr key={key}>
                        <td> {counter++}.</td>
                        <td>
                          {item.orders_is_paid === 1 ? (
                            <StatusActive text="Paid" />
                          ) : (
                            <StatusPending />
                          )}
                        </td>
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
                          {pesoSign}
                          {numberWithCommas(
                            Number(item.sales_discount).toFixed(2)
                          )}
                        </td>
                        <td className="text-right pr-4">
                          {pesoSign}{" "}
                          {numberWithCommas(computeFinalAmount(item))}
                        </td>
                        <td>{item.orders_remarks}</td>

                        {store.credentials.data.role_is_member === 0 && (
                          <td>
                            {item.orders_is_paid === 0 && (
                              <div className="flex items-center gap-1">
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
                              </div>
                            )}
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-right text-lg pr-8 mt-3 mb-5 font-bold">
          Total : {pesoSign} {numberWithCommas(totalAmount.toFixed(2))}
        </p>
        <div className="flex justify-end">
          <button
            type="button"
            className="btn-primary mr-8"
            onClick={handlePayNow}
          >
            <GiReceiveMoney />
            <span>Pay now</span>
          </button>
        </div>
      </div>
      {store.isAdd && (
        <ModalEditSearchPOS
          item={itemEdit}
          arrKey="pos-order"
          memberId={memberId}
          memberName={memberName}
        />
      )}
      {store.isConfirm && (
        <ModalPayNow
          item={itemEdit}
          result={result?.pages[0].data}
          isPayAll={isPayAll}
        />
      )}
      {store.isRestore && (
        <ModalDeleteRestore
          id={id}
          isDel={isDel}
          mysqlApiDelete={`/v1/orders/${id}`}
          msg={"Are you sure you want to delete this "}
          item={`${dataItem.orders_number}`}
          arrKey="pos-order"
        />
      )}
    </>
  );
};

export default CasherPointOfSalesListV2;
