import { TableCell, Theme } from "@mui/material";
import { useTheme } from "@mui/styles";
import { useState } from "react";
import AddAgentModel from "src/app/components/agents/AddAgentModel";
import NoSubscription from "../../../../../../public/assets/icons/no-subscription-img.svg";
import CommonTable from "src/app/components/commonTable";
import { TableRow } from "@mui/material";
import ImagesOverlap from "src/app/components/ImagesOverlap";
import { Link } from "react-router-dom";
import { ArrowRightCircleIcon } from "public/assets/icons/common";
import CommonPagination from "src/app/components/pagination";
import dotImg from "../../../../../../public/assets/icons/dots.svg";
import LongMenu from "../../Subscription/Dropdown";

const rows = [
  {
    id: "#2367055342",
    status: "In Review",
    title: "Basic",
    date: "Feb 12,2024",
    assignedImg: dotImg,
  },
  {
    id: "1542145611525",
    status: "Completed",
    title: "Basic",
    date: "Feb 12,2024",
    assignedImg: dotImg,
  },
  {
    id: "#2367055342",
    // title: "Basic",
    status: "In Progress",
    title: "Basic",
    date: "Feb 12,2024",
    assignedImg: dotImg,
  },
];

export default function SubscriptionList() {
  const theme: Theme = useTheme();
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);

  return (
    <>
      {/* no subscription start */}
      {/* <div className="px-[24px] pb-[24px]">
                <div className="flex justify-center bg-[#F7F9FB] py-[70px]">
                    <div>
                        <img src={NoSubscription} alt="NoSubscription" className="w-[200px] sm:w-[250px]  md:w-[345px] md:h-[264px]"/>
                        <p className="text-center mt-[28px] text-xl font-medium text-[#111827] leading-6">No subscription found !</p>
                    </div>
                </div>
              
            </div> */}
      {/* no subscription end */}
      <div className="bg-white rounded-lg shadow-sm">
        <CommonTable headings={["ID", "Title", "Start Date", "Status", "", ""]}>
          <>
            {rows.map((row, index) => (
              <TableRow
                key={index}
                // sx={{
                //     "& td": {
                //         borderBottom: "1px solid #EDF2F6",
                //         paddingTop: "12px",
                //         paddingBottom: "12px",
                //         color: theme.palette.primary.main,
                //     },
                // }}
              >
                <TableCell scope="row" className="font-500">
                  {row.id}
                </TableCell>
                <TableCell align="center" className="font-500">
                  {row.title}
                </TableCell>
                <TableCell
                  align="center"
                  className="whitespace-nowrap font-500"
                >
                  {row.date}
                </TableCell>

                <TableCell align="center" className="whitespace-nowrap">
                  <span
                    className={`inline-flex items-center justify-center rounded-full w-[95px] min-h-[25px] text-sm font-500
                      ${row.status === "Completed" ? "text-[#4CAF50] bg-[#4CAF502E]" : row.status === "In Progress" ? "text-[#F44336] bg-[#F443362E]" : "text-[#F0B402] bg-[#FFEEBB]"}`}
                  >
                    {row.status}
                  </span>
                </TableCell>

                <TableCell
                  align="center"
                  className="whitespace-nowrap font-500"
                >
                  <LongMenu icon={dotImg} />

                  {/* <Link to="#">
                                                   <img src={row.assignedImg} alt="dots" />
                                                </Link> */}
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
      </div>
      {/* <AddAgentModel isOpen={isOpenAddModal} setIsOpen={setIsOpenAddModal} /> */}
    </>
  );
}
