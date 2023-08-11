import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React from "react";
import { AiFillCamera } from "react-icons/ai";
import { FaTimesCircle, FaUserCircle } from "react-icons/fa";
import * as Yup from "yup";
import {
  setError,
  setIsAdd,
  setMessage,
  setSuccess,
} from "../../../../../store/StoreAction";
import { StoreContext } from "../../../../../store/StoreContext";
import useUploadPhoto from "../../../../custom-hooks/useUploadPhoto";
import {
  InputFileUpload,
  InputSelect,
  InputText,
} from "../../../../helpers/FormInputs";
import { devBaseImgUrl } from "../../../../helpers/functions-general";
import { queryData } from "../../../../helpers/queryData";
import ButtonSpinner from "../../../../partials/spinners/ButtonSpinner";

const ModalUpdateBasicInfo = ({ item }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const queryClient = useQueryClient();
  const [show, setShow] = React.useState("show");

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(`/v1/members/${item.members_aid}`, "put", values),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["members"] });

      // show success box
      if (data.success) {
        dispatch(setIsAdd(false));
        dispatch(setSuccess(true));
        dispatch(setMessage(`Successfuly updated`));
      }

      // show error box
      if (!data.success) {
        dispatch(setError(true));
        dispatch(setMessage(data.error));
      }
    },
  });
  const handleClose = () => {
    dispatch(setIsAdd(false));
  };
  const { uploadPhoto, handleChangePhoto, photo } = useUploadPhoto(
    "/v1/member/upload/photo",
    dispatch
  );

  const initVal = {
    members_pre_membership_date: item.members_pre_membership_date,
    members_id: item.members_id,
    members_gender: item.members_gender,
    members_birth_date: item.members_birth_date,
    members_first_name: item.members_first_name,
    members_middle_name: item.members_middle_name,
    members_last_name: item.members_last_name,
    members_barcode: item.members_barcode,

    members_first_name_old: item.members_first_name,
    members_middle_name_old: item.members_middle_name,
    members_last_name_old: item.members_last_name,
  };

  const yupSchema = Yup.object({
    members_pre_membership_date: Yup.string().required("Required"),
    members_first_name: Yup.string().required("Required"),
    members_last_name: Yup.string().required("Required"),
    members_middle_name: Yup.string().required("Required"),
    members_gender: Yup.string().required("Required"),
    members_birth_date: Yup.string().required("Required"),
    members_barcode: Yup.string().required("Required"),
  });

  return (
    <>
      <div
        className={`bg-opacity-50 fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-dark z-50 animate-fadeIn ${show}`}
      >
        <div className="p-1 w-[350px] rounded-b-2xl animate-slideUp ">
          <div className="flex justify-between items-center bg-primary p-3 rounded-t-2xl">
            <h3 className="text-white text-sm">Update Basic Information</h3>
            <button
              type="button"
              className="text-gray-200 text-base"
              onClick={handleClose}
            >
              <FaTimesCircle />
            </button>
          </div>
          <div className="bg-white p-4 rounded-b-2xl ">
            <Formik
              initialValues={initVal}
              validationSchema={yupSchema}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                // console.log(values);
                uploadPhoto();
                mutation.mutate({
                  ...values,
                  members_picture: photo ? (
                    photo.name
                  ) : item ? (
                    item.members_picture
                  ) : (
                    <FaUserCircle />
                  ),
                });
              }}
            >
              {(props) => {
                return (
                  <Form className=" ">
                    <div className="relative mb-6 mt-5">
                      {photo || item.members_picture !== "" ? (
                        <img
                          src={
                            photo
                              ? URL.createObjectURL(photo) // preview
                              : item.members_picture // check db
                              ? devBaseImgUrl + "/" + item.members_picture
                              : null
                          }
                          alt="employee photo"
                          className="rounded-full h-20 w-20 object-cover object-center m-auto"
                        />
                      ) : (
                        <span className="text-[5rem] text-gray-400">
                          <FaUserCircle className=" m-auto" />
                        </span>
                      )}

                      <AiFillCamera className="rounded-full h-8 w-8 p-1 absolute top-12 right-0 bottom-0 left-40 fill-white bg-sky-500 cursor-pointer border-sky-100 border-4 duration-200" />
                      <InputFileUpload
                        name="photo"
                        type="file"
                        accept="image/*"
                        onChange={handleChangePhoto}
                        className="rounded-full h-8 w-8 p-2 absolute top-12 right-0 bottom-0 left-40 opacity-0 text-[0] cursor-pointer"
                      />
                    </div>
                    <div className="relative mb-6">
                      <InputText
                        label="Pre Membership Date"
                        type="text"
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) => (e.target.type = "text")}
                        name="members_pre_membership_date"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="relative mb-5">
                      <InputText
                        label="Account No."
                        type="text"
                        name="members_barcode"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="relative mb-5">
                      <InputText
                        label="Last Name"
                        type="text"
                        name="members_last_name"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="relative mb-5">
                      <InputText
                        label="First Name"
                        type="text"
                        name="members_first_name"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="relative mb-5">
                      <InputText
                        label="Middle Name"
                        type="text"
                        name="members_middle_name"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="relative mb-5">
                      <InputSelect
                        label="Gender"
                        type="text"
                        name="members_gender"
                        disabled={mutation.isLoading}
                      >
                        <option value="">--</option>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                      </InputSelect>
                    </div>

                    <div className="relative mb-6 mt-5">
                      <InputText
                        label="Birth Date"
                        type="text"
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) => (e.target.type = "text")}
                        name="members_birth_date"
                        disabled={mutation.isLoading}
                      />
                    </div>

                    <div className="flex items-center gap-1 pt-3">
                      <button
                        type="submit"
                        // disabled={mutation.isLoading || !props.dirty}
                        disabled={mutation.isLoading}
                        className="btn-modal-submit relative"
                      >
                        {mutation.isLoading ? (
                          <ButtonSpinner />
                        ) : item ? (
                          "Save"
                        ) : (
                          "Add"
                        )}
                      </button>
                      <button
                        type="reset"
                        className="btn-modal-cancel"
                        onClick={handleClose}
                        disabled={mutation.isLoading}
                      >
                        Cancel
                      </button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalUpdateBasicInfo;
