import {
  Button,
  IconButton,
  MenuItem,
  TableCell,
  TableRow,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import {
  AddressIcon,
  BillingAddressIcon,
} from "public/assets/icons/billingIcons";
import { DeleteIcon, EditIcon } from "public/assets/icons/common";
import { FilterIcon } from "public/assets/icons/user-icon";
import { useState } from "react";
import DropdownMenu from "../Dropdown";
import SelectField from "../selectField";
import CommonTable from "../commonTable";

const rows = [
  {
    date: "Feb 13, 2024",
    description: "Lorem ipsum dolor sit amet",
    amount: 300,
    invoice: "PDF",
  },
  {
    date: "Feb 13, 2024",
    description: "Lorem ipsum dolor sit amet",
    amount: 300,
    invoice: "PDF",
  },
  {
    date: "Feb 13, 2024",
    description: "Lorem ipsum dolor sit amet",
    amount: 300,
    invoice: "PDF",
  },
];

function BillingHistory() {
  const theme = useTheme();
  const [filterMenu, setFilterMenu] = useState<HTMLElement | null>(null);

  const formik = useFormik({
    initialValues: {
      month: "",
      year: "",
    },
    // validationSchema: validationSchemaProperty,
    onSubmit: (values) => {},
  });

  return (
    <div className="shadow-sm bg-white rounded-lg ">
      <div className="flex items-center justify-between  p-24">
        <h5 className="text-title text-xl font-600 flex items-center gap-12">
          <BillingAddressIcon className="text-secondary" /> Billing History
        </h5>
        <DropdownMenu
          handleClose={() => setFilterMenu(null)}
          anchorEl={filterMenu}
          button={
            <Button
              variant="text"
              className="h-[40px] text-[16px] flex gap-12 text-para_light whitespace-nowrap"
              aria-label="Add User"
              size="large"
              onClick={(event) => setFilterMenu(event.currentTarget)}
            >
              <FilterIcon className="shrink-0" />
              Filter
            </Button>
          }
          popoverProps={{
            open: !!filterMenu,
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "right",
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "right",
            },
            classes: {
              paper: "pt-0 pb-0",
            },
          }}
        >
          <div className="w-[240px]">
            <div className="text-black text-lg font-500 px-20 py-16 border-b border-b-[#EDF2F6]">
              Filter Options
            </div>
            <div className="px-20 py-14 flex flex-col gap-14">
              <SelectField
                label="Month"
                name="month"
                formik={formik}
                placeholder="Select Month"
                sx={{
                  "&.MuiInputBase-root": {
                    "& .MuiSelect-select": {
                      minHeight: "40px",
                    },
                  },
                }}
              >
                <MenuItem value="January">January</MenuItem>
                <MenuItem value="February">February</MenuItem>
                <MenuItem value="March">March</MenuItem>
              </SelectField>
              <SelectField
                label="Year"
                name="year"
                formik={formik}
                placeholder="Select Year"
                sx={{
                  "&.MuiInputBase-root": {
                    "& .MuiSelect-select": {
                      minHeight: "40px",
                    },
                  },
                }}
              >
                <MenuItem value="2024">2024</MenuItem>
                <MenuItem value="2023">2023</MenuItem>
              </SelectField>
              <div className="flex items-center justify-end gap-6 px-20 text-sm">
                <Button variant="text" className="text-para text-sm">
                  Clear All
                </Button>
                <Button variant="text" color="secondary" className="text-sm">
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </DropdownMenu>
      </div>
      <CommonTable
        headings={["Date", "Description", "Amount", "Invoice"]}
        headingRowProps={{
          sx: {
            textAlign: "center",
            "& th:last-child": {
              textAlign: "center",
            },
          },
        }}
      >
        <>
          {rows.map((row, index) => (
            <TableRow
              key={index}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                "& td": {
                  borderBottom: "1px solid #EDF2F6",
                  paddingTop: "12px",
                  paddingBottom: "12px",
                  color: theme.palette.primary.main,
                },
              }}
            >
              <TableCell scope="row">{row.date}</TableCell>
              <TableCell align="center">{row.description}</TableCell>
              <TableCell align="center">${row.amount}</TableCell>
              <TableCell align="center">{row.invoice}</TableCell>
            </TableRow>
          ))}
        </>
      </CommonTable>
    </div>
  );
}

export default BillingHistory;
