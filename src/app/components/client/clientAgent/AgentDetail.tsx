import { Button, Grid, Menu, MenuItem, Typography } from "@mui/material";
import { useTheme } from "@mui/styles";
import { PlusIcon } from "public/assets/icons/dashboardIcons";
import { useEffect, useState } from "react";
import TitleBar from "src/app/components/TitleBar";
import AddTaskModal from "src/app/components/tasks/AddTask";
import ThemePageTable from "src/app/components/tasks/TaskPageTable";
import RecentData from "./RecentData";
import { Clock, DownGreenIcon, Token } from "public/assets/icons/common";
import { useParams } from "react-router";
import { getAgentInfo } from "app/store/Agent";
import { useAppDispatch } from "app/store/store";
import { useSelector } from "react-redux";
import { ClientRootState } from "app/store/Client/Interface";
import { Console } from "console";
import { AgentRootState } from "app/store/Agent/Interafce";
import moment from "moment";
import { UpdateStatus } from "app/store/Client";
import toast from "react-hot-toast";

const AgentDetail = () => {
  const dispatch = useAppDispatch();
  const { agentDetail } = useSelector((store: AgentRootState) => store?.agent);
  const [anchorEl, setAnchorEl] = useState(null); // State to manage anchor element for menu
  const [selectedItem, setSelectedItem] = useState("Active");
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget); // Set anchor element to the clicked button
  };
  const handleClose = () => {
    setAnchorEl(null); // Reset anchor element to hide the menu
  };
  const { agents_id } = useParams();

  // Menu item click handler
  const handleMenuItemClick = async (status) => {
    console.log(status, "staujkshfjds");
    setSelectedItem(status);
    const res = await dispatch(
      UpdateStatus({
        user_id: agents_id,
        status: status == "InActive" ? 2 : 1,
      })
    );
    // setList(res?.payload?.data?.data?.list);

    toast.success(res?.payload?.data?.message);
    handleClose(); // Close the menu after handling the click
  };
  useEffect(() => {
    setSelectedItem(agentDetail?.status);
  }, [agentDetail]);

  useEffect(() => {
    dispatch(getAgentInfo({ agent_id: agents_id }));
  }, []);
  const urlForImage = import.meta.env.VITE_API_BASE_IMAGE_URL;

  const renderAddress = (row) => {
    // console.log(row, "rowssss");
    const addressComponents = [
      row?.address,
      row?.address2,
      row?.city,
      row?.state,
      row?.country,
      row?.zipcode,
    ].filter(Boolean); // Filter out any falsy values (null, undefined, empty string)

    return addressComponents.length > 0 ? addressComponents.join(", ") : "N/A";
  };
  return (
    <div>
      <TitleBar title="Agents Details"></TitleBar>

      <div className="px-28 flex gap-20 flex-wrap lg:flex-nowrap">
        <div className="basis-full lg:basis-auto lg:grow">
          <div className="shadow-md bg-white rounded-lg">
            <div className="border border-[#E7E8E9] rounded-lg flex  justify-left gap-[30px] items-start p-[2rem] flex-col sm:flex-row relative">
              <div className="h-[100px] w-[100px] sm:h-[100px] sm:w-[126px] rounded-full overflow-hidden">
                <img
                  src={
                    agentDetail?.user_image
                      ? urlForImage + agentDetail.user_image
                      : "../assets/images/logo/images.jpeg"
                  }
                  alt="images"
                  className="h-[100px] w-[100px] rounded-full"
                />
              </div>
              <div className="pt-20">
                <div className="flex items-center gap-40 mb-10">
                  <span className="text-[24px] text-[#111827] font-semibold inline-block">
                    {agentDetail?.first_name + " " + agentDetail?.last_name}
                  </span>
                  {agentDetail?.status == "Pending" ? (
                    <Button
                      variant="outlined"
                      className={`h-20 rounded-3xl border-none sm:min-h-24 leading-none 
              
                        text-[#f0b402] bg-[#ffeebb]
                    
                    `}
                      // endIcon={<DownGreenIcon color="#f0b402" />}
                      // onClick={handleClick}
                    >
                      {/* {agentDetail?.status || "N/A"} */}
                      {selectedItem}
                    </Button>
                  ) : (
                    <>
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
                        <MenuItem
                          onClick={() => handleMenuItemClick("InActive")}
                        >
                          Inactive
                        </MenuItem>
                      </Menu>
                    </>
                  )}
                </div>

                <div className="flex text-[2rem] text-para_light my-10 ">
                  <div className="flex">
                    <Token />
                    {/* <span>{agentDetail?.email}</span> */}
                    {agentDetail?.id ? agentDetail?.id : "N/A"}
                  </div>
                  <div className="flex items-center px-20">
                    <span>
                      <Clock />{" "}
                    </span>
                    <span>
                      {moment(agentDetail?.created_at).format("ll") || "N/A"}
                    </span>
                  </div>
                </div>

                <div className="flex text-[2rem] text-para_light mt-4 gap-10 justify-between ">
                  <div>
                    <Typography className="text-[#111827] font-500 text-[18px]">
                      Email Address
                    </Typography>
                    <div className="flex">
                      <img
                        src="../assets/icons/ic_outline-email.svg"
                        className="mr-4"
                      />
                      <span style={{ wordBreak: "break-all" }}>
                        {agentDetail?.email}
                      </span>
                    </div>
                  </div>
                  <div>
                    <Typography className="text-[#111827] font-500 text-[18px]">
                      Phone Number
                    </Typography>
                    <div className="flex items-center ">
                      <span>
                        <img
                          src="../assets/icons/ph_phone.svg"
                          className="mr-4"
                        />{" "}
                      </span>
                      <span>
                        {agentDetail?.country_code}{" "}
                        {agentDetail?.phone_number || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-baseline justify-between w-full pt-0 pb-20 gap-31 my-10">
                  <div className="flex flex-col pr-10 gap-7 ">
                    <span className="text-[20px] text-title font-500 w-max">
                      Address
                    </span>
                    <span className=" text-[#757982]  text-[20px] font-400 mb-5 flex ">
                      <img
                        src="../assets/icons/loaction.svg"
                        className="mr-4"
                      />
                      <p style={{ wordBreak: "break-all" }}>
                        {renderAddress(agentDetail)}
                      </p>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="basis-full lg:basis-[322px]">
          <RecentData />
        </div>
      </div>
    </div>
  );
};

export default AgentDetail;
