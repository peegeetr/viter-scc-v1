import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import * as Yup from "yup";
import {
  setError,
  setIsBeneficiaries,
  setMessage,
  setSuccess,
} from "../../../../../store/StoreAction";
import { StoreContext } from "../../../../../store/StoreContext";
import { InputText } from "../../../../helpers/FormInputs";
import { queryData } from "../../../../helpers/queryData";
import ButtonSpinner from "../../../../partials/spinners/ButtonSpinner";

const ModalAddBeneficiaries = ({ item, memberid }) => {
  const { store, dispatch } = React.useContext(StoreContext);

  const queryClient = useQueryClient();
  const [show, setShow] = React.useState("show");

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        item
          ? `/v1/beneficiaries/${item.beneficiaries_aid}`
          : `/v1/beneficiaries`,
        item ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["beneficiaries"] });
      dispatch(setIsBeneficiaries(false));

      // show success box
      if (data.success) {
        dispatch(setIsBeneficiaries(false));
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
    dispatch(setIsBeneficiaries(false));
  };

  const initVal = {
    beneficiaries_name: item ? item.beneficiaries_name : "",
    beneficiaries_relationship: item ? item.beneficiaries_relationship : "",
    beneficiaries_employee_id: memberid,

    beneficiaries_name_old: item ? item.beneficiaries_name : "",
  };

  const yupSchema = Yup.object({
    beneficiaries_name: Yup.string().required("Required"),
    beneficiaries_relationship: Yup.string().required("Required"),
  });

  return (
    <>
      <div
        className={`modal fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-dark z-50 animate-fadeIn ${show}`}
      >
        <div className="p-1 w-[350px] rounded-b-2xl animate-slideUp ">
          <div className="flex justify-between items-center bg-primary p-3 rounded-t-2xl">
            <h3 className="text-white text-sm">
              Update Additional Information
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
                console.log(values);
                // mutate data
                mutation.mutate(values);
              }}
            >
              {(props) => {
                return (
                  <Form className="pt-5">
                    <div className="relative mb-5">
                      <InputText
                        label="Full Name"
                        type="text"
                        name="beneficiaries_name"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="relative mb-5">
                      <InputText
                        label="Relationship"
                        type="text"
                        name="beneficiaries_relationship"
                        disabled={mutation.isLoading}
                      />
                    </div>

                    <div className="flex items-center gap-1 pt-3">
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

export default ModalAddBeneficiaries;
