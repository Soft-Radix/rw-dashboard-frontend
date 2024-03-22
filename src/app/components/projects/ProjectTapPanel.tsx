import { Tab, Tabs, Theme } from "@mui/material";
import { useTheme } from "@mui/styles";
import { Box } from "@mui/system";
import { useState } from "react";
import Kanban from "src/app/components/projects/Kanban";
import ProjectTaskTabel from "./ProjectTaskTabel";

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
  const theme: Theme = useTheme();

  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <div>
      <div className="px-28  flex gap-20 flex-wrap lg:flex-nowrap mb-20">
        <div className="basis-full lg:basis-auto lg:grow ">
          <div className="shadow-md bg-white rounded-lg ">
            <Tabs
              value={selectedTab}
              onChange={handleChange}
              aria-label="basic tabs example"
              className="min-h-0 pb-14 pt-20 px-20 gap-[50px]"
              sx={{
                "& .MuiTabs-flexContainer": {
                  gap: "70px",
                },
                "& .MuiTab-root.Mui-selected": {
                  color: theme.palette.secondary.main,
                },
                "& .MuiTabs-indicator": {
                  backgroundColor: theme.palette.secondary.main,
                },
              }}
            >
              <Tab label="Kanban Board" {...a11yProps(0)} />

              <Tab label=" Task Table" {...a11yProps(1)} />

              <Tab label="Task List" {...a11yProps(2)} />
              <Tab label="Calender" {...a11yProps(3)} />
              <Tab label="View" {...a11yProps(4)} />
            </Tabs>
          </div>
        </div>
      </div>
      <CustomTabPanel value={selectedTab} index={0}>
        <Kanban />
      </CustomTabPanel>
      <CustomTabPanel value={selectedTab} index={1}>
        <ProjectTaskTabel />
      </CustomTabPanel>
      <CustomTabPanel value={selectedTab} index={2}></CustomTabPanel>
    </div>
  );
}
