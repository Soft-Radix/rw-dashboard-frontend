import { Button, Tab, Tabs, Theme } from "@mui/material";
import { useTheme } from "@mui/styles";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import Kanban from "src/app/components/projects/Kanban";
import ProjectTaskTabel from "./ProjectTaskTabel";
import {
  CalenderIcon,
  CalenderIconActive,
  ChatIcon,
  ChatIconActive,
  DocIcon,
  DocIconActive,
  KanbanIcon,
  KanbanIconActive,
  TaskListIcon,
  TaskListIconActive,
  TaskTableIcon,
  TaskTableIconActive,
  ViewIcon,
  WhiteBoardIcon,
  WhiteBoardIconActive,
} from "public/assets/icons/projectsIcon";
import ProjectTaskList from "./ProjectTaskList/ProjectTaskList";
import CalenderPage from "./Calender/CalenderPage";
import ViewBoard from "./ViewPopUp/WhiteBoard";
import { useNavigate, useParams } from "react-router";
import WhiteBoard from "./WhiteBoard/WhiteBoard";
import { useSelector } from "react-redux";
import { ProjectRootState } from "app/store/Projects/Interface";
import ChatBoard from "./ChatBoard/ChatBoard";
import DocumentBoard from "./DocumentBoard/DocumentBoard";
import { ROLES } from "src/app/constants/constants";
import {
  getWhiteBoardData,
  projectGetMenu,
  projectUpdateMenu,
} from "app/store/Projects";
import { useAppDispatch } from "app/store/store";

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
  const client_id = JSON.parse(localStorage.getItem("userDetail"));
  const [boardList, setBoardList] = useState({
    whiteBoard: false,
    doc: false,
    chat: false,
  });

  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const updateBoardList = async (data) => {
    const payload = [];
    if (data.whiteBoard) {
      payload.push(3);
    }
    if (data.doc) {
      payload.push(2);
    }
    if (data.chat) {
      payload.push(1);
    }
    try {
      await dispatch(projectUpdateMenu({ project_id: id, menu: payload }));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setBoardList({ ...data });
  };

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
      case "whiteboard":
        return 4;
      case "doc":
        return 5;
      case "chat":
        return 6;
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
      case 4:
        return "whiteboard";
      case 5:
        return "doc";
      case 6:
        return "chat";
      default:
        return "kanban";
    }
  };

  useEffect(() => {
    fetchMenuData();
    const type = params.get("type") || "kanban";
    setSelectedTab(getTabIndexFromType(type));
  }, [location.search, id]);

  const fetchMenuData = async () => {
    try {
      const res = await dispatch(projectGetMenu(id));
      if (res?.payload?.data) {
        if (res.payload.data.data) {
          const data = res.payload.data.data.map((menuData) => menuData.menu);
          // console.log(data);
          setBoardList({
            whiteBoard: data.includes(3),
            doc: data.includes(2),
            chat: data.includes(1),
          });
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    const newType = getTypeFromTabIndex(newValue);
    navigate(`?type=${newType}`);
    setSelectedTab(newValue);
  };

  const showWhiteBoard = () => {
    setShowViewWindow(!showViewWindow);
    // console.log(showViewWindow, "find");
  };
  return (
    <div>
      <div className="px-28  flex gap-20 sm:flex-wrap lg:flex-nowrap mb-20  w-full">
        <div className="basis-full lg:basis-auto lg:grow  w-full">
          <div className="shadow-md bg-white rounded-lg flex items-center gap-[30px] w-full">
            <Tabs
              value={selectedTab}
              onChange={handleChange}
              aria-label="basic tabs example"
              className={`min-h-0 pb-14 pt-20 px-20 gap-[50px] ${client_id?.role_id !== ROLES.AGENT ? "w-[calc(100%-720px)]" : "w-full"} overflow-y-auto`}
              sx={{
                "& .MuiTabs-flexContainer": {
                  gap: "70px",
                  overflowY: "auto",
                  // "@media (max-width: 425px)": {
                  //   gap: "6px", // Change gap to 6px on small screens
                  //   flexWrap: "wrap",
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
                label="Calendar"
                {...a11yProps(selectedTab)}
                iconPosition="start"
                icon={
                  selectedTab == 3 ? <CalenderIconActive /> : <CalenderIcon />
                }
              />

              <Tab
                label="Whiteboard"
                {...a11yProps(selectedTab)}
                iconPosition="start"
                icon={
                  selectedTab == 4 ? (
                    <WhiteBoardIconActive />
                  ) : (
                    <WhiteBoardIcon />
                  )
                }
                className={`${boardList.whiteBoard ? "MuiButtonBase-root MuiTab-root MuiTab-labelIcon MuiTab-textColorPrimary px-4 py-6 min-w-0 min-h-0 text-[1.8rem] font-400 text-[#757982] muiltr-vcwyal-MuiButtonBase-root-MuiTab-root" : "hidden"}`}
              />

              <Tab
                label="Doc"
                {...a11yProps(selectedTab)}
                iconPosition="start"
                icon={selectedTab == 5 ? <DocIconActive /> : <DocIcon />}
                className={`${boardList.doc ? "MuiButtonBase-root MuiTab-root MuiTab-labelIcon MuiTab-textColorPrimary px-4 py-6 min-w-0 min-h-0 text-[1.8rem] font-400 text-[#757982] muiltr-vcwyal-MuiButtonBase-root-MuiTab-root" : "hidden"}`}
              />

              <Tab
                label="Chat"
                {...a11yProps(selectedTab)}
                iconPosition="start"
                icon={selectedTab == 6 ? <ChatIconActive /> : <ChatIcon />}
                className={`${boardList.chat ? "MuiButtonBase-root MuiTab-root MuiTab-labelIcon MuiTab-textColorPrimary px-4 py-6 min-w-0 min-h-0 text-[1.8rem] font-400 text-[#757982] muiltr-vcwyal-MuiButtonBase-root-MuiTab-root" : "hidden"}`}
              />
            </Tabs>
            <span
              className={`border-l-1 ${client_id?.role_id !== ROLES.AGENT ? "" : "hidden"}`}
            >
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
      <CustomTabPanel value={selectedTab} index={4}>
        <WhiteBoard />
      </CustomTabPanel>
      <CustomTabPanel value={selectedTab} index={5}>
        <DocumentBoard />
      </CustomTabPanel>
      <CustomTabPanel value={selectedTab} index={6}>
        <ChatBoard />
      </CustomTabPanel>

      <ViewBoard
        isOpen={showViewWindow}
        setIsOpen={setShowViewWindow}
        boardList={boardList}
        setBoardList={updateBoardList}
      />
    </div>
  );
}
