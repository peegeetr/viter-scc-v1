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
import { InputText, MyCheckbox } from "../../../helpers/FormInputs";
import { devNavUrl, removeComma } from "../../../helpers/functions-general";
import { queryData } from "../../../helpers/queryData";
import ButtonSpinner from "../../../partials/spinners/ButtonSpinner";

const ModalAddSubscribeCapital = ({ item }) => {
  const { store, dispatch } = React.useContext(StoreContext);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        item
          ? `/v1/subscribe-capital/${item.subscribe_capital_aid}`
          : `/v1/subscribe-capital`,
        item ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["subscribe-capital"] });
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
    subscribe_capital_date: item ? item.subscribe_capital_date : "",
    subscribe_capital_amount: item ? item.subscribe_capital_amount : "",
    subscribe_capital_is_active: item
      ? item.subscribe_capital_is_active === 1
        ? true
        : false
      : "",
    // old is active
    is_active_old: item
      ? item.subscribe_capital_is_active === 1
        ? true
        : false
      : "",
  };

  const yupSchema = Yup.object({
    subscribe_capital_date: Yup.string().required("Required"),
    subscribe_capital_amount: Yup.string().required("Required"),
    subscribe_capital_is_active: item && Yup.string().required("Required"),
  });

  return (
    <>
      <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-dark bg-opacity-50 z-50">
        <div className="p-1 w-[360px] rounded-b-2xl">
          <div className="flex justify-between items-center bg-primary p-3 rounded-t-2xl">
            <h3 className="text-white text-sm">
              {item ? "Update" : "Add"} Subscribe Capital
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
                const subscribe_capital_amount = removeComma(
                  `${values.subscribe_capital_amount}`
                );
                mutation.mutate({ ...values, subscribe_capital_amount });
              }}
            >
              {(props) => {
                return (
                  <Form>
                    <div className="relative mb-6 mt-5">
                      <InputText
                        label="Date"
                        type="text"
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) => (e.target.type = "text")}
                        name="subscribe_capital_date"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="relative mb-6 mt-5">
                      <InputText
                        label="Amount"
                        type="text"
                        num="num"
                        name="subscribe_capital_amount"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    {item && (
                      <div className="relative mb-3 flex items-center">
                        <span>
                          <MyCheckbox
                            type="checkbox"
                            name="subscribe_capital_is_active"
                            disabled={mutation.isLoading}
                          />
                        </span>
                        <p className="w-[80%] m-0 text-primary">
                          Is this current capital share?
                        </p>
                      </div>
                    )}

                    <div className="flex items-center gap-1 pt-5">
                      <button
                        type="submit"
                        disabled={mutation.isLoading || !props.dirty}
                        className="btn-modal-submit relative"
                      >
                        {mutation.isLoading && <ButtonSpinner />}
                        {item ? "Save" : "Add"}
                      </button>
                      <button
                        type="reset"
                        className="btn-modal-cancel cursor-pointer"
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

export default ModalAddSubscribeCapital;
