import { useFormik } from "formik";
import { Dispatch, SetStateAction, useState } from "react";
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
const lists = [
  {
    name: "Full time virtual professional - business analyst",
    price: "$5.99",
    isChecked: false,
  },
  {
    name: "Full time virtual professional - business analyst",
    price: "$5.99",
    isChecked: false,
  },
  {
    name: "Full time virtual professional - business analysts",
    price: "$5.99",
    isChecked: false,
  },
  {
    name: "Full time virtual professional - business analyst",
    price: "$5.99",
    isChecked: false,
  },
];

function CustomLineModal({ isOpen, setIsOpen }: IProps) {
  const [list, setList] = useState(lists);
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

  const handleCheckboxChange = (index) => {
    const newList = [...list];
    newList[index].isChecked = !newList[index].isChecked;
    setList(newList);
  };

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
            background: "#F6F6F6",
            borderRadius: "7px",
            "& .MuiInputBase-root": {
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            },
          }}
        />

        <InputField
          formik={formik}
          name="select"
          placeholder="Search the product library by name"
          sx={{
            background: "#F6F6F6",

            borderRadius: "7px",
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon className="p-3 ml-10" />
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
          <ul className="list-none  px-20 py-10 cursor-pointer ">
            {list.map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-between text-[16px] font-400"
                onClick={() => handleCheckboxChange(index)}
              >
                <div className="py-10">
                  {" "}
                  <Checkbox checked={item.isChecked} />
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
