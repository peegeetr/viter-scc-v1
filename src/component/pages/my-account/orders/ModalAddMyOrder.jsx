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
import { InputText, InputTextArea } from "../../../helpers/FormInputs";
import {
  getDateNow,
  numberWithCommas,
  pesoSign,
  removeComma,
} from "../../../helpers/functions-general";
import { queryData } from "../../../helpers/queryData";
import ButtonSpinner from "../../../partials/spinners/ButtonSpinner";
import { getProductDetails } from "../../Inventory/orders/functions-orders";
import { getRemaningQuantity } from "../../Inventory/products/functions-product";
import SearchToAddProduct from "../../point-of-sales-old/SearchToAddProduct";
import { getTotaAmountProduct } from "../../point-of-sales/functions-pos";
import { getValidationMyOrder } from "./functions-my-orders";

const ModalAddMyOrder = ({ item, arrKey }) => {
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
  const { data: ProductList, isLoading } = useQueryData(
    `/v1/product/search/product`, // filter endpoint
    "post", // method
    "ProductList", // key
    { search },
    search
  );

  const initVal = {
    orders_member_id: store.credentials.data.members_aid,
    orders_product_quantity: item ? item.orders_product_quantity : "",
    orders_is_paid: item ? item.orders_is_paid : 0,
    orders_is_draft: item ? item.orders_is_draft : 1,
    orders_remarks: item ? item.orders_remarks : "",
    orders_date: item ? item.orders_date : getDateNow(),
  };

  const yupSchema = Yup.object({
    orders_product_quantity: Yup.string().required("Required"),
    orders_date: Yup.string().required("Required"),
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
                if (!item && items?.suppliers_products_aid === undefined) {
                  dispatch(setError(true));
                  dispatch(setMessage("Please check if you have product."));
                  return;
                }
                // for validation
                const validation = getValidationMyOrder(
                  values,
                  item,
                  items,
                  dispatch,
                  stocksGroupProd,
                  orderGroupProd
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
                return (
                  <Form>
                    <div className="relative my-5">
                      <InputText
                        label="Date"
                        type="date"
                        name="orders_date"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    {!item && (
                      <div className="relative mb-5">
                        <SearchToAddProduct
                          stocksGroupProd={stocksGroupProd}
                          orderGroupProd={orderGroupProd}
                          setSearch={setSearch}
                          onSearch={onSearch}
                          isLoading={isLoading}
                          setItems={setItems}
                          setTotalPrice={setTotalPrice}
                          result={ProductList}
                          name="search product"
                        />
                      </div>
                    )}
                    <p className="m-0 font-light ml-3 text-primary">
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

                    <div className="pl-3 text-primary">
                      <p className="text-lg">
                        Total Amount:
                        <span className="text-black ml-2">
                          {pesoSign}{" "}
                          {props.values.orders_product_quantity === "" ||
                          Number(props.values.orders_product_quantity) === 0
                            ? "0.00"
                            : getTotaAmountProduct(props.values, totalPrice)}
                        </span>
                      </p>
                    </div>

                    <div className="flex items-center gap-1 pt-5">
                      <button
                        type="submit"
                        disabled={mutation.isLoading || !props.dirty}
                        className="btn-modal-submit relative"
                      >
                        {mutation.isLoading && <ButtonSpinner />} Add
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

export default ModalAddMyOrder;
