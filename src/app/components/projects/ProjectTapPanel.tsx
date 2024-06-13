import { Button, Tab, Tabs, Theme } from "@mui/material";
import { useTheme } from "@mui/styles";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import Kanban from "src/app/components/projects/Kanban";
import ProjectTaskTabel from "./ProjectTaskTabel";
import {
  CalenderIcon,
  CalenderIconActive,
  KanbanIcon,
  KanbanIconActive,
  TaskListIcon,
  TaskListIconActive,
  TaskTableIcon,
  TaskTableIconActive,
  ViewIcon,
} from "public/assets/icons/projectsIcon";
import ProjectTaskList from "./ProjectTaskList/ProjectTaskList";
import CalenderPage from "./Calender/CalenderPage";
import WhiteBoard from "./ViewPopUp/WhiteBoard";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { ProjectRootState } from "app/store/Projects/Interface";

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
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return {
    className:
      "px-4 py-6 min-w-0 min-h-0 text-[1.8rem] font-400 text-[#757982]",
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ProjectTabPanel() {
  const [showViewWindow, setShowViewWindow] = useState<boolean>(false);
  const theme: Theme = useTheme();

  const [isOpenAddModal, setIsOpenAddModal] = useState(false);

  // const handleChange = (event: React.SyntheticEvent, newValue: number) => {
  //   setSelectedTab(newValue);
  // };
  const { projectInfo } = useSelector(
    (store: ProjectRootState) => store?.project
  );
  const navigate = useNavigate();

  const getTabIndexFromType = (type) => {
    switch (type) {
      case "kanban":
        return 0;
      case "task-table":
        return 1;
      case "task-list":
        return 2;
      case "calendar":
        return 3;
      default:
        return 0;
    }
  };
  const params = new URLSearchParams(location.search);
  const type = params.get("type") || "kanban";
  const [selectedTab, setSelectedTab] = useState(getTabIndexFromType(type));
  // Helper function to get the type from the tab index
  const getTypeFromTabIndex = (index) => {
    switch (index) {
      case 0:
        return "kanban";
      case 1:
        return `task-table&subtype=${projectInfo?.list[0]?.name}`;
      // return `task-table&subtype=to-do`;
      case 2:
        return "task-list";
      case 3:
        return "calendar";
      default:
        return "kanban";
    }
  };

  useEffect(() => {
    setSelectedTab(getTabIndexFromType(type));
  }, [location.search]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    const newType = getTypeFromTabIndex(newValue);
    navigate(`?type=${newType}`);
    setSelectedTab(newValue);
  };

  const showWhiteBoard = () => {
    setShowViewWindow(!showViewWindow);
    console.log(showViewWindow, "find");
  };
  return (
    <div>
      <div className="px-28  flex gap-20 sm:flex-wrap lg:flex-nowrap mb-20">
        <div className="basis-full lg:basis-auto lg:grow  ">
          <div className="shadow-md bg-white rounded-lg flex items-center gap-[30px]   ">
            <Tabs
              value={selectedTab}
              onChange={handleChange}
              aria-label="basic tabs example"
              className="min-h-0 pb-14 pt-20 px-20 gap-[50px]"
              sx={{
                "& .MuiTabs-flexContainer": {
                  gap: "70px",
                  // "@media (max-width: 425px)": {
                  //   gap: "6px", // Change gap to 6px on small screens
                  //   flexWrap: "wrap",
                  // },
                },

                "& .MuiTab-root.Mui-selected": {
                  color: theme.palette.secondary.main,
                },
                "& .MuiTabs-indicator": {
                  backgroundColor: theme.palette.secondary.main,
                  // "@media (max-width: 425px)": {
                  //   visibility: "hidden",
                  // },
                },
              }}
            >
              <Tab
                label="Kanban Board"
                {...a11yProps(selectedTab)}
                iconPosition="start"
                // icon={<KanbanIcon />}
                icon={selectedTab === 0 ? <KanbanIconActive /> : <KanbanIcon />}
              />

              <Tab
                label=" Task Table"
                {...a11yProps(selectedTab)}
                iconPosition="start"
                icon={
                  selectedTab === 1 ? (
                    <TaskTableIconActive />
                  ) : (
                    <TaskTableIcon />
                  )
                }
              />

              <Tab
                label="Task List"
                {...a11yProps(selectedTab)}
                iconPosition="start"
                icon={
                  selectedTab == 2 ? <TaskListIconActive /> : <TaskListIcon />
                }
              />
              <Tab
                label="Calender"
                {...a11yProps(selectedTab)}
                iconPosition="start"
                icon={
                  selectedTab == 3 ? <CalenderIconActive /> : <CalenderIcon />
                }
              />
            </Tabs>
            {/* <Tab
              label="View"
              {...a11yProps(4)}
              iconPosition="start"
              icon={<ViewIcon />}
              onClick={showWhiteBoard}
            /> */}
            <span className="border-l-1">
              <Button
                onClick={showWhiteBoard}
                startIcon={<ViewIcon />}
                className="pl-40  text-[18px] text-[#757982] rounded-none  "
              >
                View
              </Button>
            </span>
          </div>
        </div>
      </div>
      <CustomTabPanel value={selectedTab} index={0}>
        <Kanban />
      </CustomTabPanel>
      <CustomTabPanel value={selectedTab} index={1}>
        <ProjectTaskTabel customSelectedTab={selectedTab} />
      </CustomTabPanel>
      <CustomTabPanel value={selectedTab} index={2}>
        <ProjectTaskList customSelectedTab={selectedTab} />
      </CustomTabPanel>
      <CustomTabPanel value={selectedTab} index={3}>
        <CalenderPage />
      </CustomTabPanel>

      <WhiteBoard isOpen={showViewWindow} setIsOpen={setShowViewWindow} />
    </div>
  );
}
