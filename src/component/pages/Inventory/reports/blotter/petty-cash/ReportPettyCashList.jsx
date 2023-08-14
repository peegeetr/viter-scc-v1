import { useInfiniteQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdFilterAlt } from "react-icons/md";
import { useInView } from "react-intersection-observer";
import * as Yup from "yup";
import { setIsAdd, setIsRestore } from "../../../../../../store/StoreAction";
import { StoreContext } from "../../../../../../store/StoreContext";
import { InputText } from "../../../../../helpers/FormInputs";
import {
  formatDate,
  getDateNow,
  numberWithCommas,
  pesoSign,
} from "../../../../../helpers/functions-general";
import { queryDataInfinite } from "../../../../../helpers/queryDataInfinite";
import NoData from "../../../../../partials/NoData";
import ServerError from "../../../../../partials/ServerError";
import ModalDeleteRestore from "../../../../../partials/modals/ModalDeleteRestore";
import ButtonSpinner from "../../../../../partials/spinners/ButtonSpinner";
import TableSpinner from "../../../../../partials/spinners/TableSpinner";
import Loadmore from "../../../../../partials/Loadmore";

const ReportPettyCashList = ({ setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [dataItem, setData] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [isFilter, setFilter] = React.useState(false);
  const [isSubmit, setSubmit] = React.useState(false);
  const [isStartDate, setStartDate] = React.useState(getDateNow());
  const [isEndDate, setEndDate] = React.useState(getDateNow());
  const [value, setValue] = React.useState([]);
  const [isDel, setDel] = React.useState(false);
  const [page, setPage] = React.useState(1);
  let counter = 1;
  let total = 0;
  const { ref, inView } = useInView();
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
    queryKey: ["blotter-petty-cash", isSubmit],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/v1/report-petty-cash/filter-date`, // search endpoint
        `/v1/report-petty-cash/page/${pageParam}`, // list endpoint
        isFilter, // search boolean
        "post",
        { value }
      ),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total) {
        return lastPage.page + lastPage.count;
      }
      return;
    },
    refetchOnWindowFocus: false,
    networkMode: "always",
    cacheTime: 200,
  });
  React.useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1);
      fetchNextPage();
    }
  }, [inView]);

  const handleEdit = (item) => {
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };

  const handleDelete = (item) => {
    dispatch(setIsRestore(true));
    setId(item.petty_cash_aid);
    setData(item);
    setDel(true);
  };

  const initVal = {
    start_date: getDateNow(),
    end_date: getDateNow(),
  };
  const yupSchema = Yup.object({
    start_date: Yup.string().required("Required"),
    end_date: Yup.string().required("Required"),
  });
  return (
    <>
      <Formik
        initialValues={initVal}
        validationSchema={yupSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setFilter(true);
          setSubmit(!isSubmit);
          setValue(values);
          setStartDate(values.start_date);
          setEndDate(values.end_date);
        }}
      >
        {(props) => {
          return (
            <Form>
              <div className="grid gap-4 xl:grid-cols-[1fr_1fr_15rem] pb-5 items-center print:hidden ">
                <div className="relative">
                  <InputText
                    label="Start Date"
                    name="start_date"
                    type="date"
                    disabled={isFetching}
                  />
                </div>

                <div className="relative">
                  <InputText
                    label="End Date"
                    name="end_date"
                    type="date"
                    disabled={isFetching}
                  />
                </div>

                <button
                  className="btn-modal-submit relative"
                  type="submit"
                  // disabled={isFetching || !props.dirty}
                  disabled={isFetching}
                >
                  {isFetching && <ButtonSpinner />}
                  <MdFilterAlt className="text-lg" />
                  <span>Filter</span>
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
      <div className="print:text-center">
        <p className="text-center font-semibold print:text-sm">
          {isFilter && (
            <span>
              {" "}
              {` ${formatDate(isStartDate)}   
              -
               ${formatDate(isEndDate)}`}
            </span>
          )}
        </p>
      </div>

      <div className="relative text-center overflow-x-auto print:overflow-x-none z-0 print:mt-5">
        <table>
          <thead>
            <tr className=" capitalize">
              <th>#</th>
              <th className="min-w-[10rem] print:min-w-0">Date</th>
              <th className="min-w-[8rem] print:min-w-0">Voucher no.</th>
              <th className="min-w-[8rem] print:min-w-0">payee</th>
              <th className="min-w-[8rem] text-right print:min-w-0">in</th>
              <th className="min-w-[8rem] text-right print:min-w-0">out</th>
              <th className="min-w-[10rem] text-right print:min-w-0">
                balance
              </th>
              <th className="max-w-[5rem] print:hidden ">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(status === "loading" || result?.pages[0].data.length === 0) && (
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
                  total += Number(item.petty_cash_balance);
                  return (
                    <tr key={key}>
                      <td> {counter++}.</td>
                      <td>{formatDate(item.petty_cash_date)}</td>

                      <td>{item.petty_cash_voucher_no}</td>
                      <td>{item.petty_cash_payee_name}</td>
                      <td className="text-right">
                        {pesoSign}{" "}
                        {numberWithCommas(
                          Number(item.petty_cash_in).toFixed(2)
                        )}
                      </td>
                      <td className="text-right">
                        {pesoSign}{" "}
                        {numberWithCommas(
                          Number(item.petty_cash_out).toFixed(2)
                        )}
                      </td>
                      <td className="text-right">
                        {pesoSign}{" "}
                        {numberWithCommas(
                          Number(item.petty_cash_balance).toFixed(2)
                        )}
                      </td>

                      <td className=" print:hidden">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            className="btn-action-table tooltip-action-table"
                            data-tooltip="Edit"
                            onClick={() => handleEdit(item)}
                          >
                            <FaEdit />
                          </button>
                          <button
                            type="button"
                            className="btn-action-table tooltip-action-table"
                            data-tooltip="Delete"
                            onClick={() => handleDelete(item)}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </React.Fragment>
            ))}
            {result?.pages[0].data.length > 0 && (
              <tr className="capitalize border-0">
                <td colSpan={6} className=" "></td>
                <td className="text-right font-semibold">
                  <span className="pr-5">Total recipts</span>
                  {pesoSign} {numberWithCommas(Number(total).toFixed(2))}
                </td>
                <td className="print:hidden"></td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="text-center print:hidden">
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

      <div className="hidden print:grid grid-cols-[10rem_15rem] items-center capitalize p-8 mt-20">
        <p className="mb-5">Prepared by :</p>
        <input className="!border-0 mb-5 rounded-none !border-b-[2px] " />
        <p className="mb-5">verified by :</p>
        <input className="!border-0 mb-5 rounded-none !border-b-[2px] " />
        <p className="mb-5">Reconciled on :</p>
        <input className="!border-0 mb-5 rounded-none !border-b-[2px] " />
      </div>

      {store.isRestore && (
        <ModalDeleteRestore
          id={id}
          isDel={isDel}
          mysqlApiDelete={`/v1/report-petty-cash/${id}`}
          msg={"Are you sure you want to delete this "}
          item={formatDate(dataItem.petty_cash_date)}
          arrKey="blotter-petty-cash"
        />
      )}
    </>
  );
};

export default ReportPettyCashList;
