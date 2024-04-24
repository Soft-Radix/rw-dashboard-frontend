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
import { useEffect, useState } from "react";
import TitleBar from "src/app/components/TitleBar";
import AddNewTicket from "src/app/components/support/AddNewTicket";
import ImagesOverlap from "../ImagesOverlap";
import { useParams } from "react-router";
import { getAgentInfo } from "app/store/Agent";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "app/store/store";
import { useSelector } from "react-redux";
import { AgentRootState } from "app/store/Agent/Interafce";

let images = ["female-01.jpg", "female-02.jpg", "female-03.jpg"];

export default function AgentDetails() {
  const { agent_id } = useParams();
  const dispatch = useAppDispatch();
  const agentDetail = useSelector(
    (store: AgentRootState) => store?.agent.agentDetail
  );
  console.log(agentDetail, "hghghg");

  const [expandedImage, setExpandedImage] = useState(null);
  const theme: Theme = useTheme();

  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const handleImageClick = (imageUrl) => {
    if (expandedImage === imageUrl) {
      setExpandedImage(null); // If already expanded, close it
    } else {
      setExpandedImage(imageUrl); // If not expanded, expand it
    }
  };
  useEffect(() => {
    if (!agent_id) return null;
    console.log(agent_id, "iddd");
    dispatch(getAgentInfo({ agent_id }));
  }, []);

  return (
    <>
      <div className="px-16">
        <TitleBar title="Agent Profile"> </TitleBar>
      </div>
      <div className="px-40 xs:px-10">
        <Grid container spacing={3} className="sm:px-10 xs:px-10 ">
          <Grid item xs={12} sm={12} md={9} className="">
            <div className="flex flex-col gap-10 p-20 bg-[#FFFFFF] h-auto md:h-[calc(100vh-164px)] sm:h-auto  rounded-12 xs:px-20 ">
              <div className="border border-[#E7E8E9] rounded-lg flex  justify-start gap-[30px] items-start p-[2rem] flex-col sm:flex-row">
                <div className="h-[100px] w-[100px] sm:h-[100px] sm:w-[126px] rounded-full overflow-hidden">
                  <img src="../assets/images/pages/agent/luis_.jpg" />
                </div>
                <div>
                  <div className="flex items-center gap-40 mb-10">
                    <span className="text-[24px] text-[#111827] font-semibold inline-block">
                      {agentDetail?.first_name + " " + agentDetail?.last_name}
                    </span>
                    <Button
                      variant="outlined"
                      className="h-20 rounded-3xl  text-[#FF5F15] bg-[#ffe2d5] border-none sm:min-h-24 leading-none"
                    >
                      {agentDetail?.status || "N/A"}
                    </Button>
                  </div>
                  <div className="flex text-[2rem] text-para_light ">
                    <div className="flex">
                      <img src="../assets/icons/group.svg" className="mr-4" />

                      <span>#2367055342</span>
                    </div>
                    <div className="flex px-20">
                      <span>
                        <img
                          src="../assets/icons/ri_time-line.svg"
                          className="mr-4"
                        />{" "}
                      </span>
                      <span>{agentDetail?.phone_number || "N/A"}</span>
                    </div>
                  </div>

                  <div className="flex items-baseline justify-start w-full py-20 gap-31">
                    <div className="flex flex-col pr-10 gap-7 ">
                      <span className="text-[1.8rem] text-title font-500 w-max">
                        Assigned Clients
                      </span>
                      <div className="pl-14">
                        <ImagesOverlap images={images} alignLeft={true} />
                      </div>
                    </div>
                    <div className="flex flex-col items-start w-8/12 gap-7">
                      <span className="text-[1.8rem] text-title font-500">
                        Address
                      </span>
                      <span className=" text-[#757982]  text-[2rem] font-400 mb-5 flex ">
                        <img
                          src="../assets/icons/loaction.svg"
                          className="mr-4"
                        />
                        {agentDetail?.address || "N/A"}
                        {/* Akshya Nagar 1st Block 1st Cross, Rammurthy,
                        Bangalore-560016 */}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col px-20 mt-[2rem] gap-9">
                <div className="text-2xl text-title font-600">Attachment</div>
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

          {/* <Grid item xs={12} sm={4} md={3}>
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
                    </Grid> */}
        </Grid>
      </div>

      <div className="px-28 mb-[3rem]">
        <div className="bg-white rounded-lg shadow-sm"></div>
        <AddNewTicket isOpen={isOpenAddModal} setIsOpen={setIsOpenAddModal} />
      </div>
    </>
  );
}
