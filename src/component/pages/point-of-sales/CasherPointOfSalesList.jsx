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
  setIsGetFocus,
  setMessage,
} from "../../../store/StoreAction";
import { StoreContext } from "../../../store/StoreContext";
import useQueryData from "../../custom-hooks/useQueryData";
import { InputSelect, InputText } from "../../helpers/FormInputs";
import {
  AssociateMemberId,
  GetFocus,
  formatDate,
  numberWithCommas,
  pesoSign,
} from "../../helpers/functions-general";
import { queryData } from "../../helpers/queryData";
import { queryDataInfinite } from "../../helpers/queryDataInfinite";
import NoData from "../../partials/NoData";
import ServerError from "../../partials/ServerError";
import TableSpinner from "../../partials/spinners/TableSpinner";
import { computeFinalAmount } from "../Inventory/orders/functions-orders";
import { getRemaningQuantity } from "../Inventory/products/functions-product";
import { getDataPayNow, getTotalAmountPending } from "./functions-pos";
import ModalEditSearchPOS from "./modal/ModalEditSearchPOS";
import ModalPayNow from "./modal/ModalPayNow";

const CasherPointOfSalesList = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [isFilter, setFilter] = React.useState(false);
  const [isSubmit, setSubmit] = React.useState(false);
  const [itemEdit, setItemEdit] = React.useState(null);
  const [isPayAll, setIsPayAll] = React.useState(false);
  const [memberId, setMember] = React.useState(AssociateMemberId);
  const [memberName, setMemberName] = React.useState("");
  const [id, setId] = React.useState(0);

  GetFocus("searchProduct");

  let counter = 1;
  let totalAmount = 0;
  const { ref, inView } = useInView();
  // use if with loadmore button and search bar
  const {
    data: result,
    error,
    isFetching,
    fetchNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["pos-order", isSubmit, id],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/v1/pos/orders/filter/${memberId}`, // filter endpoint
        `/v1/pos/orders/filter/${memberId}`, // list endpoint
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

  // use if not loadmore button undertime
  const { data: memberApproved, isLoading: memberApprovedLoading } =
    useQueryData(
      `/v1/pos/read-member-approved`, // endpoint
      "get", // method
      "memberApproved"
    );

  // use if not loadmore button undertime
  const { data: stocksGroupProd } = useQueryData(
    `/v1/stocks/group-by-prod`, // endpoint
    "get", // method
    "stocksGroupProd", // key
    {},
    result
  );
  // use if not loadmore button undertime
  const { data: orderGroupProd } = useQueryData(
    `/v1/orders/group-by-prod`, // endpoint
    "get", // method
    "orderGroupProd", // key
    {},
    result
  );

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) => queryData(`/v1/pos/create/orders`, "post", values),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["pos-order"] });
      // show success box
      if (data.success) {
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

  const handleDelete = async (item) => {
    let orderId = item.orders_aid;
    await queryData(`/v1/pos/delete/orders`, "delete", {
      orderId,
    });
    setId(item.orders_aid);
  };

  const initVal = {
    posMember: "",
    search: "",
  };

  const yupSchema = Yup.object({
    posMember: Yup.string().required("Required"),
    search: Yup.string().required("Required"),
  });

  return (
    <>
      <div className="whitespace-nowrap overflow-auto gap-2 pt-8 pb-5">
        <Formik
          initialValues={initVal}
          validationSchema={yupSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            const ProductList = await queryData(
              `/v1/pos/search-to-add-product`,
              "post",
              {
                search: values.search,
              }
            );

            if (
              ProductList?.count === 0 ||
              ProductList?.data[0] === undefined
            ) {
              dispatch(setError(true));
              dispatch(setMessage("Please check if product is exist."));
              resetForm();
              return;
            }
            const orders_member_id = memberId;

            const newQty = getRemaningQuantity(
              ProductList?.data[0],
              stocksGroupProd,
              orderGroupProd
            );

            if (newQty <= 0) {
              dispatch(setError(true));
              dispatch(setMessage("Insufficient Quantity"));
              resetForm();
              return;
            }

            mutation.mutate({
              ...values,
              items: ProductList?.data[0],
              orders_member_id,
            });
            resetForm();
          }}
        >
          {(props) => {
            props.values.posMember = memberId;
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
                    <div className="flex justify-end">
                      <InputText
                        label="Search to add product"
                        type="search"
                        name="search"
                        search="search"
                        id="searchProduct"
                        autoComplete="off"
                      />
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
      <p className="text-lg mb-0 pr-8 font-bold">
        Total : {pesoSign}{" "}
        {numberWithCommas(getTotalAmountPending(result?.pages[0]).toFixed(2))}
      </p>
      <div className="w-full pt-3 pb-20">
        <div className="relative text-center overflow-x-auto z-0">
          {status !== "loading" && isFetching && <TableSpinner />}
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
    </>
  );
};

export default CasherPointOfSalesList;
