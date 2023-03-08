import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import {
  FaArchive,
  FaQuestionCircle,
  FaTimesCircle,
  FaTrash,
} from "react-icons/fa";
import { setIsConfirm, setStartIndex } from "../../../store/StoreAction";
import { StoreContext } from "../../../store/StoreContext";
import { fetchData } from "../../helpers/fetchData";
import { queryData } from "../../helpers/queryData";
import ButtonSpinner from "../spinners/ButtonSpinner";

const ModalConfirm = ({
  id,
  isDel,
  mysqlApiReset,
  mysqlApiArchive,
  msg,
  item,
  queryKey,
}) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [loading, setLoading] = React.useState(false);
  const [show, setShow] = React.useState("show");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(isDel ? mysqlApiReset : mysqlApiArchive, "put", values),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      dispatch(setIsConfirm(false));
    },
  });

  const handleClose = () => {
    setShow("");
    setTimeout(() => {
      dispatch(setIsConfirm(false));
    }, 500);
  };

  const handleYes = async () => {
    // mutate data
    mutation.mutate({
      isActive: 0,
    });
  };

  return (
    <>
      <div
        className={`modal fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-dark z-50 animate-fadeIn ${show}`}
      >
        <div className="p-1 w-[350px] rounded-b-2xl animate-slideUp ">
          <div className="flex justify-end items-center bg-white p-3 pb-0 rounded-t-2xl">
            <button
              type="button"
              className="text-primary text-base"
              onClick={handleClose}
            >
              <FaTimesCircle
                className={isDel ? "fill-alert" : "fill-archive"}
              />
            </button>
          </div>
          <div className="bg-white p-4 rounded-b-2xl text-center ">
            {isDel ? (
              <span className="text-5xl text-alert ">
                <FaTrash className="my-0 mx-auto" />
              </span>
            ) : (
              <span className="text-5xl text-archive ">
                <FaArchive className="my-0 mx-auto" />
              </span>
            )}
            <span className="text-sm font-bold">{msg}</span> <br />
            <span className="text-sm font-bold">{item} ?</span>
            <div className="flex items-center gap-1 pt-5">
              <button
                type="submit"
                className="btn-modal-archive"
                disabled={mutation.isLoading}
                onClick={handleYes}
              >
                {loading ? <ButtonSpinner /> : "Confirm"}
              </button>
              <button
                type="reset"
                className="btn-modal-cancel"
                disabled={mutation.isLoading}
                onClick={handleClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalConfirm;
