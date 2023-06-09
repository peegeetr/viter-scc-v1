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
} from "../../../../../store/StoreAction";
import { StoreContext } from "../../../../../store/StoreContext";
import { InputSelect, InputText } from "../../../../helpers/FormInputs";
import { getUrlParam } from "../../../../helpers/functions-general";
import { queryData } from "../../../../helpers/queryData";
import ButtonSpinner from "../../../../partials/spinners/ButtonSpinner";

const ModalAddSavings = ({ item }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const memberid = getUrlParam().get("memberid");
  const [category, setCategory] = React.useState(
    item ? item.savings_category : ""
  );

  const queryClient = useQueryClient();
  const [show, setShow] = React.useState("show");

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        item ? `/v1/savings/${item.savings_aid}` : `/v1/savings`,
        item ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["savings"] });

      // show success box
      if (data.success) {
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

  const handleCategory = async (e, props) => {
    // get employee id
    setCategory(e.target.value);
  };
  const initVal = {
    savings_category: item ? item.savings_category : "",
    savings_date: item ? item.savings_date : "",
    savings_deposite: item ? item.savings_deposite : "0",
    savings_withdrawal: item ? item.savings_withdrawal : "0",
    savings_interest: item ? item.savings_interest : "0",
    savings_member_id: item ? item.savings_member_id : memberid,
    savings_or: item ? item.savings_or : "",
  };

  const yupSchema = Yup.object({
    savings_deposite: category === "0" && Yup.string().required("Required"),
    savings_withdrawal: category === "1" && Yup.string().required("Required"),
    savings_date: Yup.string().required("Required"),
    savings_or: Yup.string().required("Required"),
  });
  return (
    <>
      <div
        className={`bg-opacity-50 fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-dark z-50 animate-fadeIn ${show}`}
      >
        <div className="p-1 w-[350px] rounded-b-2xl animate-slideUp ">
          <div className="flex justify-between items-center bg-primary p-3 rounded-t-2xl">
            <h3 className="text-white text-sm">
              {item ? "Update" : "Add"} Savings
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
                // mutate data
                mutation.mutate(values);
              }}
            >
              {(props) => {
                props.values.savings_deposite =
                  category === "0" ? props.values.savings_deposite : "0";
                props.values.savings_withdrawal =
                  category === "1" ? props.values.savings_withdrawal : "0";
                return (
                  <Form className="">
                    <div className="relative my-5">
                      <InputSelect
                        name="savings_category"
                        label="Category"
                        onChange={handleCategory}
                        disabled={mutation.isLoading}
                        onFocus={(e) =>
                          e.target.parentElement.classList.add("focused")
                        }
                      >
                        <option value="" hidden>
                          --
                        </option>
                        <option value="0">Savings Deposite</option>
                        <option value="1">Savings Withdrawal</option>
                      </InputSelect>
                    </div>
                    <div className="relative mb-6 mt-5">
                      <InputText
                        label="Date"
                        type="text"
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) => (e.target.type = "text")}
                        name="savings_date"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="relative mb-5">
                      <InputText
                        label="Official Receipt"
                        type="text"
                        name="savings_or"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    {category !== "" && (
                      <>
                        {category === "0" && (
                          <div className="relative mb-5">
                            <InputText
                              label="Amount Deposite"
                              type="text"
                              name="savings_deposite"
                              disabled={mutation.isLoading}
                            />
                          </div>
                        )}

                        {category === "1" && (
                          <div className="relative mb-5">
                            <InputText
                              label="Amount Withdraw"
                              type="text"
                              name="savings_withdrawal"
                              disabled={mutation.isLoading}
                            />
                          </div>
                        )}
                      </>
                    )}

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

export default ModalAddSavings;
