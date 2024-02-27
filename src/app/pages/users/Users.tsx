import { Button, Checkbox, TableCell, TableRow, Theme } from "@mui/material";
import { useTheme } from "@mui/styles";
import { DeleteIcon, EditIcon } from "public/assets/icons/common";
import { PlusIcon } from "public/assets/icons/dashboardIcons";
import { SearchIcon } from "public/assets/icons/topBarIcons";
import { FilterIcon } from "public/assets/icons/user-icon";
import { useState } from "react";
import InputField from "src/app/components/InputField";
import TitleBar from "src/app/components/TitleBar";
import CommonTable from "src/app/components/commonTable";
import CommonPagination from "src/app/components/pagination";
import AddUserModal from "src/app/components/users/AddUser";

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
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);

  return (
    <div>
      <TitleBar title="Users" />
      <div className="px-28 mb-[3rem]">
        <div className="shadow-sm bg-white rounded-lg">
          <div className="flex justify-between pt-14 pb-[1.8rem] px-20">
            <div className="relative">
              <InputField
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
              <Button
                variant="text"
                className="h-[40px] text-[16px] flex gap-12 text-para_light whitespace-nowrap"
                aria-label="Add User"
                size="large"
              >
                <FilterIcon className="shrink-0" />
                Filter
              </Button>
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
              "Action",
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
                    <div className="flex items-center gap-10">
                      <Checkbox
                        sx={{ padding: "4px" }}
                        color="primary"
                        defaultChecked={row.defaultChecked}
                        inputProps={{
                          "aria-labelledby": `table-checkbox-${index}`,
                        }}
                      />{" "}
                      <div className="flex gap-14">
                        <span className="shrink-0">
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
                  <TableCell align="center">{row.role}</TableCell>
                  <TableCell align="center">{row.lastLogin}</TableCell>
                  <TableCell align="center">
                    <span
                      className={`inline-flex items-center justify-center rounded-full w-[70px] min-h-[25px] text-sm font-500
                      ${row.twoStep === "Enabled" ? "text-[#4CAF50] bg-[#4CAF502E]" : "text-[#F44336] bg-[#F443362E]"}`}
                    >
                      {row.twoStep}
                    </span>
                  </TableCell>
                  <TableCell align="center">{row.date}</TableCell>
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
