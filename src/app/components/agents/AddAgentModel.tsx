import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { FormLabel, Grid, MenuItem, styled, useTheme } from "@mui/material";
import { useFormik } from "formik";
import { Dispatch, SetStateAction, useState } from "react";
import CommonModal from "../CommonModal";
import InputField from "../InputField";
import SelectField from "../selectField";
import CommonChip from "../chip";
import { PriorityIcon, UploadIcon } from "public/assets/icons/task-icons";
import DropdownMenu from "../Dropdown";
import { Dropdown } from "@mui/base";

interface IProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function AddAgentModel({ isOpen, setIsOpen }: IProps) {
  const [priorityMenu, setPriorityMenu] = useState<HTMLElement | null>(null);
  const theme = useTheme();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
      role: "",
    },
    onSubmit: (values) => { },
  });

  const roleItems = [
    { value: "Developer", label: "Developer" },
    { value: "Tester", label: "Tester" },
    { value: "Designer", label: "Designer" },
  ];
  const priorityMenuData = [
    { label: "Medium" },
    { label: "High" },
    { label: "Low" },
  ];
  const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    padding: "8px 20px",
    minWidth: "250px",
  }));

  return (
    <CommonModal
      open={isOpen}
      handleToggle={() => setIsOpen((prev) => !prev)}
      modalTitle="Add Agent"
      maxWidth="733"
    >
      <div className="flex flex-col gap-20 mb-20">
        <InputField
          formik={formik}
          name="department"
          label="Department"
          placeholder="Select Department"
        />
        <InputField
          formik={formik}
          name="subject"
          label="Subject"
          placeholder="Enter Subject"
        />
        <InputField
          formik={formik}
          name="message"
          label="Message"
          placeholder="Enter Message"
        />

        <FormLabel className="block text-[16px] font-medium text-[#111827] ">
          Attachment
        </FormLabel>
        <CommonChip
          colorSecondary
          className="w-1/2 border-solid border-1"
          label="Upload Attachment"
          icon={<UploadIcon />}
        />
        <div className="flex gap-20">
          <DropdownMenu
            anchorEl={priorityMenu}
            handleClose={() => setPriorityMenu(null)}
            button={
              <CommonChip
                onClick={(event) => setPriorityMenu(event.currentTarget)}
                label="Priority"
                icon={<PriorityIcon />}
              />
            }
            popoverProps={{
              open: !!priorityMenu,
              classes: {
                paper: "pt-10 pb-20",
              },
            }}
          >
            {priorityMenuData.map((item) => (
              <StyledMenuItem onClick={() => setPriorityMenu(null)}>
                {item.label}
              </StyledMenuItem>
            ))}
          </DropdownMenu>
        </div>
      </div>
    </CommonModal>
  );
}

export default AddAgentModel;
