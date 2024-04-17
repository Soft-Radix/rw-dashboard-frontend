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

const rows = [
  {
    defaultChecked: true,
    id: "1542145611525",
    name: "Web page design",
    twoStep: "Enabled",
    companyName: "Account Manager",
    date: "Feb 12,2024",
    status: "In Progress",
  },
  {
    defaultChecked: true,
    id: "1542145611525",
    name: "Web page design",
    companyName: "Account Manager",
    date: "Feb 12,2024",
    status: "In Review",
  },
  {
    id: "1542145611525",
    name: "Web page design",
    companyName: "Account Manager",
    date: "Feb 12,2024",
    status: "Completed",
  },
  {
    id: "1542145611525",
    name: "Web page design",
    companyName: "Account Manager",
    date: "Feb 12,2024",
    status: "In Progress",
  },
  {
    defaultChecked: true,
    id: "1542145611525",
    name: "Web page design",
    companyName: "Account Manager",
    date: "Feb 12,2024",
    status: "In Review",
  },
  {
    id: "1542145611525",
    name: "Web page design",
    companyName: "Account Manager",
    date: "Feb 12,2024",
    status: "In Progress",
  },
  {
    id: "1542145611525",
    name: "Web page design",
    companyName: "Account Manager",
    date: "Feb 12,2024",
    status: "In Review",
  },
  {
    id: "1542145611525",
    name: "Web page design",
    companyName: "Account Manager",
    date: "Feb 12,2024",
    status: "Completed",
  },
  {
    id: "1542145611525",
    name: "Web page design",
    companyName: "Account Manager",
    date: "Feb 12,2024",
    status: "In Progress",
  },
  {
    id: "1542145611525",
    name: "Web page design",
    companyName: "Account Manager",
    date: "Feb 12,2024",
    status: "In Review",
  },
];

export default function   ClientTable() {
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
      <div>
        <div className="shadow-sm bg-white rounded-lg">
          <div className="h-24" />

          <CommonTable
            headingIcon={true}
            headIcon={Array.from({ length: 5 }, (_, index) => (
              <HeadIcon key={index} />
            ))}
            headings={["Id", "Name", "CompanyName", "Date", "Status", ""]}
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
                  <TableCell align="center" className="whitespace-nowrap">
                    {row.name}
                  </TableCell>

                  <TableCell align="center" className="whitespace-nowrap">
                    {row.companyName}
                  </TableCell>
                  <TableCell align="center" className="whitespace-nowrap">
                    {row.date}
                  </TableCell>

                  <TableCell scope="row" align="center">
                    <span
                      className={`inline-flex items-center justify-center rounded-full w-[95px] min-h-[25px] text-sm font-500
                      ${row.status === "Completed" ? "text-[#4CAF50] bg-[#4CAF502E]" : row.status === "In Progress" ? "text-[#F44336] bg-[#F443362E]" : "text-[#F0B402] bg-[#FFEEBB]"}`}
                    >
                      {row.status}
                    </span>
                  </TableCell>
                  <TableCell scope="row">
                    <Link to="/supportdetail">
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
