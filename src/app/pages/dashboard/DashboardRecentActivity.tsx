// import { Button, Tab, Tabs, Theme } from "@mui/material";
import {
  Button,
  Checkbox,
  Grid,
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
import RecentTaskUpdateTable from "./RecentTaskUpdateTable";
import { use } from "i18next";

const rows = [
  {
    user: [
      {
        image: "../assets/images/pages/dashBoared/recentTableImg.png",
        text: "Penelope",
      },
    ],
    taskCompleted: "Logo Design",
    punch: "In",
    updates: [
      {
        arrow: "../assets/images/pages/dashBoared/arrowUpDown.png",
        text: "Recent Task Updates",
      },
    ],
  },
  {
    user: [
      {
        image: "../assets/images/pages/dashBoared/recentTableImg.png",
        text: "Penelope",
      },
    ],
    taskCompleted: "Logo Design",
    punch: "Out",
    updates: [
      {
        arrow: "../assets/images/pages/dashBoared/arrowUpDown.png",
        text: "Recent Task Updates",
      },
    ],
  },
  {
    user: [
      {
        image: "../assets/images/pages/dashBoared/recentTableImg.png",
        text: "Penelope",
      },
    ],
    taskCompleted: "Logo Design",
    punch: "In",
    updates: [
      {
        arrow: "../assets/images/pages/dashBoared/arrowUpDown.png",
        text: "Recent Task Updates",
      },
    ],
  },
  {
    user: [
      {
        image: "../assets/images/pages/dashBoared/recentTableImg.png",
        text: "Penelope",
      },
    ],
    taskCompleted: "Logo Design",
    punch: "Out",
    updates: [
      {
        arrow: "../assets/images/pages/dashBoared/arrowUpDown.png",
        text: "Recent Task Updates",
      },
    ],
  },
  {
    user: [
      {
        image: "../assets/images/pages/dashBoared/recentTableImg.png",
        text: "Penelope",
      },
    ],
    taskCompleted: "Logo Design",
    punch: "Out",

    updates: [
      {
        arrow: "../assets/images/pages/dashBoared/arrowUpDown.png",
        text: "Recent Task Updates",
      },
    ],
  },
];

export default function DashboardRecentActivity() {
  const theme: Theme = useTheme();

  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [showUpdateTable, setShowUpdateTable] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [updateTableIndex, setUpdateTableIndex] = useState<number>();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };
  const openRecentUpdateTable = (i: number) => {
    setUpdateTableIndex(i === updateTableIndex ? null : i);
    console.log(updateTableIndex, "tableIndex");
    setShowUpdateTable(!showUpdateTable);
    console.log(i, "tableIndex");
  };
  const hideRecenctTableUpdate = () => {
    setShowUpdateTable(false);
  };
  return (
    <Grid container spacing={3} className="px-28 mb-[3rem] ">
      <Grid item xs={12} lg={6}>
        <div className="shadow-sm bg-white rounded-lg  relative ">
          <Typography className="text-[16px] font-600 py-28 px-20">
            Recent Activity
          </Typography>
          <CommonTable headings={["User", "Task Completed", "Punch In/Out"]}>
            <>
              {rows.map((row, index) => (
                <TableRow
                  key={index}
                  // style={{ position: "relative" }}
                  sx={{
                    "& td": {
                      borderBottom: "1px solid #EDF2F6",
                      paddingTop: "12px",
                      paddingBottom: "12px",
                      color: theme.palette.primary.main,
                      textAlign: "center",
                    },
                  }}
                >
                  <TableCell
                    align="center"
                    className="flex items-center gap-8 xs:flex-col "
                  >
                    <img src={row.user[0].image} />
                    <span>{row.user[0].text}</span>
                  </TableCell>

                  <TableCell scope="row">{row.taskCompleted}</TableCell>
                  <TableCell scope="row">{row.punch}</TableCell>
                  <TableCell
                    scope="row"
                    className="flex items-center gap-10 justify-center "
                  >
                    <img src={row.updates[0].arrow} />
                    <span
                      className="text-[#4F46E5] text-sm"
                      onClick={() => openRecentUpdateTable(index)}
                    >
                      {row.updates[0].text}
                    </span>
                    {showUpdateTable && updateTableIndex === index && (
                      <RecentTaskUpdateTable
                        hideTable={hideRecenctTableUpdate}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </>
          </CommonTable>
        </div>
      </Grid>
      <Grid item xs={12} lg={6}>
        <div className="shadow-sm bg-white rounded-lg">
          <div className="flex items-center justify-between px-20 py-28 border-b border-solid border-[#EDF2F6]">
            <Typography className="text-[16px] font-600">
              Logged Hours
            </Typography>

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
          <div className="pb-10">
            <img src="../assets/images/pages/dashBoared/chart.jpg" alt="" />
          </div>
        </div>
      </Grid>
    </Grid>
  );
}
