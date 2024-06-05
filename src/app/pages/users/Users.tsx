import {
  Button,
  Checkbox,
  MenuItem,
  TableCell,
  TableRow,
  Theme,
} from "@mui/material";
import { useTheme } from "@mui/styles";
import { useFormik } from "formik";
import { DeleteIcon, EditIcon } from "public/assets/icons/common";
import { PlusIcon } from "public/assets/icons/dashboardIcons";
import { SearchIcon } from "public/assets/icons/topBarIcons";
import { FilterIcon } from "public/assets/icons/user-icon";
import { useState } from "react";
import DropdownMenu from "src/app/components/Dropdown";
import InputField from "src/app/components/InputField";
import TitleBar from "src/app/components/TitleBar";
import CommonTable from "src/app/components/commonTable";
import CommonPagination from "src/app/components/pagination";
import SelectField from "src/app/components/selectField";
import AddUserModal from "src/app/components/users/AddUser";

// id: "1542145611525",
// name: "Web page design",
// companyName: "Account Manager",
// date: "Feb 12,2024",
// status: "In Review",
const rows = [
  {
    defaultChecked: true,
    image: "male-01.jpg",
    name: "Penelope",
    email: "info0675@gmail.com",
    role: "Designer",
    lastLogin: "20min ago",
    twoStep: "Enabled",
    date: "Feb 12,2024",
  },
  {
    image: "male-02.jpg",
    name: "Rachel",
    email: "info0675@gmail.com",
    role: "Developer",
    lastLogin: "20min ago",
    twoStep: "Enabled",
    date: "Feb 12,2024",
  },
  {
    image: "female-01.jpg",
    name: "Vanessa",
    email: "info0675@gmail.com",
    role: "Developer",
    lastLogin: "20min ago",
    twoStep: "Enabled",
    date: "Feb 12,2024",
  },
  {
    defaultChecked: true,
    image: "female-02.jpg",
    name: "Stephanie",
    email: "info0675@gmail.com",
    role: "Developer",
    lastLogin: "20min ago",
    twoStep: "Enabled",
    date: "Feb 12,2024",
  },
  {
    defaultChecked: true,
    image: "male-01.jpg",
    name: "Penelope",
    email: "info0675@gmail.com",
    role: "Designer",
    lastLogin: "20min ago",
    twoStep: "Enabled",
    date: "Feb 12,2024",
  },
  {
    image: "male-02.jpg",
    name: "Rachel",
    email: "info0675@gmail.com",
    role: "Developer",
    lastLogin: "20min ago",
    twoStep: "Enabled",
    date: "Feb 12,2024",
  },
  {
    image: "female-01.jpg",
    name: "Vanessa",
    email: "info0675@gmail.com",
    role: "Developer",
    lastLogin: "20min ago",
    twoStep: "Enabled",
    date: "Feb 12,2024",
  },
  {
    defaultChecked: true,
    image: "female-02.jpg",
    name: "Stephanie",
    email: "info0675@gmail.com",
    role: "Developer",
    lastLogin: "20min ago",
    twoStep: "Enabled",
    date: "Feb 12,2024",
  },
];

