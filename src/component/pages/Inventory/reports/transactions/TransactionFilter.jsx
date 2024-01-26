import React from "react";
import { StoreContext } from "../../../../../store/StoreContext";
import { getMonth } from "../report-function";
import {
  getDateNow,
  getYearList,
  yearNow,
} from "../../../../helpers/functions-general";

const TransactionFilter = ({
  setFilter,
  setSubmit,
  isSubmit,
  setMonth,
  setDateFrom,
  setDateTo,
  setYear,
  month,
  dateFrom,
  dateTo,
  year,
  isFilter,
}) => {
  // if clear the filter
  const handleClear = () => {
    setSubmit(!isSubmit);
    setFilter(false);
    setMonth("all");
    setDateFrom(getDateNow());
    setDateTo(getDateNow());
    setYear("all");
  };

  // if use filter
  const handleMonthFilter = async (e) => {
    setSubmit(!isSubmit);
    setFilter(true);
    setMonth(e.target.value);
  };
  // if use filter
  const handleDateFromFilter = async (e) => {
    setSubmit(!isSubmit);
    setFilter(true);
    setDateFrom(e.target.value);
    setYear("all");
  };
  // if use filter
  const handleDateToFilter = async (e) => {
    setSubmit(!isSubmit);
    setFilter(true);
    setDateTo(e.target.value);
    setYear("all");
  };
  // if use filter
  const handleYearFilter = async (e) => {
    setSubmit(!isSubmit);
    setFilter(true);
    setYear(e.target.value);
  };
  return (
    <>
      <div className="relative overflow-x-auto z-0 print:hidden">
        <form action="" className="sm:flex gap-3 mb-4 justify-items-end">
          <div className="relative mt-5 sm:mt-2">
            <label>{month === "other-date" ? "Other" : "Month"}</label>
            <select
              name="filter-by"
              className="sm:w-[10rem]"
              onChange={(e) => handleMonthFilter(e)}
              value={month}
            >
              <optgroup label="Month">
                <option value="all">All</option>
                {getMonth()?.map((yItem, key) => {
                  return (
                    <option key={key} value={yItem.month_aid}>
                      {`${yItem.month_name}`}
                    </option>
                  );
                })}
              </optgroup>
              <optgroup label="Other">
                <option value="other-date">Date</option>
              </optgroup>
            </select>
          </div>
          {month !== "other-date" && (
            <div className="relative mt-5 sm:mt-2">
              <label>Year</label>
              <select
                name="filter-by"
                className="sm:w-[12rem]"
                onChange={(e) => handleYearFilter(e)}
                value={year}
              >
                <option value="all">All</option>
                <optgroup label="Year">
                  {getYearList()?.map((ydItem, key) => {
                    return (
                      <option key={key} value={ydItem.year}>
                        {`${ydItem.year}`}
                      </option>
                    );
                  })}
                </optgroup>
              </select>
            </div>
          )}
          {month === "other-date" && (
            <>
              <div className="relative mt-5 sm:mt-2">
                <label>From</label>
                <input
                  name="filter-by"
                  type="date"
                  className="sm:w-[10rem] p-[0.4rem]"
                  onChange={(e) => handleDateFromFilter(e)}
                  value={dateFrom}
                ></input>
              </div>
              <div className="relative mt-5 sm:mt-2">
                <label>To</label>
                <input
                  name="filter-by"
                  type="date"
                  className="sm:w-[10rem] p-[0.4rem]"
                  onChange={(e) => handleDateToFilter(e)}
                  value={dateTo}
                ></input>
              </div>
            </>
          )}
          {isFilter && (
            <button
              type="reset"
              className="underline text-red-700 sm:mt-7 mt-2"
              onClick={handleClear}
            >
              Clear
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default TransactionFilter;
