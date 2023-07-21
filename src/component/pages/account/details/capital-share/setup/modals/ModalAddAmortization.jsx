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
} from "../../../../../../../store/StoreAction";
import { StoreContext } from "../../../../../../../store/StoreContext";
import useQueryData from "../../../../../../custom-hooks/useQueryData";
import {
  InputText,
  InputTextArea,
  MyCheckbox,
} from "../../../../../../helpers/FormInputs";
import {
  getDateNow,
  getUrlParam,
  removeComma,
} from "../../../../../../helpers/functions-general";
import { queryData } from "../../../../../../helpers/queryData";
import ButtonSpinner from "../../../../../../partials/spinners/ButtonSpinner";
import { getTotalPaidUp } from "../../functions-capital-share";

const ModalAddAmortization = ({ item, subscribeCapital }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const memberid = getUrlParam().get("memberid");

  const queryClient = useQueryClient();
  const [show, setShow] = React.useState(
    item &&
      (Number(item.capital_amortization_amount_dividend) !== 0 ||
        Number(item.capital_amortization_amount_patronage) !== 0)
      ? true
      : false
  );

  // use if not loadmore button undertime
  const { data: totalCapital } = useQueryData(
    `/v1/capital-share/read-total-capital/${memberid}`, // endpoint
    "get", // method
    "capital-share" // key
  );

  // use if not loadmore button undertime
  const { data: penaltyById } = useQueryData(
    `/v1/capital-share/read-capital-penalty/${memberid}`, // endpoint
    "get", // method
    "penaltyById"
  );

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        item
          ? `/v1/capital-amortization/${item.capital_amortization_aid}`
          : `/v1/capital-amortization`,
        item ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["capital-amortization-by-id"],
      });

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

  const handleShow = () => {
    setShow(!show);
  };
  const initVal = {
    capital_amortization_amount: item ? item.capital_amortization_amount : "",
    capital_amortization_amount_dividend: item
      ? item.capital_amortization_amount_dividend
      : "",
    capital_amortization_amount_patronage: item
      ? item.capital_amortization_amount_patronage
      : "",
    capital_amortization_date: item
      ? item.capital_amortization_date
      : getDateNow(),
    capital_amortization_member_id: item
      ? item.capital_amortization_member_id
      : memberid,
    capital_amortization_remarks: item ? item.capital_amortization_remarks : "",

    isCheckBoxTrue: "",
  };

  const yupSchema = Yup.object({
    capital_amortization_amount: Yup.string().required("Required"),
    capital_amortization_date: Yup.string().required("Required"),
    capital_amortization_amount_dividend:
      show && Yup.string().required("Required"),
    capital_amortization_amount_patronage:
      show && Yup.string().required("Required"),
  });

  return (
    <>
      <div
        className={` fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-dark z-50 bg-opacity-50 animate-fadeIn show`}
      >
        <div className="p-1 w-[350px] rounded-b-2xl animate-slideUp ">
          <div className="flex justify-between items-center bg-primary p-3 rounded-t-2xl">
            <h3 className="text-white text-sm">
              {item ? "Update" : "Add"} Amortization
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

                const capital_amortization_amount = removeComma(
                  `${values.capital_amortization_amount}`
                );
                const capital_amortization_amount_dividend = show
                  ? removeComma(
                      `${values.capital_amortization_amount_dividend}`
                    )
                  : 0;
                const capital_amortization_amount_patronage = show
                  ? removeComma(
                      `${values.capital_amortization_amount_patronage}`
                    )
                  : 0;
                const totalAmortization =
                  Number(capital_amortization_amount) +
                  Number(capital_amortization_amount_dividend) +
                  Number(capital_amortization_amount_patronage);

                if (
                  getTotalPaidUp(
                    totalCapital,
                    subscribeCapital,
                    totalAmortization,
                    penaltyById
                  )
                ) {
                  dispatch(setError(true));
                  dispatch(
                    setMessage(`Input amount is more than remining balance`)
                  );
                  return;
                }

                // mutate data
                mutation.mutate({
                  ...values,
                  capital_amortization_amount,
                  capital_amortization_amount_dividend,
                  capital_amortization_amount_patronage,
                });
              }}
            >
              {(props) => {
                props.values.isCheckBoxTrue = show;
                return (
                  <Form className="">
                    <div className="relative my-5">
                      <InputText
                        label="Date"
                        type="date"
                        name="capital_amortization_date"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="relative my-5">
                      <InputText
                        label="Amount"
                        type="text"
                        num="num"
                        name="capital_amortization_amount"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="relative mb-3 flex items-center">
                      <span>
                        <MyCheckbox
                          type="checkbox"
                          name="isCheckBoxTrue"
                          onClick={handleShow}
                          disabled={mutation.isLoading}
                        />
                      </span>
                      <p className="w-[80%] m-0 text-primary">
                        Add dividend and patronage?
                      </p>
                    </div>
                    {show && (
                      <>
                        <div className="relative my-5">
                          <InputText
                            label="Dividend"
                            type="text"
                            num="num"
                            name="capital_amortization_amount_dividend"
                            disabled={mutation.isLoading}
                          />
                        </div>
                        <div className="relative my-5">
                          <InputText
                            label="Patronage"
                            type="text"
                            num="num"
                            name="capital_amortization_amount_patronage"
                            disabled={mutation.isLoading}
                          />
                        </div>
                      </>
                    )}
                    <div className="relative my-5">
                      <InputTextArea
                        label="Remarks"
                        type="text"
                        num="num"
                        name="capital_amortization_remarks"
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

export default ModalAddAmortization;
