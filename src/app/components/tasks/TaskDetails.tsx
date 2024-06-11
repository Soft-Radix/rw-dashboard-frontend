import {
  Button,
  Grid,
  Menu,
  MenuItem,
  TableCell,
  Theme,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/styles";
import { PlusIcon, ThreeDotsIcon } from "public/assets/icons/dashboardIcons";
import { useEffect, useState } from "react";
import TitleBar from "src/app/components/TitleBar";
import AddTaskModal from "src/app/components/tasks/AddTask";
import ThemePageTable from "src/app/components/tasks/TaskPageTable";
import RecentData from "../../components/client/clientAgent/RecentData";
import { Clock, DownGreenIcon, Token } from "public/assets/icons/common";
import { useParams } from "react-router";
import { getAgentInfo } from "app/store/Agent";
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
  TaskDelete,
} from "public/assets/icons/task-icons";
import SubTaskTable from "./SubTaskTable";
import task1 from "../../../../public/assets/images/pages/tasks/task-file1.png";
import task2 from "../../../../public/assets/images/pages/tasks/task-file2.png";
import screen from "../../../../public/assets/images/pages/tasks/task-screen.png";
import ImagesOverlap from "../ImagesOverlap";
import AddSubTaskModal from "./AddSubTaskModal";
import { deleteTask, TaskDetails as getTaskDetails } from "app/store/Projects";
import { ProjectRootState } from "app/store/Projects/Interface";
import { LiveAudioVisualizer } from "react-audio-visualize";
import {
  AttachmentDeleteIcon,
  AttachmentIcon,
} from "public/assets/icons/supportIcons";
import DeleteClient from "../client/DeleteClient";
import ActionModal from "../ActionModal";
import toast from "react-hot-toast";

