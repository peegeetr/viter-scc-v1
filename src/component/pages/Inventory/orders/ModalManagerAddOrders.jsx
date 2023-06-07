import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import * as Yup from "yup";
import {
  setError,
  setIsAdd,
  setMessage,
  setSuccess,
} from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import useQueryData from "../../../custom-hooks/useQueryData";
import {
  InputSelect,
  InputText,
  InputTextArea,
} from "../../../helpers/FormInputs";
import {
  getDateTimeNow,
  numberWithCommas,
  pesoSign,
  removeComma,
} from "../../../helpers/functions-general";
import { queryData } from "../../../helpers/queryData";
import ButtonSpinner from "../../../partials/spinners/ButtonSpinner";
import { getRemaningQuantity } from "../products/functions-product";
import { modalComputeAmountWithDiscount } from "./functions-orders";

const ModalManagerAddOrders = ({ item, arrKey }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [categoryId, setCategoryId] = React.useState(
    item ? item.suppliers_products_category_id : "0"
  );
  const [productId, setProductId] = React.useState(
    item ? item.suppliers_products_aid : ""
  );
  const [priceId, setPriceId] = React.useState(
    item ? item.suppliers_products_scc_price : ""
  );
  const [isPaid, setIsPaid] = React.useState(item ? item.orders_is_paid : "");

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        item ? `/v1/orders/${item.orders_aid}` : `/v1/orders`,
        item ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [arrKey] });
      // show success box
      if (data.success) {
        dispatch(setIsAdd(false));
        dispatch(setSuccess(true));
        dispatch(setMessage(`Successfuly ${item ? "updated." : "added."}`));
      }
      // show error box
      if (!data.success) {
        dispatch(setError(true));
        dispatch(setMessage(data.error));
      }
    },
  });
  const handleClose = () => {
    dispatch(setIsAdd(false));
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
  // use if not loadmore button undertime
  const { data: memberApproved, isLoading: memberApprovedLoading } =
    useQueryData(
      `/v1/members/approved`, // endpoint
      "get", // method
      "memberApproved" // key
    );

  // use if not loadmore button undertime
  const { data: categoryData, isLoading: categoryLoading } = useQueryData(
    `/v1/category`, // endpoint
    "get", // method
    "categoryData" // key
  );

  // use if not loadmore button undertime
  const { data: SupProd, isLoading } = useQueryData(
    `/v1/suppliers-product/read-category-id/${categoryId}`, // filter endpoint
    "get", // method
    "SupProd", // key
    {},
    categoryId
  );
  // get employee id
  const handleSupplierProduct = async (e, props) => {
    let categoryId = e.target.value;
    setCategoryId(categoryId);
  };
  // get employee id
  const handleProduct = async (e, props) => {
    setProductId(e.target.value);
    setPriceId(e.target.options[e.target.selectedIndex].id);
  };
  // get employee id
  const handleIsPaid = async (e, props) => {
    setIsPaid(e.target.value);
  };

  const initVal = {
    orders_member_id: item ? item.orders_member_id : "",
    orders_product_id: item ? item.orders_product_id : "",
    orders_product_quantity: item ? item.orders_product_quantity : "",
    orders_remarks: item ? item.orders_remarks : "",
    suppliers_products_aid: "",
    orders_product_amount: item ? item.orders_product_amount : "",
    orders_date: item ? item.orders_date : getDateTimeNow(),
    category_id: item ? item.suppliers_products_category_id : "",
    // old quantity
    old_quantity: item ? item.orders_product_quantity : "",
    // sales
    sales_receive_amount: "",
    sales_or: "",
    orders_is_draft: 0,
    orders_is_paid: "",
    sales_member_change: "",
    sales_discount: "",
    sales_date: getDateTimeNow(),
  };

  const yupSchema = Yup.object({
    orders_member_id: Yup.string().required("Required"),
    orders_product_id: Yup.string().required("Required"),
    orders_remarks: Yup.string().required("Required"),
    orders_product_quantity: Yup.string().required("Required"),
    category_id: Yup.string().required("Required"),
    orders_date: Yup.string().required("Required"),
    sales_receive_amount: isPaid === "1" && Yup.string().required("Required"),
    sales_or: isPaid === "1" && Yup.string().required("Required"),
    sales_discount: isPaid === "1" && Yup.string().required("Required"),
  });

  return (
    <>
      <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-dark bg-opacity-50 z-50 ">
        <div className="p-1 w-[350px] rounded-b-2xl">
          <div className="flex justify-between items-center bg-primary p-3 rounded-t-2xl">
            <h3 className="text-white text-sm">
              {item ? "Update" : "Add"} Order
            </h3>
            <button
              type="button"
              className="text-gray-200 text-base"
              onClick={handleClose}
            >
              <FaTimesCircle />
            </button>
          </div>
          <div className="bg-white p-4 rounded-b-2xl h-[30rem] overflow-auto">
            <Formik
              initialValues={initVal}
              validationSchema={yupSchema}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                console.log(
                  values,
                  Number(values.orders_product_quantity),
                  Number(values.old_quantity)
                );
                const orders_product_quantity = removeComma(
                  `${values.orders_product_quantity}`
                );
                const sales_receive_amount = removeComma(
                  `${values.sales_receive_amount}`
                );
                const sales_discount = removeComma(`${values.sales_discount}`);
                if (
                  Number(values.orders_product_quantity) !==
                    Number(values.old_quantity) &&
                  (Number(values.orders_product_quantity) >
                    getRemaningQuantity(
                      values,
                      stocksGroupProd,
                      orderGroupProd
                    ) ||
                    getRemaningQuantity(
                      values,
                      stocksGroupProd,
                      orderGroupProd
                    ) === 0)
                ) {
                  dispatch(setError(true));
                  dispatch(setMessage("Insufficient quantity"));
                  return;
                }
                if (
                  item &&
                  isPaid === "0" &&
                  Number(sales_receive_amount) <
                    modalComputeAmountWithDiscount(
                      values.orders_product_amount,
                      values.sales_discount
                    )
                ) {
                  dispatch(setError(true));
                  dispatch(
                    setMessage(
                      "Recieve payment must be exact amount or morethan"
                    )
                  );
                  return;
                }
                mutation.mutate({
                  ...values,
                  orders_product_quantity,
                  sales_receive_amount,
                  sales_discount,
                });
              }}
            >
              {(props) => {
                props.values.orders_product_amount =
                  Number(removeComma(props.values.orders_product_quantity)) *
                  priceId;
                props.values.suppliers_products_aid = productId;
                props.values.orders_is_paid = isPaid;
                props.values.sales_member_change =
                  Number(removeComma(props.values.sales_receive_amount)) -
                  modalComputeAmountWithDiscount(
                    props.values.orders_product_amount,
                    props.values.sales_discount
                  );
                return (
                  <Form>
                    <div className="relative mb-6 mt-5">
                      <InputText
                        label="Date"
                        type="datetime-local"
                        name="orders_date"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="relative my-5">
                      <InputSelect
                        name="orders_member_id"
                        label="Member"
                        disabled={mutation.isLoading || memberApprovedLoading}
                      >
                        <option value="" hidden>
                          {memberApprovedLoading ? "Loading..." : "--"}
                        </option>
                        {memberApproved?.data.map((cItem, key) => {
                          return (
                            <option key={key} value={cItem.members_aid}>
                              {`${cItem.members_last_name}, ${cItem.members_first_name} `}
                            </option>
                          );
                        })}
                      </InputSelect>
                    </div>
                    <div className="relative my-5">
                      <InputSelect
                        name="category_id"
                        label="Category"
                        onChange={handleSupplierProduct}
                        disabled={categoryLoading || mutation.isLoading}
                      >
                        <option value="" hidden>
                          {categoryLoading ? "Loading..." : "--"}
                        </option>
                        {categoryData?.data.map((cItem, key) => {
                          return (
                            <option
                              key={key}
                              value={cItem.product_category_aid}
                            >
                              {`${cItem.product_category_name} `}
                            </option>
                          );
                        })}
                      </InputSelect>
                    </div>
                    <div className="relative my-5">
                      <InputSelect
                        name="orders_product_id"
                        label="Supplier Product"
                        onChange={handleProduct}
                        disabled={isLoading || mutation.isLoading}
                      >
                        <option value="" hidden>
                          {isLoading ? "Loading..." : "--"}
                        </option>{" "}
                        {SupProd?.data.length === 0 ? (
                          <option value="">NO DATA</option>
                        ) : (
                          SupProd?.data.map((pItem, key) => {
                            return (
                              pItem.suppliers_products_scc_price !== "" && (
                                <option
                                  key={key}
                                  value={pItem.suppliers_products_aid}
                                  id={pItem.suppliers_products_scc_price}
                                >
                                  {`${
                                    pItem.suppliers_products_name
                                  }  (${getRemaningQuantity(
                                    pItem,
                                    stocksGroupProd,
                                    orderGroupProd
                                  )})`}
                                </option>
                              )
                            );
                          })
                        )}
                      </InputSelect>
                    </div>
                    <div className="relative my-5">
                      <InputText
                        label="Quantity"
                        type="text"
                        num="num"
                        name="orders_product_quantity"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="relative my-5">
                      <InputTextArea
                        label="Remarks"
                        type="text"
                        name="orders_remarks"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    {!item && (
                      <>
                        <div className="relative my-5">
                          <InputSelect
                            name="orders_is_paid"
                            onChange={handleIsPaid}
                            label="Are you going to pay now ?"
                            disabled={
                              mutation.isLoading || memberApprovedLoading
                            }
                          >
                            <option value="" hidden>
                              --
                            </option>
                            <option value="1">Yes</option>
                            <option value="0">No</option>
                          </InputSelect>
                        </div>
                        {Number(props.values.orders_is_paid) === 1 && (
                          <>
                            <div className="relative mt-6 mb-8">
                              <InputText
                                label="Recieve Date"
                                type="datetime-local"
                                name="sales_date"
                                disabled={mutation.isLoading}
                              />
                            </div>
                            <div className="relative mt-6 mb-8">
                              <InputText
                                label="Recieve Amount"
                                type="text"
                                name="sales_receive_amount"
                                num="num"
                                disabled={mutation.isLoading}
                              />
                            </div>
                            <div className="relative mt-6 mb-8">
                              <InputText
                                label="Discount Amount"
                                type="text"
                                name="sales_discount"
                                num="num"
                                disabled={mutation.isLoading}
                              />
                            </div>
                            <div className="relative mb-4 ">
                              <InputText
                                label="Official Receipt"
                                type="text"
                                name="sales_or"
                                disabled={mutation.isLoading}
                              />
                            </div>
                          </>
                        )}
                      </>
                    )}
                    <div className="pl-3 text-primary">
                      <p className="">
                        Total Amount:
                        <span className="text-black ml-2">
                          {pesoSign}{" "}
                          {Number(props.values.orders_product_amount) === 0
                            ? 0
                            : modalComputeAmountWithDiscount(
                                props.values.orders_product_amount,
                                props.values.sales_discount
                              ).toFixed(2)}
                        </span>
                      </p>
                    </div>
                    {!item && Number(props.values.orders_is_paid) === 1 && (
                      <div className="pl-3 text-primary">
                        <p className="">
                          Change:
                          <span className="text-black ml-2">
                            {pesoSign}{" "}
                            {Number(props.values.sales_receive_amount) === 0
                              ? 0
                              : numberWithCommas(
                                  Number(
                                    props.values.sales_member_change
                                  ).toFixed(2)
                                )}
                          </span>
                        </p>
                      </div>
                    )}
                    <div className="flex items-center gap-1 pt-5">
                      <button
                        type="submit"
                        disabled={mutation.isLoading || !props.dirty}
                        className="btn-modal-submit relative"
                      >
                        {mutation.isLoading ? (
                          <ButtonSpinner />
                        ) : item ? (
                          "Save"
                        ) : (
                          "Add"
                        )}
                      </button>
                      <button
                        type="reset"
                        className="btn-modal-cancel"
                        onClick={handleClose}
                        disabled={mutation.isLoading}
                      >
                        Cancel
                      </button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalManagerAddOrders;
