import { useInfiniteQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React from "react";
import { FaMedal, FaTrophy, FaUserCircle } from "react-icons/fa";
import { TfiMedall } from "react-icons/tfi";
import { IoIosMedal } from "react-icons/io";
import { useInView } from "react-intersection-observer";
import * as Yup from "yup";
import { StoreContext } from "../../../../../store/StoreContext";
import { InputSelect } from "../../../../helpers/FormInputs";
import {
  devBaseImgUrl,
  numberWithCommas,
  pesoSign,
} from "../../../../helpers/functions-general";
import { queryDataInfinite } from "../../../../helpers/queryDataInfinite";
import NoData from "../../../../partials/NoData";
import ServerError from "../../../../partials/ServerError";
import TableSpinner from "../../../../partials/spinners/TableSpinner";
import {
  getCurrentMonth,
  getMonth,
  getMonthName,
  getTotal,
} from "../report-function";
import Loadmore from "../../../../partials/Loadmore";
import useQueryData from "../../../../custom-hooks/useQueryData";
import { BsFillPinAngleFill } from "react-icons/bs";

const TopSellerList = ({ width = "", menu = "" }) => {
  const [isFilter, setFilter] = React.useState(false);
  const [isSubmit, setSubmit] = React.useState(false);
  const [month, setMonth] = React.useState(
    !isFilter ? getMonthName(getCurrentMonth()) : ""
  );
  const [page, setPage] = React.useState(1);
  const { ref, inView } = useInView();
  let counter = 0;
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
        `/v1/top-seller-report/filter-by-month/${month}`, // filter endpoint // filter
        `/v1/top-seller-report/page/${pageParam}/${month}`, // list endpoint
        isFilter // search boolean
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

  // use if not loadmore button undertime
  const { data: total } = useQueryData(
    `/v1/top-seller-report/all-pending-and-paid/${month}`, // endpoint
    "get", // method
    "pendingAndPaid", // key
    {},
    month
  );

  React.useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1);
      fetchNextPage();
    }
  }, [inView]);

  const handleMonth = async (e) => {
    let monthName = e.target.value;
    setMonth(monthName);
    setFilter(true);
    setSubmit(!isSubmit);
  };
  const initVal = {
    month: "",
  };

  const yupSchema = Yup.object({
    month: Yup.string().required("Required"),
  });
  return (
    <>
      <div className="sm:flex items-center justify-between mb-4">
        {menu !== "" && (
          <p className="flex items-center mt-4 mb-6 font-bold text-primary">
            <BsFillPinAngleFill className="animate-bounce mr-2 " />
            Top Seller
          </p>
        )}
        <div className={`${width}`}>
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
                  <div className="sm:w-[10rem] items-center print:hidden ">
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
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>

      <div className={`relative ${width} `}>
        <div className="font-bold text-base text-center ">
          <p className="m-0 uppercase">Top Seller {month} 2023</p>
        </div>

        {(status === "loading" || result?.pages[0].data.length === 0) && (
          <div className=" flex justify-center py-2.5 items-center border-b-2 border-solid flex-col sm:flex-row">
            {status === "loading" && <TableSpinner />}
            <NoData />
          </div>
        )}
        {error && (
          <div className="flex justify-center py-2.5 items-center border-b-2 border-solid flex-col sm:flex-row">
            <ServerError />
          </div>
        )}

        {/* use only for updating important records */}
        {status !== "loading" && isFetching && <TableSpinner />}
        {/* use only for updating important records */}
        {result?.pages.map((page, key) => (
          <React.Fragment key={key}>
            {page.data.map((item, key) => {
              counter++;
              return (
                <div
                  key={key}
                  className="flex justify-between py-2.5 items-center border-b-2 border-solid  flex-row"
                >
                  <div className="grid grid-cols-[5rem_1fr]  items-center">
                    {counter === 1 ? (
                      <div className="flex items-center">
                        <p className="m-0">{counter}.</p>
                        <FaTrophy className="h-14 w-14 ml-5 fill-[#FFD700]" />
                      </div>
                    ) : counter === 2 ? (
                      <div className="flex items-center">
                        <p className="m-0">{counter}.</p>
                        <FaMedal className="h-10 w-10 ml-6 fill-[#C0C0C0]" />
                      </div>
                    ) : counter === 3 ? (
                      <div className="flex items-center">
                        <p className="m-0">{counter}.</p>
                        <IoIosMedal className="h-10 w-10 ml-6 fill-[#CD7F32]" />
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <p className="m-0">{counter}.</p>
                        <TfiMedall className="h-8 w-8 ml-7" />
                      </div>
                    )}
                    <div className="flex items-center">
                      {item.members_picture !== "" ? (
                        <img
                          src={devBaseImgUrl + "/" + item.members_picture}
                          alt="employee photo"
                          className="rounded-full h-12 w-12 object-cover object-center mx-5"
                        />
                      ) : (
                        <FaUserCircle className="object-cover object-center h-12 w-12 mx-5 fill-gray-400" />
                      )}
                      <div>
                        <h2>
                          {item.members_last_name}, {item.members_first_name}
                        </h2>
                        <div className="block items-center xs:flex">
                          <p className="mb-0 text-primary text-lg">
                            {pesoSign}{" "}
                            {numberWithCommas(
                              Number(
                                item.totalAmount - item.totalDiscount
                              ).toFixed(2)
                            )}
                          </p>
                          {getTotal(total, item).isPending === 0 && (
                            <p className="mb-0 mt-1 xs:mt-0">
                              <span
                                className="!bg-blue-100 !text-primary text-xs font-medium ml-2 px-2.5 py-0.5 rounded-full tooltip-action-table"
                                data-tooltip="Expected amount"
                              >
                                {pesoSign}{" "}
                                {numberWithCommas(
                                  getTotal(total, item).finalAmount.toFixed(2)
                                )}
                              </span>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </React.Fragment>
        ))}
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
    </>
  );
};

export default TopSellerList;
