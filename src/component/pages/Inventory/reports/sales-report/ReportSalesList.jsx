import { useInfiniteQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React from "react";
import { MdFilterAlt } from "react-icons/md";
import * as Yup from "yup";
import { StoreContext } from "../../../../../store/StoreContext";
import useQueryData from "../../../../custom-hooks/useQueryData";
import { InputSelect, InputText } from "../../../../helpers/FormInputs";
import {
  formatDate,
  getTime,
  numberWithCommas,
  pesoSign,
} from "../../../../helpers/functions-general";
import { queryDataInfinite } from "../../../../helpers/queryDataInfinite";
import NoData from "../../../../partials/NoData";
import ServerError from "../../../../partials/ServerError";
import ButtonSpinner from "../../../../partials/spinners/ButtonSpinner";
import TableSpinner from "../../../../partials/spinners/TableSpinner";
import { computeFinalAmount } from "../../orders/functions-orders";
import SalesTotal from "../../sales/SalesTotal";
import StatusActive from "../../../../partials/status/StatusActive";
import StatusPending from "../../../../partials/status/StatusPending";
import { setIsAdd } from "../../../../../store/StoreAction";
import ModalViewSales from "../../sales/ModalViewSales";
import { computeSccSalesByItem } from "./functions-report-sales";
import SccSalesTotal from "./SccSalesTotal";

const TopSellerList = () => {
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
    queryKey: ["patronage", isSubmit],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/v1/report-sales/filter-sales`, // filter endpoint // filter
        `/v1/sales/page/${0}`, // list endpoint
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
  const { data: memberList, isLoading: memberListLoading } = useQueryData(
    `/v1/members/approved`, // endpoint
    "get", // method
    "member-list" // key
  );
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

  const handleView = (item) => {
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };
  const initVal = {
    supplier_id: "",
    category_id: "",
    product_id: "",
    start_date: "",
    end_date: "",
  };

  const yupSchema = Yup.object({
    supplier_id: Yup.string().required("Required"),
    category_id: Yup.string().required("Required"),
    product_id: Yup.string().required("Required"),
    start_date: Yup.string().required("Required"),
    end_date: Yup.string().required("Required"),
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
              <div className="grid gap-4 xl:grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_8rem] pb-5 items-center print:hidden ">
                <div className="relative ">
                  <InputSelect
                    name="member_id"
                    label="Member"
                    onChange={handleSupplier}
                    disabled={status === "loading" || memberListLoading}
                  >
                    <option value="" hidden>
                      {memberListLoading ? "Loading..." : "--"}
                    </option>
                    <option value="0">All Member</option>
                    {memberList?.data.map((mItem, key) => {
                      return (
                        <option key={key} value={mItem.members_aid}>
                          {`${mItem.members_last_name}, ${mItem.members_first_name}`}
                        </option>
                      );
                    })}
                  </InputSelect>
                </div>
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
                    label="Start Date"
                    name="start_date"
                    type="date"
                    disabled={isFetching}
                  />
                </div>

                <div className="relative">
                  <InputText
                    label="End Date"
                    name="end_date"
                    type="date"
                    disabled={isFetching}
                  />
                </div>
                <button
                  className="btn-modal-submit relative"
                  type="submit"
                  disabled={isFetching || !props.dirty}
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

      <SalesTotal result={result} />
      <SccSalesTotal result={result} />
      <div className="text-center overflow-x-auto z-0">
        {/* use only for updating important records */}
        {status !== "loading" && isFetching && <TableSpinner />}
        {/* use only for updating important records */}
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th className="min-w-[2rem]">Status</th>
              <th className="min-w-[8rem]">Name</th>
              <th className="min-w-[10rem]">Comapany</th>
              <th className="min-w-[8rem]">Category</th>
              <th className="min-w-[7rem]">Product</th>
              <th className="min-w-[6rem] text-center pr-4">Qty</th>
              <th className="min-w-[6rem] text-right pr-4">Discounted</th>
              <th className="min-w-[7rem] text-right pr-4">Total Amnt.</th>
              <th className="min-w-[6rem]">Pay Date</th>
              <th className="min-w-[6rem] text-right pr-4">Supplier Price</th>
              <th className="!w-[10rem] text-right pr-4">SCC Sales</th>
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
                    <td>
                      {item.sales_is_paid === 1 ? (
                        <StatusActive text="Paid" />
                      ) : (
                        <StatusPending />
                      )}
                    </td>
                    <td>{`${item.members_last_name}, ${item.members_first_name}`}</td>
                    <td>{item.suppliers_company_name}</td>
                    <td>{item.product_category_name}</td>
                    <td>{item.suppliers_products_name}</td>
                    <td className="text-center ">
                      {item.orders_product_quantity}
                    </td>
                    <td className="text-right pr-4">
                      {pesoSign}
                      {numberWithCommas(Number(item.sales_discount).toFixed(2))}
                    </td>
                    <td className="text-right font-bold text-primary  pr-4">
                      <span
                        className="cursor-pointer underline tooltip-action-table"
                        onClick={() => handleView(item)}
                        data-tooltip="Details"
                      >
                        {pesoSign} {computeFinalAmount(item)}
                      </span>
                    </td>
                    <td>
                      {item.sales_date === ""
                        ? "N/A"
                        : `${formatDate(item.sales_date)} ${getTime(
                            item.sales_date
                          )}`}
                    </td>
                    <td className="text-right pr-4">
                      {pesoSign}{" "}
                      {numberWithCommas(
                        Number(item.orders_suplier_price).toFixed(2)
                      )}{" "}
                    </td>
                    <td className="text-right pr-4">
                      {pesoSign}{" "}
                      {numberWithCommas(computeSccSalesByItem(item).toFixed(2))}{" "}
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

export default TopSellerList;
