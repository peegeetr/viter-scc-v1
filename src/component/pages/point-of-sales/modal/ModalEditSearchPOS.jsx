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
  AssociateMemberId,
  formatDate,
  getDateNow,
  notMemberId,
  numberWithCommas,
  otherDiscountId,
  pesoSign,
  removeComma,
  wholeSaleDiscountId,
} from "../../../helpers/functions-general";
import { queryData } from "../../../helpers/queryData";
import ButtonSpinner from "../../../partials/spinners/ButtonSpinner";
import {
  getDiscount,
  getOrderSrpPrice,
  getTotaWithDiscount,
  getValueData,
  getWholeSale,
  getWholeSaleDiscountView,
  showWholeSale,
} from "./functions-newpos";

const ModalEditSearchPOS = ({ item, arrKey }) => {
  const { store, dispatch } = React.useContext(StoreContext);

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
  const { data: readPriceMarkup } = useQueryData(
    `/v1/pos/read-price-markup`, // endpoint
    "get", // method
    "readPriceMarkup" // key
  );

  const initVal = {
    orders_member_id: item.orders_member_id,
    orders_product_quantity: item.orders_product_quantity,
    orders_is_paid: 0,
    orders_is_draft: 0,
    orders_remarks: item.orders_remarks,
    orders_date: item.orders_date,
    sales_discount: item.sales_discount,

    orders_is_discounted: item.orders_is_discounted,

    // old quantity
    old_quantity: item.orders_product_quantity,
  };

  const yupSchema = Yup.object({
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

                const newVal = getValueData(
                  values,
                  item,remainingQuantity,
                  readPriceMarkup,
                  dispatch
                );
                // for validation if invalid amount
                if (newVal.invalidAmount === true) {
                  return;
                }
                mutation.mutate({
                  ...values,
                  sales_discount: newVal.sales_discount,
                  orders_product_amount: newVal.product_amount,
                  orders_product_srp: newVal.product_srp,
                  orders_product_quantity: newVal.quantity,
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
                      Name :
                      <span className="font-bold capitalize">
                        {" "}
                        {`${item.members_last_name}, ${item.members_first_name}`}
                      </span>
                    </p>
                    <p className="mb-0 font-light text-lg text-primary capitalize">
                      Product :{" "}
                      <span className="font-bold">
                        {item.suppliers_products_name} ({pesoSign}
                        {Number(getOrderSrpPrice(props.values, item)).toFixed(
                          2
                        )}
                        )
                      </span>
                    </p>
                    <p className="mb-0 text-xl text-primary">
                      Total Amount:
                      <span className="text-black ml-2">
                        {pesoSign}
                        {Number(
                          getWholeSale(props.values, item).toFixed(2) -
                            getDiscount(props.values).toFixed(2)
                        ).toFixed(2)}
                      </span>
                    </p>
                    <p className="text-xl text-primary">
                      Discount:
                      <span className="text-black ml-2">
                        {pesoSign} {getDiscount(props.values).toFixed(2)}
                      </span>
                    </p>
                    <div className="relative my-5 text-2xl">
                      <InputText
                        label="Quantity"
                        type="text"
                        number="number"
                        name="orders_product_quantity"
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
                        {showWholeSale(item) && (
                          <option value={wholeSaleDiscountId}>
                            Whole Sales
                          </option>
                        )}

                        <option value={otherDiscountId}>Other Option</option>
                      </InputSelect>
                    </div>

                    {props.values.orders_is_discounted === otherDiscountId && (
                      <div className="relative my-5 text-2xl">
                        <InputText
                          label="Discount"
                          type="text"
                          num="num"
                          name="sales_discount"
                          disabled={mutation.isLoading}
                        />
                      </div>
                    )}
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
                          (item ? !props.dirty : item.orders_product_srp === "")
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
