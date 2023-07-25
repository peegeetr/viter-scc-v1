import { useInfiniteQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React from "react";
import { MdFilterAlt } from "react-icons/md";
import * as Yup from "yup";
import { StoreContext } from "../../../../../../store/StoreContext";
import useQueryData from "../../../../../custom-hooks/useQueryData";
import { InputSelect } from "../../../../../helpers/FormInputs";
import {
  numberWithCommas,
  pesoSign,
  yearNow,
} from "../../../../../helpers/functions-general";
import { queryDataInfinite } from "../../../../../helpers/queryDataInfinite";
import NoData from "../../../../../partials/NoData";
import ServerError from "../../../../../partials/ServerError";
import ButtonSpinner from "../../../../../partials/spinners/ButtonSpinner";
import TableSpinner from "../../../../../partials/spinners/TableSpinner";
import { getMonth } from "../../report-function";
import { getDetailedAvgTotal, getYearList } from "../functions-report-capital";
import ReportDetailedCapitalShareBody from "./ReportDetailedCapitalShareBody";

const ReportDetailedCapitalShareList = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [isYear, setYear] = React.useState("0");
  const [isFilter, setFilter] = React.useState(false);
  const [isSubmit, setSubmit] = React.useState(false);
  const [value, setValue] = React.useState([]);
  let totalCapital = 0;
  // use if with loadmore button and search bar
  const {
    data: result,
    error,
    isFetching,
    status,
  } = useInfiniteQuery({
    queryKey: ["report-capital-filter", isSubmit],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/v1/report-capital/filter/detailed`, // search endpoint
        `/v1/capital-share/page/${pageParam}/${0}`, // list endpoint
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

  const initVal = {
    member_id: "0",
    year: yearNow(),
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
          setYear(values.year);
        }}
      >
        {(props) => {
          return (
            <Form>
              <div className="grid gap-4 xl:grid-cols-[1fr_1fr_15rem] pb-5 items-center print:p-0">
                <div className="relative ">
                  <InputSelect
                    name="member_id"
                    label="Member"
                    // onChange={handleMember}
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
                <div className="relative print:hidden">
                  <InputSelect
                    label="Year"
                    name="year"
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
                  className="btn-modal-submit relative print:hidden"
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

      <div className="text-center mb-5">
        <p className="mb-0 print:mb-0 text-lg print:text-sm">
          Total Average Shares Months {isYear !== "0" && isYear}
        </p>
        <p className="mb-0 print:mb-0 text-lg print:text-sm">
          {pesoSign}{" "}
          {isYear !== "0"
            ? numberWithCommas(
                Number(getDetailedAvgTotal(result?.pages[0].data)).toFixed(2)
              )
            : "0.00"}
        </p>
      </div>

      <div className="text-center overflow-x-auto print:overflow-x-hidden z-0">
        {/* use only for updating important records */}
        {status !== "loading" && isFetching && <TableSpinner />}
        {/* use only for updating important records */}
        <table>
          <thead>
            <tr>
              <th>Year</th>
              <th className="min-w-[10rem] print:min-w-0">Name</th>
              {getMonth()?.map((yItem, key) => {
                return (
                  <th
                    key={key}
                    className="text-center pl-4 min-w-[8rem] print:min-w-0"
                  >
                    {`${yItem.month_name.slice(0, 3)}`}
                  </th>
                );
              })}
              <th className="text-center min-w-[8rem] pl-4">Total</th>
              <th className="text-center min-w-[8rem] pl-4 ">Avg Share</th>
            </tr>
          </thead>
          <tbody>
            {(status === "loading" || result?.pages[0].data.length === 0) && (
              <tr className="text-center ">
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
                {page.data.map((item, key) => {
                  totalCapital += Number(item.total) / 12;
                  return (
                    <tr key={key} className={` text-right `}>
                      <ReportDetailedCapitalShareBody item={item} />
                    </tr>
                  );
                })}
              </React.Fragment>
            ))}
            {isFilter && result?.pages[0].data.length > 0 && (
              <tr>
                <td colSpan={16} className="text-right font-semibold">
                  <span className="pr-5">
                    Total Average Shares Months {isYear}
                  </span>{" "}
                  {pesoSign}
                  {numberWithCommas(Number(totalCapital).toFixed(2))}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ReportDetailedCapitalShareList;
