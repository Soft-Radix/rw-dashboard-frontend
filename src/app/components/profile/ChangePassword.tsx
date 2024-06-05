import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { MenuItem, styled, useTheme } from "@mui/material";
import { useFormik } from "formik";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import CommonModal from "../CommonModal";
import InputField from "../InputField";
import { useAppDispatch } from "app/store/store";
import { changePassword } from "app/store/Client";
import { useParams } from "react-router";
import { changePasswordByAdmin, changePasswordByClient } from "src/formSchema";

interface IProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  role: string;
}
const userType = {
  admin: 2,
  client: 1,
};

function ChangePassword({ isOpen, setIsOpen, role }: IProps) {
  const dispatch = useAppDispatch();
  const { client_id } = useParams();
  const [isLoading, setisLoading] = useState(false);
  const onSubmit = async (values, { resetForm }) => {
    let requestData = {
      type: userType[role],
      new_password: values.new_password,
      client_id,
    };
    if (userType[role] == 1) {
      requestData["old_password"] = values.old_password;
    }
    setisLoading(true);
    const { payload } = await dispatch(changePassword(requestData));
    if (payload?.data?.status) {
      setIsOpen(false);
      resetForm();
    }
    setisLoading(false);
  };

  const formik = useFormik({
    initialValues:
      userType[role] == 2
        ? {
            new_password: "",
            cnfPassword: "",
          }
        : {
            old_password: "",
            new_password: "",
            cnfPassword: "",
          },
    validationSchema:
      userType[role] == 2 ? changePasswordByAdmin : changePasswordByClient,
    onSubmit,
  });
  useEffect(() => {
    formik.resetForm();
  }, [isOpen]);

  return (
    <CommonModal
      open={isOpen}
      handleToggle={() => setIsOpen((prev) => !prev)}
      modalTitle="Change Password"
      maxWidth="733"
      btnTitle={"Change"}
      closeTitle={"Close"}
      disabled={isLoading}
      onSubmit={formik.handleSubmit}
    >
      <div className="flex flex-col gap-20 ">
        {role !== "admin" && (
          <InputField
            formik={formik}
            name="oldPass"
            type="old_password"
            label="Old Password"
            placeholder="Enter Old Password"
          />
        )}
        <InputField
          formik={formik}
          name="new_password"
          label="New Password"
          type="password"
          placeholder="Enter New Password "
        />
        <InputField
          formik={formik}
          name="cnfPassword"
          type="password"
          label="Confirm Password"
          placeholder="Enter Confirm Password"
        />
      </div>
    </CommonModal>
  );
}

export default ChangePassword;
