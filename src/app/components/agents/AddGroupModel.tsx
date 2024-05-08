import { useFormik } from "formik";
import { Dispatch, SetStateAction } from "react";
import CommonModal from "../CommonModal";
import InputField from "../InputField";
import SearchInput from "../SearchInput";
import { InputAdornment } from "@mui/material";
import { SearchIcon } from "public/assets/icons/topBarIcons";

interface IProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isNewAgent: boolean;
}

function AddGroupModel({ isOpen, setIsOpen, isNewAgent }: IProps) {
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
      modalTitle={isNewAgent ? "Add Agent" : "Add Group"}
      maxWidth="733"
      btnTitle="Save"
    >
      <div className="flex flex-col gap-20 mb-20 ">
        {isNewAgent ? (
          <InputField
            formik={formik}
            name="groupName"
            label="Agent"
            placeholder="Search Agent with Name or ID"
            sx={{ backgroundColor: "#F6F6F6", borderRadius: "8px" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <span className="text-[16px] font-600 text-[#111827] bg-[#F6F6F6] pl-10">
                    <SearchIcon />
                  </span>
                </InputAdornment>
              ),
            }}
          />
        ) : (
          <InputField
            formik={formik}
            name="groupName"
            label="Group Name"
            placeholder="Enter Group Name"
          />
        )}
      </div>
    </CommonModal>
  );
}

export default AddGroupModel;
