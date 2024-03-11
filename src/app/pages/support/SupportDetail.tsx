import {
  Button,
  Checkbox,
  Container,
  Grid,
  TableCell,
  TableRow,
  Theme,
} from "@mui/material";
import { useTheme } from "@mui/styles";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import FsLightbox from "fslightbox-react";

import {
  ArrowRightCircleIcon,
  DeleteIcon,
  EditIcon,
} from "public/assets/icons/common";
import {
  SupportAttachmentIcon,
  SupportLinkIcon,
  SupportProfileIcon,
} from "public/assets/icons/supportIcons";

import { PlusIcon } from "public/assets/icons/dashboardIcons";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import TitleBar from "src/app/components/TitleBar";
import InputField from "src/app/components/InputField";
import CommonTable from "src/app/components/commonTable";
import CommonPagination from "src/app/components/pagination";
import AddNewTicket from "src/app/components/support/AddNewTicket";

import AddUserModal from "src/app/components/users/AddUser";
import styled from "styled-components";
import Paper from "@mui/material/Paper";
import CustomButton from "src/app/components/custom_button";

const rows = [
  {
    ticket: "1542145611525",
    subject: "Web page design",
    status: "In Progress",
    department: "Account Manager",
    date: "Feb 12,2024",
  },
  {
    ticket: "1542145611525",
    subject: "Web page design",
    status: "In Review",
    department: "Account Manager",
    date: "Feb 12,2024",
  },
  {
    ticket: "1542145611525",
    subject: "Web page design",
    status: "Completed",
    department: "Account Manager",
    date: "Feb 12,2024",
  },
  {
    ticket: "1542145611525",
    subject: "Web page design",
    status: "In Progress",
    department: "Account Manager",
    date: "Feb 12,2024",
  },
  {
    ticket: "1542145611525",
    subject: "Web page design",
    status: "In Review",
    department: "Account Manager",
    date: "Feb 12,2024",
  },
  {
    ticket: "1542145611525",
    subject: "Web page design",
    status: "Completed",
    department: "Account Manager",
    date: "Feb 12,2024",
  },
  {
    ticket: "1542145611525",
    subject: "Web page design",
    status: "In Progress",
    department: "Account Manager",
    date: "Feb 12,2024",
  },
  {
    ticket: "1542145611525",
    subject: "Web page design",
    status: "In Review",
    department: "Account Manager",
    date: "Feb 12,2024",
  },
  {
    ticket: "1542145611525",
    subject: "Web page design",
    status: "Completed",
    department: "Account Manager",
    date: "Feb 12,2024",
  },
];

export default function Support() {
  const [expandedImage, setExpandedImage] = useState(null);
  const theme: Theme = useTheme();
  const formik = useFormik({
    initialValues: {
      role: "",
      verification: "",
    },
    // validationSchema: validationSchemaProperty,
    onSubmit: (values) => {},
  });

  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [filterMenu, setFilterMenu] = useState<HTMLElement | null>(null);
  const [isOpenSupportDetail, setIsOpenDetailPage] = useState<boolean>(false);
  const handleImageClick = (imageUrl) => {
    if (expandedImage === imageUrl) {
      setExpandedImage(null); // If already expanded, close it
    } else {
      setExpandedImage(imageUrl); // If not expanded, expand it
    }
  };

  return (
    <>
      <div className="px-32">
        <TitleBar title="Support Detail">
          <Button
            variant="outlined"
            color="secondary"
            className="h-[40px] text-[16px] flex gap-8"
            aria-label="Add Tasks"
            size="large"
            onClick={() => setIsOpenAddModal(true)}
          >
            <PlusIcon color={theme.palette.secondary.main} />
            New Ticket
          </Button>
        </TitleBar>
      </div>
      <div className="px-40">
        <Grid container spacing={3} className="sm:px-10  xs:px-10 ">
          <Grid item xs={12} sm={8} md={9} className="">
            <div className=" flex flex-col gap-10 py-32 bg-[#FFFFFF] md:h-screen px-32 rounded-12 xs:px-10 xs:h-auto sm:h-auto">
              <div className="flex gap-8  items-end px-20 ">
                <span className="text-xl text-[#111827] font-bold">
                  1542145611525
                </span>
                <span className="text-[12px] text-[#757982]">Ticket ID</span>
              </div>
              <div className="px-20">
                <span className="text-[14px] text-[#757982]">Due Date</span>
                <span className="text-[#111827]">
                  {" "}
                  : Feb 12, 2024, 11:30 AM
                </span>
              </div>
              <div className="flex px-20">
                <span className="text-[14px] text-[#757982]"> Subject </span>
                <span> : Web page design</span>
              </div>
              <div className="flex items-center justify-start gap-31 my-20 py-20 border-t border-b border-solid border-[#EDF2F6]  mx-20 w-full">
                <div className="flex flex-col gap-7 border-r border-solid border-[#EDF2F6] pr-10 pl-5 ">
                  <div className="text-[14px] text-[#757982]">Status</div>
                  <Button
                    variant="outlined"
                    className="h-20 rounded-3xl min-h-24 text-[#FF5F15] bg-[#ffe2d5] border-none mt-10"
                  >
                    In Progress
                  </Button>
                </div>
                <div className="flex flex-col gap-20 items-start  px-20">
                  <span className="text-[14px] text-[#757982]">
                    {" "}
                    Department
                  </span>
                  <span className="text-[#111827] font-400 mb-5">
                    Account Manager
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-9 px-20">
                <div className="text-[#111827] font-500 ">Attachment</div>
                <div className="flex py-5 gap-10 ">
                  <div>
                    <img
                      src="../assets/images/pages/supportDetail/blackAttachment.png"
                      alt="Black Attachment"
                      onClick={() =>
                        handleImageClick(
                          "../assets/images/pages/supportDetail/blackAttachment.png"
                        )
                      }
                    />
                  </div>
                  <div>
                    <img
                      src="../assets/images/pages/supportDetail/whiteAttachment.png"
                      alt="White Attachment"
                      onClick={() =>
                        handleImageClick(
                          "../assets/images/pages/supportDetail/whiteAttachment.png"
                        )
                      }
                    />
                  </div>
                  {expandedImage && (
                    <div
                      className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-80 z-50"
                      onClick={() => setExpandedImage(null)}
                    >
                      <img
                        src={expandedImage}
                        alt="Expanded Image"
                        className="max-w-full max-h-full"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Grid>

          <Grid item xs={12} sm={4} md={3}>
            <div className="flex items-end justify-between flex-col py-20 px-10 bg-[#FFFFFF] md:h-screen rounded-12 xs:auto sm:auto xs:gap-[30px] ">
              <div className="w-full h-[6rem] bg-[#2c334c] rounded-t-xl flex">
                <div className="flex justify-start items-center gap-10 px-10">
                  <span className="flex items-center justify-center py-5">
                    <SupportProfileIcon />
                  </span>
                  <span className="text-[#FFFFFF]">Client Name</span>
                </div>
              </div>
              <div className="w-full h-40 flex items-center px-3 py-3">
                <div className="flex w-3/4 justify-between p-10 rounded-md">
                  <span>Write a comment....</span>
                  <span>
                    <SupportAttachmentIcon />
                  </span>
                </div>
                <span className="">
                  <SupportLinkIcon />
                </span>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>

      <div className="px-28 mb-[3rem]">
        <div className="shadow-sm bg-white rounded-lg"></div>
        <AddNewTicket isOpen={isOpenAddModal} setIsOpen={setIsOpenAddModal} />
      </div>
    </>
  );
}
