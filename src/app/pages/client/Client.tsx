import { Button, Tab, Tabs, Theme } from "@mui/material";
import { useTheme } from "@mui/styles";
import { PlusIcon } from "public/assets/icons/dashboardIcons";
import { useState } from "react";
import TitleBar from "src/app/components/TitleBar";
import ClientTabButton from "src/app/components/client/ClientTabButton";
import AddTaskModal from "src/app/components/tasks/AddTask";
import RecentData from "src/app/components/tasks/RecentData";
import ThemePageTable from "src/app/components/tasks/TaskPageTable";

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

function a11yProps(index: number) {
  return {
    className:
      "px-4 py-6 min-w-0 min-h-0 text-[1.8rem] font-400 text-[#757982]",
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Clients() {
  const theme: Theme = useTheme();

  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <div>
      <TitleBar title="Clients">
        {" "}
        <Button
          variant="outlined"
          color="secondary"
          className="h-[40px] text-[16px] flex gap-8"
          aria-label="Clients"
          size="large"
          onClick={() => setIsOpenAddModal(true)}
        >
          <PlusIcon color={theme.palette.secondary.main} />
          Add Client
        </Button>
      </TitleBar>

      <div className="px-28 flex gap-20 flex-wrap lg:flex-nowrap">
        <div className="basis-full lg:basis-auto lg:grow">
          <div className="shadow-md bg-white rounded-lg">
            <div className="flex items-center justify-between">
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
                <Tab label="All" {...a11yProps(0)} />
                <Tab label="Active" {...a11yProps(1)} />
                <Tab label="Paused" {...a11yProps(2)} />
                <Tab label="Cancelled" {...a11yProps(3)} />
                <Tab label="Past due" {...a11yProps(4)} />
              </Tabs>
              <div>
                <ClientTabButton />
              </div>
            </div>
            <CustomTabPanel value={selectedTab} index={0}>
              <ThemePageTable />
            </CustomTabPanel>
            <CustomTabPanel value={selectedTab} index={1}>
              <ThemePageTable />
            </CustomTabPanel>
            <CustomTabPanel value={selectedTab} index={2}>
              <ThemePageTable />
            </CustomTabPanel>
            <CustomTabPanel value={selectedTab} index={3}>
              <ThemePageTable />
            </CustomTabPanel>
            <CustomTabPanel value={selectedTab} index={4}>
              <ThemePageTable />
            </CustomTabPanel>
          </div>
        </div>
      </div>
      <AddTaskModal isOpen={isOpenAddModal} setIsOpen={setIsOpenAddModal} />
    </div>
  );
}
