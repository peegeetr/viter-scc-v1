import { useInfiniteQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React from "react";
import { MdFilterAlt } from "react-icons/md";
import * as Yup from "yup";
import { StoreContext } from "../../../../../store/StoreContext";
import useQueryData from "../../../../custom-hooks/useQueryData";
import { InputSelect, InputText } from "../../../../helpers/FormInputs";
import {
  getDateNow,
  numberWithCommas,
  pesoSign,
} from "../../../../helpers/functions-general";
import { queryDataInfinite } from "../../../../helpers/queryDataInfinite";
import NoData from "../../../../partials/NoData";
import ServerError from "../../../../partials/ServerError";
import ButtonSpinner from "../../../../partials/spinners/ButtonSpinner";
import TableSpinner from "../../../../partials/spinners/TableSpinner";
import ModalViewSales from "../../sales/ModalViewSales";
import StockReportTotal from "./StockReportTotal";
import { getProductRemaningQty } from "./functions-report-sales";

const ReportStocksList = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);
  const [isFilter, setFilter] = React.useState(false);
  const [isSubmit, setSubmit] = React.useState(false);
  const [isSupplierId, setIsSupplierId] = React.useState("0");
  const [isCategoryId, setIsCategoryId] = React.useState("0");
  const [value, setValue] = React.useState([]);
  let counter = 1;
  // use if with loadmore button and search bar
  const {
    data: result,
    error,
    isFetching,
    status,
  } = useInfiniteQuery({
    queryKey: ["report-stocks", isSubmit],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/v1/report-stock/filter`, // filter endpoint // filter
        `/v1/report-stock`, // list endpoint default value of filter no data
        isFilter, // search boolean
        "post",
        { value }
      ),

    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total) {
        return lastPage.page + lastPage.count;
      }
      return;
    },
    refetchOnWindowFocus: false,
    networkMode: "always",
    cacheTime: 200,
  });

  // use if not loadmore button undertime
  const { data: suppliersList, isLoading: suppliersListLoading } = useQueryData(
    `/v1/suppliers`, // endpoint
    "get", // method
    "suppliers-list" // key
  );

  // use if not loadmore button undertime
  const { data: category, isLoading: categoryLoading } = useQueryData(
    isSupplierId === "0"
      ? `/v1/category`
      : `/v1/report-sales/report-category-list-by-supplier-id/${isSupplierId}`, // endpoint
    "get", // method
    "category-list", // key
    {},
    isSupplierId
  );

  // use if not loadmore button undertime
  const { data: productList, isLoading: productListLoading } = useQueryData(
    isSupplierId === "0" && isCategoryId === "0"
      ? `/v1/suppliers-product`
      : isSupplierId === "0" && isCategoryId !== "0"
      ? `/v1/report-sales/report-product-list-by-category/${isCategoryId}`
      : isSupplierId !== "0" && isCategoryId === "0"
      ? `/v1/suppliers-product/by-supplier-product-id/${isSupplierId}`
      : `/v1/report-sales/report-product-list/${isSupplierId}/${isCategoryId}`, // endpoint
    "get", // method
    "product-list", // key
    {},
    isSupplierId,
    isCategoryId
  );

  const handleSupplier = async (e) => {
    let supplierId = e.target.value;
    setIsSupplierId(supplierId);
  };

  const handleCategory = async (e) => {
    let categoryId = e.target.value;
    setIsCategoryId(categoryId);
  };

  // use if not loadmore button undertime
  const { data: ordersGroupProd } = useQueryData(
    `/v1/report-stock/order-qty/${isFilter}`, // endpoint
    "put", // method
    "ordersGroupProd", // key
    { value },
    result
  );

  const initVal = {
    supplier_id: "0",
    category_id: "0",
    product_id: "0",
    date_from: getDateNow(),
    date_to: getDateNow(),
  };

  const yupSchema = Yup.object({
    supplier_id: Yup.string().required("Required"),
    category_id: Yup.string().required("Required"),
    product_id: Yup.string().required("Required"),
    date_from: Yup.string().required("Required"),
    date_to: Yup.string().required("Required"),
  });

  return (
    <>
      <Formik
        initialValues={initVal}
        validationSchema={yupSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setFilter(true);
          setSubmit(!isSubmit);
          setValue(values);
        }}
      >
        {(props) => {
          return (
            <Form>
              <div className="grid gap-4 xl:grid-cols-[1fr_1fr_1fr_1fr_1fr_15rem] pb-5 items-center print:hidden ">
                <div className="relative ">
                  <InputSelect
                    name="supplier_id"
                    label="Supplier"
                    onChange={handleSupplier}
                    disabled={status === "loading" || suppliersListLoading}
                  >
                    <option value="" hidden>
                      {suppliersListLoading ? "Loading..." : "--"}
                    </option>
                    <option value="0">All Supplier</option>
                    {suppliersList?.data.map((cItem, key) => {
                      return (
                        <option key={key} value={cItem.suppliers_aid}>
                          {`${cItem.suppliers_company_name}`}
                        </option>
                      );
                    })}
                  </InputSelect>
                </div>
                <div className="relative ">
                  <InputSelect
                    name="category_id"
                    label="Category"
                    onChange={handleCategory}
                    disabled={status === "loading" || categoryLoading}
                  >
                    <option value="" hidden>
                      {categoryLoading ? "Loading..." : "--"}
                    </option>
                    <option value="0">All Category</option>
                    {category?.data.map((cItem, key) => {
                      return (
                        <option key={key} value={cItem.product_category_aid}>
                          {`${cItem.product_category_name}`}
                        </option>
                      );
                    })}
                  </InputSelect>
                </div>
                <div className="relative ">
                  <InputSelect
                    name="product_id"
                    label="Product"
                    disabled={status === "loading" || productListLoading}
                  >
                    <option value="" hidden>
                      {productListLoading ? "Loading..." : "--"}
                    </option>
                    <option value="0">All Product</option>
                    {productList?.data.map((cItem, key) => {
                      return (
                        <option key={key} value={cItem.suppliers_products_aid}>
                          {`${cItem.suppliers_products_name}`}
                        </option>
                      );
                    })}
                  </InputSelect>
                </div>
                <div className="relative">
                  <InputText
                    label="Date from"
                    type="date"
                    name="date_from"
                    disabled={status === "loading" || categoryLoading}
                  />
                </div>
                <div className="relative">
                  <InputText
                    label="Date to"
                    type="date"
                    name="date_to"
                    disabled={status === "loading" || categoryLoading}
                  />
                </div>

                <button
                  className="btn-modal-submit relative"
                  type="submit"
                  disabled={isFetching}
                >
                  {isFetching && <ButtonSpinner />}
                  <MdFilterAlt className="text-lg" />
                  <span>Filter</span>
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>

      {/* total */}
      <StockReportTotal
        result={result}
        ordersGroupProd={ordersGroupProd}
        isLoading={status === "loading"}
      />

      <div className="text-center overflow-x-auto z-0">
        {/* use only for updating important records */}
        {status !== "loading" && isFetching && <TableSpinner />}
        {/* use only for updating important records */}
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th className="min-w-[7rem]">Supplier</th>
              <th className="min-w-[7rem]">Product</th>
              <th className="min-w-[5rem] text-center pr-4">Total qty</th>
              <th className="min-w-[2rem] text-center ">Rem. qty</th>
              <th className="min-w-[7rem] text-right pr-4">Member price</th>
              <th className="min-w-[12rem] text-right pr-4">Rem. amnt.</th>
            </tr>
          </thead>
          <tbody>
            {(status === "loading" || result?.pages[0].data.length === 0) && (
              <tr className="text-center relative">
                <td colSpan="100%" className="p-10">
                  {status === "loading" && <TableSpinner />}
                  <NoData text="Filter data using above controls." />
                </td>
              </tr>
            )}
            {error && (
              <tr className="text-center ">
                <td colSpan="100%" className="p-10">
                  <ServerError />
                </td>
              </tr>
            )}

            {result?.pages.map((page, key) => (
              <React.Fragment key={key}>
                {page.data.map((item, key) => (
                  <tr key={key}>
                    <td> {counter++}.</td>
                    <td>{item.suppliers_company_name}</td>
                    <td>{item.suppliers_products_name}</td>
                    <td className="text-center">
                      {
                        getProductRemaningQty(item, ordersGroupProd)
                          .stockQuantity
                      }
                    </td>
                    <td className="text-center bg-orange-100">
                      {
                        getProductRemaningQty(item, ordersGroupProd)
                          .remaingQunatity
                      }
                    </td>
                    <td className="text-right pr-4 bg-orange-100">
                      {pesoSign}
                      {numberWithCommas(
                        Number(item.suppliers_products_scc_price).toFixed(2)
                      )}
                    </td>

                    <td className="text-right pr-4 bg-orange-100">
                      {pesoSign}
                      {numberWithCommas(
                        (
                          Number(item.suppliers_products_scc_price) *
                          Number(
                            getProductRemaningQty(item, ordersGroupProd)
                              .remaingQunatity
                          )
                        ).toFixed(2)
                      )}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      {store.isAdd && <ModalViewSales item={itemEdit} />}
    </>
  );
};

export default ReportStocksList;
