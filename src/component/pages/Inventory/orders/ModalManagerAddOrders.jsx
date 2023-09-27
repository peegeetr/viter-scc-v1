import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import * as Yup from "yup";
import {
  setError,
  setIsAdd,
  setIsModalSearch,
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
  getDateNow,
  numberWithCommas,
  otherDiscountId,
  pesoSign,
  removeComma,
  wholeSaleDiscountId,
} from "../../../helpers/functions-general";
import { queryData } from "../../../helpers/queryData";
import ButtonSpinner from "../../../partials/spinners/ButtonSpinner";
import SearchToAddProduct from "../../point-of-sales-old/SearchToAddProduct";
import {
  getProductDetails,
  getTotaAmountOrder,
  getValidationOrderAdd,
  getWholeSaleDiscountOrder,
  modalComputeAmountWithDiscount,
} from "./functions-orders";
import { getTotaWithDiscount } from "../../point-of-sales/modal/functions-newpos";

const ModalManagerAddOrders = ({ item, arrKey }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [items, setItems] = React.useState([]);
  const [totalPrice, setTotalPrice] = React.useState(
    item ? item.orders_product_srp : ""
  );
  const [search, setSearch] = React.useState(
    item ? item.suppliers_products_name : "none"
  );
  const onSearch = React.useRef("0");

  const [isPaid, setIsPaid] = React.useState(item ? item.orders_is_paid : "0");

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
    dispatch(setIsModalSearch(false));
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
  const { data: readPriceMarkup } = useQueryData(
    `/v1/pos/read-price-markup`, // endpoint
    "get", // method
    "readPriceMarkup" // key
  );
  // use if not loadmore button undertime
  const { data: memberApproved, isLoading: memberApprovedLoading } =
    useQueryData(
      `/v1/members/approved`, // endpoint
      "get", // method
      "memberApproved" // key
    );

  // get employee id
  const handleIsPaid = async (e, props) => {
    setIsPaid(e.target.value);
  };

  // get employee id
  const handleResetSearch = async () => {
    setItems([]);
    setSearch("");
    setTotalPrice("");
  };

  // use if not loadmore button undertime
  const { data: ProductList, isLoading } = useQueryData(
    `/v1/product/search/product`, // filter endpoint
    "post", // method
    "ProductList", // key
    { search },
    search
  );

  const initVal = {
    orders_member_id: item ? item.orders_member_id : "",
    orders_product_quantity: item ? item.orders_product_quantity : "",
    orders_remarks: item ? item.orders_remarks : "",
    orders_date: item ? item.orders_date : getDateNow(),
    // sales
    sales_receive_amount: "",
    sales_or: "",
    orders_is_paid: "",
    sales_member_change: "",
    sales_discount: "",
    orders_is_discounted: "",
    sales_date: getDateNow(),
  };

  const yupSchema = Yup.object({
    orders_member_id: Yup.string().required("Required"),
    orders_product_quantity: Yup.string().required("Required"),
    orders_date: Yup.string().required("Required"),
    sales_receive_amount: isPaid === "1" && Yup.string().required("Required"),
    sales_or: isPaid === "1" && Yup.string().required("Required"),
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
          <div
            className={`${
              item ? "h-[31rem] " : "h-[34rem] "
            }bg-white p-4 rounded-b-2xl overflow-auto`}
          >
            <Formik
              initialValues={initVal}
              validationSchema={yupSchema}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                // console.log(values, items);
                if (!item && items?.suppliers_products_aid === undefined) {
                  dispatch(setError(true));
                  dispatch(setMessage("Please check if you have product."));
                  return;
                }
                // for validation
                const validation = getValidationOrderAdd(
                  values,
                  item,
                  items,
                  dispatch,
                  isPaid,
                  stocksGroupProd,
                  orderGroupProd,
                  readPriceMarkup,
                  totalPrice
                );
                // new list
                const list = validation.list;
                // for validation if invalid amount
                if (validation.invalidAmount === true || list.length === 0) {
                  return;
                }

                mutation.mutate({
                  ...values,
                  orders_product_srp: totalPrice,
                  list: list[0],
                  items,
                });
              }}
            >
              {(props) => {
                props.values.orders_is_paid = isPaid;
                return (
                  <Form>
                    <div className="relative mb-6 mt-2">
                      <InputText
                        label="Date"
                        type="date"
                        name="orders_date"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="relative mt-5 mb-2">
                      <InputSelect
                        name="orders_member_id"
                        label="Member"
                        disabled={mutation.isLoading || memberApprovedLoading}
                        onChange={handleResetSearch}
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
                    {!item && (
                      <div className="relative mt-5">
                        <SearchToAddProduct
                          stocksGroupProd={stocksGroupProd}
                          orderGroupProd={orderGroupProd}
                          setSearch={setSearch}
                          onSearch={onSearch}
                          isLoading={isLoading}
                          setItems={setItems}
                          setTotalPrice={setTotalPrice}
                          result={ProductList}
                          propsVal={props.values}
                          name="search product"
                        />
                      </div>
                    )}
                    <p className="m-0 font-light mt-4 ml-3 text-primary">
                      Product :
                      <span className="font-bold break-words">
                        {item ? (
                          <>
                            {` ${getProductDetails(
                              item,
                              stocksGroupProd,
                              orderGroupProd
                            )} `}
                            {pesoSign}
                            {` ${numberWithCommas(
                              Number(totalPrice).toFixed(2)
                            )}`}
                          </>
                        ) : items.suppliers_products_name === undefined ? (
                          "--"
                        ) : (
                          <>
                            {` ${getProductDetails(
                              items,
                              stocksGroupProd,
                              orderGroupProd
                            )} `}
                            {pesoSign}
                            {` ${numberWithCommas(
                              Number(totalPrice).toFixed(2)
                            )}`}
                          </>
                        )}
                      </span>
                    </p>

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
                            <option value="0">No</option>
                            <option value="1">Yes</option>
                          </InputSelect>
                        </div>
                        {Number(props.values.orders_is_paid) === 1 && (
                          <>
                            <div className="relative mt-6 mb-8">
                              <InputText
                                label="Recieve Date"
                                type="date"
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
                            <div className="relative mb-5">
                              <InputSelect
                                label="Discount Category"
                                type="text"
                                name="orders_is_discounted"
                                disabled={mutation.isLoading}
                              >
                                <option value="">No Discount</option>
                                <option value={wholeSaleDiscountId}>
                                  Whole Sales
                                </option>
                                <option value={otherDiscountId}>
                                  Other Option
                                </option>
                              </InputSelect>
                            </div>

                            {props.values.orders_is_discounted ===
                              otherDiscountId && (
                              <div className="relative mt-6 mb-8">
                                <InputText
                                  label="Discount"
                                  type="text"
                                  num="num"
                                  name="sales_discount"
                                  disabled={mutation.isLoading}
                                />
                              </div>
                            )}
                            <div className="relative mb-4 ">
                              <InputText
                                label="Sales invoice number"
                                type="text"
                                name="sales_or"
                                disabled={mutation.isLoading}
                              />
                            </div>
                          </>
                        )}
                      </>
                    )}
                    {!item && Number(props.values.orders_is_paid) === 1 && (
                      <div className="pl-3 text-primary">
                        <p className="text-lg">
                          Amount:
                          <span className="text-black ml-2">
                            {pesoSign}{" "}
                            {Number(totalPrice) === 0
                              ? "0.00"
                              : numberWithCommas(
                                  getTotaAmountOrder(props.values, totalPrice)
                                )}
                          </span>
                        </p>
                        <p className="text-xl text-primary">
                          Discount:
                          <span className="text-black ml-2">
                            {pesoSign}{" "}
                            {props.values.orders_is_discounted ===
                            otherDiscountId
                              ? Number(props.values.sales_discount).toFixed(2)
                              : props.values.orders_is_discounted ===
                                wholeSaleDiscountId
                              ? getWholeSaleDiscountOrder(
                                  readPriceMarkup,
                                  props.values,
                                  totalPrice
                                ).toFixed(2)
                              : "0.00"}
                          </span>
                        </p>
                      </div>
                    )}
                    <div className="pl-3 text-primary">
                      <p className="text-lg">
                        Total Amount:
                        <span className="text-black ml-2">
                          {pesoSign}
                          {props.values.orders_product_quantity === "" ||
                          Number(props.values.orders_product_quantity) === 0
                            ? "0.00"
                            : getTotaWithDiscount(
                                readPriceMarkup,
                                props.values,
                                totalPrice
                              )}
                        </span>
                      </p>
                    </div>
                    {!item && Number(props.values.orders_is_paid) === 1 && (
                      <div className="pl-3 text-primary">
                        <p className="text-lg">
                          Change:
                          <span className="text-black ml-2">
                            {pesoSign}{" "}
                            {Number(props.values.sales_receive_amount) === 0
                              ? "0.00"
                              : Number(
                                  removeComma(
                                    props.values.sales_receive_amount
                                  ) -
                                    getTotaWithDiscount(
                                      readPriceMarkup,
                                      props.values,
                                      totalPrice
                                    )
                                ).toFixed(2)}
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
