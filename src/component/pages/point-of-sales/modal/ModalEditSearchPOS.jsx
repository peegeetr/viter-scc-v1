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
import { InputText, InputTextArea } from "../../../helpers/FormInputs";
import {
  formatDate,
  getDateNow,
  numberWithCommas,
  pesoSign,
  removeComma,
} from "../../../helpers/functions-general";
import { queryData } from "../../../helpers/queryData";
import ButtonSpinner from "../../../partials/spinners/ButtonSpinner";
import { getRemaningQuantity } from "../../Inventory/products/functions-product";
import { getTotaAmountPOS } from "../functions-pos";

const ModalEditSearchPOS = ({ item, arrKey, memberName }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [totalPrice] = React.useState(item.orders_product_srp);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(`/v1/pos/update/orders/${item.orders_aid}`, "put", values),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [arrKey] });
      // show success box
      if (data.success) {
        dispatch(setIsAdd(false));
        dispatch(setIsModalSearch(false));
        dispatch(setSuccess(true));
        dispatch(setMessage(`Successfuly updated.`));
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

  const initVal = {
    orders_member_id: item.orders_member_id,
    orders_product_quantity: item.orders_product_quantity,
    orders_is_paid: 0,
    orders_is_draft: 0,
    orders_remarks: item.orders_remarks,
    orders_date: item.orders_date,
    sales_discount: item.sales_discount,

    // old quantity
    old_quantity: item.orders_product_quantity,
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
            <h3 className="text-white text-lg">Update Order</h3>
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

                const orders_product_quantity = removeComma(
                  `${values.orders_product_quantity}`
                );
                const sales_discount = removeComma(`${values.sales_discount}`);

                const newQty =
                  getRemaningQuantity(item, stocksGroupProd, orderGroupProd) +
                  Number(item.orders_product_quantity) -
                  Number(orders_product_quantity);

                const qty =
                  getRemaningQuantity(item, stocksGroupProd, orderGroupProd) +
                  Number(item.orders_product_quantity);

                const orders_product_amount =
                  Number(orders_product_quantity) *
                  Number(item.suppliers_products_scc_price);

                if (Number(sales_discount) > orders_product_amount) {
                  dispatch(setError(true));
                  dispatch(setMessage("Invalid Discount Amount"));
                  return;
                }

                if (
                  Number(orders_product_quantity) === 0 ||
                  Number(orders_product_quantity) > qty ||
                  newQty <= -1
                ) {
                  dispatch(setError(true));
                  dispatch(setMessage("Insufficient Quantity"));
                  return;
                }
                mutation.mutate({
                  ...values,
                  sales_discount,
                  orders_product_amount,
                  orders_product_quantity,
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
                    <p className="mb-0 font-light text-lg text-primary capitalize">
                      Product :
                      <span className="font-bold">
                        {" "}
                        {item.suppliers_products_name}
                        {` (${item.orders_product_quantity} pcs) `}
                        {pesoSign}{" "}
                        {`${numberWithCommas(Number(totalPrice).toFixed(2))}`}
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

export default ModalEditSearchPOS;
