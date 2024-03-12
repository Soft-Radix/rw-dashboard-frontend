// import { Button, Tab, Tabs, Theme } from "@mui/material";
import {
  Button,
  Checkbox,
  TableCell,
  TableRow,
  Theme,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/styles";
import {
  ArrowRightCircleIcon,
  DeleteIcon,
  EditIcon,
} from "public/assets/icons/common";
import { PlusIcon } from "public/assets/icons/dashboardIcons";
import { useState } from "react";
import { Link } from "react-router-dom";
import ImagesOverlap from "src/app/components/ImagesOverlap";
import TitleBar from "src/app/components/TitleBar";
import CommonTable from "src/app/components/commonTable";
import CommonPagination from "src/app/components/pagination";
import AddTaskModal from "src/app/components/tasks/AddTask";
import RecentData from "src/app/components/tasks/RecentData";
import ThemePageTable from "src/app/components/tasks/TaskPageTable";

const rows = [
  {
    user: ["img", "text"],
    taskCompleted: "Logo Design",
    punch: "In",
  },
  {
    user: ["img", "text"],
    taskCompleted: "Logo Design",
    punch: "In",
  },
  {
    user: ["img", "text"],
    taskCompleted: "Logo Design",
    punch: "In",
  },
  {
    user: ["img", "text"],
    taskCompleted: "Logo Design",
    punch: "In",
  },
  {
    user: ["img", "text"],
    taskCompleted: "Logo Design",
    punch: "In",
  },
];

export default function DashboardRecentActivity() {
  const theme: Theme = useTheme();

  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <div className="flex px-28 gap-[20px] mb-[3rem] h-[417px]  ">
      <div className=" mb-[3rem] flex-1 ">
        <div className="shadow-sm bg-white rounded-lg">
          <Typography className="text-[16px] font-600 pt-28 px-20">
            Recent Activity
          </Typography>
          <div className="h-24" />

          <CommonTable headings={["User", "Task Completed", "Punch In/Out"]}>
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
                  <TableCell scope="row">{row.user}</TableCell>
                  <TableCell scope="row">{row.taskCompleted}</TableCell>
                  <TableCell scope="row">{row.punch}</TableCell>

                  {/* <TableCell align="center" className="whitespace-nowrap">
                    <span
                      className={`inline-flex items-center justify-center rounded-full w-[95px] min-h-[25px] text-sm font-500
                        ${row.status === "Completed" ? "text-[#4CAF50] bg-[#4CAF502E]" : row.status === "In Progress" ? "text-[#F44336] bg-[#F443362E]" : "text-[#F0B402] bg-[#FFEEBB]"}`}
                    >
                      {row.status}
                    </span>
                  </TableCell> */}
                </TableRow>
              ))}
            </>
          </CommonTable>
        </div>
      </div>
      <div className="flex-1 shadow-sm bg-white rounded-lg ">
        <div className="flex items-center justify-between px-24 py-28 border-b border-solid border-[#EDF2F6]">
          <Typography className="text-[16px] font-600">Logged Hours</Typography>

          <div className="flex mr-20 items-center justify-center gap-32">
            <Typography className="text-[16px] font-500">
              Total Logged Hours
            </Typography>
            <span className="text-[#4F46E5] p-10 rounded-md bg-[#F6F6F6] font-600">
              {" "}
              34
            </span>
          </div>
        </div>
        <div>
          <img src="../assets/images/pages/dashBoared/chart.jpg" alt="" />
        </div>
      </div>
    </div>
  );
}
