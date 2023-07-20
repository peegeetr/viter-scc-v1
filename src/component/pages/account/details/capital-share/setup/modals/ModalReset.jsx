import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { FaQuestionCircle, FaTimesCircle } from "react-icons/fa";
import ButtonSpinner from "../../../../../../partials/spinners/ButtonSpinner";
import { queryData } from "../../../../../../helpers/queryData";
import { StoreContext } from "../../../../../../../store/StoreContext";
import {
  setError,
  setIsReset,
  setMessage,
  setSuccess,
} from "../../../../../../../store/StoreAction";

const ModalReset = ({ dataItem }) => {
  const { dispatch } = React.useContext(StoreContext);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        `/v1/capital-share/reset-setup-details/${dataItem.members_aid}`,
        "put",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["membersSubscribeCapital"],
      });
      if (data.success) {
        dispatch(setIsReset(false));
        dispatch(setSuccess(true));
        dispatch(setMessage(`Successfuly reset`));
      }
      // show error box
      if (!data.success) {
        dispatch(setError(true));
        dispatch(setMessage(data.error));
      }
    },
  });

  const handleClose = () => {
    dispatch(setIsReset(false));
  };

  const handleYes = async () => {
    // // mutate data
    mutation.mutate({
      item: dataItem,
    });
  };

  return (
    <>
      <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-dark bg-opacity-50 z-50">
        <div className="p-1 w-[350px] rounded-b-2xl">
          <div className="flex justify-end items-center bg-white p-3 pb-0 rounded-t-2xl">
            <button
              type="button"
              className="text-primary text-base"
              onClick={handleClose}
            >
              <FaTimesCircle />
            </button>
          </div>
          <div className="bg-white p-4 rounded-b-2xl text-center ">
            <span className="text-5xl text-red-700 ">
              <FaQuestionCircle className="my-0 mx-auto" />
            </span>
            <span className="text-sm font-bold">
              Are you sure you want to reset{" "}
            </span>{" "}
            <br />
            <span className="text-sm font-bold">
              subscribe capital, initial payment and membership fee ?
            </span>
            <p>You can't undo this action.</p>
            <div className="flex items-center gap-1 pt-5">
              <button
                type="submit"
                className="btn-modal-submit"
                disabled={mutation.isLoading}
                onClick={handleYes}
              >
                {mutation.isLoading ? <ButtonSpinner /> : "Confirm"}
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

export default ModalReset;
