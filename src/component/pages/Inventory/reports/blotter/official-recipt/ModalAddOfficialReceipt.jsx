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
} from "../../../../../../store/StoreAction";
import { StoreContext } from "../../../../../../store/StoreContext";
import { InputText, InputTextArea } from "../../../../../helpers/FormInputs";
import { queryData } from "../../../../../helpers/queryData";
import ButtonSpinner from "../../../../../partials/spinners/ButtonSpinner";
import { removeComma } from "../../../../../helpers/functions-general";

const ModalAddOfficialReceipt = ({ item }) => {
  const { store, dispatch } = React.useContext(StoreContext);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        item
          ? `/v1/report-official-receipt/${item.or_invoice_aid}`
          : `/v1/report-official-receipt`,
        item ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["blotter-official-receipt"] });
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

  const initVal = {
    or_invoice_date: item ? item.or_invoice_date : "",
    or_invoice_or_no: item ? item.or_invoice_or_no : "",
    or_invoice_payee: item ? item.or_invoice_payee : "",
    or_invoice_amount: item ? item.or_invoice_amount : "",
    or_invoice_remarks: item ? item.or_invoice_remarks : "",
  };

  const yupSchema = Yup.object({
    or_invoice_date: Yup.string().required("Required"),
    or_invoice_or_no: Yup.string().required("Required"),
    or_invoice_payee: Yup.string().required("Required"),
    or_invoice_amount: Yup.string().required("Required"),
    or_invoice_remarks: Yup.string().required("Required"),
  });

  return (
    <>
      <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-dark bg-opacity-50 z-50">
        <div className="p-1 w-[350px] rounded-b-2xl">
          <div className="flex justify-between items-center bg-primary p-3 rounded-t-2xl">
            <h3 className="text-white text-sm">
              {item ? "Update" : "Add"} Official Receipt
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
                const or_invoice_payee = removeComma(values.or_invoice_payee);
                const or_invoice_amount = removeComma(values.or_invoice_amount);
                mutation.mutate({
                  ...values,
                  or_invoice_payee,
                  or_invoice_amount,
                });
              }}
            >
              {(props) => {
                return (
                  <Form>
                    <div className="relative my-5">
                      <InputText
                        label="Date"
                        name="or_invoice_date"
                        type="datetime-local"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="relative mb-6 mt-5">
                      <InputText
                        label="OR No."
                        type="text"
                        name="or_invoice_or_no"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="relative mb-6 mt-5">
                      <InputText
                        label="Payee"
                        type="text"
                        num="num"
                        name="or_invoice_payee"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="relative mb-6 mt-5">
                      <InputText
                        label="Amount"
                        type="text"
                        num="num"
                        name="or_invoice_amount"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="relative mb-6 mt-5">
                      <InputTextArea
                        label="Remarks"
                        type="text"
                        name="or_invoice_remarks"
                        disabled={mutation.isLoading}
                      />
                    </div>

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

export default ModalAddOfficialReceipt;
