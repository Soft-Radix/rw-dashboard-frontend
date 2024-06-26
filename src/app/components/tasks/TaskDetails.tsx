import {
  Button,
  Grid,
  Menu,
  MenuItem,
  TableCell,
  Theme,
  Typography,
} from "@mui/material";
import { styled, useTheme } from "@mui/styles";
import { PlusIcon, ThreeDotsIcon } from "public/assets/icons/dashboardIcons";
import { useEffect, useState } from "react";
import TitleBar from "src/app/components/TitleBar";
import AddTaskModal from "src/app/components/tasks/AddTask";
import ThemePageTable from "src/app/components/tasks/TaskPageTable";
import RecentData from "../../components/client/clientAgent/RecentData";
import {
  Clock,
  DeleteGrey,
  DeleteIcon,
  DownGreenIcon,
  EditIcon,
  Token,
} from "public/assets/icons/common";
import { useNavigate, useParams } from "react-router";
import { getAgentInfo, getStatusList } from "app/store/Agent";
import { useAppDispatch } from "app/store/store";
import { useSelector } from "react-redux";
import { ClientRootState } from "app/store/Client/Interface";
import { Console } from "console";
import { AgentRootState } from "app/store/Agent/Interafce";
import moment from "moment";
// import { AudioVisualizer, LiveAudioVisualizer } from "react-audio-visualize";
import TaskDetailData from "./TaskDetailData";
import {
  ImportantTaskIcon,
  RightBorder,
  StatusIcon,
  TaskDelete,
} from "public/assets/icons/task-icons";
import SubTaskTable from "./SubTaskTable";
import task1 from "../../../../public/assets/images/pages/tasks/task-file1.png";
import task2 from "../../../../public/assets/images/pages/tasks/task-file2.png";
import screen from "../../../../public/assets/images/pages/tasks/task-screen.png";
import ImagesOverlap from "../ImagesOverlap";
import AddSubTaskModal from "./AddSubTaskModal";
import {
  deleteTask,
  TaskDetails as getTaskDetails,
  TaskDeleteAttachment,
  TaskStatusUpdate,
} from "app/store/Projects";
import { ProjectRootState } from "app/store/Projects/Interface";
import { LiveAudioVisualizer } from "react-audio-visualize";

