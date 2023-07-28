import React from "react";
import useQueryData from "../../../../../../custom-hooks/useQueryData";
import {
  numberWithCommas,
  pesoSign,
} from "../../../../../../helpers/functions-general";
import { getMonth } from "../../../report-function";
import { getReportCapitalShareByMonth } from "../../functions-report-netsurplus";

const ReportCapitalShareBodyPrintView = ({ item }) => {
  let capitalShareByMonth = 0;

  // use if not loadmore button undertime
  const { data: capitalByIdAndYear } = useQueryData(
    `/v1/capital-share/read-by-id-and-year/${item.members_aid}/${item.year}`, // endpoint
    "get", // method
    "capital-share", // key
    {}, // fb
    `${item.year}`, // id
    `${item.members_aid}` // item
  );

  console.log(capitalByIdAndYear);

  return (
    <>
      {/* print */}
      <div className=" px-4 pb-2">
        {getMonth()?.map((mItem, key) => {
          capitalShareByMonth = getReportCapitalShareByMonth(
            mItem,
            capitalByIdAndYear?.data
          );
          return (
            <div
              className="grid grid-cols-[8rem_1fr] items-center border-b-[1px]"
              key={key}
            >
              <p className="mb-0 ">{`${mItem.month_name}`}</p>
              <p className={` text-right mb-0 `}>
                {capitalShareByMonth.result === 0 ? (
                  "--"
                ) : (
                  <>
                    {pesoSign}
                    {numberWithCommas(
                      Number(capitalShareByMonth.result).toFixed(2)
                    )}
                  </>
                )}
              </p>
            </div>
          );
        })}
      </div>

      <div className="pt-2 p-4 ">
        <p className="mb-0 font-semibold text-right">
          <span className="mr-5">Total :</span>
          {pesoSign} {numberWithCommas(Number(item.total).toFixed(2))}
        </p>
        <p className="mb-0 font-semibold text-right">
          <span className="mr-5">Avg Share :</span>
          {pesoSign} {numberWithCommas((Number(item.total) / 12).toFixed(2))}
        </p>
      </div>
    </>
  );
};

export default ReportCapitalShareBodyPrintView;
