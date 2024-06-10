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
import { useState } from "react";
import InputField from "src/app/components/InputField";
import ProjectMenuItems from "src/app/components/projects/ProjectMenuItems";
import AddTaskModal from "src/app/components/tasks/AddTask";
import RecentData from "src/app/components/tasks/RecentData";
// import ThemePageTable from "src/app/components/tasks/TaskPageTable";
import FilterPage from "./FilterPage";
import ThemePageTable from "../tasks/TaskPageTable";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
interface ProjectTaskTableProps {
  customSelectedTab: number;
  // Add any other props your component expects here
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

function a11yProps(index: number) {
  return {
    className:
      "px-4 py-6 min-w-0 min-h-0 text-[1.8rem] font-400 text-[#757982]",
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ProjectTaskTabel(props: ProjectTaskTableProps) {
  const theme: Theme = useTheme();

  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [tableSelectedItemDesign, setTableSelectedItemDesign] =
    useState<object>();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <>
      {props.customSelectedTab && (
        <div>
          <div className="px-28 flex gap-20 flex-wrap lg:flex-nowrap">
            <div className="basis-full lg:basis-auto lg:grow">
              <div className="shadow-md bg-white rounded-lg">
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
                >
                  <Tab label="To Do" {...a11yProps(0)} />
                  <Tab label="In Progress" {...a11yProps(1)} />
                  <Tab label="In Review" {...a11yProps(2)} />
                  <Tab label="Completed" {...a11yProps(3)} />
                </Tabs>
                <div className="px-4  mb-20">
                  <FilterPage />
                </div>
                <div className="px-20 pb-28 flex gap-32 ">
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

                <CustomTabPanel value={selectedTab} index={0}>
                  <ThemePageTable
                    tableSelectedItemDesign={tableSelectedItemDesign}
                    customSelectedTab={props.customSelectedTab}
                  />
                </CustomTabPanel>
                <CustomTabPanel value={selectedTab} index={1}>
                  <ThemePageTable customSelectedTab={props.customSelectedTab} />
                </CustomTabPanel>
                <CustomTabPanel value={selectedTab} index={2}>
                  <ThemePageTable customSelectedTab={props.customSelectedTab} />
                </CustomTabPanel>
                <CustomTabPanel value={selectedTab} index={3}>
                  <ThemePageTable customSelectedTab={props.customSelectedTab} />
                </CustomTabPanel>
              </div>
            </div>
            <div className="basis-full lg:basis-[322px]">
              <RecentData />
            </div>
          </div>
          <AddTaskModal isOpen={isOpenAddModal} setIsOpen={setIsOpenAddModal} />
        </div>
      )}
    </>
  );
}
