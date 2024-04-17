import { Button, Box, Grid, Checkbox, Typography, TableCell, Tab, Tabs, TableRow, Theme } from "@mui/material";
import { useTheme } from "@mui/styles";
import { useFormik } from "formik";
import {
  ArrowRightCircleIcon,
  DeleteIcon,
  EditIcon,
} from "public/assets/icons/common";
import { PlusIcon } from "public/assets/icons/dashboardIcons";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import ImagesOverlap from "src/app/components/ImagesOverlap";
import TitleBar from "src/app/components/TitleBar";
import CommonTable from "src/app/components/commonTable";
import CommonPagination from "src/app/components/pagination";
import AddAgentModel from "src/app/components/agents/AddAgentModel";
import { CalenderIcon, CalenderIconActive, KanbanIcon, KanbanIconActive, TaskListIcon, TaskListIconActive, TaskTableIcon, TaskTableIconActive } from "public/assets/icons/projectsIcon";
import { AttachmentIcon } from "public/assets/icons/supportIcons";

const rows = [
  {
    ticket: "1542145611525",
    subject: "Web page design",
    status: "In Progress",
    department: "Account Manager",
    date: "Feb 12,2024",
    assignedImg: ["female-01.jpg", "female-02.jpg", "female-03.jpg"],
  },
  {
    ticket: "1542145611525",
    subject: "Web page design",
    status: "In Review",
    department: "Account Manager",
    date: "Feb 12,2024",
    assignedImg: ["female-01.jpg", "female-02.jpg", "female-03.jpg"],
  },
  {
    ticket: "1542145611525",
    subject: "Web page design",
    status: "Completed",
    department: "Account Manager",
    date: "Feb 12,2024",
    assignedImg: ["female-01.jpg", "female-02.jpg", "female-03.jpg"],
  },
  {
    ticket: "1542145611525",
    subject: "Web page design",
    status: "In Progress",
    department: "Account Manager",
    date: "Feb 12,2024",
    assignedImg: ["female-01.jpg", "female-02.jpg", "female-03.jpg"],
  },
  {
    ticket: "1542145611525",
    subject: "Web page design",
    status: "In Review",
    department: "Account Manager",
    date: "Feb 12,2024",
    assignedImg: ["female-01.jpg", "female-02.jpg", "female-03.jpg"],
  },
  {
    ticket: "1542145611525",
    subject: "Web page design",
    status: "Completed",
    department: "Account Manager",
    date: "Feb 12,2024",
    assignedImg: ["female-01.jpg", "female-02.jpg", "female-03.jpg"],
  },
  {
    ticket: "1542145611525",
    subject: "Web page design",
    status: "In Progress",
    department: "Account Manager",
    date: "Feb 12,2024",
    assignedImg: ["female-01.jpg", "female-02.jpg", "female-03.jpg"],
  },
  {
    ticket: "1542145611525",
    subject: "Web page design",
    status: "In Review",
    department: "Account Manager",
    date: "Feb 12,2024",
    assignedImg: ["female-01.jpg", "female-02.jpg", "female-03.jpg"],
  },
  {
    ticket: "1542145611525",
    subject: "Web page design",
    status: "Completed",
    department: "Account Manager",
    date: "Feb 12,2024",
    assignedImg: ["female-01.jpg", "female-02.jpg", "female-03.jpg"],
  },
];

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
      style={{ padding: 0 }}
    >
      {value === index && (
        <Box sx={{ paddingTop: 4 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function ClientDetail() {
  const theme: Theme = useTheme();
  const formik = useFormik({
    initialValues: {
      role: "",
      verification: "",
    },
    // validationSchema: validationSchemaProperty,
    onSubmit: (values) => { },
  });

  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>

      <TitleBar title="Clients">
        <Button
          variant="outlined"
          color="secondary"
          className="h-[40px] text-[16px] flex gap-8 font-[600]"
          aria-label="Add Tasks"
          size="large"
          onClick={() => setIsOpenAddModal(true)}
        >
          <PlusIcon color={theme.palette.secondary.main} />
          Add Agent
        </Button>
      </TitleBar>

      <div className="px-28 mb-[3rem]">
        <div className="bg-white rounded-lg shadow-sm p-[2rem]">
          <Box sx={{ width: '100%', padding: 0 }}>
            <>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"
                indicatorColor="secondary"
              >
                <Tab label="Profile" {...a11yProps(0)}
                  sx={{
                    fontSize: '18px',
                    "&.Mui-selected": { // Select the selected tab label
                      color: "#4F46E5", // Change the color here
                    },
                  }}
                />
                <Tab
                  sx={{
                    fontSize: '18px',
                    "&.Mui-selected": { // Select the selected tab label
                      color: "#4F46E5", // Change the color here
                    }
                  }}
                  label="Assigned agents" {...a11yProps(1)} />
                <Tab sx={{
                  fontSize: '18px',
                  "&.Mui-selected": { // Select the selected tab label
                    color: "#4F46E5", // Change the color here
                  }
                }} label="Assigned account manager" {...a11yProps(2)} />
                <Tab sx={{
                  fontSize: '18px',
                  "&.Mui-selected": { // Select the selected tab label
                    color: "#4F46E5", // Change the color here
                  }
                }} label="Subscriptions" {...a11yProps(3)} />
              </Tabs>
            </>
            <CustomTabPanel value={value} index={0}>
              <Grid container className="p-0">
                <Grid item xs={12} sm={12} md={12} className="p-0">
                  <div className="flex flex-col gap-10 bg-[#FFFFFF] h-auto md:h-[calc(100vh-164px)] sm:h-auto  rounded-12 ">
                    <div className="border border-[#E7E8E9] rounded-lg flex  justify-left gap-[30px] items-start p-[2rem] flex-col sm:flex-row">
                      <div className="h-[100px] w-[100px] sm:h-[100px] sm:w-[126px] rounded-full overflow-hidden">
                        <img
                          src="/assets/images/avatars/male-01.jpg"
                          alt=""
                          className="h-[100px] w-[100px] rounded-full"
                        />
                      </div>
                      <div className="pt-20">
                        <div className="flex items-center gap-40 mb-10">
                          <span className="text-[24px] text-[#111827] font-semibold inline-block">
                            Alexandra
                          </span>
                          <Button
                            variant="outlined"
                            className="h-20 rounded-3xl  text-[#FF5F15] bg-[#ffe2d5] border-none sm:min-h-24 leading-none"
                          >
                            In Progress
                          </Button>
                        </div>
                        <div className="flex text-[2rem] text-para_light ">
                          <div className="flex">
                            <img src="../assets/icons/ic_outline-email.svg" className="mr-4" />
                            <span >
                              info456@gmail.com
                            </span>
                          </div>
                          <div className="flex items-center px-20">
                            <span><img src="../assets/icons/ph_phone.svg" className="mr-4" /> </span>
                            <span>+1 2513652150</span>
                          </div>
                        </div>

                        <div className="flex items-baseline justify-between w-full py-20 gap-31">
                          <div className="flex flex-col pr-10 gap-7 ">
                            <span className="text-[1.8rem] text-title font-500 w-max">Status</span>
                            <span className=" text-[#757982]  text-[1.8rem] font-400 mb-5 flex " >
                              <img src="../assets/icons/circle.svg" className="mr-4" />
                              Active
                            </span>
                          </div>
                          <div className="flex flex-col items-start w-8/12 gap-7">
                            <span className="text-[1.8rem] text-title font-500">Company Name</span>
                            <span className=" text-[#757982]  text-[1.8rem] font-400 mb-5 flex " >
                              <img src="../assets/icons/tech.svg" className="mr-4" />
                              Tech 23.com
                            </span>
                          </div>

                        </div>
                        <div className="flex items-baseline justify-between w-full pt-0 pb-20 gap-31">
                          <div className="flex flex-col pr-10 gap-7 ">
                            <span className="text-[1.8rem] text-title font-500 w-max">Address</span>
                            <span className=" text-[#757982]  text-[1.8rem] font-400 mb-5 flex " >
                              <img src="../assets/icons/loaction.svg" className="mr-4" />
                              Akshya Nagar 1st Block 1st Cross, Rammurthy, Bangalore-560016
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Grid>

                <Grid item lg={12} className="basis-full">

                  <div className="flex items-center justify-between gap-10 p-24 rounded-lg shadow-md bg-secondary_bg">
                    <div>
                      <Typography
                        component="h4"
                        className="mb-8 text-2xl text-title font-600"
                      >
                        Change Password
                      </Typography>
                      <p className="text-para_light">
                        <div><img src="../assets/icons/lock.svg" /></div> For security purposes, if you wish to change your password, please click here to change.
                      </p>
                    </div>
                    <div className="shrink-0 w-[5rem] aspect-square flex items-center justify-center border rounded-lg border-borderColor">
                      <ArrowRightCircleIcon />
                    </div>
                  </div>

                </Grid>
              </Grid >
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              Item Two
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              Item Three
            </CustomTabPanel>
          </Box>
          <div className="h-24" />
        </div>
      </div>
      <AddAgentModel isOpen={isOpenAddModal} setIsOpen={setIsOpenAddModal} />

    </>
  );
}
