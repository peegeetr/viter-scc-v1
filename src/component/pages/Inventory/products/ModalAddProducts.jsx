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
import useQueryData from "../../../custom-hooks/useQueryData";
import { InputSelect, InputText } from "../../../helpers/FormInputs";
import { queryData } from "../../../helpers/queryData";
import ButtonSpinner from "../../../partials/spinners/ButtonSpinner";

const ModalAddProducts = ({ item }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [isSupplierProduct, setSupplierProduct] = React.useState([]);
  const [isSupProdId, setSupProdId] = React.useState(
    item ? item.product_supplier_product_id : "0"
  );
  // const [isProdLoading, setProdLoading] = React.useState(false);

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

  // use if not loadmore button undertime
  const { isFetching: loadingSupProd, data: SupProd } = useQueryData(
    `/v1/suppliers-product/by-supplier-id/${isSupProdId}`, // endpoint
    "get", // method
    "SupProd" // key
  );
  const handleSupplier = async (e, props) => {
    let supplierId = e.target.value;
    const results = await queryData(
      `/v1/suppliers-product/by-supplier-id/${supplierId}`
    );
    if (results.data) {
      setSupplierProduct(results.data);
    }
  };
  const initVal = {
    product_supplier_id: item ? item.product_supplier_id : "",
    product_supplier_product_id: item ? item.product_supplier_product_id : "",
    product_scc_price: item ? item.product_scc_price : "",
    product_market_price: item ? item.product_market_price : "",
  };

  const yupSchema = Yup.object({
    product_supplier_id: Yup.string().required("Required"),
    product_supplier_product_id: Yup.string().required("Required"),
    product_scc_price: Yup.string().required("Required"),
    product_market_price: Yup.string().required("Required"),
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
                      <InputSelect
                        name="product_supplier_id"
                        label="Supplier"
                        onChange={handleSupplier}
                        disabled={mutation.isLoading}
                      >
                        <option value="" hidden>
                          {isLoading ? "Loading..." : "--"}
                        </option>
                        {suppliers?.data.map((sItem, key) => {
                          return (
                            <option key={key} value={sItem.suppliers_aid}>
                              {" "}
                              {`${sItem.suppliers_company_name} `}
                            </option>
                          );
                        })}
                      </InputSelect>
                    </div>
                    <div className="relative my-5">
                      <InputSelect
                        name="product_supplier_product_id"
                        label="Supplier Product"
                        disabled={mutation.isLoading}
                      >
                        <option value="">
                          {loadingSupProd ? "Loading..." : "--"}
                        </option>
                        {item
                          ? SupProd?.data.map((spItem, key) => {
                              return (
                                <option
                                  key={key}
                                  value={spItem.suppliers_products_aid}
                                >
                                  {`${spItem.suppliers_products_name} `}
                                </option>
                              );
                            })
                          : isSupplierProduct?.map((spItem, key) => {
                              return (
                                <option
                                  key={key}
                                  value={spItem.suppliers_products_aid}
                                >
                                  {`${spItem.suppliers_products_name} `}
                                </option>
                              );
                            })}
                      </InputSelect>
                    </div>
                    <div className="relative my-5">
                      <InputText
                        label="Scc Price"
                        type="text"
                        name="product_scc_price"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="relative my-5">
                      <InputText
                        label="Market Price"
                        type="text"
                        name="product_market_price"
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
