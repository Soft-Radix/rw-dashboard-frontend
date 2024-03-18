import {
  Button,
  Checkbox,
  Grid,
  TableCell,
  TableRow,
  Theme,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/styles";
import { CalendarIcon } from "@mui/x-date-pickers";

import {
  ArrowRightCircleIcon,
  DeleteIcon,
  EditIcon,
} from "public/assets/icons/common";
import {
  CalendarLineIcon,
  DownArrowIcon,
  LeftIcon,
  PlusIcon,
  RightIcon,
  UpArrowIcon,
} from "public/assets/icons/dashboardIcons";
import { DownArrow } from "public/assets/icons/topBarIcons";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { Link } from "react-router-dom";
import DropdownMenu from "src/app/components/Dropdown";
import ImagesOverlap from "src/app/components/ImagesOverlap";
import TitleBar from "src/app/components/TitleBar";
import CommonTable from "src/app/components/commonTable";
import CommonPagination from "src/app/components/pagination";
import AddTaskModal from "src/app/components/tasks/AddTask";
import RecentData from "src/app/components/tasks/RecentData";
import ThemePageTable from "src/app/components/tasks/TaskPageTable";
import { theme } from "tailwind.config";

const rows = [
  {
    task: "Brand New Web App Design",
  },
  {
    task: "Brand New Web App Design",
  },
  {
    task: "Brand New Web App Design",
  },
  {
    task: "Brand New Web App Design",
  },
];
const rowss = [
  {
    task: "Brand New Web App Design",
  },
  {
    task: "Brand New Web App Design",
  },
  {
    task: "Brand New Web App Design",
  },
];
const newrows = [
  {
    task: "Brand New Web App Design",
  },
];
function a11yProps(index: number) {
  return {
    className:
      "px-4 py-6 min-w-0 min-h-0 text-[1.8rem] font-400 text-[#757982]",
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

const DashboaredAgenda = () => {
  const theme: Theme = useTheme();

  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuItemClick = (value: string) => {
    setSelectedValue(value);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Grid container spacing={3} className="px-28 mb-[3rem]">
      <Grid item xs={12} lg={6}>
        <div className="shadow-sm bg-white rounded-lg ">
          <div className="flex items-center justify-between pr-20 ">
            <div>
              <Typography className="text-[16px] font-600 pt-28 px-20 pb-10">
                Agenda
              </Typography>
              <div className="flex items-center px-20 gap-8 pb-20">
                <span>
                  <CalendarLineIcon />
                </span>
                <span className="text-[16px] text-[#757982]">Feb 27, Mon</span>
                <div className="flex ">
                  <span>
                    <LeftIcon />
                  </span>
                  <span>
                    <RightIcon />
                  </span>
                </div>
              </div>
            </div>
            <Button
              variant="outlined"
              color="secondary"
              className="h-[40px] text-[16px] flex gap-8"
              aria-label="Add Tasks"
              size="large"
              onClick={() => setIsOpenAddModal(true)}
            >
              <PlusIcon color={theme.palette.secondary.main} />
              Add calendar In Integration
            </Button>
          </div>
          <CommonTable headings={["Tasks"]}>
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
                      textAlign: "center",
                    },
                  }}
                >
                  <TableCell scope="row" className="flex items-center gap-8">
                    <span>
                      <Checkbox />
                    </span>
                    {row.task}
                  </TableCell>
                  <TableCell>
                    <span></span>
                  </TableCell>
                </TableRow>
              ))}
            </>
          </CommonTable>
        </div>
      </Grid>
      <Grid item xs={12} lg={6} sm={12}>
        <div className="shadow-sm bg-white rounded-lg">
          <div className="basis-full lg:basis-auto lg:grow">
            <div className="shadow-md flex items-center justify-between px-20 border-0 border-none flex-col sm:flex-row">
              <Tabs
                value={selectedTab}
                onChange={handleChange}
                aria-label="basic tabs example"
                className="min-h-0 pb-14 pt-20 px-10 sm:px-20 gap-[50px] border-none bg-none sm:overflow-x-auto overflow-x-visible"
                sx={{
                  "& .MuiTabs-flexContainer": {
                    gap: "50px ",
                  },
                  "& .MuiTab-root.Mui-selected": {
                    color: theme.palette.secondary.main,
                  },
                  "& .MuiTabs-indicator": {
                    backgroundColor: theme.palette.secondary.main,
                  },
                }}
              >
                <Tab label="To Do" {...a11yProps(0)} />
                <Tab label="In Progress" {...a11yProps(1)} />
                <Tab label="Done" {...a11yProps(2)} />
              </Tabs>
              <div>
                <DropdownMenu
                  button={
                    <div
                      className="flex items-center"
                      onClick={handleButtonClick}
                    >
                      <Button>
                        {selectedValue || "Project 1"}
                        <DownArrowIcon className="cursor-pointer" />
                      </Button>
                    </div>
                  }
                  anchorEl={anchorEl}
                  handleClose={handleClose}
                >
                  <div>
                    <MenuItem
                      onClick={() => handleMenuItemClick("Project 1")}
                      className="w-[200px] px-20 py-10"
                    >
                      Project 1
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleMenuItemClick("Project 2")}
                      className="w-[200px] px-20 py-10"
                    >
                      Project 2
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleMenuItemClick("Project 3")}
                      className="w-[200px] px-20 py-10"
                    >
                      Project 3
                    </MenuItem>
                  </div>
                </DropdownMenu>
              </div>
            </div>
          </div>
          <CommonTable headings={["Today(3)"]}>
            <>
              {rowss.map((row, index) => (
                <TableRow
                  key={index}
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
                  <TableCell scope="row" className="flex items-center gap-8">
                    <span>
                      <Checkbox />
                    </span>
                    {row.task}
                  </TableCell>
                </TableRow>
              ))}
            </>
          </CommonTable>
          <CommonTable headings={["Overdue(1)"]}>
            <>
              {newrows.map((row, index) => (
                <TableRow
                  key={index}
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
                    scope="row"
                    className="flex items-center gap-8 w-full  justify-between"
                  >
                    <span>
                      <Checkbox />
                      {row.task}
                    </span>
                    <Typography className="text-red-500">Feb 8</Typography>
                  </TableCell>
                </TableRow>
              ))}
            </>
          </CommonTable>
        </div>
      </Grid>
    </Grid>
  );
};

export default DashboaredAgenda;
