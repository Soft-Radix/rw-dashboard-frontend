import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { FormLabel, Grid, MenuItem, styled } from "@mui/material";
import { useFormik } from "formik";
import {
  AssignIcon,
  MicIcon,
  PriorityIcon,
  ReminderIcon,
  ScreenRecordingIcon,
  StatusIcon,
  UploadIcon,
} from "public/assets/icons/task-icons";
import { Dispatch, SetStateAction, useState } from "react";
import CommonModal from "../CommonModal";
import DropdownMenu from "../Dropdown";
import InputField from "../InputField";
import CommonChip from "../chip";
import CustomButton from "../custom_button";

interface IProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  padding: "8px 20px",
  minWidth: "250px",
}));

function AddClient({ isOpen, setIsOpen }: IProps) {
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    onSubmit: (values) => {},
  });

  return (
    <CommonModal
      open={isOpen}
      handleToggle={() => setIsOpen((prev) => !prev)}
      modalTitle="Add Client"
      maxWidth="910"
    >
      <div className="flex flex-col gap-20">
        <InputField
          formik={formik}
          name="fName"
          label="First Name"
          placeholder="Enter First Name"
        />
        <InputField
          formik={formik}
          name="lName"
          label="Last Name"
          placeholder="Enter Last Name"
        />
        <InputField
          formik={formik}
          name="email"
          label="Email Address"
          placeholder="Enter Email"
        />
        <InputField
          formik={formik}
          name="cName"
          label="Company Name"
          placeholder="Enter Company Name"
        />
      </div>
    </CommonModal>
  );
}

export default AddClient;
