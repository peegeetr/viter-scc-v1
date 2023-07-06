import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import * as Yup from "yup";
import {
  setError,
  setIsAdd,
  setIsSearch,
  setMessage,
  setSuccess,
} from "../../../store/StoreAction";
import { StoreContext } from "../../../store/StoreContext";
import { InputText, InputTextArea } from "../../helpers/FormInputs";
import {
  formatDate,
  getDateNow,
  getDateTimeNow,
  getTimeNow,
  numberWithCommas,
  pesoSign,
  removeComma,
} from "../../helpers/functions-general";
import { queryData } from "../../helpers/queryData";
import ButtonSpinner from "../../partials/spinners/ButtonSpinner";
import { getRemaningQuantity } from "../Inventory/products/functions-product";
import SearchToAddProduct from "./SearchToAddProduct";
import useQueryData from "../../custom-hooks/useQueryData";
import { getTotaAmountPOS } from "./functions-pos";

const ModalAddSearchPOS = ({ item, arrKey, memberId, memberName }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [items, setItems] = React.useState([]);
  const [totalPrice, setTotalPrice] = React.useState(
    item ? item.orders_product_srp : ""
  );
  const [search, setSearch] = React.useState(
    item ? item.suppliers_products_name : "0"
  );
  const onSearch = React.useRef("0");

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        item
          ? `/v1/pos/update/orders/${item.orders_aid}`
          : `/v1/pos/create/orders`,
        item ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [arrKey] });
      // show success box
      if (data.success) {
        item && dispatch(setIsAdd(false));
        dispatch(setIsSearch(false));
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
    dispatch(setIsSearch(false));
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
  const { data: ProductList, isLoading } = useQueryData(
    `/v1/product/search/product`, // filter endpoint
    "post", // method
    "ProductList", // key
    { search },
    search
  );

  const initVal = {
    orders_member_id: item ? item.orders_member_id : memberId,
    orders_product_quantity: item ? item.orders_product_quantity : "1",
    orders_is_paid: 0,
    orders_is_draft: 0,
    orders_remarks: item ? item.orders_remarks : "",
    orders_date: item ? item.orders_date : getDateTimeNow(),
    sales_discount: item ? item.sales_discount : "0",

    // old quantity
    old_quantity: item ? item.orders_product_quantity : "",
  };

  const yupSchema = Yup.object({
    sales_discount: Yup.string().required("Required"),
    orders_product_quantity: Yup.string().required("Required"),
  });
  return (
    <>
      <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-dark bg-opacity-50 z-50">
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
          <div className="bg-white p-4 rounded-b-2xl">
            <Formik
              initialValues={initVal}
              validationSchema={yupSchema}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                // console.log(values);
                if (!item && items === "") {
                  dispatch(setError(true));
                  dispatch(setMessage("Please check if you have product."));
                  return;
                }
                const orders_product_quantity = removeComma(
                  `${values.orders_product_quantity}`
                );
                const sales_discount = removeComma(`${values.sales_discount}`);

                const orders_product_amount =
                  Number(orders_product_quantity) *
                  Number(
                    item
                      ? item.suppliers_products_scc_price
                      : items.suppliers_products_scc_price
                  );

                if (Number(sales_discount) > orders_product_amount) {
                  dispatch(setError(true));
                  dispatch(setMessage("Invalid Discount Amount"));
                  return;
                }
                if (
                  Number(orders_product_quantity) >
                    getRemaningQuantity(
                      item ? item : items,
                      stocksGroupProd,
                      orderGroupProd
                    ) ||
                  getRemaningQuantity(
                    item ? item : items,
                    stocksGroupProd,
                    orderGroupProd
                  ) === 0
                ) {
                  dispatch(setError(true));
                  dispatch(setMessage("Insufficient Quantity"));
                  return;
                }
                mutation.mutate({
                  ...values,
                  items,
                  sales_discount,
                  orders_product_amount,
                  orders_product_quantity,
                });
              }}
            >
              {(props) => {
                return (
                  <Form>
                    <p className="m-0 font-light  text-primary">
                      Date :
                      <span className="font-bold">
                        {" "}
                        {`${formatDate(getDateNow())} ${getTimeNow()}`}
                      </span>
                    </p>
                    <p className="m-0 font-light  text-primary">
                      Name :<span className="font-bold"> {memberName}</span>
                    </p>
                    <p className="m-0 font-light  text-primary">
                      Product :
                      <span className="font-bold">
                        {" "}
                        {item
                          ? item.suppliers_products_name
                          : `${
                              items.suppliers_products_name === undefined
                                ? "No Product"
                                : items.suppliers_products_name
                            }`}{" "}
                        {`(${getRemaningQuantity(
                          item ? item : items,
                          stocksGroupProd,
                          orderGroupProd
                        )} pcs)`}
                        {pesoSign}{" "}
                        {`${numberWithCommas(Number(totalPrice).toFixed(2))}`}
                      </span>
                    </p>
                    <div className=" text-primary">
                      <p className="text-lg">
                        Total Amount:
                        <span className="text-black ml-2">
                          {pesoSign}{" "}
                          {props.values.orders_product_quantity === "" ||
                          Number(props.values.orders_product_quantity) === 0
                            ? "0.00"
                            : getTotaAmountPOS(props.values, totalPrice)}
                        </span>
                      </p>
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
                          name="search"
                        />
                      </div>
                    )}
                    {(item || items?.length !== 0) && (
                      <>
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
                          <InputText
                            label="Discount"
                            type="text"
                            num="num"
                            name="sales_discount"
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
                      </>
                    )}
                    <div className="flex items-center gap-1 pt-5">
                      <button
                        type="submit"
                        disabled={
                          mutation.isLoading ||
                          (item ? !props.dirty : totalPrice === "")
                        }
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

export default ModalAddSearchPOS;
