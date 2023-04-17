import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import * as Yup from "yup";
import { StoreContext } from "../../../../../store/StoreContext";
import { queryData } from "../../../../helpers/queryData";
import {
  setError,
  setIsAdd,
  setMessage,
  setSuccess,
} from "../../../../../store/StoreAction";
import { InputText } from "../../../../helpers/FormInputs";
import ButtonSpinner from "../../../../partials/spinners/ButtonSpinner";
import { getUrlParam } from "../../../../helpers/functions-general";

const ModalAddSuppliersProducts = ({ item }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const supplierId = getUrlParam().get("supplierId");

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        item
          ? `/v1/suppliers-product/${item.suppliers_products_aid}`
          : `/v1/suppliers-product`,
        item ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["suppliers-product"] });
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
    suppliers_products_suppliers_id: supplierId,
    suppliers_products_name: item ? item.suppliers_products_name : "",
    suppliers_products_price: item ? item.suppliers_products_price : "",

    suppliers_products_name_old: item ? item.suppliers_products_name : "",
  };

  const yupSchema = Yup.object({
    suppliers_products_name: Yup.string().required("Required"),
    suppliers_products_price: Yup.string().required("Required"),
  });

  return (
    <>
      <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-dark bg-opacity-50 z-50">
        <div className="p-1 w-[350px] rounded-b-2xl">
          <div className="flex justify-between items-center bg-primary p-3 rounded-t-2xl">
            <h3 className="text-white text-sm">
              {item ? "Update" : "Add"} Products
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
                        label="Product Name"
                        type="text"
                        name="suppliers_products_name"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="relative my-5">
                      <InputText
                        label="Product Price"
                        type="text"
                        name="suppliers_products_price"
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

export default ModalAddSuppliersProducts;
