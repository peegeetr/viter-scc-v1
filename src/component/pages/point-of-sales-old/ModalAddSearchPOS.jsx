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
} from "../../../store/StoreAction";
import { StoreContext } from "../../../store/StoreContext";
import useQueryData from "../../custom-hooks/useQueryData";
import { InputText, InputTextArea } from "../../helpers/FormInputs";
import {
  formatDate,
  getDateNow,
  numberWithCommas,
  pesoSign,
} from "../../helpers/functions-general";
import { queryData } from "../../helpers/queryData";
import ButtonSpinner from "../../partials/spinners/ButtonSpinner";
import { getValidationOrderAdd } from "../Inventory/orders/functions-orders";
import { getRemaningQuantity } from "../Inventory/products/functions-product";
import SearchToAddProduct from "./SearchToAddProduct";
import { getTotaAmountPOS, getValueDataOldPOS } from "./functions-pos";

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
        item ? `/v1/pos/update/orders/${item.orders_aid}` : `/v1/orders`,
        item ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [arrKey] });
      // show success box
      if (data.success) {
        item && dispatch(setIsAdd(false));
        dispatch(setIsModalSearch(false));
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
    dispatch(setIsModalSearch(false));
  };
  console.log("item", item);
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
    orders_remarks: item ? item.orders_remarks : "",
    orders_date: item ? item.orders_date : getDateNow(),
    sales_discount: item ? item.sales_discount : "0",
    // sales
    sales_receive_amount: "",
    sales_or: "",
    orders_is_draft: 0,
    orders_is_paid: 0,
    sales_member_change: 0,
    sales_date: getDateNow(),
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
        <div className="p-1 w-[800px] rounded-b-2xl">
          <div className="flex justify-between items-center bg-primary p-3 rounded-t-2xl">
            <h3 className="text-white text-lg">
              {item ? "Update" : "Add"} Order
            </h3>
            <button
              type="button"
              className="text-gray-200 text-xl"
              onClick={handleClose}
            >
              <FaTimesCircle />
            </button>
          </div>
          <div className="bg-white p-4 rounded-b-2xl ">
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
                const validation = getValidationOrderAdd(
                  values,
                  item,
                  items,
                  dispatch,
                  0,
                  stocksGroupProd,
                  orderGroupProd
                );
                // new list
                const list = validation.list;

                const newVal =
                  item &&
                  getValueDataOldPOS(
                    values,
                    item,
                    stocksGroupProd,
                    orderGroupProd,
                    dispatch
                  );

                // for validation if invalid amount
                if (validation.invalidAmount === true || list.length === 0) {
                  return;
                }

                mutation.mutate({
                  ...values,
                  orders_product_srp: totalPrice,
                  list: list[0],
                  items,
                  sales_discount: item && newVal.sales_discount,
                  orders_product_amount: item && newVal.product_amount,
                  orders_product_quantity: item && newVal.quantity,
                });
              }}
            >
              {(props) => {
                return (
                  <Form>
                    <p className="m-0 font-light text-lg text-primary">
                      Date :
                      <span className="font-bold">
                        {" "}
                        {`${formatDate(getDateNow())}`}
                      </span>
                    </p>
                    <p className="m-0 font-light text-lg text-primary">
                      Name :<span className="font-bold"> {memberName}</span>
                    </p>

                    {!item && (
                      <div className="relative mt-10 mb-5 text-2xl">
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
                    <p className="mb-0 font-light text-lg text-primary capitalize">
                      Product :
                      <span className="font-bold">
                        {" "}
                        {!item &&
                        items.suppliers_products_name === undefined ? (
                          "--"
                        ) : (
                          <>
                            {item
                              ? item.suppliers_products_name
                              : items.suppliers_products_name}
                            {` (${getRemaningQuantity(
                              item ? item : items,
                              stocksGroupProd,
                              orderGroupProd
                            )} pcs) `}
                            {pesoSign}{" "}
                            {`${numberWithCommas(
                              Number(totalPrice).toFixed(2)
                            )}`}
                          </>
                        )}
                      </span>
                    </p>
                    <div className=" text-primary">
                      <p className="text-xl">
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
                    {(item || items?.length !== 0) && (
                      <>
                        <div className="relative my-5 text-2xl">
                          <InputText
                            label="Quantity"
                            type="text"
                            number="number"
                            name="orders_product_quantity"
                            disabled={mutation.isLoading}
                          />
                        </div>
                        <div className="relative my-5 text-2xl">
                          <InputText
                            label="Discount"
                            type="text"
                            num="num"
                            name="sales_discount"
                            disabled={mutation.isLoading}
                          />
                        </div>
                        <div className="relative my-5 text-2xl">
                          <InputTextArea
                            label="Remarks"
                            type="text"
                            name="orders_remarks"
                            disabled={mutation.isLoading}
                          />
                        </div>
                        <div className="flex justify-center items-center pt-5">
                          <button
                            type="submit"
                            disabled={
                              mutation.isLoading ||
                              (item ? !props.dirty : totalPrice === "")
                            }
                            className="btn-modal-submit relative "
                          >
                            {mutation.isLoading ? (
                              <ButtonSpinner />
                            ) : item ? (
                              "Save"
                            ) : (
                              "Add"
                            )}
                          </button>
                        </div>
                      </>
                    )}
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
