import {
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import * as Yup from "yup";
import { StoreContext } from "../../../../store/StoreContext";
import { queryData } from "../../../helpers/queryData";
import {
  setError,
  setIsAdd,
  setMessage,
  setSuccess,
} from "../../../../store/StoreAction";
import { InputSelect, InputText } from "../../../helpers/FormInputs";
import ButtonSpinner from "../../../partials/spinners/ButtonSpinner";
import useQueryData from "../../../custom-hooks/useQueryData";
import { getDateNow } from "../../../helpers/functions-general";
import { getRemaningQuantity } from "../products/functions-product";
import { queryDataInfinite } from "../../../helpers/queryDataInfinite";

const ModalAddOrders = ({ item, arrKey }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [categoryId, setCategoryId] = React.useState(
    item ? item.suppliers_products_category_id : ""
  );
  const [productId, setProductId] = React.useState(
    item ? item.suppliers_products_aid : ""
  );
  const [isSubmit, setSubmit] = React.useState(false);
  const [isFilter, setFilter] = React.useState(false);
  const [priceId, setPriceId] = React.useState(
    item ? item.suppliers_products_scc_price : ""
  );
  const [loading, setSelLoading] = React.useState(false);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        item ? `/v1/orders/${item.orders_aid}` : `/v1/orders`,
        item ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [arrKey] });
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

  // use if not loadmore button undertime
  const { data: stocksGroupProd } = useQueryData(
    `/v1/stocks/group-by-prod`, // endpoint
    "get", // method
    "stocksGroupProd" // key
  );
  // use if not loadmore button undertime
  const { data: orderGroupProd } = useQueryData(
    `/v1/orders/group-by-prod`, // endpoint
    "get", // method
    "orderGroupProd" // key
  );
  // use if not loadmore button undertime
  const { data: memberApproved } = useQueryData(
    `/v1/members/approved`, // endpoint
    "get", // method
    "memberApproved" // key
  );

  // use if not loadmore button undertime
  const { data: categoryData } = useQueryData(
    `/v1/category`, // endpoint
    "get", // method
    "categoryData" // key
  );
  const { data: result, status } = useInfiniteQuery({
    queryKey: ["category-product", isSubmit],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/v1/suppliers-product/read-category-id/${categoryId}`, // filter endpoint
        `/v1/suppliers-product/read-category-id/${
          item ? item.suppliers_products_category_id : "0"
        }`, // list endpoint
        isFilter // search boolean
      ),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total) {
        return lastPage.page + lastPage.count;
      }
      return;
    },
    refetchOnWindowFocus: false,
    cacheTime: 1000,
  });

  console.log("result", result?.pages[0].data);
  // get employee id
  const handleSupplierProduct = async (e, props) => {
    let categoryId = e.target.value;
    setCategoryId(categoryId);
    setFilter(true);
    setSubmit(!isSubmit);
  };
  // get employee id
  const handleProduct = async (e, props) => {
    setProductId(e.target.value);
    setPriceId(e.target.options[e.target.selectedIndex].id);
  };
  const initVal = {
    orders_member_id: item ? item.orders_member_id : "",
    orders_product_id: item ? item.orders_product_id : "",
    orders_product_quantity: item ? item.orders_product_quantity : "",
    suppliers_products_aid: "",
    orders_product_amount: item ? item.orders_product_amount : "",
    orders_date: item ? item.orders_date : getDateNow(),
    category_id: item ? item.suppliers_products_category_id : "",
  };

  const yupSchema = Yup.object({
    orders_member_id: Yup.string().required("Required"),
    orders_product_id: Yup.string().required("Required"),
    orders_product_quantity: Yup.string().required("Required"),
    category_id: Yup.string().required("Required"),
    orders_date: Yup.string().required("Required"),
  });

  return (
    <>
      <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-dark bg-opacity-50 z-50">
        <div className="p-1 w-[350px] rounded-b-2xl">
          <div className="flex justify-between items-center bg-primary p-3 rounded-t-2xl">
            <h3 className="text-white text-sm">
              {item ? "Update" : "Add"} Order
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
                if (
                  Number(values.orders_product_quantity) >
                    getRemaningQuantity(
                      values,
                      stocksGroupProd,
                      orderGroupProd
                    ) ||
                  getRemaningQuantity(
                    values,
                    stocksGroupProd,
                    orderGroupProd
                  ) === 0
                ) {
                  console.log(
                    "values",
                    values,
                    getRemaningQuantity(values, stocksGroupProd, orderGroupProd)
                  );
                  dispatch(setError(true));
                  dispatch(setMessage("Invalid Quantity"));
                  return;
                }
                console.log(
                  "values",
                  values,
                  getRemaningQuantity(values, stocksGroupProd, orderGroupProd)
                );
                mutation.mutate(values);
              }}
            >
              {(props) => {
                props.values.orders_product_amount =
                  props.values.orders_product_quantity * priceId;
                props.values.suppliers_products_aid = productId;
                return (
                  <Form>
                    <div className="relative mb-6 mt-5">
                      <InputText
                        label="Date"
                        type="text"
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) => (e.target.type = "text")}
                        name="orders_date"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="relative my-5">
                      <InputSelect
                        name="orders_member_id"
                        label="Member"
                        disabled={mutation.isLoading}
                      >
                        <option value="" hidden>
                          {loading ? "Loading..." : "--"}
                        </option>
                        {memberApproved?.data.map((cItem, key) => {
                          return (
                            <option key={key} value={cItem.members_aid}>
                              {`${cItem.members_last_name}, ${cItem.members_first_name} `}
                            </option>
                          );
                        })}
                      </InputSelect>
                    </div>
                    <div className="relative my-5">
                      <InputSelect
                        name="category_id"
                        label="Category"
                        onChange={handleSupplierProduct}
                        disabled={status === "loading" || mutation.isLoading}
                      >
                        <option value="" hidden>
                          {status === "loading" ? "Loading..." : "--"}
                        </option>
                        {categoryData?.data.map((cItem, key) => {
                          return (
                            <option
                              key={key}
                              value={cItem.product_category_aid}
                            >
                              {`${cItem.product_category_name} `}
                            </option>
                          );
                        })}
                      </InputSelect>
                    </div>
                    <div className="relative my-5">
                      <InputSelect
                        name="orders_product_id"
                        label="Supplier Product"
                        onChange={handleProduct}
                        disabled={mutation.isLoading}
                      >
                        <option value="" hidden>
                          {loading ? "Loading..." : "--"}
                        </option>{" "}
                        {result?.pages[0].data.length === 0 ? (
                          <option value="">NO DATA</option>
                        ) : (
                          result?.pages.map((page, key) => (
                            <React.Fragment key={key}>
                              {page.data.map((pItem, key) => {
                                return (
                                  <option
                                    key={key}
                                    value={pItem.suppliers_products_aid}
                                    id={pItem.suppliers_products_scc_price}
                                  >
                                    {`${
                                      pItem.suppliers_products_name
                                    }  (${getRemaningQuantity(
                                      pItem,
                                      stocksGroupProd,
                                      orderGroupProd
                                    )})`}
                                  </option>
                                );
                              })}
                            </React.Fragment>
                          ))
                        )}
                      </InputSelect>
                    </div>
                    <div className="relative my-5">
                      <InputText
                        label="Quantity"
                        type="text"
                        name="orders_product_quantity"
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

export default ModalAddOrders;
