import { Theme } from "@mui/material";
import { useTheme } from "@mui/styles";
import { useState } from "react";
import AddAgentModel from "src/app/components/agents/AddAgentModel";
import NoSubscription from "../../../../../../public/assets/icons/no-subscription-img.svg"

// const rows = [
//     {
//         ticket: "1542145611525",
//         subject: "Web page design",
//         status: "Unassigned",
//         department: "Account Manager",
//         date: "Feb 12,2024",
//         assignedImg: ["female-01.jpg", "male-02.jpg", "female-02.jpg"],
//     },
//     {
//         ticket: "1542145611525",
//         subject: "Web page design",
//         status: "Unassigned",
//         department: "Account Manager",
//         date: "Feb 12,2024",
//         assignedImg: ["female-01.jpg", "male-02.jpg", "female-02.jpg"],
//     },
//     {
//         ticket: "1542145611525",
//         subject: "Web page design",
//         status: "Unassigned",
//         department: "Account Manager",
//         date: "Feb 12,2024",
//         assignedImg: ["female-01.jpg", "male-02.jpg", "female-02.jpg"],
//     },
//     {
//         ticket: "1542145611525",
//         subject: "Web page design",
//         status: "Unassigned",
//         department: "Account Manager",
//         date: "Feb 12,2024",
//         assignedImg: ["female-01.jpg", "male-02.jpg", "female-02.jpg"],
//     },
//     {
//         ticket: "1542145611525",
//         subject: "Web page design",
//         status: "Unassigned",
//         department: "Account Manager",
//         date: "Feb 12,2024",
//         assignedImg: ["female-01.jpg", "male-02.jpg", "female-02.jpg"],
//     },
//     {
//         ticket: "1542145611525",
//         subject: "Web page design",
//         status: "Unassigned",
//         department: "Account Manager",
//         date: "Feb 12,2024",
//         assignedImg: ["female-01.jpg", "male-02.jpg", "female-02.jpg"],
//     },
//     {
//         ticket: "1542145611525",
//         subject: "Web page design",
//         status: "Unassigned",
//         department: "Account Manager",
//         date: "Feb 12,2024",
//         assignedImg: ["female-01.jpg", "male-02.jpg", "female-02.jpg"],
//     },
//     {
//         ticket: "1542145611525",
//         subject: "Web page design",
//         status: "Unassigned",
//         department: "Account Manager",
//         date: "Feb 12,2024",
//         assignedImg: ["female-01.jpg", "male-02.jpg", "female-02.jpg"],
//     },
//     {
//         ticket: "1542145611525",
//         subject: "Web page design",
//         status: "Unassigned",
//         department: "Account Manager",
//         date: "Feb 12,2024",
//         assignedImg: ["female-01.jpg", "male-02.jpg", "female-02.jpg"],
//     },
// ];

export default function SubscriptionList() {
    const theme: Theme = useTheme();
    const [isOpenAddModal, setIsOpenAddModal] = useState(false);

    return (
        <>
            <div className="px-[24px] ">
                <div className="no-subscription-column flex justify-center bg-[#F7F9FB] py-[70px]">
                    <div className="no-subscription-inner">
                        <img src={NoSubscription} alt="NoSubscription" className="w-[200px] sm:w-[250px]  md:w-[345px] md:h-[264px]"/>
                        <p className="text-center mt-[28px] text-xl font-medium text-[#111827] leading-6">No subscription found !</p>
                    </div>
                </div>
                {/* <div className="bg-white rounded-lg shadow-sm">
                    <CommonTable
                        headings={[
                            "ID",
                            "Plan",
                            "Total Renewals Count",
                            "Assigned Agents",
                            "Start Date",
                            "End Date",
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
                                    <TableCell scope="row" className="font-500">
                                        {row.ticket}
                                    </TableCell>
                                    <TableCell align="center" className="font-500">
                                        {row.department}
                                    </TableCell>
                                    <TableCell align="center" className="whitespace-nowrap font-500">
                                        {row.date}
                                    </TableCell>
                                    <TableCell align="center">
                                        <ImagesOverlap images={row.assignedImg} />
                                    </TableCell>
                                    <TableCell align="center" className="whitespace-nowrap font-500">
                                        {row.date}
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
                                    <TableCell align="left" className="w-[1%]">
                                        <div className="flex gap-20 pe-20">
                                            <span className="p-2 cursor-pointer">
                                                <Link to="/admin/client/subscription-detail">
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
                </div> */}
            </div>
            {/* <AddAgentModel isOpen={isOpenAddModal} setIsOpen={setIsOpenAddModal} /> */}
        </>
    );
}
