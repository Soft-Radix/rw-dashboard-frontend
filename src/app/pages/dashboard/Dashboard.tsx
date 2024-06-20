// import { Button, Tab, Tabs, Theme } from "@mui/material";
import {
  Button,
  Checkbox,
  TableCell,
  TableRow,
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
        <DropdownMenu
          button={
            <div
              className="relative flex items-center"
              onClick={handleButtonClick}
            >
              <Button
                variant="outlined"
                color="secondary"
                className="h-[40px] sm:text-[16px] flex gap-8 sm:mb-[1rem] leading-none "
                aria-label="Manage Sections"
                size="large"
                endIcon={<DownArrowIcon className="cursor-pointer" />}
              >
                Manage Sections
              </Button>
            </div>
          }
          anchorEl={anchorEl}
          handleClose={handleClose}
        >
          <div className="w-[375px] ">
            <MenuItem>
              <label
                htmlFor="agents"
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Checkbox
                  onChange={() => checkHandler("agents")}
                  checked={isChecked.agents}
                  id="agents"
                />
                Agents logged-in
              </label>
            </MenuItem>
            <MenuItem>
              <label
                htmlFor="activity"
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Checkbox
                  onChange={() => checkHandler("activity")}
                  checked={isChecked.activity}
                  id="activity"
                />
                Recent activity
              </label>
            </MenuItem>
            <MenuItem>
              <label
                htmlFor="logged"
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Checkbox
                  onChange={() => checkHandler("logged")}
                  checked={isChecked.logged}
                  id="logged"
                />
                Logged hours
              </label>
            </MenuItem>

            <div
              className="relative flex flex-col items-start justify-start "
              onClick={handleProjectList}
            >
              <Button
                variant="text"
                className="h-[40px] text-[16px] flex gap-8 mb-[1rem] w-full rounded-none justify-start px-24 "
                aria-label="Add Tasks"
                size="large"
              >
                {anchorEl1 ? (
                  <UpArrowBlank className="cursor-pointer fill-none" />
                ) : (
                  <DownArrowBlank className="cursor-pointer fill-none" />
                )}
                Project Summary
              </Button>
              {anchorEl1 && (
                <div className="w-[375px]  rounded-none shadow-none">
                  <MenuItem className="px-36">
                    <label
                      htmlFor="project1"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <Checkbox id="project1" />
                      Project 1
                    </label>
                  </MenuItem>
                  <MenuItem className="px-36">
                    <label
                      htmlFor="project2"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <Checkbox id="project2" />
                      Project 2
                    </label>
                  </MenuItem>
                  <MenuItem className="px-36">
                    <label
                      htmlFor="project3"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <Checkbox id="project3" />
                      Project 3
                    </label>
                  </MenuItem>
                </div>
              )}
            </div>
          </div>
        </DropdownMenu>
        {/* <DropdownMenu
          button={null} // No button needed as it's nested
          anchorEl={anchorEl1}
          handleClose={handleClose}
        >
          <div className="w-[375px] px-20 rounded-none shadow-none">
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
        </DropdownMenu> */}
      </div>

      {isChecked.agents && (
        <div className="px-28 mb-[3rem] ">
          <div className="bg-white rounded-lg ">
            <div className="flex items-center justify-between px-24 py-28">
              <Typography className="text-[16px] font-600">
                Agents Listing
              </Typography>

              <div className="flex items-center justify-center sm:mr-20 sm:gap-32 ">
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
                        color: " #111827",
                        fontSize: "14px",
                        fontWeight: 500,
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
      )}
      {isChecked.activity && <DashboardRecentActivity />}
      {isChecked.logged && <DashboaredAgenda />}
    </div>
  );
}
