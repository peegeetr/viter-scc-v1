import { useInfiniteQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React from "react";
import { FaEdit, FaShoppingCart, FaTrash } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import { useInView } from "react-intersection-observer";
import * as Yup from "yup";
import {
  setError,
  setIsAdd,
  setIsConfirm,
  setIsRestore,
  setMessage,
} from "../../../store/StoreAction";
import { StoreContext } from "../../../store/StoreContext";
import useQueryData from "../../custom-hooks/useQueryData";
import { InputSelect } from "../../helpers/FormInputs";
import {
  formatDate,
  numberWithCommas,
  pesoSign,
} from "../../helpers/functions-general";
import { queryDataInfinite } from "../../helpers/queryDataInfinite";
import NoData from "../../partials/NoData";
import ServerError from "../../partials/ServerError";
import ModalDeleteRestore from "../../partials/modals/ModalDeleteRestore";
import TableSpinner from "../../partials/spinners/TableSpinner";
import StatusActive from "../../partials/status/StatusActive";
import StatusPending from "../../partials/status/StatusPending";
import { computeFinalAmount } from "../Inventory/orders/functions-orders";
import ModalAddSearchPOS from "./ModalAddSearchPOS";
import ModalPayNow from "./ModalPayNow";
import { getDataPayNow } from "./functions-pos";
const CasherPointOfSalesList = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [isFilter, setFilter] = React.useState(false);
  const [isSubmit, setSubmit] = React.useState(false);
  const [itemEdit, setItemEdit] = React.useState(null);
  const [isPayAll, setIsPayAll] = React.useState(false);
  const [memberId, setMember] = React.useState(0);
  const [memberName, setMemberName] = React.useState("");
  const [dataItem, setData] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [isDel, setDel] = React.useState(false);
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

  const handlePosOrder = async (e, props) => {
    setFilter(true);
    setSubmit(!isSubmit);
    setMember(e.target.value);
    setMemberName(e.target.options[e.target.selectedIndex].id);
  };

  const handleAdd = () => {
    if (memberId === 0) {
      dispatch(setError(true));
      dispatch(setMessage(`Please choose member first.`));
      return;
    }
    dispatch(setIsAdd(true));
    setItemEdit(null);
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
      <div className="flex items-center justify-between whitespace-nowrap overflow-auto gap-2 pt-8 pb-5">
        <div className="!w-[50rem] ">
          <Formik
            initialValues={initVal}
            validationSchema={yupSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {}}
          >
            {(props) => {
              return (
                <Form>
                  <div className="relative w-full xs:!w-[20rem] ">
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
                </Form>
              );
            }}
          </Formik>
        </div>
        <button type="button" className="btn-primary" onClick={handleAdd}>
          <FaShoppingCart />
          <span>Add</span>
        </button>
      </div>
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
        <ModalAddSearchPOS
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

export default CasherPointOfSalesList;
