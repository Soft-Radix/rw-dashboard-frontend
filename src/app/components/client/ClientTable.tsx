import { Checkbox, TableCell, TableRow, Theme } from "@mui/material";
import { useTheme } from "@mui/styles";
import { useFormik } from "formik";
import {
  ArrowRightCircleIcon,
  DeleteIcon,
  EditIcon,
} from "public/assets/icons/common";
import { CalenderIcon, SortIcon } from "public/assets/icons/projectsIcon";
import { HeadIcon } from "public/assets/icons/clienIcon";
import { useState } from "react";
import { Link } from "react-router-dom";
import CommonTable from "src/app/components/commonTable";
import CommonPagination from "src/app/components/pagination";
import AddNewTicket from "src/app/components/support/AddNewTicket";

const intialData = [
  {
    defaultChecked: true,
    id: 1,
    name: "A",
    twoStep: "Enabled",
    companyName: "Account Manager",
    date: "Feb 12,2024",
    status: "In Progress",
  },
  {
    defaultChecked: true,
    id: 2,
    name: "B",
    companyName: "Account Manager",
    date: "Feb 12,2024",
    status: "In Review",
  },
  {
    id: 3,
    name: "C",
    companyName: "Account Manager",
    date: "Feb 12,2024",
    status: "Completed",
  },
  {
    id: 4,
    name: "D",
    companyName: "Account Manager",
    date: "Feb 12,2024",
    status: "In Progress",
  },
  {
    defaultChecked: true,
    id: 5,
    name: "E",
    companyName: "Account Manager",
    date: "Feb 12,2024",
    status: "In Review",
  },
  {
    id: 6,
    name: "F",
    companyName: "Account Manager",
    date: "Feb 12,2024",
    status: "In Progress",
  },
  {
    id: 7,
    name: "G",
    companyName: "Account Manager",
    date: "Feb 12,2024",
    status: "In Review",
  },
  {
    id: 8,
    name: "H",
    companyName: "Account Manager",
    date: "Feb 12,2024",
    status: "Completed",
  },
  {
    id: 9,
    name: "I",
    companyName: "Account Manager",
    date: "Feb 12,2024",
    status: "In Progress",
  },
  {
    id: 10,
    name: "J",
    companyName: "Account Manager",
    date: "Feb 12,2024",
    status: "In Review",
  },
];

const columnKey = {
  Id: 'id',
  Name: 'name',
  CompanyName: 'companyName',
  Date: 'date',
  Status: 'status',
};

export default function ClientTable() {
  const theme: Theme = useTheme();
  const formik = useFormik({
    initialValues: {
      role: "",
      verification: "",
    },
    // validationSchema: validationSchemaProperty,
    onSubmit: (values) => { },
  });
  const [rows, setrows] = useState(intialData);
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const sortData = (column: string) => {
    const isAsc = sortBy === column && sortOrder === "asc";
    setSortBy(column);
    setSortOrder(isAsc ? "desc" : "asc");
    const sortedRows = [...rows].sort((a, b) => {
      if (a[columnKey[column]] < b[columnKey[column]]) return isAsc ? -1 : 1;
      if (a[columnKey[column]] > b[columnKey[column]]) return isAsc ? 1 : -1;
      return 0;
    });
    setrows(sortedRows)
  };

  return (
    <>
      <div>
        <div className="bg-white rounded-lg shadow-sm">
          <div className="h-24" />

          <CommonTable
            headingIcon={true}
            headIcon={Array.from({ length: 5 }, (_, index) => (
              <HeadIcon key={index} />
            ))}
            headings={["Id", "Name", "CompanyName", "Date", "Status", ""]}
            sortColumn={sortBy}
            sortOrder={sortOrder}
            onSort={sortData}
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
                    <div className="flex items-center">
                      <Checkbox
                        sx={{ padding: "4px" }}
                        color="primary"
                        defaultChecked={row.defaultChecked}
                        inputProps={{
                          "aria-labelledby": `table-checkbox-${index}`,
                        }}
                      />{" "}
                      {row.id}
                    </div>
                  </TableCell>
                  <TableCell align="left" className="whitespace-nowrap">
                    {row.name}
                  </TableCell>

                  <TableCell align="left" className="whitespace-nowrap">
                    {row.companyName}
                  </TableCell>
                  <TableCell align="left" className="whitespace-nowrap">
                    {row.date}
                  </TableCell>

                  <TableCell scope="row" align="left">
                    <span
                      className={`inline-flex items-center justify-center rounded-full w-[95px] min-h-[25px] text-sm font-500
                      ${row.status === "Completed" ? "text-[#4CAF50] bg-[#4CAF502E]" : row.status === "In Progress" ? "text-[#F44336] bg-[#F443362E]" : "text-[#F0B402] bg-[#FFEEBB]"}`}
                    >
                      {row.status}
                    </span>
                  </TableCell>
                  <TableCell scope="row">
                    <Link to="/admin/client/detail">
                      <ArrowRightCircleIcon />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </>
          </CommonTable>
          <div className="flex justify-end py-14 px-[3rem]">
            <CommonPagination count={10} />
          </div>
        </div>

        <AddNewTicket isOpen={isOpenAddModal} setIsOpen={setIsOpenAddModal} />
      </div>
    </>
  );
}
