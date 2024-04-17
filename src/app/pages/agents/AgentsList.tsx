import { Button, Checkbox, TableCell, TableRow, Theme } from "@mui/material";
import { useTheme } from "@mui/styles";
import { useFormik } from "formik";
import {
  ArrowRightCircleIcon,
  DeleteIcon,
  EditIcon,
} from "public/assets/icons/common";
import { PlusIcon } from "public/assets/icons/dashboardIcons";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import ImagesOverlap from "src/app/components/ImagesOverlap";
import TitleBar from "src/app/components/TitleBar";
import CommonTable from "src/app/components/commonTable";
import CommonPagination from "src/app/components/pagination";
import AddAgentModel from "src/app/components/agents/AddAgentModel";

const rows = [
  {
    ticket: "1542145611525",
    subject: "Web page design",
    status: "In Progress",
    department: "Account Manager",
    date: "Feb 12,2024",
    assignedImg: ["female-01.jpg", "female-02.jpg", "female-03.jpg"],
  },
  {
    ticket: "1542145611525",
    subject: "Web page design",
    status: "In Review",
    department: "Account Manager",
    date: "Feb 12,2024",
    assignedImg: ["female-01.jpg", "female-02.jpg", "female-03.jpg"],
  },
  {
    ticket: "1542145611525",
    subject: "Web page design",
    status: "Completed",
    department: "Account Manager",
    date: "Feb 12,2024",
    assignedImg: ["female-01.jpg", "female-02.jpg", "female-03.jpg"],
  },
  {
    ticket: "1542145611525",
    subject: "Web page design",
    status: "In Progress",
    department: "Account Manager",
    date: "Feb 12,2024",
    assignedImg: ["female-01.jpg", "female-02.jpg", "female-03.jpg"],
  },
  {
    ticket: "1542145611525",
    subject: "Web page design",
    status: "In Review",
    department: "Account Manager",
    date: "Feb 12,2024",
    assignedImg: ["female-01.jpg", "female-02.jpg", "female-03.jpg"],
  },
  {
    ticket: "1542145611525",
    subject: "Web page design",
    status: "Completed",
    department: "Account Manager",
    date: "Feb 12,2024",
    assignedImg: ["female-01.jpg", "female-02.jpg", "female-03.jpg"],
  },
  {
    ticket: "1542145611525",
    subject: "Web page design",
    status: "In Progress",
    department: "Account Manager",
    date: "Feb 12,2024",
    assignedImg: ["female-01.jpg", "female-02.jpg", "female-03.jpg"],
  },
  {
    ticket: "1542145611525",
    subject: "Web page design",
    status: "In Review",
    department: "Account Manager",
    date: "Feb 12,2024",
    assignedImg: ["female-01.jpg", "female-02.jpg", "female-03.jpg"],
  },
  {
    ticket: "1542145611525",
    subject: "Web page design",
    status: "Completed",
    department: "Account Manager",
    date: "Feb 12,2024",
    assignedImg: ["female-01.jpg", "female-02.jpg", "female-03.jpg"],
  },
];

export default function AgentsList() {
  const theme: Theme = useTheme();
  const formik = useFormik({
    initialValues: {
      role: "",
      verification: "",
    },
    // validationSchema: validationSchemaProperty,
    onSubmit: (values) => { },
  });

  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [filterMenu, setFilterMenu] = useState<HTMLElement | null>(null);
  const [isOpenSupportDetail, setIsOpenDetailPage] = useState<boolean>(false);

  return (
    <>
      <div>
        <TitleBar title="Support">
          <Button
            variant="outlined"
            color="secondary"
            className="h-[40px] text-[16px] flex gap-8 font-[600]"
            aria-label="Add Tasks"
            size="large"
            onClick={() => setIsOpenAddModal(true)}
          >
            <PlusIcon color={theme.palette.secondary.main} />
            Add Agent
          </Button>
        </TitleBar>
        <div className="px-28 mb-[3rem]">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="h-24" />

            <CommonTable
              headings={[
                "ID",
                "First Name",
                "Last Name",
                "Start Date",
                "Last Login",
                "Assigned Clients",
                "Status",
                "",
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
                    <TableCell scope="row">{row.ticket}</TableCell>
                    <TableCell align="left" className="whitespace-nowrap">
                      {row.subject}
                    </TableCell>

                    <TableCell align="left" className="whitespace-nowrap">
                      {row.date}
                    </TableCell>
                    <TableCell align="left" className="whitespace-nowrap">
                      {row.date}
                    </TableCell>
                    <TableCell align="left" className="whitespace-nowrap">
                      {row.date}
                    </TableCell>

                    <TableCell align="center">
                      <ImagesOverlap images={row.assignedImg} />
                    </TableCell>
                    <TableCell align="left" className="whitespace-nowrap">
                      <span
                        className={`inline-flex items-center justify-center rounded-full w-[95px] min-h-[25px] text-sm font-500
                      ${row.status === "Completed" ? "text-[#4CAF50] bg-[#4CAF502E]" : row.status === "In Progress" ? "text-[#F44336] bg-[#F443362E]" : "text-[#F0B402] bg-[#FFEEBB]"}`}
                      >
                        {row.status}
                      </span>
                    </TableCell>
                    <TableCell align="left" className="w-[1%]">
                      <div className="flex gap-20 pe-20">
                        <span className="p-2 cursor-pointer">
                          <Link to="/admin/agent-detail">
                            <ArrowRightCircleIcon />
                          </Link>
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
        <AddAgentModel isOpen={isOpenAddModal} setIsOpen={setIsOpenAddModal} />
      </div>
    </>
  );
}
