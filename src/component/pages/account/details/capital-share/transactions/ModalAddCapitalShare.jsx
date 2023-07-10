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
import useQueryData from "../../../../../custom-hooks/useQueryData";
import { InputText } from "../../../../../helpers/FormInputs";
import {
  getDateTimeNow,
  getUrlParam,
} from "../../../../../helpers/functions-general";
import { queryData } from "../../../../../helpers/queryData";
import ButtonSpinner from "../../../../../partials/spinners/ButtonSpinner";

const ModalAddCapitalShare = ({ item, amount, raminingAmount, total }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const memberid = getUrlParam().get("memberid");

  const queryClient = useQueryClient();
  const [show, setShow] = React.useState("show");

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        item
          ? `/v1/capital-share/${item.capital_share_aid}`
          : `/v1/capital-share`,
        item ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["capital-share"] });

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
    capital_share_or: item ? item.capital_share_or : "",
    capital_share_date: item ? item.capital_share_date : getDateTimeNow(),
  };

  const yupSchema = Yup.object({
    capital_share_or: Yup.string().required("Required"),
    capital_share_date: Yup.string().required("Required"),
  });

  return (
    <>
      <div
        className={` fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-dark z-50 bg-opacity-50 animate-fadeIn ${show}`}
      >
        <div className="p-1 w-[350px] rounded-b-2xl animate-slideUp ">
          <div className="flex justify-between items-center bg-primary p-3 rounded-t-2xl">
            <h3 className="text-white text-sm">
              {item ? "Update" : "Add"} Capital Share
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
                const capital_share_paid_up =
                  amount[0]?.capital_amortization_amount;
                const capital_share_member_id = item
                  ? item.capital_share_member_id
                  : memberid;
                const capital_share_total =
                  Number(total) + Number(capital_share_paid_up);
                console.log("capital_share_total", capital_share_total);
                if (Number(raminingAmount) < Number(capital_share_paid_up)) {
                  dispatch(setError(true));
                  dispatch(setMessage("invalid amount"));
                  return;
                }
                // mutate data
                mutation.mutate({
                  ...values,
                  capital_share_total,
                  capital_share_paid_up,
                  capital_share_member_id,
                });
              }}
            >
              {(props) => {
                return (
                  <Form className="">
                    <div className="relative my-5">
                      <InputText
                        label="Date"
                        type="datetime-local"
                        name="capital_share_date"
                        disabled={mutation.isLoading}
                      />
                    </div>

                    <div className="relative mb-5">
                      <InputText
                        label="Official Receipt"
                        type="text"
                        name="capital_share_or"
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

export default ModalAddCapitalShare;
