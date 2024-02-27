import { Grid, MenuItem, styled } from "@mui/material";
import { useFormik } from "formik";
import { Dispatch, SetStateAction, useState } from "react";
import CommonModal from "../CommonModal";
import InputField from "../InputField";
import SelectField from "../selectField";

interface IProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  padding: "8px 20px",
  minWidth: "250px",
}));

function AddUserModal({ isOpen, setIsOpen }: IProps) {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
      role: "",
    },
    onSubmit: (values) => {},
  });

  return (
    <CommonModal
      open={isOpen}
      handleToggle={() => setIsOpen((prev) => !prev)}
      modalTitle="Add User"
      maxWidth="733"
    >
      <div className="h-[100px] w-[100px] mb-[2.4rem]">
        <img
          src="/assets/images/avatars/male-01.jpg"
          alt=""
          className="h-full w-full rounded-full"
        />
      </div>
      <div className="flex flex-col gap-20 mb-20">
        <InputField
          formik={formik}
          name="name"
          label="User Name"
          placeholder="Enter User Name"
        />
        <InputField
          formik={formik}
          name="email"
          label="Email Address"
          placeholder="Enter Email Address"
        />
        <Grid container spacing={2.2}>
          <Grid item md={6}>
            <InputField
              type="password"
              formik={formik}
              name="password"
              label="Password"
              placeholder="Enter Password"
            />
          </Grid>
          <Grid item md={6}>
            <InputField
              type="password"
              formik={formik}
              name="confirm_password"
              label="Confirm Password"
              placeholder="Enter Confirm Password"
            />
          </Grid>
        </Grid>
        <SelectField
          formik={formik}
          name="role"
          label="Role"
          placeholder="Select Role"
        >
          <MenuItem value="Developer">Developer</MenuItem>
          <MenuItem value="Tester">Tester</MenuItem>
          <MenuItem value="Designer">Designer</MenuItem>
        </SelectField>
      </div>
    </CommonModal>
  );
}

export default AddUserModal;
