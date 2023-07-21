import { useInfiniteQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React from "react";
import { useInView } from "react-intersection-observer";
import * as Yup from "yup";
import { StoreContext } from "../../../../../../store/StoreContext";
import useQueryData from "../../../../../custom-hooks/useQueryData";
import { InputSelect } from "../../../../../helpers/FormInputs";
import { queryDataInfinite } from "../../../../../helpers/queryDataInfinite";
import Loadmore from "../../../../../partials/Loadmore";
import NoData from "../../../../../partials/NoData";
import ServerError from "../../../../../partials/ServerError";
import TableSpinner from "../../../../../partials/spinners/TableSpinner";
import { getMonth } from "../../../../Inventory/reports/report-function";
import TransactionCapitalShareBody from "./TransactionCapitalShareBody";
import TransactionCapitalShareTotals from "./TransactionCapitalShareTotals";
import { getYearList } from "../../../../Inventory/reports/capital-report/functions-report-capital";
import { getUrlParam, yearNow } from "../../../../../helpers/functions-general";
import TransactionCapitalShareListPrintView from "./printView/TransactionCapitalShareListPrintView";

const TransactionCapitalShareList = ({
  setItemEdit,
  totalCapital,
  memberName,
  isLoading,
  menu,
}) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [isFilter, setFilter] = React.useState(false);
  const [isSubmit, setSubmit] = React.useState(false);
  const [year, setYear] = React.useState(yearNow());
  const [page, setPage] = React.useState(1);
  const memberid = getUrlParam().get("memberid");
  const { ref, inView } = useInView();
  // use if with loadmore button and search bar
  let count = 0;
  let empid =
    menu === "members" ? memberid : store.credentials.data.members_aid;
  const {
    data: result,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["capital-share", isSubmit],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/v1/capital-share/read-group-by-year/${empid}`, // search endpoint
        `/v1/capital-share/page/${pageParam}/${empid}`, // list endpoint
        isFilter, // search boolean
        "post",
        { year }
      ),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total) {
        return lastPage.page + lastPage.count;
      }
      return;
    },
    // refetchOnWindowFocus: false,
    networkMode: "always",
    cacheTime: 200,
  });

  React.useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1);
      fetchNextPage();
    }
  }, [inView]);

  // use if not loadmore button undertime
  const { data: penaltyById } = useQueryData(
    `/v1/capital-share/read-capital-penalty/${memberid}/${year}`, // endpoint
    "get", // method
    "penaltyById", //key
    {}, // fd
    year
  );

  const handleYear = async (e) => {
    let year = e.target.value;
    setYear(year);
    setFilter(true);
    setSubmit(!isSubmit);
  };

  const initVal = {
    capital_year: "",
  };

  const yupSchema = Yup.object({
    capital_year: Yup.string().required("Required"),
  });
  return (
    <>
      {isLoading ? (
        <TableSpinner />
      ) : memberName?.data.length > 0 ? (
        <>
          {menu === "members" && (
            <p className="text-primary print:text-black print:text-center print:text-sm print:mb-5 ">
              <span className="pr-4 font-bold print:hidden">Member Name :</span>
              {isLoading === "loading"
                ? "Loading..."
                : `${memberName?.data[0].members_last_name}, ${memberName?.data[0].members_first_name}`}
            </p>
          )}

          <div className="sm:w-[10rem] items-center print:hidden mt-4 ">
            <Formik
              initialValues={initVal}
              validationSchema={yupSchema}
              onSubmit={async (values, { setSubmitting, resetForm }) => {}}
            >
              {(props) => {
                return (
                  <Form>
                    <div className="relative">
                      <InputSelect
                        label="Year"
                        name="capital_year"
                        type="text"
                        onChange={handleYear}
                        disabled={status === "loading"}
                      >
                        <option value="" hidden>
                          {status === "loading" ? "Loading..." : "All"}
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
                  </Form>
                );
              }}
            </Formik>
          </div>

          <div className="relative overflow-x-auto z-0 mt-8 xl:mt-4 print:mt-0 print:overflow-x-hidden ">
            <TransactionCapitalShareTotals
              result={result}
              totalCapital={totalCapital}
              isLoading={status === "loading"}
              isFilter={isFilter}
              penalty={penaltyById?.data[0]}
            />

            <table className="print:hidden">
              <thead>
                <tr>
                  <th>Year</th>
                  {getMonth()?.map((yItem, key) => {
                    return (
                      <th key={key} className="text-center pl-4 min-w-[8rem] ">
                        {`${yItem.month_name.slice(0, 3)}`}
                      </th>
                    );
                  })}
                  <th className="text-center min-w-[8rem] pl-4">Total</th>
                  <th className="text-center min-w-[8rem] pl-4 ">Avg Share</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {(status === "loading" ||
                  result?.pages[0].data.length === 0) && (
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
                      count += 1;
                      return (
                        <tr
                          key={key}
                          className={`${
                            yearNow() === `${item.year}` && "!bg-gray-100 "
                          } text-right `}
                        >
                          <TransactionCapitalShareBody
                            item={item}
                            count={count}
                            setItemEdit={setItemEdit}
                          />
                        </tr>
                      );
                    })}
                  </React.Fragment>
                ))}
              </tbody>
            </table>

            <div className="text-center">
              <Loadmore
                fetchNextPage={fetchNextPage}
                isFetchingNextPage={isFetchingNextPage}
                hasNextPage={hasNextPage}
                result={result?.pages[0]}
                setPage={setPage}
                page={page}
                refView={ref}
              />
            </div>
          </div>
          {/* start print version */}
          <TransactionCapitalShareListPrintView result={result} />
          {/* end print version */}
        </>
      ) : (
        <NoData />
      )}
    </>
  );
};

export default TransactionCapitalShareList;