import { useVoiceVisualizer, VoiceVisualizer } from "react-voice-visualizer";
import {
  AttachmentDeleteIcon,
  AttachmentIcon,
} from "public/assets/icons/supportIcons";
import DeleteClient from "../client/DeleteClient";
import ActionModal from "../ActionModal";
import toast from "react-hot-toast";
import DropdownMenu from "../Dropdown";
import CommonChip from "../chip";
import ListLoading from "@fuse/core/ListLoading";

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  padding: "8px 20px",
  minWidth: "250px",
}));
const TaskDetails = () => {
  const urlForImage = import.meta.env.VITE_API_BASE_IMAGE_URL;
  const { taskId } = useParams();
  const { projectId } = useParams();
  const dispatch = useAppDispatch();
  const { taskDetailInfo, fetchSatus } = useSelector(
    (store: ProjectRootState) => store.project
  );

  // console.log(" TaskDetail", taskDetailInfo);
  const formatTime = (time: any) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };
  const theme: Theme = useTheme();
  const [isOpenAddSubTaskModal, setIsOpenAddSubTaskModal] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [deleteId, setIsDeleteId] = useState<any>(null);
  const [isOpenDeletedModal, setIsOpenDeletedModal] = useState(false);
  const [statusMenu, setStatusMenu] = useState<HTMLElement | null>(null);
  const [expandedImage, setExpandedImage] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [statusMenuData, setStatusMenuData] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>(null);
  const [isOpenAddModal, setIsOpenAddModal] = useState<boolean>(false);
  const [disable, setDisabled] = useState(false);

  const [selectedStatusId, setSelectedStatusId] = useState(
    taskDetailInfo?.status
  );
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [type, setType] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const toggleDeleteModal = () => setOpenDeleteModal(!openDeleteModal);
  const toggleEditModal = () => {
    setIsOpenAddModal(true);
    if (openEditModal) {
      // formik.setFieldValue("name", originalTitle);
    } else {
      // setOriginalTitle(formik.values.name);
    }
    setOpenEditModal(!openEditModal);
  };
  useEffect(() => {
    dispatch(getStatusList({ id: projectId })).then((res) => {
      setStatusMenuData(res?.payload?.data?.data?.list);
    });
  }, [dispatch, taskDetailInfo]);

  const handleStatusMenuClick = (event) => {
    setStatusMenu(event.currentTarget);
  };

  useEffect(() => {
    if (!taskId) return null;
    dispatch(getTaskDetails(taskId));
  }, [dispatch]);

  const handleDeleteAttachment = async (id: number) => {
    // const { payload } = await dispatch(deleteAttachment({ attachment_id: id }));
    const { payload } = await dispatch(
      TaskDeleteAttachment({ type: type, file_id: id })
    );
    // // console.log(payload, "kklkkkl");
    if (payload?.data?.status) {
      dispatch(getTaskDetails(taskId));
    }
    setIsOpenDeletedModal(false);
  };

  const handleImageClick = (imageUrl) => {
    if (expandedImage === imageUrl) {
      setExpandedImage(null); // If already expanded, close it
    } else {
      setExpandedImage(imageUrl); // If not expanded, expand it
    }
  };
  const handleDelete = () => {
    if (taskId) {
      setDisabled(true);
      dispatch(deleteTask(taskId));
      navigate(
        `/projects/${taskDetailInfo.project_id}/${taskDetailInfo.project_name}`
      );
      // .unwrap()
      // .then((res) => {
      //   if (res?.data?.status == 1) {
      //     setOpenDeleteModal(false);
      //     callListApi(2);
      //     toast.success(res?.data?.message, {
      //       duration: 4000,
      //     });
      //     setDisabled(false);

      //   }
      // });
    }
  };
  const callListApi = (param: number) => {
    console.log("callListApi called with param:", param);
    dispatch(getTaskDetails(taskId));
    // Add actual logic here
  };
  const recorderControls = useVoiceVisualizer();
  const { recordedBlob, error } = recorderControls; // setPreloadedAudioBlob

  // Get the recorded audio blob
  useEffect(() => {
    if (!recordedBlob) return;

    console.log(recordedBlob);
  }, [recordedBlob, error]);

  // Get the error when it occurs
  useEffect(() => {
    if (!error) return;

    console.error(error);
  }, [error]);

  // console.log(
  //   urlForImage + taskDetailInfo?.voice_record_file,
  //   "urlForImage + taskDetailInfo?.voice_record_file454545"
  // );

  const fetchAudioBlob = async () => {
    try {
      const response = await fetch(
        "https://rcw-dev.s3.amazonaws.com/Tasks/76/1718098937245-rcw.mp3"
      );
      const audioData = await response.blob();
      return audioData;
    } catch (error) {
      console.error("Error fetching audio blob:", error);
      return null;
    }
  };
  useEffect(() => {
    fetchAudioBlob().then((audioBlob) => {
      if (audioBlob) {
        // Use the audioBlob as needed, for example, create a URL for it
        const audioUrl = URL.createObjectURL(audioBlob);
        console.log("Blob URL:", audioUrl);
        // setPreloadedAudioBlob(audioUrl);

        // You can now use audioUrl as the source for an audio element or for any other purpose
      }
    });
  }, []);
  const handleStatusMenuItemClick = (status) => {
    setSelectedStatus(status.name);
    setSelectedStatusId(status.id);
    const payload = {
      status: status.id,
      task_id: taskId,
    };
    dispatch(TaskStatusUpdate(payload));

    setStatusMenu(null); // Close the dropdown menu after selection
  };
  // if (fetchSatus === "loading") {
  //   <ListLoading />;
  // }
  const userDetails = JSON.parse(localStorage.getItem("userDetail"));
  // console.log(taskDetailInfo, "taskDetailInfo");
  return (
    <div>
      <TitleBar title="Task Details"></TitleBar>
      <div className="px-28 flex gap-20 flex-wrap lg:flex-nowrap pb-20">
        <div className="basis-full lg:basis-auto lg:grow w-[80%] ">
          <div className="shadow-md bg-white rounded-lg ">
            <div className="border border-[#E7E8E9] rounded-lg flex  justify-left gap-[30px] items-start p-[2rem] flex-col sm:flex-row relative">
              <div className="w-full">
                <div className="flex justify-between gap-40 mb-10  ">
                  <div
                    className="text-[20px] text-[#111827] font-600 inline-block overflow-x-hidden w-[80%] "
                    style={{ wordBreak: "break-all" }}
                  >
                    {taskDetailInfo?.title}
                  </div>
                  <div className="flex items-center  justify-end gap-20  bg-red-20 ">
                    <div className=" bg-[#EDEDFC] flex gap-10 py-10 px-20  items-center rounded-[28px] w-max">
                      <div className="text-[#4F46E5]">
                        <ImportantTaskIcon />
                      </div>
                      {/* {agentDetail?.status || "N/A"} */}
                      <div className="text-[#4F46E5] text-[16px] font-500 ">
                        {taskDetailInfo?.labels}
                      </div>
                    </div>
                    {/* <div className="flex justify-between gap-10 items-center"> */}

                    {userDetails?.role != "agent" && (
                      <div className="flex gap-4">
                        <span
                          id="basic-button"
                          aria-controls={open ? "basic-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? "true" : undefined}
                          onClick={handleClick}
                        >
                          <ThreeDotsIcon className="cursor-pointer" />
                        </span>
                        <Menu
                          id="basic-menu"
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                          MenuListProps={{
                            "aria-labelledby": "basic-button",
                          }}
                          transformOrigin={{
                            horizontal: "right",
                            vertical: "top",
                          }}
                          anchorOrigin={{
                            horizontal: "right",
                            vertical: "bottom",
                          }}
                        >
                          <MenuItem
                            onClick={() => {
                              handleClose();
                              toggleEditModal();
                            }}
                          >
                            <div className="flex gap-20 w-full justify-between ">
                              <p className="text-[16px] text-[#000000] font-500">
                                Edit
                              </p>
                              <span className="">
                                <EditIcon fill="#757982" />
                              </span>
                            </div>
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              handleClose();
                              toggleDeleteModal();
                            }}
                          >
                            <div className="flex gap-20  w-full justify-between">
                              <p className="text-[16px] text-[#000000] font-500">
                                {" "}
                                Delete
                              </p>
                              <span className="">
                                <DeleteGrey fill="#757982" />
                              </span>
                            </div>
                          </MenuItem>
                        </Menu>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex text-[14px] text-para_light my-10 font-400 ">
                  <div className="flex">
                    {/* <span>{agentDetail?.id || "N/A"}</span> */}
                    Due Date :&nbsp;
                    <span className="font-500 text-[#111827] text-[14px]">
                      {taskDetailInfo?.due_date_time
                        ? moment
                            .utc(taskDetailInfo?.due_date_time)
                            .format("MMMM Do, YYYY , h:mm A")
                        : "N/A"}
                    </span>{" "}
                  </div>
                </div>

                <div className="flex text-[2rem] text-para_light mt-4 gap-10 justify-between break-words ">
                  <Typography className="text-[#757982] font-400 text-[14px] w-4/5">
                    {taskDetailInfo?.description || "N/A"}
                  </Typography>
                </div>

                <div className="border-t mt-20">
                  <div className="flex items-center  border-gray-300 py-2 font-semibold text-gray-600 mt-5"></div>
                  <div className="flex items-center border-gray-200 py-2">
                    <div className="flex items-center w-1/4"></div>
                  </div>
                </div>

                <div className="flex w-4/5 justify-between items-center">
                  <div>
                    <div className="w-1/4 text-[#757982] font-500">
                      Priority
                    </div>
                    <div className="flex items-center w-1/4 ">
                      <span className="bg-[#FF5F152E] text-[#FF5F15] px-10 mt-10 whitespace-nowrap py-1  rounded-full  w-[70px] min-h-[25px] text-sm font-500 flex text-center items-center justify-center">
                        {taskDetailInfo?.priority || "N/A"}
                      </span>
                    </div>
                  </div>
                  <div>
                    <RightBorder />
                  </div>
                  <div>
                    <div className="w-1/4 text-[#757982] font-500">Status</div>
                    {userDetails?.role != "agent" && (
                      <div className="flex items-center w-1/4 ">
                        <span className=" mt-10 text-[14px] font-500 whitespace-nowrap">
                          {taskDetailInfo?.status
                            ? taskDetailInfo?.status
                              ? statusMenuData.find(
                                  (item) => item.id == taskDetailInfo?.status
                                )?.name
                              : "N/A"
                            : "N/A"}
                        </span>
                      </div>
                    )}
                    {userDetails?.role == "agent" && (
                      <DropdownMenu
                        anchorEl={statusMenu}
                        handleClose={() => setStatusMenu(null)}
                        button={
                          <CommonChip
                            onClick={handleStatusMenuClick}
                            // label={selectedStatus}
                            style={{ maxWidth: "200px" }}
                            label={
                              selectedStatusId
                                ? statusMenuData.find(
                                    (item) => item.id == selectedStatusId
                                  )?.name
                                : statusMenuData[0]?.name
                            }
                            icon={<StatusIcon />}
                          />
                        }
                        popoverProps={{
                          open: !!statusMenu,
                          classes: {
                            paper: "pt-10 pb-20",
                          },
                        }}
                      >
                        {statusMenuData?.map((item) => {
                          return (
                            <StyledMenuItem
                              key={item.id}
                              onClick={() => handleStatusMenuItemClick(item)}
                            >
                              {item.name}
                            </StyledMenuItem>
                          );
                          // console.log(item, "itezcfm");
                        })}
                      </DropdownMenu>
                    )}
                  </div>
                  <div>
                    <RightBorder />
                  </div>
                  <div>
                    <div className="w-1/4 text-[#757982] font-500">
                      Reminder
                    </div>
                    <div className="flex items-center w-1/4">
                      <span className=" mt-10 text-[14px] font-500 whitespace-nowrap">
                        {taskDetailInfo?.reminders
                          ? moment
                              .utc(taskDetailInfo?.reminders)
                              .format(" MMMM Do, YYYY , h:mm A")
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                  <div>
                    <RightBorder />
                  </div>
                  <div>
                    <div className="w-1/4 text-[#757982] font-500">
                      Assignees
                    </div>
                    <div className="flex mt-10">
                      {taskDetailInfo?.assigned_task_users
                        ?.slice(0, 3)
                        .map((item, index) => {
                          // console.log(item, "itemmmm");
                          return (
                            <img
                              className={`h-[34px] w-[34px] rounded-full border-2 border-white ${
                                taskDetailInfo?.assigned_task_users?.length > 1
                                  ? "ml-[-16px]"
                                  : ""
                              } z-0`}
                              src={
                                item.user_image
                                  ? urlForImage + item.user_image
                                  : "../assets/images/logo/images.jpeg"
                              }
                              alt={`User ${index + 1}`}
                            />
                          );
                        })}
                      {taskDetailInfo?.assigned_task_users?.length > 3 && (
                        <span
                          className="ml-[-16px] z-0 h-[34px] w-[34px] rounded-full border-2 border-white bg-[#4F46E5] flex 
                        items-center justify-center text-[12px] font-500 text-white"
                        >
                          +{taskDetailInfo?.assigned_task_users?.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-20 my-20 w-full">
                  <div className="relative w-1/2">
                    <Typography className="mb-10 font-500 text-[14px] text-[#000000]">
                      Files
                    </Typography>
                    <div className="flex gap-10  flex-wrap">
                      {taskDetailInfo?.task_files?.map((item) => {
                        // console.log(item, "itemmmm");
                        return (
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
                                      setType(3);
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
                                      setType(3);
                                      setIsDeleteId(item.id);
                                    }}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
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
                    </div>
                  </div>
                  <div className="w-1/2">
                    <div className="relative">
                      <Typography className="mb-10 font-500 text-[14px] text-[#000000]">
                        Screen Recording
                      </Typography>
                      {taskDetailInfo?.screen_record_file && (
                        <>
                          <video
                            src={
                              urlForImage + taskDetailInfo?.screen_record_file
                            }
                            controls
                            className="block w-full h-[200px]"
                          />
                          <div className="absolute top-[28px] right-0 mt-4 mr-4">
                            <AttachmentDeleteIcon
                              onClick={() => {
                                setIsOpenDeletedModal(true);
                                setType(2);
                                setIsDeleteId(taskId);
                              }}
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <Typography className="mb-10 font-500 text-[14px] text-[#000000]">
                    Voice Memo
                  </Typography>
                  {/* <div className="my-10 flex flex-col gap-[10px] audio-container "> */}
                  {/* <div
                      className="my-10 flex  gap-[10px] "
                      style={{ alignItems: "center" }}
                    > */}
                  {/* {recordingAudio ? ( */}
                  {/* <img
                        src="../assets/images/logo/play2.svg"
                        alt="play"
                        // onClick={handleAudioRecord} */}
                  {/* ></img> */}
                  {/* ) : ( */}
                  {/* <img
                        src="../assets/images/logo/pause.svg"
                        alt="pause"
                        // onClick={handleAudioRecord}
                      ></img>
                      {/* )} */}
                  {/* <p className="text-[#9DA0A6]"> */}{" "}
                  {/* {formatTime(recordingTime)} */}
                  {/* </p> */}
                  {/* </div> */}
                  {/* </div> */}
                </div>
                {/* <VoiceVisualizer
                  controls={recorderControls}
                  width={200}
                  height={200}
                  speed={3}
                  backgroundColor={"4f46E5"}
                  mainBarColor={"red"}
                  secondaryBarColor={"#5e5e5e"}
                  barWidth={2}
                  gap={1}
                  rounded={5}
                  isControlPanelShown={true}
                  isDownloadAudioButtonShown={false}
                  fullscreen={false}
                  onlyRecording={false}
                  animateCurrentPick={true}
                  isDefaultUIShown={true}
                  defaultAudioWaveIconColor={"#FFFFFF"}
                  defaultMicrophoneIconColor={"#FFFFFF"}
                  isProgressIndicatorShown={true}
                  isProgressIndicatorTimeShown={true}
                  isProgressIndicatorOnHoverShown={true}
                  isProgressIndicatorTimeOnHoverShown={true}
                /> */}
                {taskDetailInfo?.voice_record_file && (
                  <audio controls className="mb-10">
                    <source
                      src={urlForImage + taskDetailInfo?.voice_record_file}
                      type="audio/mp3"
                    />
                  </audio>
                )}

                {/* <LiveAudioVisualizer
                  mediaRecorder={}
                  width={300}
                  height={35}
                  barWidth={1}
                  gap={1}
                  barColor={"#4F46E5"}
                  smoothingTimeConstant={0.4}
                /> */}
                <div className="flex justify-between items-center">
                  <div className="text-[20px] font-600">Subtasks</div>
                  {userDetails?.role != "agent" && (
                    <Button
                      className="text-[16px] font-500 text-[#4F46E5] gap-10 "
                      onClick={() => setIsOpenAddSubTaskModal(true)}
                    >
                      <PlusIcon color={theme.palette.secondary.main} />
                      Add Subtask
                    </Button>
                  )}
                </div>
                {/* <div className="flex items-baseline justify-between w-full pt-0 pb-20 gap-31 my-10"></div> */}
              </div>
            </div>
            <SubTaskTable />
          </div>
        </div>
        <div className="basis-[320px] ">
          <TaskDetailData />
        </div>
        <AddSubTaskModal
          isOpen={isOpenAddSubTaskModal}
          setIsOpen={setIsOpenAddSubTaskModal}
        />
        <DeleteClient
          isOpen={isOpenDeletedModal}
          setIsOpen={setIsOpenDeletedModal}
          onDelete={() => handleDeleteAttachment(deleteId)}
          heading={"Delete Attachment"}
          description={"Are you sure you want to delete this attachment? "}
        />
        <ActionModal
          modalTitle="Delete Task"
          modalSubTitle="Are you sure you want to delete this task?"
          open={openDeleteModal}
          handleToggle={toggleDeleteModal}
          type="delete"
          onDelete={handleDelete}
          disabled={disable}
        />
        {isOpenAddModal && (
          <AddTaskModal
            isOpen={isOpenAddModal}
            setIsOpen={setIsOpenAddModal}
            ColumnId={taskId}
            callListApi={callListApi}
            project_id={projectId}
            Edit
          />
        )}
      </div>
    </div>
  );
};

export default TaskDetails;
