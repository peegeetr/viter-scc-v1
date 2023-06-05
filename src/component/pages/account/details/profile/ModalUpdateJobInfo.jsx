import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import * as Yup from "yup";
import {
  setError,
  setIsEditProfile,
  setIsRestore,
  setMessage,
  setSuccess,
} from "../../../../../store/StoreAction";
import { StoreContext } from "../../../../../store/StoreContext";
import { InputSelect, InputText } from "../../../../helpers/FormInputs";
import { queryData } from "../../../../helpers/queryData";
import ButtonSpinner from "../../../../partials/spinners/ButtonSpinner";
import { removeComma } from "../../../../helpers/functions-general";

const ModalUpdateJobInfo = ({ item }) => {
  const { store, dispatch } = React.useContext(StoreContext);

  let jobinfo = "jobinfo";
  const queryClient = useQueryClient();
  const [show, setShow] = React.useState("show");

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(`/v1/members/${item.members_aid}/${jobinfo}`, "put", values),
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
    members_income_gross: item.members_income_gross,
    members_income_net: item.members_income_net,
    members_position: item.members_position,
    members_other_source_income: item.members_other_source_income,
    members_other_income: item.members_other_income,
  };

  const yupSchema = Yup.object({
    members_income_gross: Yup.string().required("Required"),
    members_position: Yup.string().required("Required"),
    members_income_net: Yup.string().required("Required"),
    members_other_source_income: Yup.string().required("Required"),
    members_other_income: Yup.string().required("Required"),
  });

  return (
    <>
      <div
        className={`bg-opacity-50 fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-dark z-50 animate-fadeIn ${show}`}
      >
        <div className="p-1 w-[350px] rounded-b-2xl animate-slideUp ">
          <div className="flex justify-between items-center bg-primary p-3 rounded-t-2xl">
            <h3 className="text-white text-sm">Update Job Information</h3>
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
                const members_income_gross = removeComma(
                  `${values.members_income_gross}`
                );
                const members_income_net = removeComma(
                  `${values.members_income_net}`
                );
                const members_other_income = removeComma(
                  `${values.members_other_income}`
                );
                // console.log(values);
                // mutate data
                mutation.mutate({
                  ...values,
                  members_income_gross,
                  members_income_net,
                  members_other_income,
                });
              }}
            >
              {(props) => {
                return (
                  <Form className="pt-5">
                    <div className="relative mb-5">
                      <InputText
                        label="Job Position"
                        type="text"
                        name="members_position"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="relative mb-5">
                      <InputText
                        label="Gross Income"
                        type="text"
                        num="num"
                        name="members_income_gross"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="relative mb-5">
                      <InputText
                        label="Net Income"
                        type="text"
                        num="num"
                        name="members_income_net"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="relative mb-5">
                      <InputText
                        label="Other Siource of Income"
                        type="text"
                        name="members_other_source_income"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="relative mb-5">
                      <InputText
                        label="Gross Income"
                        type="text"
                        num="num"
                        name="members_other_income"
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

export default ModalUpdateJobInfo;
