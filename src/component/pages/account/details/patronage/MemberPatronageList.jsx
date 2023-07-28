import { useInfiniteQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React from "react";
import { SlArrowRight } from "react-icons/sl";
import { useInView } from "react-intersection-observer";
import * as Yup from "yup";
import { setIsAdd } from "../../../../../store/StoreAction";
import { StoreContext } from "../../../../../store/StoreContext";
import { InputSelect } from "../../../../helpers/FormInputs";
import {
  getUrlParam,
  numberWithCommas,
  pesoSign,
  yearNow,
} from "../../../../helpers/functions-general";
import { queryDataInfinite } from "../../../../helpers/queryDataInfinite";
import Loadmore from "../../../../partials/Loadmore";
import NoData from "../../../../partials/NoData";
import ServerError from "../../../../partials/ServerError";
import TableSpinner from "../../../../partials/spinners/TableSpinner";
import {
  getComputePatronage,
  getYearListPatronage,
} from "./functions-patronage";
import ModalViewPatronage from "./modal/ModalViewPatronage";

const MemberPatronageList = ({ memberName, isLoading, menu }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);
  const [isFilter, setFilter] = React.useState(false);
  const [isSubmit, setSubmit] = React.useState(false);
  const [year, setYear] = React.useState(yearNow());
  const [page, setPage] = React.useState(1);
  let counter = 1;
  const memberid = getUrlParam().get("memberid");
  // use if with loadmore button and search bar
  let empid =
    menu === "members" ? memberid : store.credentials.data.members_aid;

  const { ref, inView } = useInView();
  const {
    data: result,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["patronageByMember", isSubmit],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/v1/patronage/filter-patronage-by-year/${empid}`, // filter endpoint // filter
        `/v1/patronage/page/by-employee-id/${pageParam}/${empid}`, // list endpoint
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
  // use if with loadmore button and search bar

  React.useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1);
      fetchNextPage();
    }
  }, [inView]);

  const handleView = (item) => {
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };

  const handleMonth = async (e) => {
    setYear(e.target.value);
    setFilter(true);
    setSubmit(!isSubmit);
  };
  const initVal = {
    year_div: "",
  };

  const yupSchema = Yup.object({
    year_div: Yup.string().required("Required"),
  });
  return (
    <>
      {isLoading ? (
        <TableSpinner />
      ) : memberName?.data.length > 0 ? (
        <>
          {menu === "members" && (
            <p className="m-0 text-primary">
              <span className="pr-4 font-bold">Member Name :</span>
              {isLoading === "loading"
                ? "Loading..."
                : `${memberName?.data[0].members_last_name}, ${memberName?.data[0].members_first_name}`}
            </p>
          )}
          <div className="relative text-center overflow-x-auto z-0 w-full max-w-[500px]">
            <div>
              <Formik
                initialValues={initVal}
                validationSchema={yupSchema}
                onSubmit={async (values, { setSubmitting, resetForm }) => {}}
              >
                {(props) => {
                  return (
                    <Form>
                      <div className="sm:w-[10rem] items-center print:hidden pt-3 pb-5">
                        <div className="relative">
                          <InputSelect
                            label="Year"
                            name="year_div"
                            type="text"
                            onChange={handleMonth}
                            disabled={status === "loading"}
                          >
                            <option value="" hidden>
                              {status === "loading" ? "Loading..." : "All"}
                            </option>
                            {getYearListPatronage()?.map((ydItem, key) => {
                              return (
                                <option key={key} value={ydItem.year}>
                                  {`${ydItem.year}`}
                                </option>
                              );
                            })}
                          </InputSelect>
                        </div>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </div>

            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th className="min-w-[5rem] w-[5rem]">Year</th>

                  <th className="min-w-[10rem] w-[15rem] text-right pr-4">
                    Dividend
                  </th>
                  <th className=" "></th>
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
                    {page.data.map((item, key) => (
                      <tr key={key}>
                        <td> {counter++}.</td>
                        <td>{item.year}</td>
                        <td className="text-right pr-4">
                          {pesoSign}
                          {numberWithCommas(
                            Number(getComputePatronage(item).result).toFixed(2)
                          )}
                        </td>

                        <td>
                          <div className="flex items-center justify-end pr-2">
                            <button
                              type="button"
                              className="btn-action-table tooltip-action-table"
                              data-tooltip="View Details"
                              onClick={() => handleView(item)}
                            >
                              <SlArrowRight />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>

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
        </>
      ) : (
        <NoData />
      )}
      {store.isAdd && <ModalViewPatronage item={itemEdit} />}
    </>
  );
};

export default MemberPatronageList;
