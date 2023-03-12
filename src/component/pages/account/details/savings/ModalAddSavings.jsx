import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import * as Yup from "yup";
import {
  setError,
  setIsAdd,
  setMessage,
  setSuccess
} from "../../../../../store/StoreAction";
import { StoreContext } from "../../../../../store/StoreContext";
import { InputText } from "../../../../helpers/FormInputs";
import { queryData } from "../../../../helpers/queryData";
import ButtonSpinner from "../../../../partials/spinners/ButtonSpinner";

const ModalAddSavings = ({ item }) => {
  const { store, dispatch } = React.useContext(StoreContext);
 
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
        dispatch(setMessage(`Successfuly ${item ? "updated." : "added."}`));}

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
    savings_balance: item ? item.savings_balance : "0",
    savings_total: item ? item.savings_total : "0",
    savings_date: item ? item.savings_date : "",
    savings_amount: item ? item.savings_amount : "",
    savings_member_id: item ? item.savings_member_id : "2" 
 
  };

  const yupSchema = Yup.object({ 
    savings_amount: Yup.string().required("Required"), 
    savings_date: Yup.string().required("Required"),  
    });

  return (
    <>
    <div
      className={`modal fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-dark z-50 animate-fadeIn ${show}`}
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
              console.log(values)
              // mutate data
              mutation.mutate(values);
            }}
          >

            {(props) => {  
              return (
                <Form className="">  

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
                      label="Amount"
                      type="text"
                      name="savings_amount"
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

export default ModalAddSavings;
