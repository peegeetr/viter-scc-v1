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
} from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import { InputText } from "../../../helpers/FormInputs";
import { queryData } from "../../../helpers/queryData";
import ButtonSpinner from "../../../partials/spinners/ButtonSpinner";
import { numberWithCommas } from "../../../helpers/functions-general";

const ModalUpdateProducts = ({ item }) => {
  const { store, dispatch } = React.useContext(StoreContext);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(`/v1/product/${item.suppliers_products_aid}`, "put", values),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["all-product"] });
      // show success box
      if (data.success) {
        dispatch(setIsAdd(false));
        dispatch(setSuccess(true));
        dispatch(setMessage(`Successfuly updated.`));
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
    suppliers_products_scc_price: item.suppliers_products_scc_price,
    suppliers_products_market_price: item.suppliers_products_market_price,
  };

  const yupSchema = Yup.object({
    suppliers_products_scc_price: Yup.string().required("Required"),
    suppliers_products_market_price: Yup.string().required("Required"),
  });

  return (
    <>
      <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-dark bg-opacity-50 z-50">
        <div className="p-1 w-[350px] rounded-b-2xl">
          <div className="flex justify-between items-center bg-primary p-3 rounded-t-2xl">
            <h3 className="text-white text-sm">Update Product</h3>
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
                const suppliers_products_scc_price = removeComma(
                  `${values.suppliers_products_scc_price}`
                );
                const suppliers_products_market_price = removeComma(
                  `${values.suppliers_products_market_price}`
                );
                mutation.mutate({
                  ...values,
                  suppliers_products_scc_price,
                  suppliers_products_market_price,
                });
              }}
            >
              {(props) => {
                return (
                  <Form>
                    <div className="pl-3">
                      <p className="text-primary mb-0">
                        Product:
                        <span className="ml-2 text-black">
                          {item.suppliers_products_name}
                        </span>
                      </p>
                      <p className="text-primary">
                        Supplier Price:
                        <span className="ml-2 text-black">
                          &#8369;{" "}
                          {numberWithCommas(
                            Number(item.suppliers_products_price).toFixed(2)
                          )}
                        </span>
                      </p>
                    </div>
                    <div className="relative my-5">
                      <InputText
                        label="Scc Price"
                        type="text"
                        num="num"
                        name="suppliers_products_scc_price"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="relative my-5">
                      <InputText
                        label="Market Price"
                        type="text"
                        num="num"
                        name="suppliers_products_market_price"
                        disabled={mutation.isLoading}
                      />
                    </div>

                    <div className="flex items-center gap-1 pt-5">
                      <button
                        type="submit"
                        disabled={mutation.isLoading || !props.dirty}
                        className="btn-modal-submit relative"
                      >
                        {mutation.isLoading && <ButtonSpinner />}
                        Save
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

export default ModalUpdateProducts;
