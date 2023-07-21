import React from "react";
import useQueryData from "../../../../../../custom-hooks/useQueryData";
import {
  getUrlParam,
  numberWithCommas,
  pesoSign,
  yearNow,
} from "../../../../../../helpers/functions-general";
import { getMonth } from "../../../../../Inventory/reports/report-function";
import { getCapitalShareByMonth } from "../../functions-capital-share";

const TransactionCapitalShareBodyPrintView = ({ item, count }) => {
  const memberid = getUrlParam().get("memberid");
  let lastCount = 0;

  // use if not loadmore button undertime
  const { data: capitalByIdAndYear } = useQueryData(
    `/v1/capital-share/read-by-id-and-year/${memberid}/${item.year}`, // endpoint
    "get", // method
    "capital-share", // key
    {}, // fb
    `${item.year}` // id
  );

  return (
    <>
      {/* print */}
      <div className=" pb-2">
        {getMonth()?.map((mItem, key) => {
          lastCount += 1;
          const getCapitalByMonth = getCapitalShareByMonth(
            mItem,
            capitalByIdAndYear?.data,
            count,
            lastCount
          );
          return (
            <div className="grid grid-cols-[8rem_1fr] items-center" key={key}>
              <p className="mb-0 ">{`${mItem.month_name}`}</p>
              <p
                className={`${
                  yearNow() === `${item.year}` && "!bg-gray-100 "
                } text-right mb-0 font-semibold pr-5`}
              >
                {getCapitalByMonth.result === 0 ? (
                  getCapitalByMonth.penalty !== 0 ? (
                    <span className="text-red-800">
                      {pesoSign}{" "}
                      {numberWithCommas(getCapitalByMonth.penalty.toFixed(2))}
                    </span>
                  ) : (
                    "--"
                  )
                ) : (
                  <>
                    {pesoSign}
                    {numberWithCommas(
                      Number(getCapitalByMonth.result).toFixed(2)
                    )}
                  </>
                )}
              </p>
            </div>
          );
        })}
      </div>

      <div className="pt-2 border-t-2">
        <p className="mb-0 font-semibold pr-5 text-right">
          <span className="mr-5">Total :</span>
          {pesoSign} {numberWithCommas(Number(item.total).toFixed(2))}
        </p>
        <p className="mb-0 font-semibold pr-5 text-right">
          <span className="mr-5">Avg Share :</span>
          {pesoSign} {numberWithCommas((Number(item.total) / 12).toFixed(2))}
        </p>
      </div>
    </>
  );
};

export default TransactionCapitalShareBodyPrintView;
