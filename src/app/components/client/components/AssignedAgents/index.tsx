import { Button, Checkbox, TableCell, TableRow, Theme } from "@mui/material";
import { useTheme } from "@mui/styles";
import { useFormik } from "formik";
import {
  ArrowRightCircleIcon,
  DeleteIcon,
  EditIcon,
} from "public/assets/icons/common";
import { PlusIcon } from "public/assets/icons/dashboardIcons";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import ImagesOverlap from "src/app/components/ImagesOverlap";
import TitleBar from "src/app/components/TitleBar";
import CommonTable from "src/app/components/commonTable";
import CommonPagination from "src/app/components/pagination";
import AddAgentModel from "src/app/components/agents/AddAgentModel";
import UnassignedAgent from "./UnassignedAgent";
import { getClientList } from "app/store/Client";
import { useAppDispatch } from "app/store/store";

const rows = [
  {
    ticket: "1542145611525",
    subject: "Web page design",
    status: "Unassign",
    department: "Account Manager",
    date: "Feb 12,2024",
    assignedImg: ["female-01.jpg"],
  },
  {
    ticket: "1542145611525",
    subject: "Web page design",
    status: "Unassign",
    department: "Account Manager",
    date: "Feb 12,2024",
    assignedImg: ["female-01.jpg"],
  },
  {
    ticket: "1542145611525",
    subject: "Web page design",
    status: "Unassign",
    department: "Account Manager",
    date: "Feb 12,2024",
    assignedImg: ["female-01.jpg"],
  },
  {
    ticket: "1542145611525",
    subject: "Web page design",
    status: "Unassign",
    department: "Account Manager",
    date: "Feb 12,2024",
    assignedImg: ["female-01.jpg"],
  },
  {
    ticket: "1542145611525",
    subject: "Web page design",
    status: "Unassign",
    department: "Account Manager",
    date: "Feb 12,2024",
    assignedImg: ["female-01.jpg"],
  },
  {
    ticket: "1542145611525",
    subject: "Web page design",
    status: "Unassign",
    department: "Account Manager",
    date: "Feb 12,2024",
    assignedImg: ["female-01.jpg"],
  },
  {
    ticket: "1542145611525",
    subject: "Web page design",
    status: "Unassign",
    department: "Account Manager",
    date: "Feb 12,2024",
    assignedImg: ["female-01.jpg"],
  },
  {
    ticket: "1542145611525",
    subject: "Web page design",
    status: "Unassign",
    department: "Account Manager",
    date: "Feb 12,2024",
    assignedImg: ["female-01.jpg"],
  },
  {
    ticket: "1542145611525",
    subject: "Web page design",
    status: "Unassign",
    department: "Account Manager",
    date: "Feb 12,2024",
    assignedImg: ["female-01.jpg"],
  },
];

export default function AssignedAgents({ type = null }) {
  const theme: Theme = useTheme();
  const [rows, setRows] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      role: "",
      verification: "",
    },
    // validationSchema: validationSchemaProperty,
    onSubmit: (values) => {},
  });

  const fetchList = async () => {
    const payload = {
      start: 0,
      limit: 10,
      search: "",
      type: type,
    };
    try {
      //@ts-ignore
      const res = await dispatch(getClientList(payload));
      // setList(res?.payload?.data?.data?.list);
      setRows(res?.payload?.data?.data?.list);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchList();
  }, [dispatch, type]);

  const totalPageCount = Math.ceil(rows.length / itemsPerPage);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
    // Handle any additional logic when the page changes, e.g., fetching data
  };

  const currentRows = rows.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  console.log("=-098==", currentRows);
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [filterMenu, setFilterMenu] = useState<HTMLElement | null>(null);
  const [isOpenUnssignedModal, setIsOpenUnassignedModal] = useState(false);
  return (
    <>
      <div className="mb-[3rem]">
        <div className="bg-white rounded-lg shadow-sm">
          <CommonTable
            headings={[
              "Agents",
              "User ID",
              "Associated Invoice",
              "Assigned Date",
              "",
            ]}
          >
            <>
              {currentRows.map((row, index) => (
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
                  <TableCell
                    scope="row"
                    className="flex items-center gap-8 font-500"
                  >
                    <img
                      src={`../assets/images/avatars/${row.user_image}`}
                      className="w-[34px] rounded-full"
                    />
                    {row.id}
                  </TableCell>
                  <TableCell
                    align="center"
                    className="whitespace-nowrap font-500"
                  >
                    {row.subject}
                  </TableCell>
                  <TableCell align="center" className="font-500">
                    {row.department}
                  </TableCell>
                  <TableCell
                    align="center"
                    className="whitespace-nowrap font-500"
                  >
                    {row.date}
                  </TableCell>
                  <TableCell
                    align="center"
                    className="whitespace-nowrap"
                    onClick={() => setIsOpenUnassignedModal(true)}
                  >
                    <span
                      className={`inline-flex items-center justify-center rounded-full w-[95px] min-h-[25px] text-sm font-500
                                            ${
                                              row.status === "Unassign"
                                                ? "text-secondary bg-secondary_bg"
                                                : row.status === "Unassigned"
                                                ? "text-[#F44336] bg-[#F443362E]"
                                                : "text-[#F0B402] bg-[#FFEEBB]"
                                            }`}
                    >
                      {row.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </>
          </CommonTable>
          <div className="flex justify-end py-14 px-[3rem]">
            <CommonPagination
              count={totalPageCount}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
      <AddAgentModel
        isOpen={isOpenAddModal}
        setIsOpen={setIsOpenAddModal}
        isEditing={false}
      />
      <UnassignedAgent
        isOpen={isOpenUnssignedModal}
        setIsOpen={setIsOpenUnassignedModal}
      />
    </>
  );
}
