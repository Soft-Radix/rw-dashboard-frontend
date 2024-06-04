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
import { AudioVisualizer, LiveAudioVisualizer } from "react-audio-visualize";
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
  const [timerId, setTimerId] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [mediaRecorder1, setMediaRecorder1] = useState<MediaRecorder>();
  const [recordingAudio, setRecordingAudio] = useState(false);
  const [audioURL, setAudioURL] = useState("");
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const mediaStreamRef = useRef(null);
  const [savedAudioURL, setSavedAudioURL] = useState("");
  const [blob, setBlob] = useState<Blob>();
  const visualizerRef = useRef<HTMLCanvasElement>(null);

  const [screenSharingStream, setScreenSharingStream] = useState(null);
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
      setScreenSharingStream(stream);
      const recorder = new MediaRecorder(stream, {
        mimeType: mime,
      });
      setMediaRecorder(recorder);

      const chunks = [];
      recorder.addEventListener("dataavailable", (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      });

      recorder.addEventListener("stop", () => {
        const blob = new Blob(chunks, {
          type: chunks[0].type,
        });
        const url = URL.createObjectURL(blob);

        if (videoRef.current) {
          videoRef.current.src = url;
        }
        setIsRecording(false);
        setShowVideo(true);
        clearInterval(timerId);
        setElapsedTime(0);
      });

      recorder.addEventListener("error", (error) => {
        console.error("MediaRecorder Error:", error);
        clearInterval(timerId);
        setElapsedTime(0);
      });

      // Listen for the stream's inactive event
      stream.getVideoTracks()[0].oninactive = () => {
        setIsRecording(false);
        console.log("User clicked cancel or ended screen share");
        clearInterval(timerId);
        setElapsedTime(0);
      };

      // Start the recorder manually
      recorder.start();
      const id = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
      setTimerId(id);
    } catch (error) {
      console.error("Error accessing screen:", error);
    }
  };
  useEffect(() => {
    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(timerId);
  }, [timerId]);
  const toggleRecording = async () => {
    if (mediaRecorder && mediaRecorder.state === "recording") {
      try {
        await mediaRecorder.stop(); // Stop recording
        console.log("Recording stopped"); // Log confirmation
        setIsRecording(false);
        setShowVideo(true);
      } catch (error) {
        console.error("Error stopping recording:", error);
      }
    }

    // Add logic to stop screen sharing if applicable
    if (screenSharingStream) {
      // Assuming screenSharingStream is the variable holding your screen sharing stream
      screenSharingStream.getTracks().forEach((track) => track.stop());
      console.log("Screen sharing stopped");
      // Update any relevant state variables
      setScreenSharingStream(null);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleAudioRecord = () => {
    if (recordingAudio) {
      console.log("Stopping the recorder...");
      mediaRecorderRef.current.stop();
      mediaStreamRef.current.getTracks().forEach((track) => track.stop()); // Stop all tracks of the stream
      setRecordingAudio(false);
    } else {
      console.log("Starting the recorder...");
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          mediaStreamRef.current = stream; // Store the stream
          const mediaRecorder = new MediaRecorder(stream);
          mediaRecorderRef.current = mediaRecorder;
          audioChunksRef.current = [];

          mediaRecorder.ondataavailable = (event) => {
            console.log("Data available:", event.data);
            audioChunksRef.current.push(event.data);
          };

          mediaRecorder.onstop = () => {
            console.log("Recorder stopped");
            const audioBlob = new Blob(audioChunksRef.current, {
              type: "audio/wav",
            });
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudioURL(audioUrl);
            setBlob(audioBlob);
          };

          mediaRecorder.start();
          console.log("Recorder started");
          setRecordingAudio(true);
          setMediaRecorder1(mediaRecorder);
        })
        .catch((error) => {
          console.error("Error accessing microphone", error);
        });
    }
  };

  const handleSave = () => {
    setSavedAudioURL(audioURL);
    setAudioURL("");
  };

  const handleCancel = () => {
    setAudioURL("");
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
                  onClick={handleAudioRecord}
                  // variant="outlined"
                  style={{ border: "0.5px solid #4F46E5" }}
                />
                {/* {audioURL && <audio controls src={audioURL} />} */}
                {audioURL && (
                  <div className="audio-container relative">
                    <audio controls src={audioURL} />
                    <div className="audio-controls ml-[15px]">
                      <button
                        onClick={handleSave}
                        className="text-[#4F46E5] text-[16px] font-500 underline mr-10"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="text-[#757982] text-[16px] font-500 ml-10"
                      >
                        Cancel
                      </button>
                    </div>
                    <div className="border-1 border-solid rounded-full  absolute right-[-2px] top-[-2px] flex items-center justify-center border-[#E7E8E9]">
                      <CrossGreyIcon
                        className="h-20 w-20 p-4"
                        fill="#757982"
                        onClick={() => handleCancel()}
                      />
                    </div>
                  </div>
                )}
                {recordingAudio && mediaRecorderRef && (
                  <div className="my-10 flex gap-[10px]">
                    <img
                      src="../assets/images/logo/play2.svg"
                      alt="play"
                      onClick={handleAudioRecord}
                    ></img>
                    <LiveAudioVisualizer
                      mediaRecorder={mediaRecorderRef.current}
                      width={300}
                      height={35}
                      barWidth={1}
                      gap={1}
                      barColor={"#4F46E5"}
                      smoothingTimeConstant={0.4}
                    />
                  </div>
                )}
                {/* {blob && (
                  <AudioVisualizer
                    ref={visualizerRef}
                    blob={blob}
                    width={300}
                    height={75}
                    barWidth={1}
                    gap={1}
                    barColor={"#4F46E5"}
                  />
                )} */}
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
            {!isRecording && (
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
            )}
            <>
              {/* {showVideo && !isRecording && ( */}
              <div
                className={`rounded-[7px] border-1 border-solid border-[#9DA0A6] mt-10 relative  block ${
                  showVideo && !isRecording ? "" : "hidden"
                }`}
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
                <>
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
                      {/* <img
                        src="../assets/images/logo/pause.svg"
                        alt="pause"
                        onClick={PlayRecording}
                      ></img> */}
                    </div>
                  </div>
                </>
              )}
            </>
          </Grid>
        </Grid>
      </div>
    </CommonModal>
  );
}

export default AddTaskModal;
