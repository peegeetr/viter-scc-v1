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

const ModalAddPettyCash = ({ item }) => {
  const { store, dispatch } = React.useContext(StoreContext);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        item
          ? `/v1/report-petty-cash/${item.petty_cash_aid}`
          : `/v1/report-petty-cash`,
        item ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["blotter-petty-cash"] });
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
    petty_cash_date: item ? item.petty_cash_date : "",
    petty_cash_voucher_no: item ? item.petty_cash_voucher_no : "",
    petty_cash_payee: item ? item.petty_cash_payee : "",
    petty_cash_in: item ? item.petty_cash_in : "",
    petty_cash_out: item ? item.petty_cash_out : "",
    petty_cash_balance: item ? item.petty_cash_balance : "",
  };

  const yupSchema = Yup.object({
    petty_cash_date: Yup.string().required("Required"),
    petty_cash_voucher_no: Yup.string().required("Required"),
    petty_cash_payee: Yup.string().required("Required"),
    petty_cash_in: Yup.string().required("Required"),
    petty_cash_out: Yup.string().required("Required"),
    petty_cash_balance: Yup.string().required("Required"),
  });

  return (
    <>
      <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-dark bg-opacity-50 z-50">
        <div className="p-1 w-[350px] rounded-b-2xl">
          <div className="flex justify-between items-center bg-primary p-3 rounded-t-2xl">
            <h3 className="text-white text-sm">
              {item ? "Update" : "Add"} Petty Cash
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
                const petty_cash_payee = removeComma(values.petty_cash_payee);
                const petty_cash_in = removeComma(values.petty_cash_in);
                const petty_cash_out = removeComma(values.petty_cash_out);
                const petty_cash_balance = removeComma(
                  values.petty_cash_balance
                );
                mutation.mutate({
                  ...values,
                  petty_cash_payee,
                  petty_cash_in,
                  petty_cash_out,
                  petty_cash_balance,
                });
              }}
            >
              {(props) => {
                return (
                  <Form>
                    <div className="relative my-5">
                      <InputText
                        label="Date"
                        name="petty_cash_date"
                        type="datetime-local"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="relative mb-6 mt-5">
                      <InputText
                        label="Voucher No."
                        type="text"
                        num="num"
                        name="petty_cash_voucher_no"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="relative mb-6 mt-5">
                      <InputText
                        label="Payee"
                        type="text"
                        num="num"
                        name="petty_cash_payee"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="relative mb-6 mt-5">
                      <InputText
                        label="In"
                        type="text"
                        num="num"
                        name="petty_cash_in"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="relative mb-6 mt-5">
                      <InputText
                        label="Out"
                        type="text"
                        num="num"
                        name="petty_cash_out"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="relative mb-6 mt-5">
                      <InputText
                        label="Balance"
                        type="text"
                        num="num"
                        name="petty_cash_balance"
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

export default ModalAddPettyCash;
