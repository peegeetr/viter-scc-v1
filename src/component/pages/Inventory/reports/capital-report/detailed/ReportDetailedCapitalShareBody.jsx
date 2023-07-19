import React from "react";
import { StoreContext } from "../../../../../../store/StoreContext";
import useQueryData from "../../../../../custom-hooks/useQueryData";
import {
  getUrlParam,
  numberWithCommas,
  pesoSign,
} from "../../../../../helpers/functions-general";
import { getMonth } from "../../report-function";
import { getCapitalShareByMonth } from "../../../../account/details/capital-share/functions-capital-share";

const ReportDetailedCapitalShareBody = ({ item }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const memberid = getUrlParam().get("memberid");

  // use if not loadmore button undertime
  const { data: capitalByIdAndYear } = useQueryData(
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
      {getMonth()?.map((item, key) => {
        capitalShareByMonth = getCapitalShareByMonth(
          item,
          capitalByIdAndYear?.data
        );
        return (
          <td
            key={key}
            className={`${
              capitalShareByMonth.result === "" && "bg-red-100 "
            } pr-2 `}
          >
            {capitalShareByMonth.result === "" ? (
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
