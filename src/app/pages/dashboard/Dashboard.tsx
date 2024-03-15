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
import {
  DownArrowIcon,
  PlusIcon,
  UpArrowIcon,
} from "public/assets/icons/dashboardIcons";
import { useState } from "react";
import { Link } from "react-router-dom";
import ImagesOverlap from "src/app/components/ImagesOverlap";
import TitleBar from "src/app/components/TitleBar";
import CommonTable from "src/app/components/commonTable";
import CommonPagination from "src/app/components/pagination";
import AddTaskModal from "src/app/components/tasks/AddTask";
import RecentData from "src/app/components/tasks/RecentData";
import ThemePageTable from "src/app/components/tasks/TaskPageTable";
import DashboardRecentActivity from "./DashboardRecentActivity";
import DashboaredAgenda from "./DashboaredAgenda";
import DropdownMenu from "src/app/components/Dropdown";
import MenuItem from "@mui/material/MenuItem";
import Menu from "material-ui/Menu";

const rows = [
  {
    id: "#2367055342",
    fname: "Benjamin",
    lname: "Benjamin",
    startdate: "Feb 12,2024",
    lastlogin: "Feb 12,2024",
    assignedImg: ["female-01.jpg", "female-02.jpg", "female-03.jpg"],
    status: "In Progress",
  },
  {
    id: "#2367055342",
    fname: "Benjamin",
    lname: "Benjamin",
    startdate: "Feb 12,2024",
    lastlogin: "Feb 12,2024",
    assignedImg: ["female-01.jpg", "female-02.jpg", "female-03.jpg"],
    status: "In Review",
  },
  {
    id: "#2367055342",
    fname: "Benjamin",
    lname: "Benjamin",
    startdate: "Feb 12,2024",
    lastlogin: "Feb 12,2024",
    assignedImg: ["female-01.jpg", "female-02.jpg", "female-03.jpg"],
    status: "Completed",
  },
  {
    id: "#2367055342",
    fname: "Benjamin",
    lname: "Benjamin",
    startdate: "Feb 12,2024",
    lastlogin: "Feb 12,2024",
    assignedImg: ["female-01.jpg", "female-02.jpg", "female-03.jpg"],
    status: "Completed",
  },
  {
    id: "#2367055342",
    fname: "Benjamin",
    lname: "Benjamin",
    startdate: "Feb 12,2024",
    lastlogin: "Feb 12,2024",
    assignedImg: ["female-01.jpg", "female-02.jpg", "female-03.jpg"],
    status: "Completed",
  },

  {
    id: "#2367055342",
    fname: "Benjamin",
    lname: "Benjamin",
    startdate: "Feb 12,2024",
    lastlogin: "Feb 12,2024",
    assignedImg: ["female-01.jpg", "female-02.jpg", "female-03.jpg"],
    status: "Completed",
  },
];

export default function Dashboard() {
  const theme: Theme = useTheme();

  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [anchorEl1, setAnchorEl1] = useState<HTMLElement | null>(null);

  const handleButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuItemClick = (value: string) => {
    setSelectedValue(value);
    setAnchorEl(null);
  };
  const handleProjectList = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setAnchorEl1(null);
  };
  console.log(anchorEl1, "anchor");

  return (
    <div>
      <div className="px-32 py-10 flex items-center justify-between relative ">
        <TitleBar title="Welcome On Dashboard !"></TitleBar>
        <DropdownMenu
          button={
            <div
              className="flex items-center relative"
              onClick={handleButtonClick}
            >
              <Button
                variant="outlined"
                color="secondary"
                className="h-[40px] text-[16px] flex gap-8 mb-[1rem]"
                aria-label="Manage Sections"
                size="large"
              >
                Manage Sections
                <DownArrowIcon className="cursor-pointer" />
              </Button>
            </div>
          }
          anchorEl={anchorEl}
          handleClose={handleClose}
        >
          <div className="w-[375px] ">
            <MenuItem>
              <Checkbox />
              Agents logged-in
            </MenuItem>
            <MenuItem>
              <Checkbox /> Recent activity
            </MenuItem>
            <MenuItem>
              <Checkbox /> Logged hours
            </MenuItem>
            {/* Nested Dropdown Menu */}
            <div
              className="flex items-center relative"
              onClick={handleProjectList}
            >
              <Button
                variant="text"
                className="h-[40px] text-[16px] flex gap-8 mb-[1rem]"
                aria-label="Add Tasks"
                size="large"
              >
                <DownArrowIcon className="cursor-pointer fill-none" />
                Project Summary
              </Button>
            </div>
          </div>
        </DropdownMenu>

        {/* Nested DropdownMenu component placed outside the main DropdownMenu */}
        <DropdownMenu
          button={null} // No button needed as it's nested
          anchorEl={anchorEl1}
          handleClose={handleClose}
        >
          {" "}
          <div className="w-[375px] px-20 ">
            <MenuItem>
              <Checkbox />
              Project 1
            </MenuItem>
            <MenuItem>
              <Checkbox /> Project 2
            </MenuItem>
            <MenuItem>
              <Checkbox /> Project 3
            </MenuItem>
          </div>
        </DropdownMenu>
      </div>

      <div className="px-28 mb-[3rem] ">
        <div className=" bg-white rounded-lg">
          <div className="flex items-center justify-between px-24 py-28">
            <Typography className="text-[16px] font-600">
              Agents Listing
            </Typography>

            <div className="flex mr-20 items-center justify-center gap-32">
              <Typography className="text-[16px] font-500">
                No. of Agents Logged in
              </Typography>
              <span className="text-[#4F46E5] p-10 rounded-md bg-[#F6F6F6] font-600">
                {" "}
                34
              </span>
            </div>
          </div>

          <CommonTable
            headings={[
              "ID",
              "First Name",
              "Last Name",
              "start Date",
              "Last Login",
              "Assigned Client",
              "Status",
              ,
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
                  <TableCell scope="row">{row.id}</TableCell>
                  <TableCell align="center" className="whitespace-nowrap">
                    {row.fname}
                  </TableCell>
                  <TableCell align="center" className="whitespace-nowrap">
                    {row.lname}
                  </TableCell>
                  <TableCell align="center" className="whitespace-nowrap">
                    {row.startdate}
                  </TableCell>
                  <TableCell align="center" className="whitespace-nowrap">
                    {row.lastlogin}
                  </TableCell>
                  <TableCell align="center">
                    <ImagesOverlap images={row.assignedImg} />
                  </TableCell>
                  <TableCell align="center" className="whitespace-nowrap">
                    <span
                      className={`inline-flex items-center justify-center rounded-full w-[95px] min-h-[25px] text-sm font-500
                      ${row.status === "Completed" ? "text-[#4CAF50] bg-[#4CAF502E]" : row.status === "In Progress" ? "text-[#F44336] bg-[#F443362E]" : "text-[#F0B402] bg-[#FFEEBB]"}`}
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
      <DashboardRecentActivity />
      <DashboaredAgenda />
    </div>
  );
}
