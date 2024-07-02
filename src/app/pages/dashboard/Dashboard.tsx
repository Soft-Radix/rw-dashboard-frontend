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
import { useCallback, useEffect, useState } from "react";
import DropdownMenu from "src/app/components/Dropdown";
import ImagesOverlap from "src/app/components/ImagesOverlap";
import CommonTable from "src/app/components/commonTable";
import CommonPagination from "src/app/components/pagination";
import DashboardRecentActivity from "../../components/dashboard/DashboardRecentActivity";
import DashboaredAgenda from "../../components/dashboard/DashboaredAgenda";
import { ClientRootState, filterType } from "app/store/Client/Interface";
import { useAppDispatch } from "app/store/store";
import {
  GetAgendaData,
  GetAssignAgentsInfo,
  GetRecentActivityData,
} from "app/store/Client";
import { useSelector } from "react-redux";
import moment from "moment";
import { NoDataFound } from "public/assets/icons/common";
import ListLoading from "@fuse/core/ListLoading";

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
  const dispatch = useAppDispatch();
  const theme: Theme = useTheme();
  const [isChecked, setIsChecked] = useState<CheckboxState>({
    agents: true,
    activity: true,
    logged: true,
  });
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const urlForImage = import.meta.env.VITE_API_BASE_IMAGE_URL;
  const [selectedTab, setSelectedTab] = useState(0);
  const client_id = JSON.parse(localStorage.getItem("userDetail"));
  const userDetails = JSON.parse(localStorage.getItem("userDetail"));
  // const updatedProjects = userDetails?.projects?.map((project) => ({
  //   ...project,
  //   checked: true, // Set default value to false or true as per your requirement
  // }));
  // console.log(userDetails.projects, "fffffffffffffffffffff");
  // console.log(client_id.id, "clientididid");
  const [filters, setfilters] = useState<filterType>({
    start: 0,
    limit: 10,
    search: "",
  });
  const [columnList, setColumnList] = useState([]);
  console.log(
    "🚀 ~ const[columnList,setColumnList]=useState ~ columnList:",
    columnList
  );
  const {
    assignedAgentDetail,
    agentTotal_records,
    fetchStatus,
    totalAgent,
    resetActivity,
  } = useSelector((store: ClientRootState) => store.client);
  // console.log(resetActivity, "fjidjfijfijfi");

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

  const handleCloseProject = () => {
    setAnchorEl1(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const checkPageNum = (e: any, pageNumber: number) => {
    // console.log(pageNumber, "rr");
    setfilters((prevFilters) => {
      if (pageNumber !== prevFilters.start + 1) {
        return {
          ...prevFilters,
          start: pageNumber - 1,
        };
      }
      return prevFilters; // Return the unchanged filters if the condition is not met
    });
  };
  // console.log(anchorEl1, "anchor");
  const checkHandler = (key: string) => {
    setIsChecked((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const handleSelectProject = (event, item) => {
    const isChecked = event.target.checked;
    const projectIndex = columnList.findIndex(
      (project) => project.id === item.id
    );
    // console.log(projectIndex, "gfjgjh");

    let updatedProjects;

    if (projectIndex !== -1) {
      updatedProjects = [...columnList];
      updatedProjects[projectIndex] = {
        ...updatedProjects[projectIndex],
        checked: isChecked,
      };
    } else {
      updatedProjects = [
        ...columnList,
        { id: item.id, name: item.name, checked: isChecked },
      ];
    }

    setColumnList(updatedProjects);
    localStorage.setItem("columnList", JSON.stringify(updatedProjects));
    console.log("🚀 ~ handleSelectProject ~ updatedProjects:", updatedProjects);
  };
  // useEffect(() => {
  //   const columnData = localStorage.getItem("columnList");
  //   const result = JSON.parse(columnData);
  //   setColumnList(result);
  //   console.log("🚀 ~ useEffect ~ result:", result);
  // }, []);
  // console.log(columnList, "columnList");
  const fetchAgentList = useCallback(() => {
    dispatch(GetAssignAgentsInfo({ ...filters, client_id: client_id?.id }));
  }, [filters]);
  useEffect(() => {
    fetchAgentList();
  }, [filters.limit, filters.client_id, filters.search, filters.start]);
  useEffect(() => {
    dispatch(GetRecentActivityData());
    dispatch(GetAgendaData(filters));
  }, [dispatch]);
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
                  <DownArrowBlank
                    className="cursor-pointer fill-none"
                    onClick={handleCloseProject}
                  />
                )}
                Project Summary
              </Button>
              {anchorEl1 && (
                <div className="w-[375px]  rounded-none shadow-none">
                  {userDetails?.projects?.map((item, index) => {
                    console.log(item, "itemsss");
                    return (
                      <MenuItem className="px-36">
                        <label
                          htmlFor={`project-${item.id}`}
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <Checkbox
                            id={`project-${item.id}`}
                            defaultChecked
                            onChange={(e) => handleSelectProject(e, item)}
                            checked={columnList[index]?.checked}
                          />
                          {item.name}
                        </label>
                      </MenuItem>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </DropdownMenu>
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
                  {totalAgent}
                </span>
              </div>
            </div>

            <CommonTable
              headings={["Name", "Agent Id", "Start Date", "Last Login"]}
            >
              {assignedAgentDetail?.length === 0 &&
              fetchStatus !== "loading" ? (
                // &&
                // agentState.status != "loading"
                <TableRow
                  sx={{
                    "& td": {
                      borderBottom: "1px solid #EDF2F6",
                      paddingTop: "12px",
                      paddingBottom: "12px",
                      color: theme.palette.primary.main,
                    },
                  }}
                >
                  <TableCell colSpan={7} align="center">
                    <div
                      className="flex flex-col justify-center align-items-center gap-20 bg-[#F7F9FB] min-h-[400px] py-40"
                      style={{ alignItems: "center" }}
                    >
                      <NoDataFound />
                      <Typography className="text-[24px] text-center font-600 leading-normal">
                        No data found !
                      </Typography>
                    </div>
                  </TableCell>
                </TableRow>
              ) : fetchStatus === "loading" ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <ListLoading /> {/* Render your loader component here */}
                  </TableCell>
                </TableRow>
              ) : (
                <>
                  {assignedAgentDetail?.map((row, index) => (
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
                      <TableCell
                        scope="row"
                        className="flex items-center gap-8 font-500"
                      >
                        <img
                          className="h-40 w-40 rounded-full"
                          src={
                            row.user_image
                              ? urlForImage + row.user_image
                              : "../assets/images/logo/images.jpeg"
                          }
                        ></img>
                        <span>{row.first_name + " " + row.last_name}</span>
                      </TableCell>
                      <TableCell align="center" className="whitespace-nowrap">
                        {row.agent_id}
                      </TableCell>

                      <TableCell align="center" className="whitespace-nowrap">
                        {row.created_at
                          ? moment(row.created_at).format("MMMM Do, YYYY")
                          : "N/A"}
                      </TableCell>
                      <TableCell align="center" className="whitespace-nowrap">
                        {row.last_login
                          ? moment(row.last_login).format("MMMM Do, YYYY")
                          : "N/A"}
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              )}
            </CommonTable>
            <div className="flex justify-end py-14 px-[3rem]">
              {assignedAgentDetail?.length > 0 && (
                <CommonPagination
                  count={agentTotal_records}
                  onChange={(e, PageNumber: number) =>
                    checkPageNum(e, PageNumber)
                  }
                  page={filters.start + 1}
                />
              )}
            </div>
          </div>
        </div>
      )}
      {isChecked.activity && <DashboardRecentActivity />}
      {isChecked.logged && <DashboaredAgenda columnList={columnList} />}
    </div>
  );
}
