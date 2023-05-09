import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import * as Yup from "yup";
import {
  setError,
  setIsEditProfile,
  setMessage,
  setSuccess,
} from "../../../../../store/StoreAction";
import { StoreContext } from "../../../../../store/StoreContext";
import { InputText } from "../../../../helpers/FormInputs";
import { queryData } from "../../../../helpers/queryData";
import ButtonSpinner from "../../../../partials/spinners/ButtonSpinner";

const ModalUpdateSpouseInfo = ({ item }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  let spouse = "spouse";
  const queryClient = useQueryClient();
  const [show, setShow] = React.useState("show");

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(`/v1/members/${item.members_aid}/${spouse}`, "put", values),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["members"] });

      // show success box
      if (data.success) {
        dispatch(setIsEditProfile(false));
        dispatch(setSuccess(true));
        dispatch(setMessage(`Successfuly updated`));
      }

      // show error box
      if (!data.success) {
        dispatch(setError(true));
        dispatch(setMessage(data.error));
      }
    },
  });
  const handleClose = () => {
    dispatch(setIsEditProfile(false));
  };

  const initVal = {
    members_spouse_occupation: item.members_spouse_occupation,
    members_spouse_income: item.members_spouse_income,
    members_spouse_net_income: item.members_spouse_net_income,
    members_properties_owned: item.members_properties_owned,
  };

  const yupSchema = Yup.object({
    members_spouse_occupation: Yup.string().required("Required"),
    members_spouse_income: Yup.string().required("Required"),
    members_properties_owned: Yup.string().required("Required"),
    members_spouse_net_income: Yup.string().required("Required"),
  });

  return (
    <>
      <div
        className={`modal fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-dark z-50 animate-fadeIn ${show}`}
      >
        <div className="p-1 w-[350px] rounded-b-2xl animate-slideUp ">
          <div className="flex justify-between items-center bg-primary p-3 rounded-t-2xl">
            <h3 className="text-white text-sm">Update Spouse Information</h3>
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
                        label="Spouse Occupation"
                        type="text"
                        name="members_spouse_occupation"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="relative mb-5">
                      <InputText
                        label="Spouse Gross Income"
                        type="text"
                        name="members_spouse_income"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="relative mb-5">
                      <InputText
                        label="Spouse Net Income"
                        type="text"
                        name="members_spouse_net_income"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="relative mb-5">
                      <InputText
                        label="Properties owned"
                        type="text"
                        name="members_properties_owned"
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

export default ModalUpdateSpouseInfo;
