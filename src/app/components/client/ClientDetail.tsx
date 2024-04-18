import { Button, Box, Grid, Checkbox, Typography, TableCell, Tab, Tabs, TableRow, Theme, IconButton } from "@mui/material";
import { useTheme } from "@mui/styles";
import { useFormik } from "formik";
import {
  ArrowRightCircleIcon,
  DeleteIcon,
  EditIcon,
  LastPayment,
} from "public/assets/icons/common";
import { PlusIcon } from "public/assets/icons/dashboardIcons";
import { useState } from "react";
import { NavigateFunction, useLocation, Location, useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import ImagesOverlap from "src/app/components/ImagesOverlap";
import TitleBar from "src/app/components/TitleBar";
import AddAgentModel from "src/app/components/agents/AddAgentModel";
import EditProfile from "../profile/EditProfile";
import ChangePassword from "../profile/ChangePassword";
import CommonTab from "../../components/CommonTab";
import Profile from "./components/Profile";
import AssignedAgents from "./components/AssignedAgents";
import DropdownMenu from "../../../app/components/Dropdown";
import { DownArrowIconWhite } from 'public/assets/icons/dashboardIcons';
import InputField from "../InputField";
import AssignedAccountManager from "./components/AssignedAccountManager";
import SubscriptionList from "./components/SubscriptionList";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
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

  const [isOpenAddModal, setIsOpenAddModal] = useState<boolean>(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false);
  const [isOpenChangePassModal, setIsOpenChangePassModal] = useState<boolean>(false);
  const location: Location = useLocation();
  const navigate: NavigateFunction = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  // Get a specific query parameter
  const paramValue = queryParams.get('type');
  //custom dropdown
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [anchorEl1, setAnchorEl1] = useState<HTMLElement | null>(null);

  const handleClose = () => {
    setAnchorEl(null);
    setAnchorEl1(null);
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const CustomDropDown = (): JSX.Element => {
    return <>
      <DropdownMenu
        marginTop={'mt-20'}
        button={
          <div
            className="relative flex items-center"
            onClick={handleButtonClick}
          >
            <Button
              variant="outlined"
              className="h-[40px] sm:text-[16px] flex gap-8  text-white leading-none bg-secondary hover:bg-secondary"
              aria-label="Manage Sections"
              size="large"
              endIcon={<DownArrowIconWhite className="cursor-pointer" />}
            >
              Assigned
            </Button>
          </div>
        }
        anchorEl={anchorEl}
        handleClose={handleClose}
      >
        <div className="w-[375px] p-20">
          <p className="text-title font-600 text-[1.6rem]">
            Agent Name
          </p>

          <div className="relative w-full mt-10 mb-3 sm:mb-0 ">
            <InputField
              name={'agent'}
              placeholder={'Enter Agent Name'}
              className="common-inputField "
              inputProps={{
                className: "ps-[2rem] w-full sm:w-full",
              }}
            />
          </div>
          <div className="flex pt-10">
            <Button
              variant="contained"
              color="secondary"
              className="w-[156px] h-[48px] text-[18px]"
            >
              Assign
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              className="w-[156px] h-[48px] text-[18px] ml-14"
              onClick={handleClose}
            >
              Cancel
            </Button>
          </div>
        </div>
      </DropdownMenu>
    </>
  }

  const tabs = [
    {
      id: 'profile',
      label: 'Profile',
      content: <Profile
        setIsOpenEditModal={setIsOpenEditModal}
        setIsOpenChangePassModal={setIsOpenChangePassModal}
      />,
      actionBtn: () => null
    },
    {
      id: 'assigned-agents',
      label: 'Assigned agents',
      content: <AssignedAgents />,
      actionBtn: CustomDropDown
    },
    {
      id: 'assigned-account',
      label: 'Assigned account manager',
      content: <AssignedAccountManager />,
      actionBtn: CustomDropDown
    },
    {
      id: 'subscription',
      label: 'Subscriptions',
      content: <SubscriptionList />,
      actionBtn: () => null
    },
  ];

  return (
    <>
      <TitleBar title="Clients" minHeight="min-h-[80px]">
        {
          paramValue == 'subscription' &&
          <Button
            variant="outlined"
            color="secondary"
            className="h-[40px] text-[16px] flex gap-8 font-[600]"
            aria-label="Add Tasks"
            size="large"
            onClick={() => {
              navigate('/admin/client/add-subscription')

            }}
          >
            <PlusIcon color={theme.palette.secondary.main} />
            Add Subscription
          </Button>
        }
      </TitleBar>
      <div className="px-28 mb-[3rem]">
        <div className="bg-white rounded-lg shadow-sm py-[2rem]">
          <CommonTab tabs={tabs} />
          <div className="h-24" />
        </div>
      </div >

      <AddAgentModel isOpen={isOpenAddModal} setIsOpen={setIsOpenAddModal} />
      <EditProfile
        isOpen={isOpenEditModal}
        setIsOpen={setIsOpenEditModal}
      />
      <ChangePassword
        isOpen={isOpenChangePassModal}
        setIsOpen={setIsOpenChangePassModal}
      />
    </>
  );
}
