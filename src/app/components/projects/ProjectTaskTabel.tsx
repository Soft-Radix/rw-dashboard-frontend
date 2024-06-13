import { Button, Tab, Tabs, Theme, Typography } from "@mui/material";
import { useTheme } from "@mui/styles";
import {
  GroupIcon,
  ShowIcon,
  SortIcon,
  SubTaskIcon,
} from "public/assets/icons/projectsIcon";
import { SearchIcon } from "public/assets/icons/topBarIcons";
import { FilterIcon } from "public/assets/icons/user-icon";
import { useCallback, useEffect, useRef, useState } from "react";
import InputField from "src/app/components/InputField";
import ProjectMenuItems from "src/app/components/projects/ProjectMenuItems";
import AddTaskModal from "src/app/components/tasks/AddTask";
import RecentData from "src/app/components/tasks/RecentData";
// import ThemePageTable from "src/app/components/tasks/TaskPageTable";
import FilterPage from "./FilterPage";
import ThemePageTable from "../tasks/TaskPageTable";
import { PlusIcon } from "public/assets/icons/dashboardIcons";
import { useAppDispatch } from "app/store/store";
import { projectColumnList, projectTaskTableList } from "app/store/Projects";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { ProjectRootState } from "app/store/Projects/Interface";
import { debounce } from "lodash";
import { useNavigate } from "react-router";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  scrollRef?: any;
}
interface ProjectTaskTableProps {
  customSelectedTab: number;
  // Add any other props your component expects here
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, scrollRef, ...other } = props;

  return (
    <div
      className="h-[300px] overflow-y-scroll "
      role="tabpanel"
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      ref={scrollRef}
      {...other}
    >
      {children}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    className:
      "px-4 py-6 min-w-0 min-h-0 text-[1.8rem] font-400 text-[#757982]",
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ProjectTaskTabel(props: ProjectTaskTableProps) {
  const { id } = useParams<{ id: string }>();
  // console.log(id, "ghdfghdjgdf");
  const scrollRef = useRef(null);
  // console.log(scrollRef, "scrollRef");
  // console.log(id, "iddfjksdfd");
  const theme: Theme = useTheme();
  const dispatch = useAppDispatch();
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [columnId, setcolumnId] = useState();
  // console.log(columnId, "columnId");
  const [columnList, setColumnList] = useState<any[]>([]);
  const [tableSelectedItemDesign, setTableSelectedItemDesign] =
    useState<object>();
  const { projectInfo } = useSelector(
    (store: ProjectRootState) => store?.project
  );
  // console.log(projectInfo.list, "projectInfo");
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    const [tableSelectedItemDesign, setTableSelectedItemDesign] =
      useState<object>();

    // const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    //   setSelectedTab(newValue);

    // };
    const navigate = useNavigate();
    const getTabIndexFromSubtype = (subtype) => {
      switch (subtype) {
        case "to-do":
          return 0;
        case "in-progress":
          return 1;
        case "in-review":
          return 2;
        case "completed":
          return 3;
        default:
          return 0;
      }
    };
    const params = new URLSearchParams(location.search);
    const subtype = params.get("subtype") || "to-do";
    const [selectedTab, setSelectedTab] = useState(
      getTabIndexFromSubtype(subtype)
    );
    // Helper function to get the subtype from the tab index
    const getSubtypeFromTabIndex = (index) => {
      switch (index) {
        case 0:
          return "to-do";
        case 1:
          return "in-progress";
        case 2:
          return "in-review";
        case 3:
          return "completed";
        default:
          return "to-do";
      }
    };

    useEffect(() => {
      const params = new URLSearchParams(location.search);
      const subtype = params.get("subtype") || "to-do";
      setSelectedTab(getTabIndexFromSubtype(subtype));
    }, [location.search]);

    const handleChange = (event, newValue) => {
      const newSubtype = getSubtypeFromTabIndex(newValue);
      const params = new URLSearchParams(location.search);
      params.set("subtype", newSubtype);
      navigate(`${location.pathname}?${params.toString()}`);
      setSelectedTab(newValue);
    };
    const listData = async (task_limt, columnid = 0) => {
      // console.log(task_limt, "task_limt");
      const payload: any = {
        start: 0,
        limit: 20,
        search: "",
        project_id: id as string,
        task_start: 0,
        task_limit: task_limt || 20,
        project_column_id: columnid,
      };
      try {
        // if (!columnId) return "";
        const res = await dispatch(projectTaskTableList(payload));
        const updatedList = res?.payload?.data?.data?.list;

        const columnObject = updatedList.find((item) => item.id == columnid);

        if (!!columnObject) {
          // Update the columnList state with the updated column
          setColumnList((prevColumnList) => {
            // Create a map to track unique tasks by their id
            const taskMap = new Map(
              prevColumnList?.map((task) => [task.id, task])
            );

            // Add new tasks to the map
            columnObject?.tasks.forEach((task) => {
              taskMap.set(task.id, task);
            });

            // Convert the map back to an array
            return Array.from(taskMap.values());
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    useEffect(() => {
      if (projectInfo?.list?.length > 0) {
        listData(20, projectInfo?.list[0]?.id);
        setcolumnId(projectInfo?.list[0]?.id);
      }
    }, [projectInfo?.list]);

    const handleScroll = useCallback(
      debounce(() => {
        if (scrollRef.current) {
          console.log(scrollRef.current, "scrollRef.current");
          const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
          if (scrollTop + clientHeight >= scrollHeight - 50 && !isFetching) {
            // Increased threshold
            setIsFetching(true);
            listData(20, columnId).finally(() => {
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

    return (
      <>
        {props.customSelectedTab && (
          <div>
            <div className="px-28 flex gap-20 flex-wrap lg:flex-nowrap ">
              <div className="basis-full lg:basis-auto lg:grow w-1/2">
                <div className="shadow-md bg-white rounded-lg">
                  {/* <div style={{ overflowX: "auto", whiteSpace: "nowrap" }}> */}
                  <Tabs
                    value={selectedTab}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    className="min-h-0 pb-14 pt-20 px-20 gap-[50px]"
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
                    {projectInfo?.list?.map((item, index) => {
                      return (
                        <Tab
                          label={item.name}
                          {...a11yProps(item.id)}
                          onClick={() => {
                            setColumnList([]);
                            listData(20, item.id);
                            setcolumnId(item.id);
                          }}
                        />
                      );
                    })}
                  </Tabs>
                  {/* </div> */}
                  <div className="px-4">
                    <FilterPage />
                  </div>
                  <div className="px-20  pb-10 flex gap-32 ">
                    <ProjectMenuItems
                      label={"Group By"}
                      icon={<GroupIcon />}
                      className="bg-[#F6F6F6] rounded-md px-10 py-20 text-[#9DA0A6] font-400
                cursor-pointer text-[12px]"
                      setTableSelectedItemDesign={setTableSelectedItemDesign}
                    />
                    <ProjectMenuItems
                      label={"Show/Hide Subtasks"}
                      icon={<SubTaskIcon />}
                      className="bg-[#F6F6F6] rounded-md px-10 py-20 text-[#9DA0A6] font-400
                cursor-pointer text-[12px]"
                    />
                    <ProjectMenuItems
                      label="Show Closed"
                      icon={<ShowIcon />}
                      className="bg-[#F6F6F6] rounded-md px-10 py-20 text-[#9DA0A6] font-400
                cursor-pointer text-[12px]"
                    />
                  </div>
                  <Button
                    variant="text"
                    color="secondary"
                    className="h-[40px] text-[16px] flex gap-8 font-[600] px-20"
                    aria-label="Add Tasks"
                    size="large"
                    onClick={() => {
                      setIsOpenAddModal(true);
                    }}
                  >
                    <PlusIcon color={theme.palette.secondary.main} />
                    Add Task
                  </Button>

                  <CustomTabPanel
                    value={selectedTab}
                    index={0}
                    scrollRef={scrollRef}
                  >
                    <ThemePageTable
                      tableSelectedItemDesign={tableSelectedItemDesign}
                      customSelectedTab={props.customSelectedTab}
                      columnList={columnList}
                      setColumnList={setColumnList}
                      ListData={() => listData(20, columnId)}
                      project_id={id}
                      ColumnId={columnId}
                    />
                  </CustomTabPanel>
                </div>
              </div>
              <div className="basis-full lg:basis-[322px]">
                <RecentData />
              </div>
            </div>
            <AddTaskModal
              isOpen={isOpenAddModal}
              setIsOpen={setIsOpenAddModal}
              project_id={id}
              ColumnId={columnId}
              callListApi={() => listData(20, columnId)}
            />
          </div>
        )}
      </>
    );
  };
}
