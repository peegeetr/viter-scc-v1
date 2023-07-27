import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import * as Yup from "yup";
import {
  setError,
  setIsConfirm,
  setMessage,
  setSuccess,
} from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import { InputText } from "../../../helpers/FormInputs";
import { queryData } from "../../../helpers/queryData";
import ButtonSpinner from "../../../partials/spinners/ButtonSpinner";
import {
  numberWithCommas,
  pesoSign,
  removeComma,
} from "../../../helpers/functions-general";

const ModalPayNow = ({ item, result, isPayAll }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const queryClient = useQueryClient();
  console.log("item", item);
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(`/v1/pos/accept-payment/${isPayAll}`, "put", values),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["pos-order"] });
      // show success box

      if (data.success) {
        dispatch(setSuccess(true));
        dispatch(setMessage(`Successfuly paid`));
        dispatch(setIsConfirm(false));
      }
      // show error box
      if (!data.success) {
        dispatch(setError(true));
        dispatch(setMessage(data.error));
      }
    },
  });
  const handleClose = () => {
    dispatch(setIsConfirm(false));
  };
  const initVal = {
    sales_or: "",
    sales_receive_amount: "",
  };

  const yupSchema = Yup.object({
    sales_or: Yup.string().required("Required"),
    sales_receive_amount: Yup.string().required("Required"),
  });

  return (
    <>
      <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-dark bg-opacity-50 z-50">
        <div className="p-1 w-[350px] rounded-b-2xl">
          <div className="flex justify-between items-center bg-primary p-3 rounded-t-2xl">
            <h3 className="text-white text-sm">Recieve Payment</h3>
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
                const sales_receive_amount = removeComma(
                  `${values.sales_receive_amount}`
                );
                if (
                  Number(sales_receive_amount) <
                  (Number(item.totalAmount) ||
                    Number(item.orders_product_amount))
                ) {
                  dispatch(setError(true));
                  dispatch(setMessage("Insufficient amount"));
                  return;
                }
                mutation.mutate({
                  ...values,
                  result: isPayAll ? result : item,
                });
              }}
            >
              {(props) => {
                return (
                  <Form>
                    <div className="pl-3 text-primary">
                      <p className="mb-0 text-lg">
                        Name:
                        <span className="text-black ml-2">
                          {isPayAll
                            ? item.name
                            : `${item.members_last_name}, ${item.members_first_name}`}
                        </span>
                      </p>
                      <p className="mb-0 text-lg">
                        Amount:
                        <span className="text-black ml-2">
                          {pesoSign}{" "}
                          {numberWithCommas(
                            Number(
                              `${
                                isPayAll
                                  ? item.amount
                                  : item.orders_product_amount
                              }`
                            ).toFixed(2)
                          )}
                        </span>
                      </p>
                      <p className="mb-0 text-lg">
                        Discount Amount:
                        <span className="text-black ml-2">
                          {pesoSign}{" "}
                          {numberWithCommas(
                            Number(
                              `${
                                isPayAll ? item.discount : item.sales_discount
                              }`
                            ).toFixed(2)
                          )}
                        </span>
                      </p>

                      <p className="mb-0 text-lg">
                        Total Amount:
                        <span className="text-black ml-2">
                          {pesoSign}{" "}
                          {numberWithCommas(
                            Number(
                              `${
                                isPayAll
                                  ? item.totalAmount
                                  : Number(item.orders_product_amount) -
                                    Number(item.sales_discount)
                              }`
                            ).toFixed(2)
                          )}
                        </span>
                      </p>
                      <p className="text-lg">
                        Change:
                        <span className="text-black ml-2">
                          {pesoSign}{" "}
                          {Number(props.values.sales_receive_amount) === 0
                            ? "0.00"
                            : numberWithCommas(
                                Number(
                                  removeComma(props.values.sales_receive_amount)
                                ) -
                                  Number(
                                    `${
                                      isPayAll
                                        ? item.totalAmount
                                        : Number(item.orders_product_amount) -
                                          Number(item.sales_discount)
                                    }`
                                  ).toFixed(2)
                              )}
                        </span>
                      </p>
                    </div>

                    <div className="relative mt-6 mb-5">
                      <InputText
                        label="Receive Amount"
                        type="text"
                        name="sales_receive_amount"
                        num="num"
                        disabled={mutation.isLoading}
                      />
                    </div>

                    <div className="relative mb-4 ">
                      <InputText
                        label="Sales invoice number"
                        type="text"
                        name="sales_or"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="flex items-center gap-1 pt-5">
                      <button
                        type="submit"
                        disabled={mutation.isLoading || !props.dirty}
                        className="btn-modal-submit relative"
                      >
                        {mutation.isLoading ? <ButtonSpinner /> : "Confirm"}
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

export default ModalPayNow;
