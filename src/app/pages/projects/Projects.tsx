import { Button, Tab, Tabs, Theme, Typography } from "@mui/material";
import { useTheme } from "@mui/styles";
import { useFormik } from "formik";
// import { KanbanIcon } from "public/assets/icons/projectsIcon.tsx";
import { CalendarIcon } from "@mui/x-date-pickers";
import { PlusIcon } from "public/assets/icons/dashboardIcons";
import {
  KanbanIcon,
  TaskListIcon,
  TaskTableIcon,
  ViewIcon,
} from "public/assets/icons/projectsIcon";
import { SearchIcon } from "public/assets/icons/topBarIcons";
import { useState } from "react";
import InputField from "src/app/components/InputField";
import MainCard from "src/app/components/dashboard/MainCard";
import AddNewTicket from "src/app/components/support/AddNewTicket";
import FilterPage from "./FilterPage";
export default function Projects() {
  const theme: Theme = useTheme();
  const [addCard, setAddCard] = useState(false);
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  // const [color, setcolor] = useState<{ background: string }>({
  //   background: "red",
  // });
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
    console.log(newValue, "value");
  };

  //* initialise useformik hook
  const formik = useFormik({
    initialValues: {
      column_name: "",
    },
    // validationSchema: validationSchemaProperty,
    onSubmit: (values) => {},
  });
  function a11yProps(index: number) {
    return {
      className:
        "px-4 py-6 min-w-0 min-h-0 text-[1.8rem] font-400 text-[#757982] ",
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
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
  // const handleColorChange = () => {
  //   setcolor({ background: "green" });
  // };

  return (
    <div>
      <div className="flex items-center justify-between px-28 py-20 ">
        <Typography className="text-[18px] font-bold sm:text-[20px]  ">
          Project 1
        </Typography>
        <Button
          variant="outlined"
          color="secondary"
          className="h-[40px] text-[16px] flex gap-8"
          aria-label="Add Tasks"
          size="large"
          onClick={() => setIsOpenAddModal(true)}
          startIcon={<PlusIcon color={theme.palette.secondary.main} />}
        >
          Add Task
        </Button>
      </div>
      <div className="pb-20 sm:px-28 ">
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          aria-label="basic tabs example"
          className="min-h-0 py-20 text-[10px] bg-[#ffff] 
  sm:px-20 border-none bg-none sm:overflow-x-auto 
  overflow-x-visible flex flex-col rounded-xl"
          sx={{
            "& .MuiTabs-flexContainer": {
              gap: "50px",
              "@media (max-width: 425px)": {
                gap: "6px",
              },
            },
            "& .MuiTab-root": {
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            },
            "& .MuiTab-wrapper": {
              flexDirection: "row",
            },
            "& .MuiTab-labelIcon": {
              minHeight: "auto",
              paddingTop: 0,
              paddingBottom: 0,
            },
            "& .MuiSvgIcon-root": {
              fill: theme.palette.text.primary, // Default icon color
              transition: "fill 0.3s", // Add transition for smooth color change
            },
            "& .MuiSvgIcon-root.Mui-selected": {
              fill: theme.palette.secondary.main, // Change icon color when selected
            },
            "& .MuiTab-root.Mui-selected": {
              color: theme.palette.secondary.main, // Change text color when selected
            },
            "& .MuiTabs-indicator": {
              backgroundColor: theme.palette.secondary.main, // Change indicator color when selected
            },
          }}
        >
          <Tab
            label="Kanban Board"
            icon={<KanbanIcon />}
            {...a11yProps(0)}
            iconPosition="start"
          />
          <Tab
            label="Task Table"
            icon={<TaskTableIcon />}
            {...a11yProps(1)}
            iconPosition="start"
          />
          <Tab
            label="Task List"
            icon={<TaskListIcon />}
            {...a11yProps(2)}
            iconPosition="start"
          />
          <Tab
            label="Calendar"
            icon={<CalendarIcon />}
            {...a11yProps(3)}
            iconPosition="start"
          />
          <Tab
            label="View"
            icon={<ViewIcon />}
            {...a11yProps(4)}
            iconPosition="start"
          />
        </Tabs>
      </div>
      <div className=" px-28 mb-20  ">
        <div className="relative bg-[#ffff] py-10 px-10 flex items-center justify-between rounded-xl">
          <div className="pl-10 w-full">
            <InputField
              name="search"
              placeholder="Search Board"
              className="hello "
              inputProps={{
                className: "ps-[4rem] w-[227px]",
              }}
            />
            <SearchIcon
              width={18}
              height={18}
              className="absolute left-32 top-[50%] translate-y-[-50%] text-para_light"
            />
          </div>
          <div className="w-full flex items-center justify-end gap-40 cursor-pointer">
            <FilterPage />
          </div>
        </div>
      </div>
      <div className="flex gap-20 overflow-x-auto px-28 pb-28 items-start">
        <MainCard title="To Do" />
        <MainCard title="In Progress" />
        <MainCard title="In Review" />
        <MainCard title="Completed" />
        <MainCard title="Pending" isEmpty />
        <div className="min-w-[322px] bg-white p-14 py-[20px] rounded-lg shadow-md">
          {!addCard && (
            <div
              className="flex gap-10 items-center cursor-pointer w-fit"
              onClick={() => setAddCard(!addCard)}
            >
              <PlusIcon color={theme.palette.secondary.main} />
              <Typography
                className="text-[16px] font-semibold"
                color="secondary.main"
              >
                Create New Column
              </Typography>
            </div>
          )}
          {addCard && (
            <div>
              <InputField
                formik={formik}
                name="column_name"
                label="Column Name"
                placeholder="Enter Column Name"
              />
              <div className="mt-20">
                <Button
                  variant="contained"
                  color="secondary"
                  className="w-[95px] text-[12px]"
                  size="small"
                >
                  Save
                </Button>{" "}
                <Button
                  variant="outlined"
                  color="secondary"
                  className="w-[95px] text-[12px] ml-5"
                  size="small"
                  onClick={() => setAddCard(!addCard)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <AddNewTicket isOpen={isOpenAddModal} setIsOpen={setIsOpenAddModal} />
    </div>
  );
}
