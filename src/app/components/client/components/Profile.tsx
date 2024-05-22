import { Button, Grid, Menu, MenuItem, Typography } from "@mui/material";
import { ClientType } from "app/store/Client/Interface";
import {
  ArrowRightCircleIcon,
  DownGreenIcon,
  EditIcon,
  LastPayment,
} from "public/assets/icons/common";
import { useState } from "react";

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
  const [anchorEl, setAnchorEl] = useState(null); // State to manage anchor element for menu
  const [selectedItem, setSelectedItem] = useState("Active");
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget); // Set anchor element to the clicked button
  };
  const handleClose = () => {
    setAnchorEl(null); // Reset anchor element to hide the menu
  };

  // Menu item click handler
  const handleMenuItemClick = (status) => {
    console.log(`Selected status: ${status}`);
    setSelectedItem(status);

    handleClose(); // Close the menu after handling the click
  };
  const urlForImage = import.meta.env.VITE_API_BASE_IMAGE_URL;
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
                  <Button
                    variant="outlined"
                    className={`h-20 rounded-3xl border-none sm:min-h-24 leading-none ${
                      selectedItem === "Active"
                        ? "text-[#4CAF50] bg-[#4CAF502E]" // Green for 'Active'
                        : selectedItem === "Cancelled"
                          ? "text-[#F44336] bg-[#F443362E]"
                          : selectedItem == "Pending"
                            ? "text-[#FF5F15] bg-[#ffe2d5]"
                            : "text-[#F0B402]  bg-[#FFEEBB]"
                    }`}
                    endIcon={
                      <DownGreenIcon
                        color={
                          selectedItem === "Active"
                            ? "#4CAF50"
                            : selectedItem === "Cancelled"
                              ? "#F44336"
                              : selectedItem == "Pending"
                                ? "#FF5F15"
                                : "#F0B402"
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
                    <MenuItem onClick={() => handleMenuItemClick("Suspended")}>
                      Suspended
                    </MenuItem>
                    <MenuItem onClick={() => handleMenuItemClick("Pending")}>
                      Pending
                    </MenuItem>
                    <MenuItem onClick={() => handleMenuItemClick("Cancelled")}>
                      Cancelled
                    </MenuItem>
                  </Menu>
                </div>
                <div className="flex text-[2rem] text-para_light ">
                  <div className="flex">
                    <img
                      src="../assets/icons/ic_outline-email.svg"
                      className="mr-4"
                    />
                    <span>{clientDetail?.email}</span>
                  </div>
                  <div className="flex items-center px-20">
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

                <div className="flex items-baseline justify-between w-full py-20 gap-31">
                  <div className="flex flex-col pr-10 gap-7 ">
                    <span className="text-[1.8rem] text-title font-500 w-max">
                      Status
                    </span>
                    <span className=" text-[#757982]  text-[1.8rem] font-400 mb-5 flex ">
                      <img src="../assets/icons/circle.svg" className="mr-4" />
                      {clientDetail?.status || "N/A"}
                    </span>
                  </div>
                  <div className="flex flex-col items-start w-8/12 gap-7">
                    <span className="text-[1.8rem] text-title font-500">
                      Company Name
                    </span>
                    <span className=" text-[#757982]  text-[1.8rem] font-400 mb-5 flex ">
                      <img src="../assets/icons/tech.svg" className="mr-4" />
                      {clientDetail?.company_name}
                    </span>
                  </div>
                </div>
                <div className="flex items-baseline justify-between w-full pt-0 pb-20 gap-31">
                  <div className="flex flex-col pr-10 gap-7 ">
                    <span className="text-[1.8rem] text-title font-500 w-max">
                      Address
                    </span>
                    <span className=" text-[#757982]  text-[1.8rem] font-400 mb-5 flex ">
                      <img
                        src="../assets/icons/loaction.svg"
                        className="mr-4"
                      />
                      {clientDetail?.address || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Grid>

        <Grid item lg={12} className="basis-full mt-[30px]">
          <div className="flex items-center justify-between gap-10 p-24 rounded-lg bg-secondary_bg">
            <div className="flex gap-[20px] items-end justify-center">
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
