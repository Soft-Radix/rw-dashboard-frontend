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
  AttachmentDeleteIcon,
  AttachmentIcon,
  AttachmentUploadIcon,
} from "public/assets/icons/supportIcons";

import ListLoading from "@fuse/core/ListLoading";
import {
  changeFetchStatus,
  deleteAttachment,
  getAgentInfo,
  resetFormData,
  uploadAttachment,
} from "app/store/Agent";
import { AgentRootState } from "app/store/Agent/Interafce";
import { useAppDispatch } from "app/store/store";
import {
  ArrowRightCircleIcon,
  DownGreenIcon,
  EditIcon,
} from "public/assets/icons/common";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import TitleBar from "src/app/components/TitleBar";
import AddNewTicket from "src/app/components/support/AddNewTicket";
import ImagesOverlap from "../ImagesOverlap";
import CommonTable from "../commonTable";
import AddAgentModel from "./AddAgentModel";
import moment from "moment";
import DeleteClient from "../client/DeleteClient";

// let images = ["female-01.jpg", "female-02.jpg", "female-03.jpg"];

// const resetForm

export default function AgentDetails() {
  const theme: Theme = useTheme();
  const { agent_id } = useParams();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const { agentDetail, fetchStatus } = useSelector(
    (store: AgentRootState) => store?.agent
  );
  // console.log(agentDetail.attachments, "agent");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [anchorEl, setAnchorEl] = useState(null); // State to manage anchor element for menu
  const [selectedItem, setSelectedItem] = useState("Active");
  const [deleteId, setIsDeleteId] = useState<number>(null);

  const [isOpenDeletedModal, setIsOpenDeletedModal] = useState(false);
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [expandedImage, setExpandedImage] = useState(null);
  const handleImageClick = (imageUrl) => {
    if (expandedImage === imageUrl) {
      setExpandedImage(null); // If already expanded, close it
    } else {
      setExpandedImage(imageUrl); // If not expanded, expand it
    }
  };
  useEffect(() => {
    if (!agent_id) return null;
    dispatch(getAgentInfo({ agent_id }));
    return () => {
      dispatch(resetFormData());
      dispatch(changeFetchStatus());
    };
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget); // Set anchor element to the clicked button
  };

  // Close menu handler
  const handleClose = () => {
    setAnchorEl(null); // Reset anchor element to hide the menu
  };

  // Menu item click handler
  const handleMenuItemClick = (status) => {
    setSelectedItem(status);

    handleClose(); // Close the menu after handling the click
  };
  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setUploadedFiles(fileArray);
      // console.log(object);

      const formData: any = new FormData();
      formData.append("agent_id", agent_id);

      fileArray.forEach((file, index) => {
        formData.append(`files`, file);
      });

      // Dispatch the uploadAttachment action with formData
      dispatch(uploadAttachment(formData));
    }
    e.target.value = "";
  };
  // console.log(uploadedFiles, "fghughdu");
  const urlForImage = import.meta.env.VITE_API_BASE_IMAGE_URL;
  // console.log(urlForImage, "img");

  const handleDeleteAttachment = async (id: number) => {
    const { payload } = await dispatch(deleteAttachment({ attachment_id: id }));
    // console.log(payload, "kklkkkl");
    if (payload?.data?.status) {
      dispatch(getAgentInfo({ agent_id }));
    }
    setIsOpenDeletedModal(false);
  };
  if (fetchStatus === "loading") {
    return <ListLoading />;
  }

  return (
    <>
      <div className="px-16">
        <TitleBar title="Agent Profile"> </TitleBar>
      </div>
      <div className="px-40 xs:px-10">
        <Grid container spacing={3} className="sm:px-10 xs:px-10 ">
          <Grid item xs={12} sm={12} md={9} className="">
            {/* <div className="flex flex-col gap-10 p-20 bg-[#FFFFFF] h-auto
             md:h-[calc(100vh-164px)] sm:h-auto  rounded-12 xs:px-20 "> */}
            <div
              className="flex flex-col gap-10 p-20 bg-[#FFFFFF] h-auto
             sm:h-auto  rounded-12 xs:px-20 "
            >
              <div className="border border-[#E7E8E9] rounded-lg flex   justify-between gap-[30px] items-start sm:p-[3rem] p-[1rem] flex-col sm:flex-row">
                <div className="flex gap-40 flex-col sm:flex-row overflow-hidden">
                  <div className="h-[100px] w-[100px] sm:h-[100px] sm:w-[99px] rounded-full overflow-hidden ">
                    {/* <img src="../assets/images/pages/agent/luis_.jpg" /> */}
                    <img
                      src={
                        agentDetail?.user_image
                          ? urlForImage + agentDetail.user_image
                          : "../assets/images/logo/images.jpeg"
                      }
                    ></img>
                  </div>
                  <div className="pt-[20px]">
                    <div className="flex items-center sm:gap-[7rem] gap-[1rem] mb-10">
                      <span className="text-[24px] text-[#111827] font-semibold inline-block">
                        {agentDetail?.first_name + " " + agentDetail?.last_name}
                        {/* Bernadette Jone */}
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
                        <MenuItem
                          onClick={() => handleMenuItemClick("Pending")}
                        >
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

                        <span>{agentDetail?.id || "N/A"}</span>
                      </div>
                      <div className="flex sm:px-20">
                        <span className="flex">
                          <img
                            src="../assets/icons/ri_time-line.svg"
                            className="sm:mr-4"
                          />{" "}
                          {agentDetail?.created_at
                            ? moment(agentDetail.created_at).format(
                                "MMMM Do, YYYY"
                              )
                            : "N/A"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-baseline justify-start w-full py-20 gap-28 flex-col sm:flex-row">
                      <div className="flex pr-10 gap-32 lgsrc={task1}1:flex-row flex-col">
                        <div className="flex flex-col gap-5">
                          <span className="text-[#111827] text-[18px] font-500">
                            Email Address
                          </span>
                          <div className="flex">
                            <img
                              src="../assets/icons/ic_outline-email.svg"
                              className="mr-4"
                            />
                            <span className="text-para_light text-[20px] truncate">
                              {agentDetail?.email || "N/A"}
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
                              {/* {clientDetail?.country_code}{" "}*/}
                              {agentDetail?.phone_number || "N/A"}
                            </span>
                          </div>
                        </div>
                        {/* </div> */}
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
                          <p className="truncate">
                            {agentDetail?.address || "N/A"}
                          </p>
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
              <div className="flex flex-col px-20 my-[2rem] gap-9">
                <div className="text-2xl text-title font-600">Attachment</div>
                <div className="flex gap-10 py-5 flex-wrap ">
                  {agentDetail?.attachments?.map((item: any) => (
                    <div className="relative cursor-pointer ">
                      {item.file.includes(".png") ||
                      item.file.includes(".jpg") ||
                      item.file.includes(".jpeg") ? (
                        <>
                          <img
                            src={urlForImage + item.file}
                            alt="Black Attachment"
                            className="w-[200px] rounded-md sm:h-[130px]"
                          />
                          <div
                            className="absolute top-7 left-7"
                            onClick={() =>
                              handleImageClick(urlForImage + item.file)
                            }
                          >
                            <AttachmentIcon />
                          </div>
                          <div
                            className="absolute top-7 right-7"
                            // onClick={() => handleDeleteAttachment(item.id)}
                          >
                            <AttachmentDeleteIcon
                              onClick={() => {
                                setIsOpenDeletedModal(true);
                                setIsDeleteId(item.id);
                              }}
                            />
                          </div>
                        </>
                      ) : (
                        <div className="w-[200px] rounded-md sm:h-[130px] flex items-center justify-center border-1 border-[#4F46E5]">
                          <a
                            href={urlForImage + item.file}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              src="../assets/images/logo/pdfIcon.png"
                              alt="Black Attachment"
                              className="h-[50px] w-[50px]"
                            />
                          </a>

                          {/* <a href="/">check</a> */}
                          <div
                            className="absolute top-7 left-7"
                            onClick={() =>
                              handleImageClick(urlForImage + item.file)
                            }
                          >
                            <AttachmentIcon />
                          </div>
                          <div
                            className="absolute top-7 right-7"
                            // onClick={() => handleDeleteAttachment(item.id)}
                          >
                            <AttachmentDeleteIcon
                              onClick={() => {
                                setIsOpenDeletedModal(true);
                                setIsDeleteId(item.id);
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {expandedImage && (
                    <div
                      className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-80"
                      onClick={() => setExpandedImage(null)}
                    >
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <img
                          src={expandedImage}
                          alt="Expanded Image"
                          className="max-w-full max-h-full"
                        />
                      </div>
                    </div>
                  )}

                  <label
                    className=" cursor-pointer border-[0.5px] border-[#4F46E5] rounded-8 bg-[#EDEDFC] flex 
                   flex-col items-center sm:h-[97px] w-[200px] justify-center sm:py-64 py-36"
                    onClick={() => handleUploadFile}
                  >
                    {/* <div className="bg-[#EDEDFC] px-20 mb-10 border-[0.5px] border-solid border-[#4F46E5] rounded-6 min-h-[48px] flex items-center justify-between cursor-pointer"> */}
                    <span>
                      <img src={"../assets/images/logo/upload.png"} />
                    </span>
                    <label className="text-[16px] text-[#4F46E5] flex items-center cursor-pointer">
                      Upload File
                      <input
                        type="file"
                        style={{ display: "none" }}
                        multiple
                        accept=".pdf,.png,.jpg,.jpeg"
                        onChange={handleUploadFile}
                      />
                    </label>

                    {/* </div> */}
                    {/* {uploadedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="bg-[#F6F6F6] mb-10 px-10 rounded-6 min-h-[48px] flex items-center justify-between cursor-pointer"
                      >
                        <div className="bg-F6F6F6 mb-10 px-10 rounded-6 min-h-48 flex items-center justify-between cursor-pointer">
                          <span className="mr-4">
                            <PreviewIcon />
                          </span>
                          <span className="text-[16px] text-[#4F46E5] py-5">
                            {file.name}
                          </span>
                          <span onClick={() => handleRemoveFile(file)}>
                            <CrossGreyIcon />
                          </span>
                        </div>
                      </div>
                    ))} */}
                  </label>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>

      <div className="px-28 mb-[3rem]">
        <div className="bg-white rounded-lg shadow-sm"></div>
        <AddAgentModel
          isOpen={isOpenAddModal}
          setIsOpen={setIsOpenAddModal}
          isEditing={true}
        />
        <DeleteClient
          isOpen={isOpenDeletedModal}
          setIsOpen={setIsOpenDeletedModal}
          onDelete={() => handleDeleteAttachment(deleteId)}
          heading={"Delete Attachment"}
          description={"Are you sure you want to delete this attachment? "}
        />
      </div>
    </>
  );
}
