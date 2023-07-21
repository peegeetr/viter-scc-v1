import React from "react";
import ButtonSpinner from "./spinners/ButtonSpinner";

const Loadmore = ({
  fetchNextPage,
  isFetchingNextPage,
  hasNextPage,
  result,
  setPage,
  page,
  refView,
}) => {
  if (page === result?.total_pages) {
    return (
      <>
        {isFetchingNextPage ? (
          <button
            type="button"
            disabled={isFetchingNextPage}
            className="print:hidden h-full relative my-6 text-white p-1.5 rounded-full w-36 bg-gradient-to-t from-secondary to-primary hover:bg-gradient-to-r hover:from-primary hover:to-secondary disabled:opacity-50 disabled:hover:bg-primary disabled:hover:opacity-50 disabled:cursor-not-allowed"
          >
            <ButtonSpinner />
          </button>
        ) : (
          <div className="print:hidden my-6 p-1.5">End of list.</div>
        )}
      </>
    );
  }
  if (hasNextPage) {
    return (
      <button
        ref={refView}
        type="button"
        disabled={isFetchingNextPage}
        onClick={() => {
          setPage((prev) => prev + 1);
          fetchNextPage();
        }}
        className="print:hidden h-full relative my-6 text-white p-1.5 rounded-full w-36 bg-gradient-to-t from-secondary to-primary hover:bg-gradient-to-r hover:from-primary hover:to-secondary disabled:opacity-50 disabled:hover:bg-primary disabled:hover:opacity-50 disabled:cursor-not-allowed"
      >
        {isFetchingNextPage ? <ButtonSpinner /> : <span>Load more</span>}
      </button>
    );
  }
};

export default Loadmore;
