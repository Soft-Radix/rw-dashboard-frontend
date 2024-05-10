import { Button, Grid, Theme } from "@mui/material";
import { useTheme } from "@mui/styles";
import { useFormik } from "formik";

import {
  AttachmentIcon,
  SupportAttachmentIcon,
  SupportLinkIcon,
  SupportProfileIcon,
} from "public/assets/icons/supportIcons";

import { PlusIcon } from "public/assets/icons/dashboardIcons";
import { useState } from "react";
import TitleBar from "src/app/components/TitleBar";
import AddNewTicket from "src/app/components/support/AddNewTicket";

export default function Support() {
  const [expandedImage, setExpandedImage] = useState(null);
  const theme: Theme = useTheme();
  const formik = useFormik({
    initialValues: {
      role: "",
      verification: "",
    },
    // validationSchema: validationSchemaProperty,
    onSubmit: (values) => { },
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
      <div className="px-16">
        <TitleBar title="Support Detail">
          <Button
            variant="outlined"
            color="secondary"
            className="h-[40px] text-[16px] flex gap-8  leading-5 px-5 sm:px-24"
            aria-label="Add Tasks"
            size="large"
            onClick={() => setIsOpenAddModal(true)}
          >
            <PlusIcon color={theme.palette.secondary.main} />
            New Ticket
          </Button>
        </TitleBar>
      </div>
      <div className="px-40 xs:px-10">
        <Grid container spacing={3} className="sm:px-10 xs:px-10 ">
          <Grid item xs={12} sm={8} md={9} className="">
            <div className=" flex flex-col gap-10 py-32 bg-[#FFFFFF] md:h-screen px-32 rounded-12 xs:px-10 xs:h-auto sm:h-auto">
              <div className="flex items-end gap-8 px-20 ">
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
                    className="h-20 rounded-3xl  text-[#FF5F15] bg-[#ffe2d5] border-none mt-10 sm:min-h-24 leading-none"
                  >
                    In Progress
                  </Button>
                </div>
                <div className="flex flex-col items-start gap-20 px-20">
                  <span className="text-[14px] text-[#757982]">Department</span>
                  <span className="text-[#111827] font-400 mb-5">
                    Account Manager
                  </span>
                </div>
              </div>
              <div className="flex flex-col px-20 gap-9">
                <div className="text-[#111827] font-500 ">Attachment</div>
                <div className="flex gap-10 py-5 ">
                  <div
                    className="relative cursor-pointer "
                    onClick={() =>
                      handleImageClick(
                        "../assets/images/pages/supportDetail/black.png"
                      )
                    }
                  >
                    <img
                      src="../assets/images/pages/supportDetail/black.png"
                      alt="Black Attachment"
                      className="h-[97px] w-[200px] rounded-md sm:h-[130px]"
                    />
                    <div className="absolute top-5 right-5">
                      <AttachmentIcon />
                    </div>
                  </div>
                  <div
                    className="relative cursor-pointer"
                    onClick={() =>
                      handleImageClick(
                        "../assets/images/pages/supportDetail/white.jpeg"
                      )
                    }
                  >
                    <img
                      src="../assets/images/pages/supportDetail/white.jpeg"
                      alt="White Attachment"
                      className="h-[97px] w-[200px] rounded-md sm:h-[130px] "
                    />
                    <div className="absolute top-5 right-5">
                      <AttachmentIcon />
                    </div>
                  </div>
                  {expandedImage && (
                    <div
                      className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-80"
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
                <div className="flex items-center justify-start gap-10 px-10">
                  <span className="flex items-center justify-center py-5">
                    <SupportProfileIcon />
                  </span>
                  <span className="text-[#FFFFFF]">Client Name</span>
                </div>
              </div>
              <div className="flex items-center w-full h-40 px-3 py-3">
                <div className="flex justify-between w-3/4 p-10 rounded-md">
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
        <div className="bg-white rounded-lg shadow-sm"></div>
        <AddNewTicket isOpen={isOpenAddModal} setIsOpen={setIsOpenAddModal} />
      </div>
    </>
  );
}
