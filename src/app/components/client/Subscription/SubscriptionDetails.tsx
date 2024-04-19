import {
  Button,
  Box,
  Grid,
  Checkbox,
  Typography,
  TableCell,
  Tab,
  Tabs,
  TableRow,
  Theme,
  IconButton,
  AppBar,
} from "@mui/material";
import { useTheme } from "@mui/styles";
import { useFormik } from "formik";
import {
  ArrowRightCircleIcon,
  DeleteIcon,
  EditIcon,
  LastPayment,
} from "public/assets/icons/common";
import { DownArrowIcon, PlusIcon } from "public/assets/icons/dashboardIcons";
import { DownArrowwhite, Timericon } from "public/assets/icons/subscription";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import ImagesOverlap from "src/app/components/ImagesOverlap";
import TitleBar from "src/app/components/TitleBar";
import CommonTable from "src/app/components/commonTable";
import CommonPagination from "src/app/components/pagination";
import AddAgentModel from "src/app/components/agents/AddAgentModel";
import {
  CalenderIcon,
  CalenderIconActive,
  KanbanIcon,
  KanbanIconActive,
  TaskListIcon,
  TaskListIconActive,
  TaskTableIcon,
  TaskTableIconActive,
} from "public/assets/icons/projectsIcon";
import { AttachmentIcon } from "public/assets/icons/supportIcons";
import PaymentSubscriptio from "./PaymentSubscriptio";
import ItemTable from "./ItemTable";
import SubLogTable from "./SubLogTable";
import CancelButtonPage from "./CancelButtonPage";

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
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function SubscriptionDetails() {
  const theme: Theme = useTheme();
  const formik = useFormik({
    initialValues: {
      role: "",
      verification: "",
    },
    // validationSchema: validationSchemaProperty,
    onSubmit: (values) => {},
  });

  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <TitleBar title="Subscriptions Details"></TitleBar>

      <div className="px-28 mb-[3rem]">
        <div className="bg-white rounded-lg shadow-sm py-[2rem]">
          <div className="flex items-center justify-between pb-12 px-20">
            <Typography className="text-[20px] font-600 text-[#0A0F18]">
              Client Information
            </Typography>
            <div className="flex gap-10 flex-col sm:flex-row">
              <CancelButtonPage />
              <Button
                variant="outlined"
                color="secondary"
                className="font-600 text-[16px] px-44"
              >
                Pause
              </Button>
            </div>
          </div>
          <Box sx={{ width: "100%", padding: 2 }}>
            <Grid container className="h-auto p-0 mb-[30px] ">
              <Grid item xs={12} sm={12} md={12} className="p-0  ">
                <div className="flex flex-col  gap-10 bg-[#FFFFFF] h-auto rounded-12 ">
                  <div className="border border-[#E7E8E9] rounded-lg flex  justify-left gap-[30px] items-start p-[2rem] flex-col sm:flex-row relative ">
                    <div className="h-[100px] w-[100px] sm:h-[100px] sm:w-[126px] rounded-full overflow-hidden">
                      <img
                        src="/assets/images/avatars/male-21.jpg"
                        alt=""
                        className="h-[100px] w-[100px] rounded-full"
                      />
                    </div>
                    <div className="pt-20">
                      <div className="flex rounded-full py-[1rem] px-[2rem] text-secondary bg-secondary_bg w-max gap-[20px] text-lg font-600 items-center absolute right-[2rem] top-[2rem]">
                        Edit
                        <EditIcon fill="#4F46E5" />
                      </div>

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
                      <div className="flex text-[2rem] text-para_light flex-col sm:flex-row gap-8 ">
                        <div className="flex items-center pr-20">
                          <span>
                            <Timericon />
                          </span>
                          <span>Feb 21,2024</span>
                        </div>
                        <div className="flex">
                          <img
                            src="../assets/icons/ic_outline-email.svg"
                            className="mr-4"
                          />
                          <span>info456@gmail.com</span>
                        </div>
                        <div className="flex items-center sm:px-20">
                          <span>
                            <img
                              src="../assets/icons/ph_phone.svg"
                              className="mr-4"
                            />{" "}
                          </span>
                          <span>+1 2513652150</span>
                        </div>
                      </div>

                      <div className="flex items-baseline w-full py-20 gap-14 flex-col">
                        <div className="flex flex-col items-start gap-14">
                          <span className="text-[1.8rem] text-title font-500">
                            Company Name
                          </span>
                          <span className=" text-[#757982]  text-[1.8rem] font-400 mb-5 flex ">
                            <img
                              src="../assets/icons/tech.svg"
                              className="mr-4"
                            />
                            Tech 23.com
                          </span>
                        </div>
                        <div className="flex flex-col pr-10 gap-7 ">
                          <div className="flex flex-col items-start gap-14">
                            <span className="text-[1.8rem] text-title font-500">
                              Address
                            </span>
                            <span className=" text-[#757982]  text-[1.8rem] font-400 mb-5 flex ">
                              <img
                                src="../assets/icons/loaction.svg"
                                className="mr-4"
                              />
                              Tech 23.com
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Grid>

              <Grid item lg={12} className="basis-full mt-[30px]"></Grid>
            </Grid>
            <PaymentSubscriptio />
            <Grid container spacing="26px" className="">
              <Grid item lg={6} className="basis-full">
                <Link to="/change-password" className="contents">
                  <div className="flex items-center justify-between gap-10 p-24 rounded-lg bg-bgGrey">
                    <div>
                      <Typography
                        component="h4"
                        className="mb-8 text-2xl text-title font-600"
                      >
                        Last payment amount and date
                      </Typography>
                      <p className="text-para_light">
                        <span className="text-secondary">$230</span>, Feb 23,
                        2024
                      </p>
                    </div>
                    <div className="shrink-0 w-[5rem] aspect-square flex items-center justify-center border rounded-lg border-borderColor">
                      <LastPayment />
                    </div>
                  </div>
                </Link>
              </Grid>
              <Grid item lg={6} className="basis-full">
                <div className="flex items-center justify-between gap-10 p-24 rounded-lg bg-bgGrey ">
                  <div>
                    <Typography
                      component="h4"
                      className="mb-8 text-2xl text-title font-600"
                    >
                      Next payment amount and date
                    </Typography>
                    <p className="text-para_light">
                      <span className="text-secondary">$230</span>, Feb 23, 2024
                    </p>
                  </div>
                  <div className="shrink-0 w-[5rem] aspect-square flex items-center justify-center border rounded-lg border-borderColor">
                    <LastPayment />
                  </div>
                </div>
              </Grid>
            </Grid>
          </Box>
        </div>
      </div>
      <ItemTable />
      <SubLogTable />
      <AddAgentModel isOpen={isOpenAddModal} setIsOpen={setIsOpenAddModal} />
    </>
  );
}
