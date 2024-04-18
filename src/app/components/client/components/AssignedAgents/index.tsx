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
        status: "Unassigned",
        department: "Account Manager",
        date: "Feb 12,2024",
        assignedImg: ["female-01.jpg"],
    },
    {
        ticket: "1542145611525",
        subject: "Web page design",
        status: "Unassigned",
        department: "Account Manager",
        date: "Feb 12,2024",
        assignedImg: ["female-01.jpg"],
    },
    {
        ticket: "1542145611525",
        subject: "Web page design",
        status: "Unassigned",
        department: "Account Manager",
        date: "Feb 12,2024",
        assignedImg: ["female-01.jpg"],
    },
    {
        ticket: "1542145611525",
        subject: "Web page design",
        status: "Unassigned",
        department: "Account Manager",
        date: "Feb 12,2024",
        assignedImg: ["female-01.jpg"],
    },
    {
        ticket: "1542145611525",
        subject: "Web page design",
        status: "Unassigned",
        department: "Account Manager",
        date: "Feb 12,2024",
        assignedImg: ["female-01.jpg"],
    },
    {
        ticket: "1542145611525",
        subject: "Web page design",
        status: "Unassigned",
        department: "Account Manager",
        date: "Feb 12,2024",
        assignedImg: ["female-01.jpg"],
    },
    {
        ticket: "1542145611525",
        subject: "Web page design",
        status: "Unassigned",
        department: "Account Manager",
        date: "Feb 12,2024",
        assignedImg: ["female-01.jpg"],
    },
    {
        ticket: "1542145611525",
        subject: "Web page design",
        status: "Unassigned",
        department: "Account Manager",
        date: "Feb 12,2024",
        assignedImg: ["female-01.jpg"],
    },
    {
        ticket: "1542145611525",
        subject: "Web page design",
        status: "Unassigned",
        department: "Account Manager",
        date: "Feb 12,2024",
        assignedImg: ["female-01.jpg"],
    },
];

export default function AssignedAgents() {
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
                                    <TableCell scope="row" className="flex items-center gap-8 font-500">
                                        <img src={`../assets/images/avatars/${row.assignedImg}`} className="w-[34px] rounded-full" />
                                        {row.ticket}
                                    </TableCell>
                                    <TableCell align="center" className="whitespace-nowrap font-500" >
                                        {row.subject}
                                    </TableCell>
                                    <TableCell align="center" className="font-500">
                                        {row.department}
                                    </TableCell>
                                    <TableCell align="center" className="whitespace-nowrap font-500">
                                        {row.date}
                                    </TableCell>
                                    <TableCell align="center" className="whitespace-nowrap">
                                        <span
                                            className={`inline-flex items-center justify-center rounded-full w-[95px] min-h-[25px] text-sm font-500
                      ${row.status === "Unassigned" ? "text-secondary bg-secondary_bg" : row.status === "Unassigned" ? "text-[#F44336] bg-[#F443362E]" : "text-[#F0B402] bg-[#FFEEBB]"}`}
                                        >
                                            {row.status}
                                        </span>
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
        </>
    );
}
