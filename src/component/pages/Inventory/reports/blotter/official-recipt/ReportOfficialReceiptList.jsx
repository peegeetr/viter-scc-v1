import { useInfiniteQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdFilterAlt } from "react-icons/md";
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
import { useInView } from "react-intersection-observer";
import Loadmore from "../../../../../partials/Loadmore";

const ReportOfficialReceiptList = ({ setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [dataItem, setData] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [isFilter, setFilter] = React.useState(false);
  const [isSubmit, setSubmit] = React.useState(false);
  const [value, setValue] = React.useState([]);
  const [isStartDate, setStartDate] = React.useState(getDateNow());
  const [isEndDate, setEndDate] = React.useState(getDateNow());
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
    queryKey: ["blotter-official-receipt", isSubmit],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/v1/report-official-receipt/filter-date`, // search endpoint
        `/v1/report-official-receipt/page/${pageParam}`, // list endpoint
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
    setId(item.or_invoice_aid);
    setData(item);
    setDel(true);
  };

  const initVal = {
    start_date: "",
    end_date: "",
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
                  disabled={isFetching || !props.dirty}
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
      <div className="text-lg print:text-center">
        <p className="uppercase ">
          {isFilter && (
            <span>
              date period from
              <span className="font-semibold print:text-sm">{` ${formatDate(
                isStartDate
              )} `}</span>
              to
              <span className="font-semibold print:text-sm">{` ${formatDate(
                isEndDate
              )}`}</span>
            </span>
          )}
        </p>
      </div>

      <div className="relative text-center overflow-x-auto print:overflow-x-none z-0">
        <table>
          <thead>
            <tr className="uppercase">
              <th>#</th>
              <th className="min-w-[15rem] w-[5rem] print:min-w-0 print:w-[8rem]">
                Date
              </th>
              <th className="min-w-[8rem] w-[15rem] print:min-w-0 print:w-[5rem]">
                OR no.
              </th>
              <th className="min-w-[8rem] w-[15rem] print:min-w-0 print:w-[9rem]">
                payee
              </th>
              <th className="min-w-[8rem] w-[15rem] text-right print:min-w-0 print:w-[9rem]">
                amount
              </th>
              <th className="min-w-[8rem] print:min-w-0 ">remarks</th>
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
                  total += Number(item.or_invoice_amount);
                  return (
                    <tr key={key}>
                      <td> {counter++}.</td>
                      <td>{formatDate(item.or_invoice_date)}</td>

                      <td>{item.or_invoice_or_no}</td>
                      <td>
                        {`${item.members_last_name}, ${item.members_first_name}`}
                      </td>
                      <td className="text-right">
                        {pesoSign}{" "}
                        {numberWithCommas(
                          Number(item.or_invoice_amount).toFixed(2)
                        )}
                      </td>
                      <td>{item.or_invoice_remarks} </td>

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
              <tr className="capitalize">
                <td colSpan={5} className="text-right font-semibold">
                  <span className="pr-5">Total recipts</span>
                  {pesoSign} {numberWithCommas(Number(total).toFixed(2))}
                </td>
                <td colSpan={2} className="print:hidden"></td>
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
          mysqlApiDelete={`/v1/report-official-receipt/${id}`}
          msg={"Are you sure you want to delete "}
          item={`${formatDate(dataItem.or_invoice_date)}`}
          arrKey="blotter-official-receipt"
        />
      )}
    </>
  );
};

export default ReportOfficialReceiptList;