export default function Users() {
  const theme: Theme = useTheme();
  const formik = useFormik({
    initialValues: {
      role: "",
      verification: "",
    },
    // validationSchema: validationSchemaProperty,
    onSubmit: (values) => {},
  });

  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [filterMenu, setFilterMenu] = useState<HTMLElement | null>(null);

  return (
    <div>
      <TitleBar title="Users" />
      <div className="px-28 mb-[3rem]">
        <div className="shadow-sm bg-white rounded-lg">
          <div className="flex justify-between gap-20 pt-14 pb-[1.8rem] px-20 flex-wrap">
            <div className="relative">
              <InputField
                name="search"
                placeholder="Search User"
                className="hello"
                inputProps={{
                  className: "ps-[4rem] w-[227px]",
                }}
              />
              <SearchIcon
                width={18}
                height={18}
                className="absolute left-12 top-[50%] translate-y-[-50%] text-para_light"
              />
            </div>
            <div className="flex gap-[3rem]">
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
                      label="Role"
                      name="role"
                      formik={formik}
                      placeholder="Select Role"
                      sx={{
                        "&.MuiInputBase-root": {
                          "& .MuiSelect-select": {
                            minHeight: "40px",
                          },
                        },
                      }}
                    >
                      <MenuItem value="Designer">Designer</MenuItem>
                      <MenuItem value="Tester">Tester</MenuItem>
                      <MenuItem value="Developer">Developer</MenuItem>
                    </SelectField>
                    <SelectField
                      label="Two Step Verification"
                      name="verification"
                      formik={formik}
                      placeholder="Select Option"
                      sx={{
                        "&.MuiInputBase-root": {
                          "& .MuiSelect-select": {
                            minHeight: "40px",
                          },
                        },
                      }}
                    >
                      <MenuItem value="Enabled">Enabled</MenuItem>
                      <MenuItem value="Disabled">Disabled</MenuItem>
                    </SelectField>
                    <div className="flex items-center justify-end gap-6 px-20 text-sm">
                      <Button variant="text" className="text-para text-sm">
                        Clear All
                      </Button>
                      <Button
                        variant="text"
                        color="secondary"
                        className="text-sm"
                      >
                        Apply
                      </Button>
                    </div>
                  </div>
                </div>
              </DropdownMenu>

              <Button
                variant="outlined"
                color="secondary"
                className="h-[40px] text-[16px] flex gap-8 whitespace-nowrap"
                aria-label="Add User"
                size="large"
                onClick={() => setIsOpenAddModal(true)}
              >
                <PlusIcon
                  color={theme.palette.secondary.main}
                  className="shrink-0"
                />
                Add User
              </Button>
            </div>
          </div>
          <CommonTable
            headings={[
              "User",
              "Role",
              "Last Log In",
              "Two Step",
              "Joined Date",
              "Actions",
            ]}
          >
            <>
              {rows.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "& td": {
                      borderBottom: "1px solid #EDF2F6",
                      paddingTop: "12px",
                      paddingBottom: "12px",
                      color: theme.palette.primary.main,
                    },
                  }}
                >
                  <TableCell scope="row">
                    <div className="flex items-center pe-[3.25rem]">
                      <Checkbox
                        sx={{ padding: "4px" }}
                        color="primary"
                        defaultChecked={row.defaultChecked}
                        inputProps={{
                          "aria-labelledby": `table-checkbox-${index}`,
                        }}
                      />{" "}
                      <div className="flex ml-10 grow">
                        <span className="shrink-0 mr-10">
                          <img
                            src="/assets/images/avatars/male-02.jpg"
                            alt=""
                            className="h-[34px] aspect-square rounded-full object-cover"
                          />
                        </span>
                        <div>
                          {row.name}
                          <span className="block text-sm text-para">
                            {row.email}
                          </span>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell align="center" className="whitespace-nowrap">
                    {row.role}
                  </TableCell>
                  <TableCell align="center" className="whitespace-nowrap">
                    {row.lastLogin}
                  </TableCell>
                  <TableCell align="center" className="whitespace-nowrap">
                    <span
                      className={`inline-flex items-center justify-center rounded-full w-[70px] min-h-[25px] text-sm font-500
                      ${row.twoStep === "Enabled" ? "text-[#4CAF50] bg-[#4CAF502E]" : "text-[#F44336] bg-[#F443362E]"}`}
                    >
                      {row.twoStep}
                    </span>
                  </TableCell>
                  <TableCell align="center" className="whitespace-nowrap">
                    {row.date}
                  </TableCell>
                  <TableCell align="left" className="w-[1%]">
                    <div className="flex gap-20 pe-20">
                      <span className="p-2 cursor-pointer">
                        <DeleteIcon />
                      </span>
                      <span className="p-2 cursor-pointer">
                        <EditIcon />
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </>
          </CommonTable>
          <div className="flex justify-end py-14 px-[3rem]">
            <CommonPagination count={10} />
          </div>
        </div>
      </div>
      <AddUserModal isOpen={isOpenAddModal} setIsOpen={setIsOpenAddModal} />
    </div>
  );
}
