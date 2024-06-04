import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import {
  Button,
  FormLabel,
  Grid,
  Hidden,
  MenuItem,
  Typography,
  styled,
} from "@mui/material";
import { useFormik } from "formik";
import {
  AssignIcon,
  MicIcon,
  PriorityIcon,
  ReminderIcon,
  ScreenRecordingIcon,
  StatusIcon,
  UploadIcon,
} from "public/assets/icons/task-icons";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import CommonModal from "../CommonModal";
import DropdownMenu from "../Dropdown";
import InputField from "../InputField";
import CommonChip from "../chip";
import CustomButton from "../custom_button";
import { CrossGreyIcon } from "public/assets/icons/common";

interface IProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  padding: "8px 20px",
  minWidth: "250px",
}));

function AddTaskModal({ isOpen, setIsOpen }: IProps) {
  const [dateTimeMenu, setDateTimeMenu] = useState<HTMLElement | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("Due Date & Time");

  const [priorityMenu, setPriorityMenu] = useState<HTMLElement | null>(null);
  const [showReminder, setShowReminder] = useState<HTMLElement | null>(null);
  const [selectedPriority, setSelectedPriority] = useState<string>("Priority");
  const [statusMenu, setStatusMenu] = useState<HTMLElement | null>(null);
  const [labelsMenu, setLabelsMenu] = useState<HTMLElement | null>(null);
  const [selectedlabel, setSelectedlabel] = useState<string>("Labels");
  const [showLabelForm, setShowLabelForm] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("Status");
  const [isRecording, setIsRecording] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    onSubmit: (values) => {},
  });

  const dateTimeMenuData = [
    { label: "In 1 business day" },
    { label: "In 2 business days" },
    { label: "In 3 business days" },
    { label: "In 1 week" },
    { label: "In 2 week" },
    { label: "In 1 month" },
    { label: "In 3 months" },
    { label: "In 6 months" },
  ];
  const priorityMenuData = [
    { label: "Medium" },
    { label: "High" },
    { label: "Low" },
  ];
  const statusMenuData = [
    { label: "To Do" },
    { label: "In Progress" },
    { label: "In Review" },
    { label: "Completed" },
  ];
  const labelsMenuData = [
    { label: "Important Task" },
    { label: "High Priority" },
    { label: "Medium Priority" },
    { label: "Responsive" },
  ];
  const handleAddLabel = () => {
    setShowLabelForm(true);
  };
  useEffect(() => {
    if (labelsMenu) {
      setShowLabelForm(false);
    }
  }, [labelsMenu]);
  const handleStatusMenuClick = (event) => {
    setStatusMenu(event.currentTarget);
  };

  const handleStatusMenuItemClick = (status) => {
    setSelectedStatus(status);
    setStatusMenu(null); // Close the dropdown menu after selection
  };
  const handlePriorityMenuClick = (data) => {
    setSelectedPriority(data);
    setPriorityMenu(null); // Close the dropdown priority menu after selection
  };
  const videoRef = useRef(null);

  // const handleRecordClick = async () => {
  //   try {
  //     const stream = await navigator.mediaDevices.getDisplayMedia({
  //       video: true,
  //       // screen: true,
  //       audio: false,
  //     });

  //     const mime = MediaRecorder.isTypeSupported("video/webm; codecs=vp8")
  //       ? "video/webm; codecs=vp8"
  //       : "video/webm";

  //     const mediaRecorder = new MediaRecorder(stream, {
  //       mimeType: mime,
  //     });

  //     const chunks = [];
  //     mediaRecorder.addEventListener("dataavailable", (e) => {
  //       if (e.data.size > 0) {
  //         chunks.push(e.data);
  //       }
  //     });

  //     mediaRecorder.addEventListener("stop", () => {
  //       setIsRecording((prevState) => !prevState);
  //       const blob = new Blob(chunks, {
  //         type: chunks[0].type,
  //       });
  //       const url = URL.createObjectURL(blob);

  //       if (videoRef.current) {
  //         videoRef.current.src = url;
  //       }

  //       // const a = document.createElement("a");
  //       // a.href = url;
  //       // a.download = "video.webm";
  //       // a.click();
  //     });

  //     // Start the recorder manually
  //     mediaRecorder.start();
  //   } catch (error) {
  //     console.error("Error accessing screen:", error);
  //   }
  // };

  const handleRecordClick = async () => {
    let stream;

    try {
      stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false,
      });
      setIsRecording(true);
      const mime = MediaRecorder.isTypeSupported("video/webm; codecs=vp8")
        ? "video/webm; codecs=vp8"
        : "video/webm";

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: mime,
      });

      const chunks = [];
      mediaRecorder.addEventListener("dataavailable", (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      });

      mediaRecorder.addEventListener("stop", () => {
        const blob = new Blob(chunks, {
          type: chunks[0].type,
        });
        const url = URL.createObjectURL(blob);

        if (videoRef.current) {
          videoRef.current.src = url;
        }
        setIsRecording(false);
        setShowVideo(true);
      });

      mediaRecorder.addEventListener("error", (error) => {
        console.error("MediaRecorder Error:", error);
      });

      // Listen for the stream's inactive event
      stream.getVideoTracks()[0].oninactive = () => {
        setIsRecording(false);
        console.log("User clicked cancel or ended screen share");
      };

      // Start the recorder manually
      mediaRecorder.start();
    } catch (error) {
      console.error("Error accessing screen:", error);
    }

    // Listen for the user's cancellation of screen sharing
    if (!stream) {
      setIsRecording(false);
      console.log("User canceled screen share");
    }
  };
  // useEffect(() => {
  //   let timerInterval;

  //   if (isRecording) {
  //     const startTime = Date.now() - elapsedTime;
  //     timerInterval = setInterval(() => {
  //       const elapsedTimeSeconds = Math.floor((Date.now() - startTime) / 1000);
  //       setElapsedTime(elapsedTimeSeconds);
  //     }, 1000);
  //   } else {
  //     clearInterval(timerInterval);
  //   }

  //   return () => clearInterval(timerInterval);
  // }, [isRecording, elapsedTime]);

  const toggleRecording = () => {
    // mediaRecorder.stop();
    setShowVideo(true);
    setIsRecording(false);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };
  return (
    <CommonModal
      open={isOpen}
      handleToggle={() => setIsOpen(false)}
      modalTitle="Add Task"
      maxWidth="910"
      btnTitle="Save"
      closeTitle="Close"
    >
      <div className="flex flex-col gap-20">
        <InputField
          formik={formik}
          name="title"
          label="Title"
          placeholder="Enter Title"
        />
        <InputField
          formik={formik}
          name="description"
          label="Description"
          placeholder="Enter Description"
          multiline
          rows={4}
        />
        <div className="flex gap-10">
          <CommonChip label="Assigned To" icon={<AssignIcon />} />
          <DropdownMenu
            handleClose={() => setDateTimeMenu(null)}
            anchorEl={dateTimeMenu}
            button={
              <CommonChip
                onClick={(event) => setDateTimeMenu(event.currentTarget)}
                label={selectedDate}
                icon={
                  <FuseSvgIcon size={20}>
                    material-outline:calendar_today
                  </FuseSvgIcon>
                }
              />
            }
            popoverProps={{
              open: !!dateTimeMenu,
              classes: {
                paper: "pt-10 pb-20",
              },
            }}
          >
            {dateTimeMenuData.map((item) => (
              <StyledMenuItem
                onClick={() => {
                  setSelectedDate(item.label), setDateTimeMenu(null);
                }}
              >
                {item.label}
              </StyledMenuItem>
            ))}
            <div className="px-20">
              <CustomButton
                fullWidth
                variant="contained"
                color="secondary"
                startIcon={
                  <FuseSvgIcon>material-outline:add_circle_outline</FuseSvgIcon>
                }
                className="min-w-[224px] mt-10"
                // onClick={handleCalender}
              >
                Custom Date
              </CustomButton>
            </div>
          </DropdownMenu>
          <DropdownMenu
            anchorEl={priorityMenu}
            handleClose={() => setPriorityMenu(null)}
            button={
              <CommonChip
                onClick={(event) => setPriorityMenu(event.currentTarget)}
                label={selectedPriority}
                icon={<PriorityIcon />}
              />
            }
            popoverProps={{
              open: !!priorityMenu,
              classes: {
                paper: "pt-10 pb-20",
              },
            }}
          >
            {priorityMenuData.map((item) => (
              <StyledMenuItem
                onClick={() => handlePriorityMenuClick(item.label)}
              >
                {item.label}
              </StyledMenuItem>
            ))}
          </DropdownMenu>

          <DropdownMenu
            anchorEl={labelsMenu}
            handleClose={() => setLabelsMenu(null)}
            button={
              <CommonChip
                onClick={(event) => setLabelsMenu(event.currentTarget)}
                label={selectedlabel}
                icon={
                  <FuseSvgIcon size={20}>heroicons-outline:tag</FuseSvgIcon>
                }
              />
            }
            popoverProps={{
              open: !!labelsMenu,
              classes: {
                paper: "pt-10 pb-20",
              },
            }}
          >
            {!showLabelForm ? (
              <>
                {labelsMenuData.map((item) => (
                  <StyledMenuItem
                    onClick={() => {
                      setSelectedlabel(item.label), setLabelsMenu(null);
                    }}
                  >
                    {item.label}
                  </StyledMenuItem>
                ))}
                <div className="px-20">
                  <CustomButton
                    fullWidth
                    variant="contained"
                    color="secondary"
                    startIcon={
                      <FuseSvgIcon>
                        material-outline:add_circle_outline
                      </FuseSvgIcon>
                    }
                    className="min-w-[224px] mt-10"
                    onClick={handleAddLabel}
                  >
                    Create New Label
                  </CustomButton>
                </div>
              </>
            ) : (
              <div className="px-20  py-20">
                <InputField
                  formik={formik}
                  name="newLabel"
                  id="group_names"
                  label="New Label"
                  placeholder="Enter Group Name"
                />
                <div className="mt-20">
                  <Button
                    variant="contained"
                    color="secondary"
                    className="w-[156px] h-[48px] text-[18px]"
                    // onClick={onSubmit}
                  >
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    // disabled={disabled}
                    color="secondary"
                    className="w-[156px] h-[48px] text-[18px] ml-14"
                    onClick={() => {
                      setShowLabelForm(false);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </DropdownMenu>
        </div>
        <div className="flex gap-20">
          <DropdownMenu
            anchorEl={showReminder}
            handleClose={() => setShowReminder(null)}
            button={
              <CommonChip
                onClick={(event) => setShowReminder(event.currentTarget)}
                label="Reminder"
                icon={<ReminderIcon />}
              />
            }
            popoverProps={{
              open: !!showReminder,
              classes: {
                paper: "pt-10 pb-20",
              },
            }}
          >
            <div className="px-20  py-20">
              <InputField
                formik={formik}
                name="date"
                id="date"
                label="Date"
                placeholder="Enter Date"
              />
              <InputField
                formik={formik}
                name="time"
                id="time"
                label="Time"
                placeholder="Enter Time"
              />
              <div className="mt-20">
                <Button
                  variant="contained"
                  color="secondary"
                  className="w-[156px] h-[48px] text-[18px]"
                  // onClick={onSubmit}
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  // disabled={disabled}
                  color="secondary"
                  className="w-[156px] h-[48px] text-[18px] ml-14"
                  onClick={() => {
                    setShowLabelForm(false);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
            {/* {priorityMenuData.map((item) => (
              <StyledMenuItem
                onClick={() => handlePriorityMenuClick(item.label)}
              >
                {item.label}
              </StyledMenuItem> */}
            {/* ))} */}
          </DropdownMenu>
          {/* <CommonChip label="Reminder" icon={<ReminderIcon />} /> */}
          <DropdownMenu
            anchorEl={statusMenu}
            handleClose={() => setStatusMenu(null)}
            button={
              <CommonChip
                onClick={handleStatusMenuClick}
                label={selectedStatus}
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
            {statusMenuData.map((item) => {
              return (
                <StyledMenuItem
                  key={item.label}
                  onClick={() => handleStatusMenuItemClick(item.label)}
                >
                  {item.label}
                </StyledMenuItem>
              );
              // console.log(item, "itezcfm");
            })}
          </DropdownMenu>
        </div>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <FormLabel className="block text-[16px] font-medium text-[#111827] mb-5 ">
              Voice Memo
            </FormLabel>
            <Grid container spacing={2}>
              <Grid item md={6}>
                <CommonChip
                  colorSecondary
                  className="w-full"
                  label="Record voice memo"
                  icon={<MicIcon />}
                  // variant="outlined"
                  style={{ border: "0.5px solid #4F46E5" }}
                />
              </Grid>
              <Grid item md={6}>
                <label
                  htmlFor="attachment"
                  className="bg-[#EDEDFC] px-20 mb-0 border-[0.5px] border-solid border-[#4F46E5] rounded-6 min-h-[48px] flex items-center 
            justify-between cursor-pointer"
                  // onClick={() => handleUploadFile()}
                >
                  <label className="text-[16px] text-[#4F46E5] flex items-center cursor-pointer">
                    Upload File
                    <input
                      type="file"
                      style={{ display: "none" }}
                      multiple={true}
                      id="attachment"
                      accept="audio/*"
                      // onChange={handleUploadFile}
                    />
                  </label>
                  <span>
                    <img src={"../assets/images/logo/upload.png"} />
                  </span>
                </label>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={6}>
            <FormLabel className="block text-[16px] font-medium text-[#111827] mb-5 border-solid border-[#4F46E5]">
              File
            </FormLabel>
            <label
              htmlFor="attachment"
              className="bg-[#EDEDFC] px-20 mb-0 border-[0.5px] border-solid border-[#4F46E5] rounded-6 min-h-[48px] flex items-center 
            justify-between cursor-pointer"
              // onClick={() => handleUploadFile()}
            >
              <label className="text-[16px] text-[#4F46E5] flex items-center cursor-pointer">
                Upload File
                <input
                  type="file"
                  style={{ display: "none" }}
                  multiple={true}
                  id="attachment"
                  accept=".pdf,.png,.jpg,.jpeg"
                  // onChange={handleUploadFile}
                />
              </label>
              <span>
                <img src={"../assets/images/logo/upload.png"} />
              </span>
            </label>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <FormLabel className="block text-[16px] font-medium text-[#111827] mb-5">
              {showVideo ? "Record Your Screen Again" : "Screen Recording"}
            </FormLabel>

            <CommonChip
              colorSecondary
              className="w-full"
              label={
                showVideo ? "Record you Screen Again" : "Record you Screen"
              }
              onClick={handleRecordClick}
              icon={
                <ScreenRecordingIcon
                  className="record-btn"
                  // onClick={handleRecordClick}
                />
              }
              style={{ border: "0.5px solid #4F46E5" }}
            />
            <>
              {/* {showVideo && !isRecording && ( */}
              <div
                className={`rounded-[7px] border-1 border-solid border-[#9DA0A6] mt-10 relative  block ${showVideo && !isRecording ? "" : "hidden"}`}
              >
                <video
                  className="rounded-[7px] p-5 h-[120px] "
                  width="450px"
                  ref={videoRef}
                  controls
                />
                <div className="border-1 border-solid rounded-full  absolute right-[-2px] top-[-2px] flex items-center justify-center border-[#E7E8E9]">
                  <CrossGreyIcon
                    className="h-20 w-20 p-4"
                    fill="#757982"
                    onClick={() => setShowVideo(false)}
                  />
                </div>
              </div>
              {/* )} */}
              {isRecording && (
                <div className="bg-[#FEECEB] border-[0.5px] border-[#F44336] my-10 rounded-[7px] flex items-center justify-between px-16 py-10">
                  <Typography className="text-[#F44336] text-[16px] ">
                    Stop Recording
                  </Typography>
                  <div className="flex items-center gap-10">
                    <span id="timer" className="text-[#F44336] text-[16px]">
                      {formatTime(elapsedTime)}
                    </span>
                    <img
                      src="../assets/images/logo/play.svg"
                      alt="play"
                      onClick={toggleRecording}
                    ></img>
                    <img
                      src="../assets/images/logo/pause.svg"
                      alt="pause"
                    ></img>
                  </div>
                </div>
              )}
            </>
          </Grid>
        </Grid>
      </div>
    </CommonModal>
  );
}

export default AddTaskModal;
