import { Button, Grid, Menu, MenuItem, Typography } from "@mui/material";
import { UpdateStatus, resetPassword } from "app/store/Client";
import { ClientType } from "app/store/Client/Interface";
import { useAppDispatch } from "app/store/store";
import {
  ArrowRightCircleIcon,
  DownGreenIcon,
  EditIcon,
  LastPayment,
} from "public/assets/icons/common";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router";

interface ProfileProps {
  setIsOpenEditModal: (prev: boolean) => void;
  setIsOpenChangePassModal: (prev: boolean) => void;
  clientDetail: ClientType;
}
export default function Profile({
  setIsOpenEditModal,
  setIsOpenChangePassModal,
  clientDetail,
}: ProfileProps) {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState(null); // State to manage anchor element for menu
  const [selectedItem, setSelectedItem] = useState("Active");
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget); // Set anchor element to the clicked button
  };
  const handleClose = () => {
    setAnchorEl(null); // Reset anchor element to hide the menu
  };
  const { client_id } = useParams();
  // console.log(client_id, "client");

  // Menu item click handler
  const handleMenuItemClick = async (status) => {
    console.log(`Selected status: ${status}`);
    setSelectedItem(status);

    const res = await dispatch(
      UpdateStatus({ user_id: client_id, status: status == "InActive" ? 2 : 1 })
    );
    // setList(res?.payload?.data?.data?.list);
    toast.success(res?.payload?.data?.message);

    handleClose(); // Close the menu after handling the click
  };
  const handleResetPassword = async () => {
    await dispatch(resetPassword({ client_id: client_id }));
  };
  const urlForImage = import.meta.env.VITE_API_BASE_IMAGE_URL;

  useEffect(() => {
    setSelectedItem(clientDetail?.status);
  }, [clientDetail]);

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
      <Grid container className="h-auto p-0 mb-[30px] px-[2rem]">
        <Grid item xs={12} sm={12} md={12} className="p-0 ">
          <div className="flex flex-col  gap-10 bg-[#FFFFFF] h-auto rounded-12 ">
            <div className="border border-[#E7E8E9] rounded-lg flex  justify-left gap-[30px] items-start p-[2rem] flex-col sm:flex-row relative">
              <div className="h-[100px] w-[100px] sm:h-[100px] sm:w-[126px] rounded-full overflow-hidden">
                <img
                  src={
                    clientDetail?.user_image
                      ? urlForImage + clientDetail.user_image
                      : "../assets/images/logo/images.jpeg"
                  }
                  alt="images"
                  className="h-[100px] w-[100px] rounded-full"
                />
              </div>
              <div className="pt-20">
                <div
                  className="edit_profile_btn"
                  onClick={() => setIsOpenEditModal(true)}
                >
                  Edit
                  <EditIcon fill="#4F46E5" />
                </div>

                <div className="flex items-center gap-40 mb-10">
                  <span className="text-[24px] text-[#111827] font-semibold inline-block">
                    {clientDetail?.first_name + " " + clientDetail?.last_name}
                  </span>
                  <div className="flex items-center gap-10 ">
                    <span className="text-[16px] text-[#757982]  inline-block">
                      Account Status :
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
                            selectedItem == "Active" ? "#4CAF50" : "#F44336"
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
                      onClose={handleClose}
                      // Close the menu when clicking outside or selecting an item
                    >
                      {/* Define menu items */}
                      <MenuItem
                        onClick={() => handleMenuItemClick("Active")}
                        selected={selectedItem == "Active"}
                      >
                        Active
                      </MenuItem>
                      <MenuItem
                        onClick={() => handleMenuItemClick("InActive")}
                        selected={selectedItem == "Inactive"}
                      >
                        Inactive
                      </MenuItem>
                    </Menu>
                  </div>
                </div>
                <div className="flex text-[2rem] text-para_light flex-col sm:flex-row gap-10px ">
                  <div className="flex">
                    <img
                      src="../assets/icons/ic_outline-email.svg"
                      className="mr-4"
                    />
                    <span>{clientDetail?.email}</span>
                  </div>
                  <div className="flex items-center sm:px-20">
                    <span>
                      <img
                        src="../assets/icons/ph_phone.svg"
                        className="mr-4"
                      />{" "}
                    </span>
                    <span>
                      {clientDetail?.country_code}{" "}
                      {clientDetail?.phone_number || "N/A"}
                    </span>
                  </div>
                </div>

                <div className="flex items-baseline justify-between w-full py-20 gap-31 flex-col sm:flex-row">
                  <div className="flex flex-col pr-10 gap-7 ">
                    <span className="text-[20px] text-title font-500 w-max">
                      Subscription Status
                    </span>
                    <span className=" text-[#757982]  text-[20px] font-400 mb-5 flex ">
                      <img src="../assets/icons/circle.svg" className="mr-4" />
                      {clientDetail?.subscription_status || "N/A"}
                    </span>
                  </div>
                  <div className="flex flex-col items-start w-8/12 gap-7">
                    <span className="text-[20px] text-title font-500">
                      Company Name
                    </span>
                    <span className=" text-[#757982]  text-[20px] font-400 mb-5 flex ">
                      <img src="../assets/icons/tech.svg" className="mr-4" />
                      {clientDetail?.company_name}
                    </span>
                  </div>
                </div>

                <div className="flex items-baseline justify-between w-full pt-0 pb-20 gap-31 overflow-hidden">
                  <div className="flex flex-col pr-10 gap-7">
                    <span className="text-[20px] text-title font-500">
                      Address
                    </span>
                    <div className="grid grid-cols-[auto,1fr] items-center text-[#757982] text-[20px] font-400 mb-5">
                      <img
                        src="../assets/icons/loaction.svg"
                        className="mr-4"
                      />
                      {/* <p className="truncate">
                        {clientDetail?.address || "N/A"}
                      </p> */}
                      <p style={{ wordBreak: "break-all" }}>
                        {/* {accManagerDetail?.address || "N/A"} */}
                        {renderAddress(clientDetail)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Grid>

        <Grid
          item
          lg={12}
          className="basis-full mt-[30px] flex  gap-28 flex-col sm:flex-row"
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
                    For security purposes, if you wish to change your password,
                    please click here to change.
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
          <div className="flex-1">
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
                    It will send a link to the client to reset their password.
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
      </Grid>

      <Grid container spacing="26px" className="px-[2rem]">
        <Grid item lg={6} className="basis-full">
          {/* <Link to="/change-password" className="contents"> */}
          <div className="flex items-center justify-between gap-10 p-24 rounded-lg bg-bgGrey">
            <div>
              <Typography
                component="h4"
                className="mb-8 text-2xl text-title font-600"
              >
                Last payment amount and date
              </Typography>
              <p className="text-para_light">
                <span className="text-secondary">$230</span>, Feb 23, 2024
              </p>
            </div>
            <div className="shrink-0 w-[5rem] aspect-square flex items-center justify-center border rounded-lg border-borderColor">
              <LastPayment />
            </div>
          </div>
          {/* </Link> */}
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
    </>
  );
}
