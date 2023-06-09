import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React from "react";
import { FaQuestionCircle, FaTimesCircle } from "react-icons/fa";
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

const ModalUpdateOR = ({
  isDel,
  mysqlApiReset,
  mysqlApiArchive,
  msg,
  item,
  arrKey,
}) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(isDel ? mysqlApiReset : mysqlApiArchive, "put", values),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [arrKey] });
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
    isActive: 0,
    stocks_or: "",
  };

  const yupSchema = Yup.object({
    stocks_or: Yup.string().required("Required"),
  });

  return (
    <>
      <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-dark bg-opacity-50 z-50">
        <div className="p-1 w-[350px] rounded-b-2xl">
          <div className="flex justify-end items-center bg-white p-3 pb-0 rounded-t-2xl">
            <button
              type="button"
              className="text-primary text-base"
              onClick={handleClose}
            >
              <FaTimesCircle />
            </button>
          </div>
          <div className="bg-white p-4 rounded-b-2xl text-center ">
            <span className="text-5xl text-red-700 ">
              <FaQuestionCircle className="my-0 mx-auto" />
            </span>
            <span className="text-sm font-bold">{msg}</span>
            <br />
            <span className="text-sm font-bold break-all">
              {item}? if yes, enter Sales invoice number
            </span>

            <div className="bg-white rounded-b-2xl">
              <Formik
                initialValues={initVal}
                validationSchema={yupSchema}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                  // console.log(values);
                  mutation.mutate(values);
                }}
              >
                {(props) => {
                  return (
                    <Form>
                      <div className="relative my-5">
                        <InputText
                          label="Sales invoice number"
                          type="text"
                          name="stocks_or"
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
      </div>
    </>
  );
};

export default ModalUpdateOR;
