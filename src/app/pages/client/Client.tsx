import { useEffect, useState } from "react";
import { Button, InputAdornment, TextField, Theme } from "@mui/material";
import { useTheme } from "@mui/styles";
import { PlusIcon } from "public/assets/icons/dashboardIcons";
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
import { useAppDispatch } from "app/store/store";
import { getClientList } from "app/store/Client";
import { ClientRootState, filterType } from "app/store/Client/Interface";
import { useSelector } from "react-redux";
import FuseLoading from "@fuse/core/FuseLoading";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export default function Clients() {
  const theme: Theme = useTheme();
  const dispatch = useAppDispatch()
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [isOpenDeletedModal, setIsOpenDeletedModal] = useState(false);
  const [filters, setfilters] = useState<filterType>({
    "start": 0,
    "limit": 10,
    "search": ""
  })
  const clientState = useSelector((store: ClientRootState) => store.client)
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
      content: <ClientTable clientState={clientState} />,
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

  useEffect(() => {
    dispatch(getClientList(filters))
  }, [])

  return (
    <>
      <TitleBar title="Clients">
        <div className="flex flex-col items-start gap-20 sm:items-center sm:flex-row">
          {/* <DropdownMenu
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
              <div className="flex w-full border-b-1">
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
            <div className="flex items-center gap-10 p-20 px-20">
              <span>
                <img src={img1} alt=""></img>
              </span>
              <span>Hello</span>
            </div>
          </DropdownMenu>

          <Button
            variant="contained"
            className="h-[40px] text-[16px] flex gap-8 text-[#4F46E5] bg-[#EDEDFC] hover:bg-transparent"
            aria-label="delete"
            size="large"
            onClick={() => setIsOpenDeletedModal(true)}
          >
            Delete
          </Button>{" "} */}
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
