import {
  Button,
  Grid,
  Menu,
  MenuItem,
  Switch,
  TableCell,
  TableRow,
  Theme,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/styles";
import {
  ArrowRightCircleIcon,
  DownGreenIcon,
  EditIcon,
} from "public/assets/icons/common";
import { useEffect, useState } from "react";
import TitleBar from "../TitleBar";
import CommonTable from "../commonTable";
import AddAccountManagerModel from "./AddAccountmanagerModal";
import { useParams } from "react-router-dom";
import {
  changeFetchStatus,
  getAccManagerInfo,
  resetFormManagrData,
} from "app/store/AccountManager";
import { RootState, useAppDispatch } from "app/store/store";
import { useSelector } from "react-redux";
import { AccManagerRootState } from "app/store/AccountManager/Interface";
import ListLoading from "@fuse/core/ListLoading";
import moment from "moment";
import Tooltip from "@mui/material/Tooltip";
import { UpdateStatus } from "app/store/Client";
import toast from "react-hot-toast";
import { resetPassword } from "app/store/Client";
import ChangePassword from "../profile/ChangePassword";
import { twoFactorAuthentication } from "app/store/Auth";

// interface svgColor {
//   color: string;
// }
const ManagerProfile = () => {
  const { accountManager_id } = useParams();
  // console.log(accountManager_id, "opop");
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState(0); //switch button
  const [checked, setChecked] = useState(false);
  const { accManagerDetail, fetchStatus } = useSelector(
    (store: AccManagerRootState) => store?.accManagerSlice
  );
  const { role } = useSelector((store: any) => store?.user);

  const [anchorEl, setAnchorEl] = useState(null); // State to manage anchor element for menu
  const [selectedItem, setSelectedItem] = useState("Active");
  // Open menu handler
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget); // Set anchor element to the clicked button
  };

  // Close menu handler
  const handleClose = () => {
    setAnchorEl(null); // Reset anchor element to hide the menu
  };

  // Menu item click handler
  const handleMenuItemClick = async (status) => {
    setSelectedItem(status);
    const res = await dispatch(
      UpdateStatus({
        user_id: accountManager_id,
        status: status == "InActive" ? 2 : 1,
      })
    );
    // setList(res?.payload?.data?.data?.list);
    toast.success(res?.payload?.data?.message);
    handleClose(); // Close the menu after handling the click
  };
  const [isOpenAddModal, setIsOpenAddModal] = useState<boolean>(false);
  const [isOpenChangePassModal, setIsOpenChangePassModal] = useState<boolean>(
    false
  );
  // const [isEditing, setIsEditing] = useState<boolean>(true);
  const theme: Theme = useTheme();

  useEffect(() => {
    if (!accountManager_id) return null;
    dispatch(getAccManagerInfo({ account_manager_id: accountManager_id }));

    return () => {
      dispatch(changeFetchStatus());
      dispatch(resetFormManagrData());
    };
  }, []);
  useEffect(() => {
    setSelectedItem(accManagerDetail?.status);
    if (accManagerDetail.two_factor_authentication) {
      setChecked(true);
    }
  }, [accManagerDetail]);

  if (fetchStatus === "loading") {
    return <ListLoading />;
  }
  const urlForImage = import.meta.env.VITE_API_BASE_IMAGE_URL;
  // const handleResetPassword = async () => {
  //   await dispatch(resetPassword({ client_id: client_id }));
  // };
  const handleResetPassword = async () => {
    await dispatch(resetPassword({ client_id: accountManager_id }));
  };
  const handleTwoFactor = async () => {
    const newStatus = status === 0 ? 1 : 0;
    setStatus(newStatus);
    await dispatch(
      twoFactorAuthentication({ user_id: accountManager_id, status: newStatus })
    );
  };
  const handleChange = (event) => {
    setChecked(event.target.checked);
    console.log(
      event.target.checked ? "Switch is enabled" : "Switch is disabled"
    );
  };
  return (
    <>
      <div className="px-16">
        <TitleBar title="Account Manager’s Profile"> </TitleBar>
      </div>
      <div className="px-40 xs:px-10">
        {/* <Grid container spacing={3} className="sm:px-10 xs:px-10 bg-red-200"> */}
        <Grid item xs={12} sm={12} md={9} className="px-20">
          {/* <div className="flex flex-col gap-10 p-20 bg-[#FFFFFF] h-auto md:h-[calc(100vh-164px)] sm:h-auto  rounded-12 xs:px-20 "> */}
          <div className="flex flex-col gap-10 p-20 bg-[#FFFFFF] h-auto sm:h-auto  rounded-12 xs:px-20 ">
            <div className="border border-[#E7E8E9] rounded-lg flex justify-between gap-[10px] items-start p-[3rem] flex-col sm:flex-row">
              <div className="flex gap-40 flex-col sm:flex-row ">
                <div className="h-[100px] w-[100px] sm:h-[100px] sm:w-[99px] rounded-full overflow-hidden ">
                  <img
                    src={
                      accManagerDetail?.user_image
                        ? urlForImage + accManagerDetail.user_image
                        : "../assets/images/logo/images.jpeg"
                    }
                  ></img>
                  // <img src="../assets/images/pages/agent/luis_.jpg" />
                </div>
                <div className="pt-[20px] pr-10">
                  <div className="flex items-center sm:gap-[7rem] gap-[1rem] mb-10">
                    <span className="text-[24px] text-[#111827] font-semibold inline-block">
                      {accManagerDetail?.first_name +
                        " " +
                        accManagerDetail?.last_name}
                      {/* Bernadette Jone */}
                    </span>
                    <Button
                      variant="outlined"
                      className={`h-20 rounded-3xl border-none sm:min-h-24 leading-none ${
                        selectedItem === "Active"
                          ? "text-[#4CAF50] bg-[#4CAF502E]" // Green for 'Active'
                          : "text-[#F44336] bg-[#F443362E]"
                      }`}
                      endIcon={
                        <DownGreenIcon
                          color={
                            selectedItem === "Active" ? "#4CAF50" : "#F44336"
                          }
                        />
                      }
                      onClick={handleClick}
                    >
                      {/* {agentDetail?.status || "N/A"} */}
                      {selectedItem}
                    </Button>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleClose} // Close the menu when clicking outside or selecting an item
                    >
                      {/* Define menu items */}
                      <MenuItem onClick={() => handleMenuItemClick("Active")}>
                        Active
                      </MenuItem>
                      <MenuItem onClick={() => handleMenuItemClick("InActive")}>
                        Inactive
                      </MenuItem>
                    </Menu>
                  </div>
                  <div className="flex text-[2rem] text-para_light flex-col sm:flex-row gap-[20px]">
                    <div className="flex">
                      <img src="../assets/icons/group.svg" className="mr-4" />

                      <span>{accManagerDetail?.id || "N/A"}</span>
                    </div>
                    <div className="flex sm:px-20">
                      <span className="flex">
                        <img
                          src="../assets/icons/ri_time-line.svg"
                          className="sm:mr-4"
                        />{" "}
                        <span>
                          {accManagerDetail?.created_at
                            ? moment(accManagerDetail.created_at).format(
                                "MMMM Do, YYYY"
                              )
                            : "N/A"}
                        </span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-baseline justify-start w-full py-20 gap-28 flex-col sm:flex-row overflow-hidden">
                    <div className="flex pr-10 gap-32 sm:flex-row flex-col">
                      <div className="grid gap-5">
                        <span className="text-[#111827] text-[18px] font-500 w-max">
                          Email Address
                        </span>
                        <div className="grid grid-cols-[auto,1fr] items-center">
                          <img
                            src="../assets/icons/ic_outline-email.svg"
                            className="mr-4"
                          />
                          <Tooltip title={accManagerDetail?.email || "N/A"}>
                            <p className="text-para_light text-[20px] truncate max-w-xs">
                              {accManagerDetail?.email || "N/A"}
                            </p>
                          </Tooltip>
                        </div>
                      </div>
                      {/* <div className="flex pr-10 gap-32 "> */}
                      <div className="flex flex-col gap-5">
                        <span className="text-[#111827] text-[18px] font-500">
                          Phone Number
                        </span>
                        <div className="flex items-center ">
                          <span>
                            <img
                              src="../assets/icons/ph_phone.svg"
                              className="mr-4"
                            />{" "}
                          </span>
                          <span className="text-para_light text-[20px] ">
                            {/* {clientDetail?.country_code}{" "}*/}
                            {accManagerDetail?.phone_number || "N/A"}
                          </span>
                        </div>
                      </div>
                      {/* </div> */}
                    </div>
                  </div>
                  <div className="flex items-baseline justify-between w-full pt-0 pb-20 gap-31 ">
                    <div className="grid pr-10 gap-7">
                      <span className="text-[1.8rem] text-title font-500 w-max">
                        Address
                      </span>
                      <div className="grid grid-cols-[auto,1fr] items-center text-[#757982] text-[20px] font-400 mb-5">
                        <img
                          src="../assets/icons/loaction.svg"
                          className="mr-4"
                        />
                        <Tooltip title={accManagerDetail?.address || "N/A"}>
                          <p className="truncate max-w-xs">
                            {accManagerDetail?.address || "N/A"}
                          </p>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <Button
                  className="cursor-pointer flex rounded-full py-[1rem] px-[2rem] text-secondary
                bg-secondary_bg w-max gap-[10px] text-lg font-600 items-center "
                  onClick={() => setIsOpenAddModal(true)}
                >
                  <span>Edit</span>
                  <EditIcon fill="#4F46E5" />
                </Button>
              </div>
            </div>
            <Grid
              item
              lg={12}
              className="basis-full mt-[30px] flex  gap-28 flex-col sm:flex-row w-3/4"
            >
              <div className="flex-1">
                <div className="flex items-center justify-between gap-10 p-24 rounded-lg bg-secondary_bg">
                  <div className="flex gap-[20px]  justify-center">
                    <div className="bg-secondary h-[54px] w-[54px] min-w-[54px] rounded-8 flex items-center justify-center">
                      <img src="../assets/icons/lock.svg" />
                    </div>
                    <div>
                      <Typography
                        component="h4"
                        className="mb-8 text-2xl text-title font-600"
                      >
                        Change Password
                      </Typography>
                      <p className="text-para_light">
                        For security purposes, if you wish to change your
                        password, please click here to change.
                      </p>
                    </div>
                  </div>
                  <div
                    className="shrink-0 w-[5rem] aspect-square flex items-center  justify-center cursor-pointer rounded-lg border-borderColor"
                    onClick={() => {
                      setIsOpenChangePassModal(true);
                    }}
                  >
                    <ArrowRightCircleIcon />
                  </div>
                </div>
              </div>
              <div className="flex-1 ">
                <div className="flex items-center justify-between gap-10 p-24 rounded-lg bg-secondary_bg h-full">
                  <div className="flex gap-[20px] justify-center">
                    <div className="bg-secondary h-[54px] w-[54px] min-w-[54px] rounded-8 flex items-center justify-center">
                      <img src="../assets/icons/lock.svg" />
                    </div>
                    <div>
                      <Typography
                        component="h4"
                        className="mb-8 text-2xl text-title font-600"
                      >
                        Reset Password
                      </Typography>
                      <p className="text-para_light">
                        It will send a link to the client to reset their
                        password.
                      </p>
                    </div>
                  </div>
                  <div
                    className="shrink-0 w-[5rem] aspect-square flex items-center  justify-center cursor-pointer rounded-lg border-borderColor"

                    // onClick={() => {
                    //   setIsOpenChangePassModal(true);
                    // }}
                  >
                    <div
                      className="text-[#4F46E5] font-500 text-[14px] underline"
                      onClick={handleResetPassword}
                    >
                      Reset
                    </div>
                  </div>
                </div>
              </div>
            </Grid>
          </div>
          <Grid
            item
            lg={12}
            className="basis-full mt-[30px] flex  gap-28 flex-col sm:flex-row w-full"
          >
            <div className="w-full bg-[#FFFFFF] rounded-[8px] px-20 py-20 flex items-center justify-between">
              <div>
                <Typography className="text-[#111827] font-600 text-[20px]">
                  Two-Factors Authentication
                </Typography>
                <p className="text-[#757982] text-[14px]">
                  <a href="#" style={{ textDecoration: "none" }}>
                    {accManagerDetail?.email || "N/A"}
                  </a>{" "}
                  is linked for Two-Factor Authentication.
                </p>
              </div>
              <div onClick={handleTwoFactor}>
                <Switch
                  checked={checked}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </div>
            </div>
          </Grid>
          <Grid
            item
            lg={12}
            className="basis-full mt-[30px]   gap-28 flex-col sm:flex-row w-full  bg-[#ffffff]"
          >
            <Typography className="text-[#0A0F18] font-600 text-[20px] px-20 py-10">
              Assigned Clients
            </Typography>
            <CommonTable
              headings={[
                "ID",
                "Name",
                "Company Name",
                "Subscription Status",
                "Account Status",
                "",
              ]}
            >
              <TableRow>
                <TableCell></TableCell>
              </TableRow>
            </CommonTable>
          </Grid>
        </Grid>
      </div>

      <div className="px-28 mb-[3rem]">
        <AddAccountManagerModel
          isOpen={isOpenAddModal}
          setIsOpen={setIsOpenAddModal}
          isEditing={true}
        />
        <ChangePassword
          role={role}
          isOpen={isOpenChangePassModal}
          setIsOpen={setIsOpenChangePassModal}
        />
      </div>
    </>
  );
};

export default ManagerProfile;
