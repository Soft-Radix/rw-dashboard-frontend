import { Button, Tab, Tabs, Theme } from "@mui/material";
import { useTheme } from "@mui/styles";
import { PlusIcon } from "public/assets/icons/dashboardIcons";
import { useState } from "react";
import TitleBar from "src/app/components/TitleBar";
import ClientTabButton from "src/app/components/client/ClientTabButton";
import ClientTable from "src/app/components/client/ClientTable";
import ThemePageTable from "src/app/components/tasks/TaskPageTable";

import MenuItem from "@mui/material/MenuItem";
import { SearchIcon } from "public/assets/icons/topBarIcons";
import DropdownMenu from "src/app/components/Dropdown";
import InputField from "src/app/components/InputField";
import AddClient from "src/app/components/client/AddClient";
import DeleteClient from "src/app/components/client/DeleteClient";
import SearchInput from "src/app/components/SearchInput";
import img1 from "../../../../public/assets/images/pages/admin/accImg.png";
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
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuItemClick = (value: string) => {
    setSelectedValue(value);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const showList = () => {
    alert("hii");
  };

  return (
    <div>
      <TitleBar title="Clients">
        <div className="flex items-center gap-20">
          <div>
            <DropdownMenu
              button={
                <div
                  className="flex items-center relative"
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
              <div className="mt-20 px-20">
                <SearchInput placeholder="Search" name="name" />
              </div>
              <div className="flex items-center gap-10 px-2 pb-20">
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
          <div className="bg-white rounded-lg shadow-md">
            <div className="flex items-center justify-between ">
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

              <ClientTabButton />
            </div>
            <CustomTabPanel value={selectedTab} index={0}>
              <ClientTable />
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
      <AddClient isOpen={isOpenAddModal} setIsOpen={setIsOpenAddModal} />
      <DeleteClient
        isOpen={isOpenDeletedModal}
        setIsOpen={setIsOpenDeletedModal}
      />
    </div>
  );
}
