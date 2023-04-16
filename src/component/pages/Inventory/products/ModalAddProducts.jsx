import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import * as Yup from "yup"; 
import { StoreContext } from "../../../../store/StoreContext";
import { queryData } from "../../../helpers/queryData";
import { setError, setIsAdd, setMessage, setSuccess } from "../../../../store/StoreAction";
import { InputSelect, InputText } from "../../../helpers/FormInputs";
import ButtonSpinner from "../../../partials/spinners/ButtonSpinner";
import { getDateNow } from "../../../helpers/functions-general";
import useQueryData from "../../../custom-hooks/useQueryData";
 

const ModalAddProducts = ({ item }) => {
  const { store, dispatch } = React.useContext(StoreContext);

  // use if not loadmore button undertime
  const { data: suppliers, isLoading } = useQueryData(
    `/v1/suppliers`, // endpoint
    "get", // method
    "select-suppliers" // key
  );
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        item ? `/v1/product/${item.product_aid}` : `/v1/product `,
        item ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["product"] });
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

  const initVal = {
    product_item_name: item ? item.product_item_name : "",
    product_supplier_id: item ? item.product_supplier_id : "", 
    product_date: item ? item.product_date : getDateNow(), 
  };

  const yupSchema = Yup.object({
    product_item_name: Yup.string().required("Required"),
    product_supplier_id: Yup.string().required("Required"), 
    product_date: Yup.string().required("Required"), 
  });


  return (
    <>
      <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-dark bg-opacity-50 z-50">
        <div className="p-1 w-[350px] rounded-b-2xl">
          <div className="flex justify-between items-center bg-primary p-3 rounded-t-2xl">
            <h3 className="text-white text-sm">
              {item ? "Update" : "Add"} product
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
                mutation.mutate(values);
              }}
            >
              {(props) => {
                return (
                  <Form>
                    <div className="relative my-5">
                      <InputText
                        label="Date"
                        type="text"
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) => (e.target.type = "text")}
                        name="product_date"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="relative my-5">
                      <InputSelect
                        name="product_supplier_id"
                        label="Supplier" 
                        disabled={mutation.isLoading}  
                      >
                        <option value="">
                          {isLoading ? "Loading..." : "--"}
                        </option>
                        {suppliers?.data.map((sItem, key) => {
                          return (
                            <option
                              key={key}
                              value={sItem.suppliers_aid} 
                            > {`${sItem.suppliers_company_name} `} 
                            </option>
                          );
                        })}
                      </InputSelect>
                    </div>
                      <div className="relative my-5">
                        <InputText
                          label="Products Name"
                          type="text"
                          name="product_item_name"
                          disabled={mutation.isLoading}
                        />
                      </div> 
                      

                    <div className="flex items-center gap-1 pt-5">
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

export default ModalAddProducts;
