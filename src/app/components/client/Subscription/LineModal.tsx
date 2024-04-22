import { useFormik } from "formik";
import { Dispatch, SetStateAction } from "react";
import CommonModal from "../../CommonModal";
import InputField from "../../InputField";
import {
  Checkbox,
  InputAdornment,
  TableCell,
  TableRow,
  Theme,
  Typography,
} from "@mui/material";
import { EmployOptions, StyledMenuItem } from "src/utils";
import SelectField from "../../selectField";
import { SearchIcon } from "public/assets/icons/topBarIcons";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CommonTable from "../../commonTable";
import { useTheme } from "@mui/styles";
interface IProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
const list = [
  {
    name: "Full time virtual professional - business analyst",
    price: "$5.99",
  },
  {
    name: "Full time virtual professional - business analyst",
    price: "$5.99",
  },
  {
    name: "Full time virtual professional - business analysts",
    price: "$5.99",
  },
  {
    name: "Full time virtual professional - business analyst",
    price: "$5.99",
  },
];

function LineModal({ isOpen, setIsOpen }: IProps) {
  const theme: Theme = useTheme();
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
      modalTitle="Add Custom Line Items"
      maxWidth="733"
      btnTitle={"Save"}
    >
      <div className="flex flex-col gap-20 mb-20">
        <InputField
          formik={formik}
          name="name"
          label=" Name"
          placeholder="Enter Name"
        />
        <InputField
          formik={formik}
          name="description"
          label="Description"
          placeholder="Enter Description"
        />
        <div className="flex items-center justify-between  py-10 ">
          <span className="text-[18px] font-500 text-[#111827]">Price</span>

          <span className="text-[18px] font-500 text-[#111827] ">
            Currency:
            <span className="font-400"> US Dollar (USD)$</span>
          </span>
        </div>
        <InputField
          formik={formik}
          name="unit Price"
          label="Unit Price"
          placeholder="Enter Unit Price"
        />

        <SelectField
          formik={formik}
          name="status"
          label="Billing Frequency"
          placeholder="Select"
          sx={{
            "& .radioIcon": { display: "none" },
          }}
        >
          {EmployOptions.map((item) => (
            <StyledMenuItem key={item.value} value={item.value}>
              {item.label}
            </StyledMenuItem>
          ))}
        </SelectField>
      </div>
    </CommonModal>
  );
}

export default LineModal;