const TaskDetails = () => {
  const urlForImage = import.meta.env.VITE_API_BASE_IMAGE_URL;
  const { taskId } = useParams();
  const dispatch = useAppDispatch();
  const { taskDetailInfo } = useSelector(
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
  const [deleteId, setIsDeleteId] = useState<number>(null);
  const [isOpenDeletedModal, setIsOpenDeletedModal] = useState(false);
  const [expandedImage, setExpandedImage] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isOpenAddModal, setIsOpenAddModal] = useState<boolean>(false);
  const [disable, setDisabled] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
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
    if (!taskId) return null;
    dispatch(getTaskDetails(taskId));
  }, [dispatch]);
  const handleDeleteAttachment = async (id: number) => {
    // const { payload } = await dispatch(deleteAttachment({ attachment_id: id }));
    // // console.log(payload, "kklkkkl");
    // if (payload?.data?.status) {
    //   dispatch(getAgentInfo({ agent_id }));
    // }
    // setIsOpenDeletedModal(false);
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
      dispatch(deleteTask(taskId))
        .unwrap()
        .then((res) => {
          if (res?.data?.status == 1) {
            setOpenDeleteModal(false);
            callListApi(2);
            toast.success(res?.data?.message, {
              duration: 4000,
            });
            setDisabled(false);
          }
        });
    }
  };
  const callListApi = (param: number) => {
    console.log("callListApi called with param:", param);
    // Add actual logic here
  };
  return (
    <div>
      <TitleBar title="Task Details"></TitleBar>

      <div className="px-28 flex gap-20 flex-wrap lg:flex-nowrap pb-20">
        <div className="basis-full lg:basis-auto lg:grow">
          <div className="shadow-md bg-white rounded-lg">
            <div className="border border-[#E7E8E9] rounded-lg flex  justify-left gap-[30px] items-start p-[2rem] flex-col sm:flex-row relative">
              <div className="w-full">
                <div className="flex items-center justify-between gap-40 mb-10">
                  <span className="text-[20px] text-[#111827] font-600 inline-block">
                    Brand logo design
                  </span>
                  <div className="flex items-center gap-20">
                    <Button className="text-[#4F46E5] bg-[#EDEDFC] flex gap-10 py-10 px-20">
                      {/* {agentDetail?.status || "N/A"} */}
                      <ImportantTaskIcon />
                      Important Task
                    </Button>
                    {/* <div className="flex justify-between gap-10 items-center"> */}

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
                          Edit Task
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            handleClose();
                            toggleDeleteModal();
                          }}
                        >
                          Delete Task
                        </MenuItem>
                      </Menu>
                    </div>
                  </div>
                </div>

                <div className="flex text-[14px] text-para_light my-10 font-400 ">
                  <div className="flex">
                    {/*  <span>{agentDetail?.id || "N/A"}</span> */}
                    Due Date:{" "}
                    <span className="font-500 text-[#111827] text-[14px]">
                      {taskDetailInfo?.due_date_time
                        ? moment(taskDetailInfo?.due_date_time).format(
                            "MMMM Do, YYYY"
                          )
                        : "N/A"}
                    </span>{" "}
                  </div>
                </div>

                <div className="flex text-[2rem] text-para_light mt-4 gap-10 justify-between ">
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
                    <div className="flex items-center w-1/4 ">
                      <span className=" mt-10 text-[14px] font-500 whitespace-nowrap">
                        {taskDetailInfo?.status || "N/A"}
                      </span>
                    </div>
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
                          ? moment(taskDetailInfo?.reminders).format(
                              "MMMM Do, YYYY"
                            )
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
                    <div className="flex -space-x-2 mt-10">
                      {taskDetailInfo?.assigned_task_users?.map((item) => {
                        // console.log(item, "itemmmm");
                        return (
                          <img
                            className="w-28 h-28 rounded-full border-2 border-white"
                            src={
                              item.user_image
                                ? urlForImage + item.user_image
                                : "../assets/images/logo/images.jpeg"
                            }
                            alt="User 1"
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="flex gap-20 my-20 w-full">
                  <div className="relative w-1/2">
                    <Typography className="mb-10">Files</Typography>
                    {taskDetailInfo?.task_files?.map((item) => {
                      // console.log(item, "itemmmm");
                      return (
                        <div className="flex gap-4">
                          <div className="relative w-full">
                            <img
                              src={urlForImage + item.file}
                              alt=""
                              className="block w-full h-[200px]"
                            />
                            <div
                              className="absolute top-7 left-7"
                              onClick={() =>
                                handleImageClick(urlForImage + item.file)
                              }
                            >
                              <AttachmentIcon />
                            </div>
                            <div className="absolute top-0 right-0 mt-4 mr-4 cursor-pointer">
                              <AttachmentDeleteIcon
                                onClick={() => {
                                  setIsOpenDeletedModal(true);
                                  setIsDeleteId(item.id);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="w-1/2">
                    <div className="relative">
                      <Typography className="mb-10">
                        Screen Recording
                      </Typography>
                      <div className="relative">
                        <video
                          src={urlForImage + taskDetailInfo?.screen_record_file}
                          // alt="screen recorder"
                          className="block w-full h-[200px]"
                        />

                        <div className="absolute top-0 right-0 mt-4 mr-4">
                          <AttachmentDeleteIcon
                            onClick={() => {
                              setIsOpenDeletedModal(true);
                              // setIsDeleteId(item.id);
                            }}
                          />
                        </div>
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
                  </div>
                </div>

                <div>
                  <Typography className="mb-10">Voice Memo</Typography>
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
                <audio controls>
                  <source
                    src={urlForImage + taskDetailInfo?.voice_record_file}
                    type="audio/mp3"
                  />
                </audio>

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
                  <Button
                    className="text-[16px] font-500 text-[#4F46E5] gap-10 "
                    onClick={() => setIsOpenAddSubTaskModal(true)}
                  >
                    <PlusIcon color={theme.palette.secondary.main} />
                    Add Subtask
                  </Button>
                </div>
                {/* <div className="flex items-baseline justify-between w-full pt-0 pb-20 gap-31 my-10"></div> */}
              </div>
            </div>
            <SubTaskTable />
          </div>
        </div>
        <div className="basis-[470px]">
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
          // disabled={disable}
        />
        {isOpenAddModal && (
          <AddTaskModal
            isOpen={isOpenAddModal}
            setIsOpen={setIsOpenAddModal}
            ColumnId={taskId}
            callListApi={callListApi}
            Edit
          />
        )}
      </div>
    </div>
  );
};

export default TaskDetails;
