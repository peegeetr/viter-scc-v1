import React from "react";
import ReportCapitalShareBodyPrintView from "./ReportCapitalShareBodyPrintView";

const ReportCapitalShareListPrintView = ({ result }) => {
  return (
    <>
      {/* start print version */}
      <div className="grid-cols-3 gap-2 hidden print:grid mt-8">
        {result?.pages.map((page, key) => (
          <React.Fragment key={key}>
            {page.data.map((item, key) => {
              return (
                <div className="border-gray-100 border-2" key={key}>
                  <p className="mb-0 font-semibold bg-primary text-white px-2 pt-2">
                    {`${item.members_last_name} ${item.members_first_name}`}
                  </p>
                  <p className="font-semibold bg-primary text-white px-2 pb-2">
                    Year {item.year}
                  </p>

                  <ReportCapitalShareBodyPrintView item={item} />
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
      {/* end print version */}
    </>
  );
};

export default ReportCapitalShareListPrintView;
