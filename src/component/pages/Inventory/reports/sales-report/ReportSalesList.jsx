import { useInfiniteQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React from "react";
import { MdFilterAlt } from "react-icons/md";
import { useInView } from "react-intersection-observer";
import * as Yup from "yup";
import { StoreContext } from "../../../../../store/StoreContext";
import useQueryData from "../../../../custom-hooks/useQueryData";
import { InputSelect } from "../../../../helpers/FormInputs";
import {
  formatDate,
  getTime,
  numberWithCommas,
  pesoSign,
} from "../../../../helpers/functions-general";
import { queryDataInfinite } from "../../../../helpers/queryDataInfinite";
import NoData from "../../../../partials/NoData";
import ServerError from "../../../../partials/ServerError";
import TableSpinner from "../../../../partials/spinners/TableSpinner";
import { computeFinalAmount } from "../../orders/functions-orders";
import { getCurrentMonth, getMonth, getMonthName } from "../report-function";
import ButtonSpinner from "../../../../partials/spinners/ButtonSpinner";

const TopSellerList = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [isFilter, setFilter] = React.useState(false);
  const [isSubmit, setSubmit] = React.useState(false);
  const [month, setMonth] = React.useState(
    !isFilter ? getMonthName(getCurrentMonth()) : ""
  );
  const [page, setPage] = React.useState(1);
  const { ref, inView } = useInView();
  let counter = 1;
  // use if with loadmore button and search bar
  const {
    data: result,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["patronage", isSubmit],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/v1/sales/report/filter/top-seller/${month}`, // filter endpoint // filter
        `/v1/sales/page/${pageParam}`, // list endpoint
        isFilter // search boolean
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
  const { data: total } = useQueryData(
    `/v1/sales/report/all-pending-and-paid/${month}`, // endpoint
    "get", // method
    "pendingAndPaid", // key
    {},
    month
  );
  console.log(total);

  React.useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1);
      fetchNextPage();
    }
  }, [inView]);

  // use if not loadmore button undertime
  const { data: memberApproved, isLoading: memberApprovedLoading } =
    useQueryData(
      `/v1/members/approved`, // endpoint
      "get", // method
      "memberApproved" // key
    );
  const handleMonth = async (e) => {
    let monthName = e.target.value;
    setMonth(monthName);
    setFilter(true);
    setSubmit(!isSubmit);
  };
  const initVal = {
    month: "",
    member: "",
  };

  const yupSchema = Yup.object({
    month: Yup.string().required("Required"),
    member: Yup.string().required("Required"),
  });
  return (
    <>
      <div className="lg:w-[50rem]">
        <Formik
          initialValues={initVal}
          validationSchema={yupSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {}}
        >
          {(props) => {
            props.values.month = !isFilter
              ? getMonthName(getCurrentMonth())
              : props.values.month;
            return (
              <Form>
                <div className="grid gap-4 sm:grid-cols-[1fr_1fr_15rem] pb-5 items-center print:hidden ">
                  <div className="relative ">
                    <InputSelect
                      name="member"
                      label="Member"
                      disabled={status === "loading" || memberApprovedLoading}
                    >
                      <option value="" hidden>
                        {memberApprovedLoading ? "Loading..." : "--"}
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
                  <div className="relative">
                    <InputSelect
                      label="Month"
                      name="month"
                      type="text"
                      onChange={handleMonth}
                      disabled={status === "loading"}
                    >
                      <option value="" hidden>
                        {status === "loading" && "Loading..."}
                      </option>
                      {getMonth()?.map((yItem, key) => {
                        return (
                          <option key={key} value={yItem.month_name}>
                            {`${yItem.month_name}`}
                          </option>
                        );
                      })}
                    </InputSelect>
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
      </div>

      <div className="text-center overflow-x-auto z-0">
        {/* use only for updating important records */}
        {status !== "loading" && isFetching && <TableSpinner />}
        {/* use only for updating important records */}
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th className="min-w-[8rem]">Name</th>
              <th className="min-w-[5rem]">Sales #</th>
              <th className="min-w-[7rem]">Product Name</th>
              <th className="min-w-[6rem] text-center pr-4">Qty</th>
              <th className="min-w-[6rem] text-right pr-4">Discounted</th>
              <th className="min-w-[7rem] text-right pr-4">Total Amnt.</th>
              <th className="min-w-[7rem] text-right pr-4">Received</th>
              <th className="min-w-[6rem]">Pay Date</th>
            </tr>
          </thead>
          <tbody>
            {(status === "loading" || result?.pages[0].data.length === 0) && (
              <tr className="text-center relative">
                <td colSpan="100%" className="p-10">
                  {status === "loading" && <TableSpinner />}
                  <NoData />
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
                    <td>{`${item.members_last_name}, ${item.members_first_name}`}</td>
                    <td className="uppercase">{item.sales_number}</td>
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
                    <td className="text-right pr-4">
                      {pesoSign}{" "}
                      {numberWithCommas(
                        Number(item.sales_receive_amount).toFixed(2)
                      )}
                    </td>
                    <td>
                      {item.sales_date === ""
                        ? "N/A"
                        : `${formatDate(item.sales_date)} ${getTime(
                            item.sales_date
                          )}`}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TopSellerList;
