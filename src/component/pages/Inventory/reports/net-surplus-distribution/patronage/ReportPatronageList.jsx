import { useInfiniteQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React from "react";
import { MdFilterAlt } from "react-icons/md";
import * as Yup from "yup";
import { StoreContext } from "../../../../../../store/StoreContext";
import useQueryData from "../../../../../custom-hooks/useQueryData";
import { InputSelect } from "../../../../../helpers/FormInputs";
import {
  getYearList,
  numberWithCommas,
  pesoSign,
  yearNow,
} from "../../../../../helpers/functions-general";
import { queryDataInfinite } from "../../../../../helpers/queryDataInfinite";
import NoData from "../../../../../partials/NoData";
import ServerError from "../../../../../partials/ServerError";
import ButtonSpinner from "../../../../../partials/spinners/ButtonSpinner";
import TableSpinner from "../../../../../partials/spinners/TableSpinner";
import { getComputeReportPatronage } from "../functions-report-netsurplus";

const ReportPatronageList = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [isFilter, setFilter] = React.useState(false);
  const [isSubmit, setSubmit] = React.useState(false);
  const [isYear, setIsYear] = React.useState(yearNow());
  const [value, setValue] = React.useState([]);
  let counter = 1;
  let totalAvg = 0;
  let totalPatronage = 0;
  // use if with loadmore button and search bar
  const {
    data: result,
    error,
    isFetching,
    status,
  } = useInfiniteQuery({
    queryKey: ["patronageReport", isSubmit],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/v1/report-patronage/report-filter-patronage`, // filter endpoint // filter
        `/v1/report-patronage/report-filter-patronage/${isYear}`, // list endpoint
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
    `/v1/report-patronage/all-member-approved`, // endpoint
    "get", // method
    "patronage-member-list" // key
  );

  const initVal = {
    member_id: "0",
    year: "2023",
  };

  const yupSchema = Yup.object({
    member_id: Yup.string().required("Required"),
    year: Yup.string().required("Required"),
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
          setIsYear(values.year);
        }}
      >
        {(props) => {
          return (
            <Form>
              <div className="grid gap-4 xl:grid-cols-[1fr_1fr_15rem] xl:w-[50rem] pb-5 items-center print:hidden ">
                <div className="relative ">
                  <InputSelect
                    name="member_id"
                    label="Member"
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
                <div className="relative">
                  <InputSelect
                    name="year"
                    label="Year"
                    type="text"
                    disabled={isFetching}
                  >
                    <option value="" hidden>
                      {memberListLoading && "Loading..."}
                    </option>
                    {getYearList()?.map((yItem, key) => {
                      return (
                        <option key={key} value={yItem.year}>
                          {`${yItem.year}`}
                        </option>
                      );
                    })}
                  </InputSelect>
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

      <div className="text-center overflow-x-auto z-0">
        {/* use only for updating important records */}
        {status !== "loading" && isFetching && <TableSpinner />}
        {/* use only for updating important records */}
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th className="min-w-[8rem] w-[15rem] ">Member</th>
              <th className="min-w-[15rem] w-[10rem] text-right pr-4">
                Individual Patronage (IP)
              </th>
              <th className="min-w-[15rem] text-right pr-4">
                Patronage Refund{" "}
                {result?.pages[0].data[0].net_surplus_patronage_rate}%
                {/* (
                {getPatronageRate(result?.pages[0].data[0])}) */}
              </th>
            </tr>
          </thead>
          <tbody>
            {(status === "loading" || result?.pages[0].data.length === 0) && (
              <tr className="text-center relative">
                <td colSpan="100%" className="p-10">
                  {status === "loading" && <TableSpinner />}
                  <NoData text="No Data" />
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
                {page.data.map((item, key) => {
                  totalAvg +=
                    Number(item.totalAmount) - Number(item.salesDiscount);
                  totalPatronage += Number(
                    getComputeReportPatronage(item).result
                  );
                  return (
                    <tr key={key}>
                      <td>{counter++}.</td>
                      <td>{`${item.members_last_name}, ${item.members_first_name}`}</td>
                      <td className=" text-right pr-4">
                        {pesoSign}{" "}
                        {numberWithCommas(
                          (
                            Number(item.totalAmount) -
                            Number(item.salesDiscount)
                          ).toFixed(2)
                        )}
                      </td>
                      <td className=" text-right pr-4">
                        {pesoSign}{" "}
                        {numberWithCommas(
                          Number(
                            getComputeReportPatronage(item).result
                          ).toFixed(2)
                        )}
                      </td>
                    </tr>
                  );
                })}
              </React.Fragment>
            ))}
            <tr className="border-b-0">
              <td colSpan={2}></td>
              <td className=" text-right pr-4">
                Total IP :
                <span className="ml-2 font-semibold">
                  {pesoSign}
                  {numberWithCommas(Number(totalAvg).toFixed(2))}
                </span>
              </td>
              <td className=" text-right pr-4">
                Total Patronage :
                <span className="ml-2 font-semibold">
                  {pesoSign}
                  {numberWithCommas(Number(totalPatronage).toFixed(2))}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ReportPatronageList;
