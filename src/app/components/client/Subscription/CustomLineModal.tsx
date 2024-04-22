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

function CustomLineModal({ isOpen, setIsOpen }: IProps) {
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
      modalTitle="Add Line Items"
      maxWidth="733"
      btnTitle={"Save"}
    >
      <div className="flex flex-col gap-20 mb-20">
        <Typography className="text-[16px] font-500 text-[#111827]">
          Create Date
        </Typography>
        <DatePicker
          label="Select"
          sx={{
            border: "none",
            "& .react-datepicker-wrapper": {
              border: "none", // Remove border from the wrapper element
            },
          }}
        />

        <InputField
          formik={formik}
          name="select"
          placeholder="Search the product library by name"
          sx={{
            background: "#F6F6F6",
            border: "0.5px solid #9DA0A6",
            borderRadius: "7px",
            paddingX: "10px",
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon className="p-3" />
              </InputAdornment>
            ),
          }}
        />
        <Typography className="text-[16px] font-500 text-[#111827]">
          Views
        </Typography>
        <div className="bg-[#F6F6F6] rounded-8 ">
          <div className="flex items-center justify-between px-20 py-10  border-b-1 border-solid border-[#E7E8E9]">
            <span className="text-[16px] font-500 text-[#111827]">Name</span>

            <span className="text-[16px] font-500 text-[#111827] pr-20">
              Price
            </span>
          </div>
          <ul className="list-none  px-20 py-10 ">
            {list.map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-between text-[16px] font-400"
              >
                <div className="py-10">
                  {" "}
                  <Checkbox />
                  {item.name}
                </div>
                <div className="pr-20">{item.price}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </CommonModal>
  );
}

export default CustomLineModal;
