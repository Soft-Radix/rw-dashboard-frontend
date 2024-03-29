import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { MenuItem, styled, useTheme } from "@mui/material";
import { useFormik } from "formik";
import { Dispatch, SetStateAction } from "react";
import CommonModal from "../CommonModal";
import InputField from "../InputField";
import SelectField from "../selectField";

interface IProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "16px",
  "& .radioIcon": {
    color: "#9DA0A6",
    border: "2px solid currentColor",
    height: "16px",
    aspectRatio: 1,
    borderRadius: "50%",
    position: "relative",
  },
  "&.Mui-selected": {
    backgroundColor: "transparent",
    "& .radioIcon": {
      color: theme.palette.secondary.main,
      "&::after": {
        content: '""',
        display: "block",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        height: "7px",
        aspectRatio: 1,
        borderRadius: "50%",
        backgroundColor: "currentColor",
      },
    },
  },
}));

function EditProfile({ isOpen, setIsOpen }: IProps) {
  const theme = useTheme();

  const formik = useFormik({
    initialValues: {
      name: "",
      role: "",
      email: "",
      phone: "",
    },
    onSubmit: (values) => {},
  });

  const roleItems = [
    { value: "Developer", label: "Developer" },
    { value: "Tester", label: "Tester" },
    { value: "Designer", label: "Designer" },
  ];

  return (
    <CommonModal
      open={isOpen}
      handleToggle={() => setIsOpen((prev) => !prev)}
      modalTitle="Edit Profile"
      maxWidth="733"
    >
      <div className="h-[100px] w-[100px] mb-[2.4rem] relative">
        <img
          src="/assets/images/avatars/male-01.jpg"
          alt=""
          className="h-full w-full rounded-full"
        />
        <span className="absolute bottom-0 right-0 bg-secondary h-[3.4rem] aspect-square flex items-center justify-center rounded-full border-2 border-white cursor-pointer">
          <FuseSvgIcon className="text-white" size={20}>
            heroicons-outline:camera
          </FuseSvgIcon>
        </span>
      </div>
      <div className="flex flex-col gap-20 mb-20">
        <InputField
          formik={formik}
          name="name"
          label="Name"
          placeholder="Enter Name"
        />
        <SelectField
          formik={formik}
          name="role"
          label="Role"
          placeholder="Select Role"
          sx={{
            "& .radioIcon": { display: "none" },
          }}
        >
          {roleItems.map((item) => (
            <StyledMenuItem key={item.value} value={item.value}>
              <div className="radioIcon" />
              {item.label}
            </StyledMenuItem>
          ))}
        </SelectField>
        <InputField
          formik={formik}
          name="email"
          label="Email Address"
          placeholder="Enter Email Address"
        />
        <InputField
          formik={formik}
          name="phone"
          label="Phone Number"
          placeholder="Enter Phone Number"
        />
      </div>
    </CommonModal>
  );
}

export default EditProfile;
