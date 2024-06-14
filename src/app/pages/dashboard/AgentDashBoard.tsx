// import { Button, Tab, Tabs, Theme } from "@mui/material";
import {
  Button,
  Checkbox,
  Tab,
  TableCell,
  TableRow,
  Tabs,
  Theme,
  Typography,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@mui/styles";
import {
  DownArrowBlank,
  DownArrowIcon,
  UpArrowBlank,
  UpArrowIcon,
} from "public/assets/icons/dashboardIcons";
import { useState } from "react";
import DropdownMenu from "src/app/components/Dropdown";
import ImagesOverlap from "src/app/components/ImagesOverlap";
import CommonTable from "src/app/components/commonTable";
import CommonPagination from "src/app/components/pagination";
import DashboardRecentActivity from "../../components/dashboard/DashboardRecentActivity";
import DashboaredAgenda from "../../components/dashboard/DashboaredAgenda";
import FilterPage from "src/app/components/projects/FilterPage";
import ProjectMenuItems from "src/app/components/projects/ProjectMenuItems";
import {
  GroupIcon,
  ShowIcon,
  SubTaskIcon,
} from "public/assets/icons/projectsIcon";
// import SelectField from "../selectField";
import { FilterIcon } from "public/assets/icons/user-icon";
import SelectField from "src/app/components/selectField";
import { DateCalendar } from "@mui/x-date-pickers";

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
function a11yProps(index: number) {
  return {
    className:
      "px-4 py-6 min-w-0 min-h-0 text-[1.8rem] font-400 text-[#757982]",
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
interface CheckboxState {
  agents: boolean;
  activity: boolean;
  logged: boolean;
}
export default function Dashboard() {
  const theme: Theme = useTheme();
  const [isChecked, setIsChecked] = useState<CheckboxState>({
    agents: true,
    activity: true,
    logged: true,
  });
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);

  const [filterMenu, setFilterMenu] = useState<HTMLElement | null>(null);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [anchorEl1, setAnchorEl1] = useState<HTMLElement | null>(null);

  const handleButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleMenuItemClick = (value: string) => {
    setSelectedValue(value);
    setAnchorEl(null);
  };
  const handleProjectList = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl1(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setAnchorEl1(null);
  };
  // console.log(anchorEl1, "anchor");
  const checkHandler = (key: string) => {
    setIsChecked((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };
  return (
    <div>
      <div className="relative flex items-center justify-between py-10 px-28 ">
        <Typography className="text-[18px] py-28 font-bold sm:text-[30px]  ">
          Welcome On Dashboard !
        </Typography>
      </div>
      {/* {isChecked.agents && ( */}
      <div className="px-28 mb-[3rem] ">
        <div className="bg-white rounded-lg ">
          <div className="shadow-md bg-white rounded-lg">
            {/* <div style={{ overflowX: "auto", whiteSpace: "nowrap" }}> */}

            <Tabs
              value={selectedTab}
              onChange={handleChange}
              aria-label="basic tabs example"
              className="min-h-0 pb-14 pt-20 px-20 "
              sx={{
                "& .MuiTabs-flexContainer": {
                  gap: "50px",
                },
                "& .MuiTab-root.Mui-selected": {
                  color: theme.palette.secondary.main,
                },
                "& .MuiTabs-indicator": {
                  backgroundColor: theme.palette.secondary.main,
                },
              }}
              variant="scrollable" // Enables scrolling
              scrollButtons="auto" // Shows scroll buttons when needed
              allowScrollButtonsMobile // Allows scroll buttons on mobile
            >
              {/* {projectInfo?.list?.map((item, index) => {
                    return ( */}
              <Tab
                label="To-Do"
                // {...a11yProps(item.id)}
                onClick={() => {
                  //   setColumnList([]);
                  //   listData(20, item.id);
                  //   setcolumnId(item.id);
                }}
              />
              {/* );
                  })} */}
            </Tabs>
            {/* </div> */}
            <div className="px-4">
              <FilterPage />
            </div>
            <div className="px-20  pb-10 flex sm:gap-32 sm:flex-row flex-col gap-10 py-10 ">
              <ProjectMenuItems
                label={"Group By"}
                icon={<GroupIcon />}
                className="bg-[#F6F6F6] rounded-md px-10 py-20 text-[#757982] font-400
                cursor-pointer text-[12px]"
                // setTableSelectedItemDesign={setTableSelectedItemDesign}
              />
              <ProjectMenuItems
                label={"Show/Hide Subtasks"}
                icon={<SubTaskIcon />}
                className="bg-[#F6F6F6] rounded-md px-10 py-20 text-[#757982] font-400
                cursor-pointer text-[12px]"
              />
              <ProjectMenuItems
                label="Show Closed"
                icon={<ShowIcon />}
                className="bg-[#F6F6F6] rounded-md px-10 py-20 text-[#757982] font-400
                cursor-pointer text-[12px]"
              />
            </div>

            <CommonTable
              headings={[
                "ID",
                "First Name",
                "Last Name",
                "Start Date",
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
                        // color: theme?.palette?.primary.main,
                        color: "blue",
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
                        ${
                          row.status === "Completed"
                            ? "text-[#4CAF50] bg-[#4CAF502E]"
                            : row.status === "In Progress"
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
              <CommonPagination count={10} />
            </div>
          </div>
        </div>
      </div>
      <div className="px-28 mb-[3rem] flex bg-red-200 items-center justify-between gap-20 ">
        <div className="bg-white rounded-lg flex-1 flex">
          <div className="w-3/4">
            <DateCalendar
              sx={{
                paddingLeft: "10px",
                background: "pink",
                width: 500,
              }}
            />
          </div>
          <div className="border-l-1 border-solid w-1/3">hello</div>
        </div>
        <div className="bg-white rounded-lg flex-1">
          <div className="flex items-center w-full justify-between py-10  px-20">
            <Typography className="text-[18px] text-[#111827] font-600">
              Timesheet{" "}
            </Typography>
            <div className="px-4">
              <DropdownMenu
                handleClose={() => setFilterMenu(null)}
                anchorEl={filterMenu}
                button={
                  <Button
                    variant="text"
                    className="h-[40px] text-[16px] flex gap-12 text-para_light whitespace-nowrap"
                    aria-label="Add User"
                    size="large"
                    onClick={(event) => setFilterMenu(event.currentTarget)}
                  >
                    <FilterIcon className="shrink-0" />
                    Filter
                  </Button>
                }
                popoverProps={{
                  open: !!filterMenu,
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "right",
                  },
                  transformOrigin: {
                    vertical: "top",
                    horizontal: "right",
                  },
                  classes: {
                    paper: "pt-0 pb-0",
                  },
                }}
              >
                <div className="w-[300px]">
                  <div className="text-black text-lg font-500 px-20 py-16 border-b border-b-[#EDF2F6] flex items-center justify-between">
                    <div>Filter Options</div>
                  </div>
                  <div className="px-20 pt-14 flex flex-col gap-14 w-full ">
                    <Typography className="text-black text-lg font-500">
                      Filter by
                    </Typography>
                    <SelectField
                      name="role"
                      //   formik={formik}
                      placeholder="Select "
                      // value={selectMenuItems}
                      // value={selectMenuItems || "Select Filter"}
                      //   onChange={(e) => showMenuItems(e)}
                      sx={{
                        "&.MuiInputBase-root": {
                          "& .MuiSelect-select": {
                            minHeight: "50px",
                          },
                        },
                      }}
                    >
                      <MenuItem value="Status">Today</MenuItem>
                      <MenuItem value="Due Date">Past 7 date</MenuItem>
                      <MenuItem value="Priority">Last Week</MenuItem>
                      <MenuItem value="Assignee">Last Month</MenuItem>
                      <MenuItem value="Archived">Current month</MenuItem>
                    </SelectField>
                    <div className="flex items-center justify-end gap-10">
                      <Button className=" text-para_light">Clear All</Button>
                      <Button
                        variant="text"
                        className="h-[40px] text-[16px] flex gap-12 text-secondary whitespace-nowrap"
                      >
                        Apply
                      </Button>
                    </div>
                  </div>
                </div>
              </DropdownMenu>
            </div>
          </div>
          <CommonTable
            headings={[
              "",
              "Date",
              "Time",
              "Ip Address",
              "Device Used",
              "Web cam",
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
                      // color: theme?.palette?.primary.main,
                      //   color: "blue",
                    },
                  }}
                >
                  {" "}
                  <TableCell scope="row">In</TableCell>
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
                </TableRow>
              ))}
            </>
          </CommonTable>
        </div>
      </div>
    </div>
  );
}
