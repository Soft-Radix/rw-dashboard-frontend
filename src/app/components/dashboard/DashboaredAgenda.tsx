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
import { useCallback, useEffect, useRef, useState } from "react";
import DropdownMenu from "src/app/components/Dropdown";
import CommonTable from "src/app/components/commonTable";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useSelector } from "react-redux";
import { ClientRootState, filterType } from "app/store/Client/Interface";
import { format, addDays, subDays } from "date-fns";
import { NoDataFound } from "public/assets/icons/common";
import ListLoading from "@fuse/core/ListLoading";
import { useAppDispatch } from "app/store/store";
import { GetAgendaData } from "app/store/Client";
import {
  CheckedTask,
  projectColumnList,
  projectTaskTableList,
} from "app/store/Projects";
import { useParams } from "react-router";
import { ProjectRootState } from "app/store/Projects/Interface";
import moment from "moment";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { debounce } from "lodash";
import CommonTableInfinit from "../commonTableInfinite";

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
  columnList: object[];
  scrollRef: any;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, scrollRef, ...other } = props;
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

const DashboaredAgenda = ({ columnList }) => {
  const theme: Theme = useTheme();
  const userDetails = JSON.parse(localStorage.getItem("userDetail"));
  // console.log(userDetails, "userDetaildjdj");
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [columnId, setcolumnId] = useState();
  const dispatch = useAppDispatch();
  const [projectId, setProjectId] = useState(
    userDetails?.projects[0]?.id || ""
  );
  const [selectedValue, setSelectedValue] = useState<string | null>(
    userDetails?.projects[0]?.name || ""
  );
  const [filters, setfilters] = useState<filterType>({
    start: 0,
    limit: 20,
    search: "",
  });
  const { projectInfo } = useSelector(
    (store: ProjectRootState) => store?.project
  );
  // console.log(projectInfoTask, "projectInfo");
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
    const selectedProjectColumn = projectInfo?.list[newValue];
    if (selectedProjectColumn) {
      // console.log(selectedProjectColumn, "selectedProjectColumn");
      setProjectId(selectedProjectColumn.project_id); // Update project ID state
      listData(selectedProjectColumn.project_id, selectedProjectColumn.id);
    }
  };

  const [isChecked, setIscheked] = useState<boolean>(true);
  const scrollRef = useRef(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [taskData, setTaskData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isDefault, setIsDefault] = useState();

  const { dashBoardAgenda, fetchAgendaData } = useSelector(
    (store: ClientRootState) => store.client
  );
  // console.log(dashBoardAgenda, "dashBoardAgenda");
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    // console.log(event.currentTarget, "currentTarget");
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (id: number, name: string) => {
    const payload: any = {
      start: 0,
      limit: -1,
      search: "",
      project_id: id,
      task_start: 0,
      task_limit: 20,
      project_column_id: 0,
    };

    // if (!columnId) return "";
    dispatch(projectColumnList(payload));
    setSelectedValue(name);
    setAnchorEl(null);
  };
  const listData = async (projectId, columnid) => {
    if (!projectId || !columnId) {
      console.error("Project ID and Column ID are required.");
      return;
    }

    // console.log(id, columnid, "listdata api call");
    const payload: any = {
      start: 0,
      limit: -1,
      search: "",
      project_id: projectId,
      task_start: 0,
      task_limit: 20,
      project_column_id: columnid,
    };

    const res = await dispatch(projectTaskTableList(payload));
    // console.log(res.payload.data.data?.list[0].tasks, "res.payload.");

    if (res.payload?.data?.data?.list?.length > 0) {
      setTaskData(res.payload.data.data?.list[0]?.tasks || []); // Assuming res.payload contains the data you need
      setIsDefault(res?.payload?.data?.data?.list[0]?.is_defalut);
    }
  };
  // console.log(isDefault, "taskDatahhffff");
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNextDay = () => {
    setCurrentDate(addDays(currentDate, 1));
  };
  const handleScroll = useCallback(
    debounce(() => {
      if (scrollRef.current) {
        console.log(scrollRef.current, "scrollRef.current");
        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 50 && !isFetching) {
          // Increased threshold
          setIsFetching(true);
          listData(projectId, columnId).finally(() => {
            setIsFetching(false);
          });
        }
      }
    }, 300), // Adjust debounce delay as needed
    [isFetching]
  );
  // console.log(columnList, "listData");

  // Effect to attach scroll event listener when component mounts
  useEffect(() => {
    const scrolledElement = scrollRef.current;
    if (scrolledElement) {
      scrolledElement.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (scrolledElement) {
        scrolledElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScroll]);
  const handlePreviousDay = () => {
    setCurrentDate(subDays(currentDate, 1));
  };
  const minDate = new Date();
  useEffect(() => {
    dispatch(GetAgendaData(filters));
  }, [currentDate, filters]);
  const handleCompleteTask = (id) => {
    if (id) {
      // setDisabled(true);
      dispatch(CheckedTask(id))
        .unwrap()
        .then((res) => {
          if (res?.data?.status == 1) {
            listData(projectId, columnId);
            toast.success(res?.data?.message, {
              duration: 4000,
            });
          }
        });

      // setDisabled(false);
      // setComplete(false);
    }
  };
  const handleCheckedItem = (id) => {
    if (id) {
      // setDisabled(true);
      dispatch(CheckedTask(id))
        .unwrap()
        .then((res) => {
          if (res?.data?.status == 1) {
            listData(projectId, columnId);
            toast.success(res?.data?.message, {
              duration: 4000,
            });
          }
        });

      // setDisabled(false);
      // setComplete(false);
    }
  };
  // console.log(dashBoardAgenda, "ssssssss");

  return (
    <Grid container spacing={3} className="px-28 mb-[3rem]">
      <Grid item xs={12} lg={6}>
        {userDetails?.role == "client" && (
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
                      minDate={minDate}
                    />
                  </span>
                  <span className="sm:text-[16px] text-[#757982]">
                    {format(currentDate, "MMM d yyyy")}
                  </span>
                  <div className="flex ">
                    <span
                      onClick={currentDate > minDate ? handlePreviousDay : null}
                      style={{
                        cursor:
                          currentDate <= minDate ? "not-allowed" : "pointer",
                        color: currentDate <= minDate ? "grey" : "inherit",
                      }}
                    >
                      <LeftIcon
                        style={{
                          pointerEvents:
                            currentDate <= minDate ? "none" : "auto",
                          opacity: currentDate <= minDate ? 0.5 : 1,
                        }}
                      />
                    </span>
                    <span onClick={handleNextDay} style={{ cursor: "pointer" }}>
                      <RightIcon />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <CommonTable headings={["Tasks"]} isCustomHeight={true}>
              {dashBoardAgenda?.length === 0 && fetchAgendaData == false ? (
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
              ) : fetchAgendaData === true ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <ListLoading /> {/* Render your loader component here */}
                  </TableCell>
                </TableRow>
              ) : (
                <>
                  {dashBoardAgenda?.map((row, index) => (
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
                      <TableCell
                        scope="row"
                        className="flex items-center gap-8"
                      >
                        <span>
                          <Checkbox onClick={() => handleCheckedItem(row.id)} />
                        </span>
                        {row.title}
                      </TableCell>
                      <TableCell>
                        <span></span>
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              )}
            </CommonTable>
          </div>
        )}
      </Grid>
      <Grid item xs={12} lg={6} sm={12}>
        <div className="shadow-sm bg-white rounded-lg">
          <div className="basis-full lg:basis-auto lg:grow">
            <div className=" flex  sm:items-center justify-between px-20 border-0 border-none flex-col  sm:flex-row ">
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
                {projectInfo?.list?.map((row, index: number) => {
                  // console.log(row.tasks, "dhsfbhdsbfhsdf");
                  return (
                    <Tab
                      key={row.id}
                      label={row.name}
                      {...a11yProps(row.id)}
                      onClick={() => {
                        // console.log("click lisrt...", row);
                        listData(row.project_id, row.id);
                        setcolumnId(row.id);
                      }}
                    />
                  );
                })}
              </Tabs>

              <div className=" -mr-[6px] text-right flex justify-end items-center">
                <DropdownMenu
                  button={
                    <div
                      className="flex items-start "
                      onClick={handleButtonClick}
                    >
                      <Button>
                        {selectedValue || ""}
                        <DownArrowIcon className="cursor-pointer" />
                      </Button>
                    </div>
                  }
                  anchorEl={anchorEl}
                  handleClose={handleClose}
                >
                  {columnList
                    ?.filter((item) => item.checked)
                    .map((item) => {
                      // console.log(item, "jjjjjjjjjj");
                      return (
                        <div>
                          <MenuItem
                            onClick={() =>
                              handleMenuItemClick(item.id, item.name)
                            }
                            className="w-[200px] px-20 py-10"
                          >
                            {item.name}
                          </MenuItem>
                        </div>
                      );
                    })}
                </DropdownMenu>
              </div>
            </div>
          </div>
          <CommonTable headings={[]} isCustomHeight={true} ref={scrollRef}>
            <>
              {taskData.length === 0 && (
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
              )}
              {taskData?.map((row, id) => {
                const isDueDatePassed = moment(row.due_date_time).isBefore(
                  currentDate
                );
                // console.log(row, "projectRow");
                return (
                  <TableRow
                    key={row.id}
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
                    <TableCell
                      scope="row"
                      className="flex items-center w-full  justify-between gap-8"
                    >
                      <div>
                        {isDefault == 1 ? (
                          <>
                            <Checkbox
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                              checked={true}
                            />
                            <Link to="/${project_id}/tasks/detail/${id}">
                              <span>{row.title}</span>
                            </Link>
                          </>
                        ) : (
                          <>
                            <span onClick={() => handleCompleteTask(row.id)}>
                              <Checkbox />
                            </span>
                            <Link to="/${project_id}/tasks/detail/${id}">
                              <span>{row.title}</span>
                            </Link>
                          </>
                        )}
                      </div>
                      <Typography
                        className={
                          isDueDatePassed ? "text-black" : "text-red-500"
                        }
                      >
                        {row.due_date_time
                          ? moment(row.due_date_time).format("MMM-DD")
                          : "N/A"}
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
            </>
          </CommonTable>
        </div>
      </Grid>
    </Grid>
  );
};

export default DashboaredAgenda;
