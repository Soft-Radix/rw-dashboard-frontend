import {
  Button,
  Grid,
  Menu,
  MenuItem,
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
import { useState } from "react";
import TitleBar from "../TitleBar";
import CommonTable from "../commonTable";
import AddAccountManagerModel from "./AddAccountmanagerModal";

const rows = [
  {
    id: "1542145611525",
    name: "Web page design",
    companyName: "Tech23.com",
    status: "Suspended",
  },
  {
    id: "1542145611525",
    name: "Web page design",
    companyName: "Tech23.com",
    status: "Pending",
  },
  {
    id: "1542145611525",
    name: "Web page design",
    companyName: "Tech23.com",
    status: "Active",
  },
];
// interface svgColor {
//   color: string;
// }
const ManagerProfile = () => {
  // const { color } = props;
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
  const handleMenuItemClick = (status) => {
    console.log(`Selected status: ${status}`);
    setSelectedItem(status);

    handleClose(); // Close the menu after handling the click
  };
  const [isOpenAddModal, setIsOpenAddModal] = useState<boolean>(false);
  // const [isEditing, setIsEditing] = useState<boolean>(true);
  const theme: Theme = useTheme();
  return (
    <>
      <div className="px-16">
        <TitleBar title="Account Manager’s Profile"> </TitleBar>
      </div>
      <div className="px-40 xs:px-10">
        {/* <Grid container spacing={3} className="sm:px-10 xs:px-10 bg-red-200"> */}
        <Grid item xs={12} sm={12} md={9} className="">
          <div className="flex flex-col gap-10 p-20 bg-[#FFFFFF] h-auto md:h-[calc(100vh-164px)] sm:h-auto  rounded-12 xs:px-20 ">
            <div className="border border-[#E7E8E9] rounded-lg flex   justify-between gap-[30px] items-start p-[3rem] flex-col sm:flex-row">
              <div className="flex gap-40 flex-wrap">
                <div className="h-[100px] w-[100px] sm:h-[100px] sm:w-[99px] rounded-full overflow-hidden ">
                  <img src="../assets/images/pages/agent/luis_.jpg" />
                </div>
                <div className="pt-[20px]">
                  <div className="flex items-center sm:gap-[7rem] gap-[1rem] mb-10">
                    <span className="text-[24px] text-[#111827] font-semibold inline-block">
                      {/* {agentDetail?.first_name + " " + agentDetail?.last_name} */}
                      Bernadette Jone
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
                      <MenuItem
                        onClick={() => handleMenuItemClick("Suspended")}
                      >
                        Suspended
                      </MenuItem>
                      <MenuItem onClick={() => handleMenuItemClick("Pending")}>
                        Pending
                      </MenuItem>
                      <MenuItem
                        onClick={() => handleMenuItemClick("Cancelled")}
                      >
                        Cancelled
                      </MenuItem>
                    </Menu>
                  </div>
                  <div className="flex text-[2rem] text-para_light flex-col sm:flex-row gap-[20px]">
                    <div className="flex">
                      <img src="../assets/icons/group.svg" className="mr-4" />

                      <span>#2367055342</span>
                    </div>
                    <div className="flex sm:px-20">
                      <span className="flex">
                        <img
                          src="../assets/icons/ri_time-line.svg"
                          className="sm:mr-4"
                        />{" "}
                        Feb 21,2024
                      </span>
                      {/* <span>{agentDetail?.phone_number || "N/A"}</span> */}
                    </div>
                  </div>

                  <div className="flex items-baseline justify-start w-full py-20 gap-28 flex-col sm:flex-row">
                    <div className="flex pr-10 gap-32 sm:flex-row flex-col">
                      <div className="flex flex-col gap-5">
                        <span className="text-[#111827] text-[18px] font-500">
                          Email Address
                        </span>
                        <div className="flex">
                          <img
                            src="../assets/icons/ic_outline-email.svg"
                            className="mr-4"
                          />
                          <span className="text-para_light text-[20px]">
                            {/* {clientDetail?.email} */} info456@gmail.com
                          </span>
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
                            {/* {clientDetail?.country_code}{" "}
                             {clientDetail?.phone_number || "N/A"} */}
                            +1 2513652150
                          </span>
                        </div>
                      </div>
                      {/* </div> */}
                    </div>
                  </div>
                  <div className="flex items-baseline justify-between w-full pt-0 pb-20 gap-31 ">
                    <div className="flex flex-col pr-10 gap-7 ">
                      <span className="text-[1.8rem] text-title font-500 w-max">
                        Address
                      </span>
                      <span className=" text-[#757982]  text-[1.8rem] font-400 mb-5 flex ">
                        <img
                          src="../assets/icons/loaction.svg"
                          className="mr-4"
                        />
                        {/* {clientDetail?.address ?? */}
                        "Akshya Nagar 1st Block 1st Cross, Rammurthy,
                        Bangalore-560016"
                      </span>
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

            <div className="border-1 border-[#EDF2F6] rounded-6 pt-20 mt-10 shadow-sm">
              <Typography className="text-[20px] font-600 pl-20 py-10 ">
                Assigned Clients
              </Typography>
              <CommonTable
                headings={["Id", "Name", "Company Name", "Status", " "]}
              >
                <>
                  {rows.map((row, index) => (
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
                      <TableCell
                        scope="row"
                        className="font-500 text-[14px] leading-4"
                      >
                        {row.id}
                      </TableCell>
                      <TableCell
                        align="center"
                        className="whitespace-nowrap font-500 text-[14px] leading-4"
                      >
                        {row.name}
                      </TableCell>

                      <TableCell
                        align="center"
                        className="whitespace-nowrap font-500 text-[14px] leading-4"
                      >
                        {row.companyName}
                      </TableCell>
                      <TableCell align="center" className="whitespace-nowrap">
                        <span
                          className={`inline-flex items-center justify-center rounded-full w-[95px] min-h-[25px] text-sm font-500
                      ${row.status === "Active" ? "text-[#4CAF50] bg-[#4CAF502E]" : row.status === "Suspended" ? "text-[#F44336] bg-[#F443362E]" : "text-[#F0B402]  bg-[#FFEEBB]"}`}
                        >
                          {row.status}
                        </span>
                      </TableCell>

                      <TableCell
                        align="center"
                        className="whitespace-nowrap font-500 text-[14px] leading-4"
                      >
                        <ArrowRightCircleIcon />
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              </CommonTable>
            </div>
          </div>
        </Grid>
        {/* </Grid> */}
      </div>

      <div className="px-28 mb-[3rem]">
        <AddAccountManagerModel
          isOpen={isOpenAddModal}
          setIsOpen={setIsOpenAddModal}
          isEditing={true}
        />
      </div>
    </>
  );
};

export default ManagerProfile;
