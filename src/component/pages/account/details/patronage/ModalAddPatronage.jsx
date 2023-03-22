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
import useQueryData from "../../../../custom-hooks/useQueryData";
import { InputSelect, InputText } from "../../../../helpers/FormInputs";
import { getUrlParam } from "../../../../helpers/functions-general";
import { queryData } from "../../../../helpers/queryData";
import ButtonSpinner from "../../../../partials/spinners/ButtonSpinner";
import { computeQuantity, computeTotalSold } from "../functions-capital-share";

const ModalAddPatronage = ({ item }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const memberid = getUrlParam().get("memberid");
  const [productPrice, setproductPrice] = React.useState(
    item ? item.product_price : ""
  );
  const [sold, setSold] = React.useState("");

  // use if not loadmore button undertime
  const { data: PatronageId, isLoading } = useQueryData(
    `/v1/product`, // endpoint
    "get", // method
    "payslip" // key
  );
  const queryClient = useQueryClient();
  const [show, setShow] = React.useState("show");

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        item ? `/v1/patronage/${item.patronage_aid}` : `/v1/patronage`,
        item ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["patronage"] });

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

  const handlePrice = async (e, props) => {
    // get employee id
    setproductPrice(e.target.options[e.target.selectedIndex].id);
  };
  const handleClose = () => {
    dispatch(setIsAdd(false));
  };

  const initVal = {
    patronage_product_id: item ? item.patronage_product_id : "",
    patronage_member_id: item ? item.patronage_member_id : memberid,
    patronage_or: item ? item.patronage_or : "",
    patronage_product_quantity: item ? item.patronage_product_quantity : "",
    patronage_product_amount: "",
    total_product_quantity: "",
    patronage_date: item ? item.patronage_date : "",
  };

  const yupSchema = Yup.object({
    patronage_product_id: Yup.string().required("Required"),
    patronage_product_quantity: Yup.string().required("Required"),
    patronage_date: Yup.string().required("Required"),
    patronage_or: Yup.string().required("Required"),
  });
  return (
    <>
      <div
        className={`modal fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-dark z-50 animate-fadeIn ${show}`}
      >
        <div className="p-1 w-[350px] rounded-b-2xl animate-slideUp ">
          <div className="flex justify-between items-center bg-primary p-3 rounded-t-2xl">
            <h3 className="text-white text-sm">
              {item ? "Update" : "Add"} patronage
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
                setSold(computeTotalSold(values, PatronageId));
                console.log("total", computeTotalSold(values, PatronageId));
                // mutate data
                mutation.mutate(values);
              }}
            >
              {(props) => {
                props.values.total_product_quantity = sold;
                props.values.patronage_product_amount =
                  Number(props.values.patronage_product_quantity) *
                  Number(productPrice);
                return (
                  <Form className="">
                    <div className="relative my-5">
                      <InputSelect
                        name="patronage_product_id"
                        label="Product"
                        onChange={handlePrice}
                        disabled={mutation.isLoading}
                        onFocus={(e) =>
                          e.target.parentElement.classList.add("focused")
                        }
                      >
                        <option value="">
                          {isLoading ? "Loading..." : "--"}
                        </option>
                        {PatronageId?.data.map((pItem, key) => {
                          return (
                            <option
                              key={key}
                              value={pItem.product_aid}
                              id={pItem.product_price}
                            >
                              {`${pItem.product_item_name} (${computeQuantity(
                                pItem
                              )})`}
                            </option>
                          );
                        })}
                      </InputSelect>
                    </div>
                    <div className="relative mb-5">
                      <InputText
                        label="Quality"
                        type="text"
                        name="patronage_product_quantity"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="relative mb-6 mt-5">
                      <InputText
                        label="Date"
                        type="text"
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) => (e.target.type = "text")}
                        name="patronage_date"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="relative mb-5">
                      <InputText
                        label="OR"
                        type="text"
                        name="patronage_or"
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

export default ModalAddPatronage;
