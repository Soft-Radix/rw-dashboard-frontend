import { Button, InputAdornment, TextField, Theme } from "@mui/material";
import { useTheme } from "@mui/styles";
import { PlusIcon } from "public/assets/icons/dashboardIcons";
import { useState } from "react";
import TitleBar from "src/app/components/TitleBar";
import CommonTab from "../../components/CommonTab";

import { SearchIcon } from "public/assets/icons/topBarIcons";
import DropdownMenu from "src/app/components/Dropdown";
import AddClient from "src/app/components/client/AddClient";
import DeleteClient from "src/app/components/client/DeleteClient";
import img1 from "../../../../public/assets/images/pages/admin/accImg.png";
import AssignedAgents from "src/app/components/client/components/AssignedAgents";
import CustomButton from "src/app/components/custom_button";
import ClientTable from "src/app/components/client/ClientTable";
import ClientTabButton from "src/app/components/client/ClientTabButton";
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
  const [isOpenDeletedModal, setIsOpenDeletedModal] = useState(false);

  const [selectedTab, setSelectedTab] = useState(0);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };
  const handleButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const tabs = [
    {
      id: "all",
      label: "All",
      content: <ClientTable />,
      actionBtn: ClientTabButton,
    },
    {
      id: "active",
      label: "Active",
      content: <AssignedAgents />,
      actionBtn: () => null,
    },
    {
      id: "passed",
      label: "Passed",
      content: <AssignedAgents />,
      actionBtn: () => null,
    },
    {
      id: "cancel",
      label: "Cancelled",
      content: <AssignedAgents />,
      actionBtn: () => null,
    },
    {
      id: "pastDue",
      label: "Past Due",
      content: <AssignedAgents />,
      actionBtn: () => null,
    },
  ];

  return (
    <>
      <TitleBar title="Clients">
        <div className="flex sm:items-center flex-col sm:flex-row items-start gap-20">
          <div>
            <DropdownMenu
              marginTop={"mt-20"}
              button={
                <div
                  className="relative flex items-center"
                  onClick={handleButtonClick}
                >
                  <Button
                    variant="contained"
                    className="h-[40px] sm:text-[16px] text-secondary flex gap-8 bg-[#EDEDFC] leading-none hover:bg-[#EDEDFC]"
                    aria-label="Manage Sections"
                    size="large"
                    style={{
                      border: anchorEl ? "1px #4F46E5 solid" : "none",
                    }}
                  >
                    Assign to account manager
                  </Button>
                </div>
              }
              anchorEl={anchorEl}
              handleClose={handleClose}
            >
              <div className="w-[375px]">
                <div className="w-full border-b-1 flex">
                  <TextField
                    hiddenLabel
                    id="filled-hidden-label-small"
                    defaultValue=""
                    variant="standard"
                    sx={{
                      pl: 2,
                      pr: 2,
                      pt: 1,
                      width: "43ch",
                      "& .MuiInputBase-input": {
                        textDecoration: "none", // Example: Remove text decoration (not typically used for input)
                        border: "none", // Hide the border of the input element
                      },
                      "& .MuiInput-underline:before": {
                        borderBottom: "none !important", // Hide the underline (if using underline variant)
                      },
                      "& .MuiInput-underline:after": {
                        borderBottom: "none !important", // Hide the underline (if using underline variant)
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
              </div>
              <div className="flex items-center gap-10 px-20 p-20">
                <span>
                  <img src={img1} alt=""></img>
                </span>
                <span>Hello</span>
              </div>
            </DropdownMenu>
          </div>
          <Button
            variant="contained"
            className="h-[40px] text-[16px] flex gap-8 text-[#4F46E5] bg-[#EDEDFC] hover:bg-transparent"
            aria-label="delete"
            size="large"
            onClick={() => setIsOpenDeletedModal(true)}
          >
            Delete
          </Button>{" "}
          <Button
            variant="outlined"
            color="secondary"
            className="h-[40px] text-[16px] flex gap-8 font-600"
            aria-label="Clients"
            size="large"
            onClick={() => setIsOpenAddModal(true)}
          >
            <PlusIcon color={theme.palette.secondary.main} />
            Add Client
          </Button>
        </div>
      </TitleBar>

      <div className="flex flex-wrap gap-20 px-28 lg:flex-nowrap">
        <div className="basis-full lg:basis-auto lg:grow">
          <div className="bg-white rounded-lg shadow-sm pt-[2rem]">
            <CommonTab tabs={tabs} />
            <div className="h-24" />
          </div>
        </div>
      </div>
      <AddClient isOpen={isOpenAddModal} setIsOpen={setIsOpenAddModal} />
      <DeleteClient
        isOpen={isOpenDeletedModal}
        setIsOpen={setIsOpenDeletedModal}
      />
    </>
  );
}
