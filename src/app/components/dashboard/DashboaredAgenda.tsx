import {
  Button,
  Checkbox,
  Grid,
  Tab,
  TableCell,
  TableRow,
  Tabs,
  Theme,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/styles";

import MenuItem from "@mui/material/MenuItem";
import {
  CalendarLineIcon,
  DownArrowIcon,
  LeftIcon,
  PlusIcon,
  RightIcon,
} from "public/assets/icons/dashboardIcons";
import { useState } from "react";
import DropdownMenu from "src/app/components/Dropdown";
import CommonTable from "src/app/components/commonTable";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

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
  const userDetails = JSON.parse(localStorage.getItem("userDetail"));
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
  // console.log(userDetails, "userDetails");
  return (
    <Grid container spacing={3} className="px-28 mb-[3rem]">
      <Grid item xs={12} lg={6}>
        {userDetails.role == "client" && (
          <div className="shadow-sm bg-white rounded-lg ">
            <div className="flex sm:items-center justify-between sm:pr-20 sm:flex-row flex-col items-start gap-11">
              <div className="flex items-center pb-10 justify-between w-full py-28 sm:py-0 pr-[10px] sm:flex-col sm:items-start ">
                <Typography className="text-[16px] font-600 sm:pt-28 px-20 sm:pb-10 ">
                  Agenda
                </Typography>
                <div className="flex items-center sm:gap-8 sm:pb-20 ">
                  <span>
                    <DatePicker
                      sx={{
                        " & .MuiInputBase-input": {
                          display: "none",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          display: "none",
                        },
                      }}
                    />
                    {/* <CalendarLineIcon /> */}
                  </span>
                  <span className="sm:text-[16px] text-[#757982]">
                    Feb 27, Mon
                  </span>
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
                        "@media (max-width: 600px)": {
                          // Adjust screen width as needed for small screens
                          textAlign: "left",
                        },
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
        )}
      </Grid>
      <Grid item xs={12} lg={6} sm={12}>
        <div className="shadow-sm bg-white rounded-lg">
          <div className="basis-full lg:basis-auto lg:grow">
            <div className="shadow-md flex  sm:items-center justify-between px-20 border-0 border-none flex-col  sm:flex-row ">
              <Tabs
                value={selectedTab}
                onChange={handleChange}
                aria-label="basic tabs example"
                className="min-h-0 pb-14 pt-20  sm:px-20  border-none bg-none w-3/4 "
                sx={{
                  "& .MuiTabs-flexContainer": {
                    overflowX: "scroll",
                    gap: "50px", // Default gap for large screens
                    // "@media (max-width: 425px)": {
                    //   gap: "6px", // Change gap to 6px on small screens
                    // },
                  },
                  "& .MuiTab-root.Mui-selected": {
                    color: theme.palette.secondary.main,
                    borderBottomWidth: "2px",
                    borderBottomColor: theme.palette.secondary.main,
                    borderBottom: "solid",
                  },
                  "& .MuiTabs-indicator": {
                    visibility: "hidden",
                    backgroundColor: theme.palette.secondary.main,
                  },
                }}
              >
                <Tab label="To Do" {...a11yProps(0)} />
                <Tab label="In Progress" {...a11yProps(1)} />
                <Tab label="Done" {...a11yProps(2)} />
                <Tab label="Done" {...a11yProps(3)} />
                <Tab label="Done" {...a11yProps(4)} />
                <Tab label="Done" {...a11yProps(5)} />
                <Tab label="Done" {...a11yProps(6)} />
                <Tab label="Done" {...a11yProps(7)} />
              </Tabs>

              <div className=" -mr-[6px] text-right flex justify-end items-center">
                <DropdownMenu
                  button={
                    <div
                      className="flex items-start "
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
                      "@media (max-width: 600px)": {
                        // Adjust screen width as needed for small screens
                        textAlign: "left",
                      },
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
                      "@media (max-width: 600px)": {
                        // Adjust screen width as needed for small screens
                        textAlign: "left",
                      },
                    },
                  }}
                >
                  <div className="flex items-center w-full justify-between ">
                    <TableCell
                      scope="row"
                      className="flex items-center gap-8 justify-between"
                    >
                      <div className="flex gap-10 items-center">
                        <span className="">
                          <Checkbox />
                        </span>
                        {row.task}
                      </div>
                    </TableCell>
                    <Typography className="text-red-500 w-[40%]  text-right pr-20">
                      Feb 8
                    </Typography>
                  </div>
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
