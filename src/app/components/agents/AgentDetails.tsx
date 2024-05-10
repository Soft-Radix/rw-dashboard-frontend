import {
  Button,
  Grid,
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
import { changeFetchStatus, getAgentInfo } from "app/store/Agent";
import { AgentRootState } from "app/store/Agent/Interafce";
import { useAppDispatch } from "app/store/store";
import { ArrowRightCircleIcon, EditIcon } from "public/assets/icons/common";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import TitleBar from "src/app/components/TitleBar";
import AddNewTicket from "src/app/components/support/AddNewTicket";
import ImagesOverlap from "../ImagesOverlap";
import CommonTable from "../commonTable";

let images = ["female-01.jpg", "female-02.jpg", "female-03.jpg"];
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

export default function AgentDetails() {
  const theme: Theme = useTheme();
  const { agent_id } = useParams();
  const dispatch = useAppDispatch();
  const { agentDetail, fetchStatus } = useSelector(
    (store: AgentRootState) => store?.agent
  );
  // console.log(agentDetail, "agent");

  const [expandedImage, setExpandedImage] = useState(null);

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
    dispatch(getAgentInfo({ agent_id }));
    return () => {
      dispatch(changeFetchStatus());
    };
  }, []);

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
            <div className="flex flex-col gap-10 p-20 bg-[#FFFFFF] h-auto md:h-[calc(100vh-164px)] sm:h-auto  rounded-12 xs:px-20 ">
              <div className="border border-[#E7E8E9] rounded-lg flex   justify-between gap-[30px] items-start p-[2rem] flex-col sm:flex-row">
                <div className="flex gap-20 flex-wrap">
                  <div className="h-[100px] w-[100px] sm:h-[100px] sm:w-[99px] rounded-full overflow-hidden ">
                    <img src="../assets/images/pages/agent/luis_.jpg" />
                  </div>
                  <div className="">
                    <div className="flex items-center gap-[7rem] mb-10">
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
                    <div className="flex text-[2rem] text-para_light flex-col sm:flex-row gap-[20px]">
                      <div className="flex">
                        <img src="../assets/icons/group.svg" className="mr-4" />

                        <span>#2367055342</span>
                      </div>
                      <div className="flex smpx-20">
                        <span>
                          <img
                            src="../assets/icons/ri_time-line.svg"
                            className="sm:mr-4"
                          />{" "}
                        </span>
                        <span>{agentDetail?.phone_number || "N/A"}</span>
                      </div>
                    </div>

                    <div className="flex items-baseline justify-start w-full py-20 gap-28 flex-col sm:flex-row">
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
                <Button className="cursor-pointer flex rounded-full py-[1rem] px-[2rem] text-secondary bg-secondary_bg w-max gap-[20px] text-lg font-600 items-center ">
                  Edit
                  <EditIcon fill="#4F46E5" />
                </Button>
              </div>
              <div className="flex flex-col px-20 my-[2rem] gap-9">
                <div className="text-2xl text-title font-600">Attachment</div>
                <div className="flex gap-10 py-5 flex-wrap">
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
                      className=" w-[200px] rounded-md sm:h-[130px]"
                    />
                    <div className="absolute top-7 left-7">
                      <AttachmentIcon />
                    </div>
                    <div className="absolute top-7 right-7">
                      <AttachmentDeleteIcon />
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
                      className=" w-[200px] rounded-md sm:h-[130px] "
                    />
                    <div className="absolute top-7 left-7">
                      <AttachmentIcon />
                    </div>
                    <div className="absolute top-7 right-7">
                      <AttachmentDeleteIcon />
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
                  <div
                    className=" cursor-pointer border-[0.5px] border-[#4F46E5] rounded-8 bg-[#EDEDFC] flex 
                  flex-col items-center sm:h-[97px] w-[200px] justify-center sm:py-64 py-36"
                  >
                    <div>
                      <AttachmentUploadIcon />
                    </div>
                    <Typography className="text-[16px] text-[#4F46E5]">
                      Upload File
                    </Typography>
                  </div>
                </div>
              </div>
              <div className="border-1 border-[#EDF2F6] rounded-6 py-20 mt-10">
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
        </Grid>
      </div>

      <div className="px-28 mb-[3rem]">
        <div className="bg-white rounded-lg shadow-sm"></div>
        <AddNewTicket isOpen={isOpenAddModal} setIsOpen={setIsOpenAddModal} />
      </div>
    </>
  );
}
