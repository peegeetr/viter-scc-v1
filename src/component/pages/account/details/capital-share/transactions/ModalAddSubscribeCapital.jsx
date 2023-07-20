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
} from "../../../../../../store/StoreAction";
import { StoreContext } from "../../../../../../store/StoreContext";
import { InputText } from "../../../../../helpers/FormInputs";
import {
  getDateNow,
  getUrlParam,
  numberWithCommas,
  pesoSign,
} from "../../../../../helpers/functions-general";
import { queryData } from "../../../../../helpers/queryData";
import ButtonSpinner from "../../../../../partials/spinners/ButtonSpinner";
import { getMonthYear } from "../functions-capital-share";

const ModalAddSubscribeCapital = ({ subscribeCapital }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const memberid = getUrlParam().get("memberid");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) => queryData(`/v1/capital-share`, "post", values),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["capital-share"] });

      // show success box
      if (data.success) {
        dispatch(setIsEditProfile(false));
        dispatch(setSuccess(true));
        dispatch(setMessage(`Successfuly added.`));
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
    capital_share_member_id: memberid,
    capital_share_paid_up: 0,
    capital_share_or: "none",
    capital_share_is_penalty: 0,
    capital_share_date: getDateNow(),
    capital_share_total: "",
  };

  const yupSchema = Yup.object({
    capital_share_date: Yup.string().required("Required"),
  });

  return (
    <>
      <div
        className={` fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-dark z-50 bg-opacity-50 animate-fadeIn `}
      >
        <div className="p-1 w-[350px] rounded-b-2xl animate-slideUp ">
          <div className="flex justify-between items-center bg-primary p-3 rounded-t-2xl">
            <h3 className="text-white text-sm">Add Capital Share</h3>
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
                const date = getMonthYear(values.capital_share_date);
                const capital_share_date = values.capital_share_date.replace(
                  "T",
                  " "
                );
                const capital_share_total = subscribeCapital;

                // mutate data
                mutation.mutate({
                  ...values,
                  date,
                  capital_share_date,
                  capital_share_total,
                });
              }}
            >
              {(props) => {
                return (
                  <Form className="">
                    <div className="relative my-5">
                      <InputText
                        label="Date"
                        type="date"
                        name="capital_share_date"
                        disabled={mutation.isLoading}
                      />
                    </div>

                    <p className="text-primary pl-3">
                      Capital Share :
                      <span className="text-black">
                        {pesoSign}{" "}
                        {numberWithCommas(Number(subscribeCapital).toFixed(2))}
                      </span>
                    </p>

                    <div className="flex items-center gap-1 pt-3">
                      <button
                        type="submit"
                        disabled={mutation.isLoading}
                        className="btn-modal-submit relative"
                      >
                        {mutation.isLoading ? <ButtonSpinner /> : "Add"}
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

export default ModalAddSubscribeCapital;
