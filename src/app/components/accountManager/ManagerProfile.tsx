import {
  Button,
  FormControlLabel,
  Grid,
  Menu,
  MenuItem,
  Switch,
  TableCell,
  TableRow,
  Theme,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { useTheme } from "@mui/styles";
import {
  ArrowRightCircleIcon,
  DownGreenIcon,
  EditIcon,
  NoDataFound,
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
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    // backgroundColor: "#4F46E5",
    // opacity: 1,
    // backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    "&::before, &::after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 13,
      height: 16,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: theme.palette.getContrastText(theme.palette.primary.main),
      fontSize: 8,
      fontWeight: "bold",
    },
    "&::before": {
      content: '"ON"',
      left: 13,
    },
    "&::after": {
      content: '"OFF"',
      right: 13,
    },
  },
  "& .MuiSwitch-switchBase": {
    "&.Mui-checked": {
      "& .MuiSwitch-thumb:before": {},
      "& + .MuiSwitch-track": {
        opacity: 0.9,
        backgroundColor: theme.palette.mode === "dark" ? "#4F46E5" : "#4F46E5",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: "white",
    boxShadow: "none",
    width: 18,
    height: 18,
    margin: 1,
  },
}));
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
  const [isConfirmOpen, setIsConfirmOpen] = useState(false); // State to manage confirmation dialog visibility
  const [pendingStatus, setPendingStatus] = useState(null);
  const [disable, setIsDisable] = useState(false);
  // Open menu handler
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget); // Set anchor element to the clicked button
  };

  // Close menu handler
  const handleClose = () => {
    setAnchorEl(null); // Reset anchor element to hide the menu
  };

  // Menu item click handler
  // const handleMenuItemClick = async (status) => {
  //   setSelectedItem(status);
  //   const res = await dispatch(
  //     UpdateStatus({
  //       user_id: accountManager_id,
  //       status: status == "InActive" ? 2 : 1,
  //     })
  //   );
  //   // setList(res?.payload?.data?.data?.list);
  //   toast.success(res?.payload?.data?.message);
  //   handleClose(); // Close the menu after handling the click
  // };

  const handleMenuItemClick = async (status) => {
    setPendingStatus(status);
    setIsConfirmOpen(true); // Open confirmation dialog
  };

  // Confirm status update handler
  const handleConfirm = async (confirmed) => {
    if (confirmed && pendingStatus) {
      setIsDisable(true);

      const res = await dispatch(
        UpdateStatus({
          user_id: accountManager_id,
          status: pendingStatus === "Inactive" ? 2 : 1,
        })
      );
      setSelectedItem(pendingStatus);
      setIsDisable(false);
      toast.success(res?.payload?.data?.message);
    }
    setIsConfirmOpen(false);
    setPendingStatus(null);
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

  const renderAddress = (accManagerDetail) => {
    const addressComponents = [
      accManagerDetail?.address,
      accManagerDetail?.address2,
      accManagerDetail?.city,
      accManagerDetail?.state,
      accManagerDetail?.country,
      accManagerDetail?.zipcode,
    ].filter(Boolean); // Filter out any falsy values (null, undefined, empty string)

    return addressComponents.length > 0 ? addressComponents.join(", ") : "N/A";
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
                  {/* // <img src="../assets/images/pages/agent/luis_.jpg" /> */}
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
                      <MenuItem
                        onClick={() => handleMenuItemClick("Active")}
                        disabled={selectedItem == "Active"}
                      >
                        Active
                      </MenuItem>
                      <MenuItem
                        onClick={() => handleMenuItemClick("Inactive")}
                        disabled={selectedItem == "Inactive"}
                      >
                        Inactive
                      </MenuItem>
                    </Menu>

                    <Dialog
                      open={isConfirmOpen}
                      onClose={() => setIsConfirmOpen(false)}
                      className="p-10"
                    >
                      {/* <DialogTitle>Confirm Status Change</DialogTitle> */}
                      <DialogContent>
                        <DialogContentText className="text-[#000]">
                          Are you sure you want to {pendingStatus} this user?
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions className="pb-10 justify-center">
                        <Button
                          variant="contained"
                          color="secondary"
                          disabled={disable}
                          className={`${disable ? "btn-disable" : ""}
                      
                          text-[18px]`}
                          onClick={(e) => {
                            handleConfirm(true);
                          }}
                        >
                          Yes
                        </Button>
                        <Button
                          variant="outlined"
                          color="secondary"
                          disabled={disable}
                          className={`${disable ? "btn-disable-light" : ""}
       
           text-[18px] ml-14`}
                          onClick={(e) => {
                            handleConfirm(false);
                          }}
                        >
                          No
                        </Button>
                      </DialogActions>
                    </Dialog>
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
                        {/* <Tooltip title={accManagerDetail?.address}> */}
                        <p style={{ wordBreak: "break-all" }}>
                          {/* {accManagerDetail?.address || "N/A"} */}
                          {renderAddress(accManagerDetail)}
                        </p>
                        {/* </Tooltip> */}
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
              className="basis-full mt-[30px] flex  gap-28 flex-col sm:flex-row w-full"
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
                <div style={{ display: "flex", alignItems: "center" }}>
                  {" "}
                  <FormControlLabel
                    control={<Android12Switch defaultChecked />}
                    label=""
                  />{" "}
                </div>
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
              {accManagerDetail?.assigned_account_manager_client?.length ===
                0 && (
                <TableRow
                  sx={{
                    "& td": {
                      borderBottom: "1px solid #EDF2F6",
                      paddingTop: "12px",
                      paddingBottom: "12px",
                      color: theme.palette.primary.main,
                    },
                  }}
                >
                  <TableCell colSpan={7} align="center">
                    <div
                      className="flex flex-col justify-center align-items-center gap-20 bg-[#F7F9FB] min-h-[400px] py-40"
                      style={{ alignItems: "center" }}
                    >
                      <NoDataFound />
                      <Typography className="text-[24px] text-center font-600 leading-normal">
                        No data found !
                      </Typography>
                    </div>
                  </TableCell>
                </TableRow>
              )}
              {accManagerDetail?.assigned_account_manager_client?.map(
                (row, index) => {
                  // console.log(row, "roewww");
                  return (
                    <TableRow
                      key={index}
                      sx={{
                        "& td": {
                          borderBottom: "1px solid #EDF2F6",
                          paddingTop: "12px",
                          paddingBottom: "12px",
                          color: theme.palette.primary.main,
                        },
                      }}
                    >
                      <TableCell scope="row" className="font-500 pl-[20px]">
                        {row.user_id}
                      </TableCell>
                      <TableCell
                        align="center"
                        className="whitespace-nowrap font-500"
                      >
                        {row.first_name}
                      </TableCell>

                      <TableCell
                        align="center"
                        className="whitespace-nowrap font-500"
                      >
                        {row.company_name}
                      </TableCell>
                      <TableCell
                        align="center"
                        className="whitespace-nowrap font-500"
                      >
                        <span
                          className={`inline-flex items-center justify-center rounded-full w-[90px] min-h-[25px] text-sm font-500
                        ${
                          row.subcription_status == "Active"
                            ? "text-[#4CAF50] bg-[#DFF1E0]" // Red for Active
                            : row.subcription_status == "Pending"
                            ? "text-[#FFC107] bg-[#FFEEBB]" // Yellow for Pending
                            : row.subcription_status == "Suspended"
                            ? "text-[#FF0000] bg-[#FFD1D1]" // Green for Suspended
                            : row.subcription_status == "Cancelled"
                            ? "text-[#FF5C00] bg-[#FFE2D5]" // Brown for Cancelled
                            : ""
                        }`}
                        >
                          {row.subcription_status || "N/A"}
                        </span>
                      </TableCell>

                      <TableCell
                        align="center"
                        className="whitespace-nowrap font-500"
                      >
                        <span
                          className={`inline-flex items-center justify-center rounded-full w-[95px] min-h-[25px] text-sm font-500
                        ${
                          row.status == "Active"
                            ? "text-[#4CAF50] bg-[#4CAF502E]"
                            : row.status == "Completed"
                            ? "Expired"
                            : "Pending"
                        }`}
                        >
                          {row.status || "Pending"}
                        </span>
                      </TableCell>
                      <TableCell align="left" className="w-[1%] font-500">
                        <div className="flex gap-20 pe-20">
                          <span className="p-2 cursor-pointer">
                            <Link to={`/admin/client/detail/${row.user_id}`}>
                              <ArrowRightCircleIcon />
                            </Link>
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                }
              )}
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
