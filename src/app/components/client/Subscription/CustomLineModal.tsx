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

const tableTiltles = ["Name", "Description", "Unit Price"];

const rows = [
  {
    name: "Bernad",
    price: "$100",
    isChecked: false,
    description: "Lorem Ipsum",
  },
  {
    name: "Bernad",
    price: "$100",
    isChecked: false,
    description: "Lorem Ipsum",
  },
  {
    name: "Bernads",
    price: "$100",
    isChecked: false,
    description: "Lorem Ipsum",
  },
  {
    name: "Bernad",
    price: "$100",
    isChecked: false,
    description: "Lorem Ipsum",
  },
];

function CustomLineModal({ isOpen, setIsOpen }: IProps) {
  const [list, setList] = useState(rows);

  return (
    <CommonModal
      open={isOpen}
      handleToggle={() => setIsOpen((prev) => !prev)}
      modalTitle="Add Line Items"
      maxWidth="733"
      btnTitle={"Add"}
      closeTitle="Close"
    >
      <div className="flex flex-col gap-20 mb-20 border-1 border-[#D9D9D9] rounded-[10px] overflow-hidden">
        <CommonTable headings={["Name", "Description", "Unit Price"]}>
          {rows.map((row, index) => (
            <TableRow
              key={index}
              // sx={{
              //     "& td": {
              //         borderBottom: "1px solid #EDF2F6",
              //         paddingTop: "12px",
              //         paddingBottom: "12px",
              //         color: theme.palette.primary.main,
              //     },
              // }}
            >
              <TableCell scope="row" className="font-500">
                <div className="py-2">
                  <Checkbox />
                  {row.name}
                </div>
              </TableCell>
              <TableCell align="center" className="font-500">
                {row.description}
              </TableCell>
              <TableCell align="center" className="whitespace-nowrap font-500">
                {row.price}
              </TableCell>
            </TableRow>
          ))}
        </CommonTable>
      </div>
    </CommonModal>
  );
}

export default CustomLineModal;
