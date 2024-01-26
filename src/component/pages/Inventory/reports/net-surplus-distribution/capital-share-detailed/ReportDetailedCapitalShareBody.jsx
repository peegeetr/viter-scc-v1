import React from "react";
import { StoreContext } from "../../../../../../store/StoreContext";
import useQueryData from "../../../../../custom-hooks/useQueryData";
import {
  numberWithCommas,
  pesoSign,
} from "../../../../../helpers/functions-general";
import { getCapitalShareByMonth } from "../../../../account/details/capital-share/functions-capital-share";
import { getMonth } from "../../report-function";

const ReportDetailedCapitalShareBody = ({ item }) => {
  const { store, dispatch } = React.useContext(StoreContext);

  // use if not loadmore button undertime
  const { data: capitalByIdAndYear, isLoading } = useQueryData(
    `/v1/capital-share/read-by-id-and-year/${item.members_aid}/${item.year}`, // endpoint
    "get", // method
    "capital-share", // key
    {}, // fb
    `${item.year}`, // id
    `${item.members_aid}` // item
  );

  let capitalShareByMonth = 0;

  return (
    <>
      <td>{item.year}</td>
      <td className="text-left">{`${item.members_last_name} ${item.members_first_name}`}</td>
      {getMonth()?.map((mItem, key) => {
        capitalShareByMonth = getCapitalShareByMonth(
          mItem,
          capitalByIdAndYear?.data
        );
        return (
          <td
            key={key}
            className={`${
              isLoading
                ? "bg-white"
                : capitalShareByMonth.result === 0 && "bg-red-100 "
            } pr-2 `}
          >
            {isLoading ? (
              "Loading..."
            ) : capitalShareByMonth.result === 0 ? (
              ""
            ) : (
              <span>
                {pesoSign}
                {numberWithCommas(
                  Number(capitalShareByMonth.result).toFixed(2)
                )}
              </span>
            )}
          </td>
        );
      })}
      <td>
        {pesoSign} {numberWithCommas(Number(item.total).toFixed(2))}
      </td>
      <td>
        {pesoSign} {numberWithCommas((Number(item.total) / 12).toFixed(2))}
      </td>
    </>
  );
};

export default ReportDetailedCapitalShareBody;
