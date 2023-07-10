import { useInfiniteQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { StoreContext } from "../../../../../../store/StoreContext";
import useQueryData from "../../../../../custom-hooks/useQueryData";
import { InputSelect } from "../../../../../helpers/FormInputs";
import {
  formatDate,
  getTime,
  numberWithCommas,
  pesoSign,
} from "../../../../../helpers/functions-general";
import { queryDataInfinite } from "../../../../../helpers/queryDataInfinite";
import NoData from "../../../../../partials/NoData";
import ServerError from "../../../../../partials/ServerError";
import TableSpinner from "../../../../../partials/spinners/TableSpinner";
import ButtonSpinner from "../../../../../partials/spinners/ButtonSpinner";
import { MdFilterAlt } from "react-icons/md";
import { getYearList } from "./functions-report-sales";
import StatusAmount from "../../../../../partials/status/StatusAmount";

const ReportDetailedCapitalShareList = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [isFilter, setFilter] = React.useState(false);
  const [isSubmit, setSubmit] = React.useState(false);
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
        `/v1/report-capital/filter/detailed`, // filter endpoint // filter
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

  const initVal = {
    member_id: "",
    year: "",
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
        }}
      >
        {(props) => {
          return (
            <Form>
              <div className="grid gap-4 xl:grid-cols-[1fr_1fr_1fr_15rem] pb-5 items-center print:hidden ">
                <div className="relative ">
                  <InputSelect
                    name="member_id"
                    label="Member"
                    disabled={status === "loading" || memberListLoading}
                  >
                    <option value="" hidden>
                      {memberListLoading ? "Loading..." : "--"}
                    </option>
                    {/* <option value="0">All Member</option> */}
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

      <div className="xl:flex items-center xl:mt-4  text-primary">
        {result?.pages[0].count > 0 ? (
          <StatusAmount
            text="Paid Capital Share"
            // amount={checkReportCapitalShare(result?.pages[0], subscribe).totalCapital}
            amount={0}
            type="paid"
          />
        ) : (
          <StatusAmount text="Subscribes Capital Share " amount={0} />
        )}

        <StatusAmount
          text="Remaining Capital "
          // amount={totalCapital.remainingAmount}
          amount={0}
          type="pending"
        />
        <StatusAmount
          text="Subscribes Capital Share "
          // amount={totalCapital.subscribeC}
          amount={0}
        />
        <StatusAmount
          text="Membership Fee "
          // amount={totalCapital.memberFee}
          amount={0}
        />
      </div>
      {}
      <div className="xl:flex items-center mb-2 text-primary">
        <StatusAmount
          text="Average Share Months (ASM) "
          // amount={totalCapital.avg}
          amount={0}
        />
      </div>

      <div className="text-center overflow-x-auto z-0">
        {/* use only for updating important records */}
        {status !== "loading" && isFetching && <TableSpinner />}
        {/* use only for updating important records */}
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th className="min-w-[6rem] w-[15rem]">Name</th>
              <th className="min-w-[6rem] w-[15rem]">Date</th>
              <th className="min-w-[6rem] w-[10rem] text-right pr-4">
                Amortization
              </th>
              <th className="min-w-[11rem] !w-[11rem] text-right pr-4">
                Total Paid up Capital
              </th>
              <th className="min-w-[10rem]">Official Receipt</th>
              <th> </th>
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
                {page.data.map((item, key) => {
                  return (
                    <tr key={key}>
                      <td>{counter++}.</td>
                      <td>{`${item.members_last_name}, ${item.members_first_name}`}</td>
                      <td>{`${formatDate(item.capital_share_date)} ${getTime(
                        item.capital_share_date
                      )}`}</td>
                      <td className=" text-right pr-4">
                        {pesoSign}{" "}
                        {numberWithCommas(
                          Number(item.capital_share_paid_up).toFixed(2)
                        )}
                      </td>
                      <td className=" text-right pr-4">
                        {pesoSign}{" "}
                        {item.capital_share_total !== ""
                          ? numberWithCommas(
                              Number(item.capital_share_total).toFixed(2)
                            )
                          : numberWithCommas(
                              Number(item.capital_share_paid_up).toFixed(2)
                            )}
                      </td>
                      <td>{item.capital_share_or}</td>
                      <td></td>
                    </tr>
                  );
                })}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ReportDetailedCapitalShareList;
