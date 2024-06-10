import { Button, TableCell, TableRow, Theme, Typography } from "@mui/material";
import { useTheme } from "@mui/styles";
import { useFormik } from "formik";
import { DeleteIcon, EditIcon } from "public/assets/icons/common";
import { PlusIcon } from "public/assets/icons/dashboardIcons";
import { useState } from "react";
import SearchInput from "src/app/components/SearchInput";
import TitleBar from "src/app/components/TitleBar";
import AddGroupModel from "src/app/components/agents/AddGroupModel";
import CommonTable from "src/app/components/commonTable";
import CommonPagination from "src/app/components/pagination";

const rows = [
  {
    ticket: "1542145611525",
    subject: "Web page design",
    status: "In Progress",
    department: "Account Manager",
    date: "4",
    assignedImg: ["female-01.jpg", "female-02.jpg", "female-03.jpg"],
  },
  {
    ticket: "1542145611525",
    subject: "Web page design",
    status: "In Review",
    department: "Account Manager",
    date: "4",
    assignedImg: ["female-01.jpg", "female-02.jpg", "female-03.jpg"],
  },
  {
    ticket: "1542145611525",
    subject: "Web page design",
    status: "Completed",
    department: "Account Manager",
    date: "4",
    assignedImg: ["female-01.jpg", "female-02.jpg", "female-03.jpg"],
  },
  {
    ticket: "1542145611525",
    subject: "Web page design",
    status: "In Progress",
    department: "Account Manager",
    date: "4",
    assignedImg: ["female-01.jpg", "female-02.jpg", "female-03.jpg"],
  },
  {
    ticket: "1542145611525",
    subject: "Web page design",
    status: "In Review",
    department: "Account Manager",
    date: "4",
    assignedImg: ["female-01.jpg", "female-02.jpg", "female-03.jpg"],
  },
  {
    ticket: "1542145611525",
    subject: "Web page design",
    status: "Completed",
    department: "Account Manager",
    date: "4",
    assignedImg: ["female-01.jpg", "female-02.jpg", "female-03.jpg"],
  },
  {
    ticket: "1542145611525",
    subject: "Web page design",
    status: "In Progress",
    department: "Account Manager",
    date: "4",
    assignedImg: ["female-01.jpg", "female-02.jpg", "female-03.jpg"],
  },
  {
    ticket: "1542145611525",
    subject: "Web page design",
    status: "In Review",
    department: "Account Manager",
    date: "4",
    assignedImg: ["female-01.jpg", "female-02.jpg", "female-03.jpg"],
  },
  {
    ticket: "1542145611525",
    subject: "Web page design",
    status: "Completed",
    department: "Account Manager",
    date: "4",
    assignedImg: ["female-01.jpg", "female-02.jpg", "female-03.jpg"],
  },
];

export default function Setting() {
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
  const [isOpenSupportDetail, setIsOpenDetailPage] = useState<boolean>(false);

  return (
    <>
      <>
        <TitleBar title="Setting">
          <Button
            variant="outlined"
            color="secondary"
            className="h-[40px] text-[16px] flex gap-8 font-[600]"
            aria-label="Add Role & Permission"
            size="large"
            onClick={() => setIsOpenAddModal(true)}
          >
            <PlusIcon color={theme.palette.secondary.main} />
            Add Role & Permission
          </Button>
        </TitleBar>
        <div className="px-28 mb-[3rem]">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-[2rem] flex items-center justify-between">
              <Typography className="text-[18px] font-600 text-[#0A0F18]">
                Roles and Permissions
              </Typography>
              <SearchInput name="search" placeholder="Search agents group" />
            </div>
            <CommonTable headings={["Role", "Description", "Action"]}>
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
                    <TableCell scope="row">{row.ticket}</TableCell>
                    <TableCell align="left" className="whitespace-nowrap">
                      {row.subject}
                    </TableCell>

                    <TableCell align="left" className="whitespace-nowrap">
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
        {/* <AddGroupModel isOpen={isOpenAddModal} setIsOpen={setIsOpenAddModal} /> */}
      </>
    </>
  );
}
