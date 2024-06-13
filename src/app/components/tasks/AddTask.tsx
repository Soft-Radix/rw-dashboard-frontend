import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import {
  Button,
  Checkbox,
  FormLabel,
  Grid,
  MenuItem,
  Popover,
  Typography,
  styled,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { getAgentList, getStatusList } from "app/store/Agent";
import { filterType } from "app/store/Client/Interface";
import {
  EditTaskAdd,
  TaskAdd,
  TaskDeleteAttachment,
  TaskDetails,
} from "app/store/Projects";
import { useAppDispatch } from "app/store/store";
import { useFormik } from "formik";
import { debounce } from "lodash";
import moment from "moment";
import { CrossGreyIcon, PreviewIcon } from "public/assets/icons/common";
import {
  AttachmentDeleteIcon,
  AttachmentIcon,
} from "public/assets/icons/supportIcons";
import {
  AssignIcon,
  MicIcon,
  PriorityIcon,
  ReminderIcon,
  ScreenRecordingIcon,
  StatusIcon,
} from "public/assets/icons/task-icons";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { LiveAudioVisualizer } from "react-audio-visualize";
import * as Yup from "yup";
import CommonModal from "../CommonModal";
import DropdownMenu from "../Dropdown";
import InputField from "../InputField";
import CommonChip from "../chip";
import DeleteClient from "../client/DeleteClient";
import CustomButton from "../custom_button";

interface IProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  ColumnId?: any;
  project_id?: any;
  callListApi?: any;
  Edit?: any;
}
const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  padding: "8px 20px",
  minWidth: "250px",
}));

function AddTaskModal({
  isOpen,
  setIsOpen,
  ColumnId,
  project_id,
  callListApi,
  Edit,
}: IProps) {
  const [expandedImage, setExpandedImage] = useState(null);
  const [dateTimeMenu, setDateTimeMenu] = useState<HTMLElement | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("Due Date & Time");
  const [selectedDate1, setSelectedDate1] = useState(new Date());
  const [priorityMenu, setPriorityMenu] = useState<HTMLElement | null>(null);
  const [showReminder, setShowReminder] = useState<HTMLElement | null>(null);
  const [selectedPriority, setSelectedPriority] = useState<string>("Priority");
  const [selectedAgent, setSelectedAgent] = useState<string>("Assigned To");
  const [AgentMenu, setAgentMenu] = useState<HTMLElement | null>(null);
  const [statusMenu, setStatusMenu] = useState<HTMLElement | null>(null);
  const [labelsMenu, setLabelsMenu] = useState<HTMLElement | null>(null);
  const [selectedlabel, setSelectedlabel] = useState<string>("Labels");
  const [uploadedFilesNew, setUploadedFilesNew] = useState([]);
  const [showLabelForm, setShowLabelForm] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("Status");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [agentMenuData, setAgentMenuData] = useState([]);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerId, setTimerId] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [mediaRecorder1, setMediaRecorder1] = useState<MediaRecorder>();
  const [recordingAudio, setRecordingAudio] = useState(false);
  const [audioURL, setAudioURL] = useState("");
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const mediaStreamRef = useRef(null);
  const [savedAudioURL, setSavedAudioURL] = useState("");
  const [blob, setBlob] = useState<Blob>();
  const visualizerRef = useRef<HTMLCanvasElement>(null);
  const [customDate, setCustomDate] = useState(null);
  const [calculatedDate, setCalculatedDate] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [agentid, setAgentID] = useState(null);
  const [dateError, setDateError] = useState("");
  const [calenderOpen, setCalenderOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [selectedAgents, setSelectedAgents] = useState<any[]>([]);
  const [audioRecorder, setAudioRecorder] = useState<File | null>(null);
  const [screenRecorder, setScreenRecorder] = useState("");
  const [isOpenDeletedModal, setIsOpenDeletedModal] = useState(false);
  const timerRef = useRef(null);
  const [deleteId, setIsDeleteId] = useState<number>(null);
  const dispatch = useAppDispatch();
  const userId = JSON.parse(localStorage.getItem("userDetail"));
  const [screenSharingStream, setScreenSharingStream] = useState(null);
  const [statusMenuData, setStatusMenuData] = useState([]);
  const [selectedStatusId, setSelectedStatusId] = useState(null);
  const [filterMenu, setFilterMenu] = useState<filterType>({
    start: 0,
    limit: -1,
    search: "",
    client_id: userId.id,
  });
  const validationSchema = Yup.object({
    title: Yup.string()
      .required("Title is required")
      .matches(/^(?!\s*$).+/, "Title cannot be empty or contain only spaces"),
    description: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      time: "",
      date: "",
      newLabel: "",
    },
    validationSchema,
    onSubmit: (values) => {},
  });

  const dateTimeMenuData = [
    { label: "In 1 business day", days: 1 },
    { label: "In 2 business days", days: 2 },
    { label: "In 3 business days", days: 3 },
    { label: "In 1 week", days: 7 },
    { label: "In 2 week", days: 14 },
    { label: "In 1 month", days: 30 },
    { label: "In 3 months", days: 90 },
    { label: "In 6 months", days: 180 },
  ];
  const priorityMenuData = [
    { label: "Medium" },
    { label: "High" },
    { label: "Low" },
  ];
  // const statusMenuData = [
  //   { label: "To Do" },
  //   { label: "In Progress" },
  //   { label: "In Review" },
  //   { label: "Completed" },
  // ];
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
    dispatch(getAgentList(filterMenu)).then((res) => {
      setAgentMenuData(res?.payload?.data?.data?.list);
    });
  }, [filterMenu.search]);
  useEffect(() => {
    dispatch(getStatusList({ id: project_id })).then((res) => {
      setStatusMenuData(res?.payload?.data?.data?.list);
    });
  }, [project_id]);

  useEffect(() => {
    if (labelsMenu) {
      setShowLabelForm(false);
    }
  }, [labelsMenu]);
  const handleStatusMenuClick = (event) => {
    setStatusMenu(event.currentTarget);
  };

  const handleStatusMenuItemClick = (status) => {
    setSelectedStatus(status.name);
    setSelectedStatusId(status.id);
    setStatusMenu(null); // Close the dropdown menu after selection
  };
  const handlePriorityMenuClick = (data) => {
    setSelectedPriority(data);
    setPriorityMenu(null); // Close the dropdown priority menu after selection
  };

  // const handleAgentMenuClick = (data) => {
  //   setSelectedAgent(data.first_name);
  //   setAgentID(data.id);
  //   setAgentMenu(null); // Close the dropdown priority menu after selection
  // };
  const handleAgentMenuClick = (item) => {
    const agentId = item.id;
    if (selectedAgents?.includes(agentId)) {
      setSelectedAgents(selectedAgents?.filter((id) => id !== agentId));
    } else {
      setSelectedAgents([...selectedAgents, agentId]);
    }
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

        const file = new File([blob], "recorded_video.webm", {
          type: chunks[0].type,
        });
        //@ts-ignore
        setScreenRecorder(file);

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

  const formatTime = (time: any) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleAudioRecord = () => {
    if (recordingAudio) {
      setVisible(true);
      console.log("Stopping the recorder...");
      mediaRecorderRef.current.stop();
      mediaStreamRef.current.getTracks().forEach((track) => track.stop()); // Stop all tracks of the stream
      setRecordingAudio(false);
      clearInterval(timerRef.current); // Stop the timer
    } else {
      setVisible(true);
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
            const audioFile = new File([audioBlob], "recorded_audio.wav", {
              type: "audio/wav",
            });
            // console.log("=====audioFile===", audioFile);
            setAudioRecorder(audioFile);
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudioURL(audioUrl);

            setBlob(audioBlob);
            // setRecordingTime(0);
          };

          mediaRecorder.start();
          console.log("Recorder started");
          setRecordingAudio(true);
          setMediaRecorder1(mediaRecorder);
          timerRef.current = setInterval(() => {
            setRecordingTime((prevTime) => prevTime + 1);
          }, 1000);
        })
        .catch((error) => {
          console.error("Error accessing microphone", error);
        });
    }
  };

  const handleSave = () => {
    if (recordingAudio) {
      handleAudioRecord();
    }
    setSavedAudioURL(audioURL);
    setAudioURL("");
    setVisible(false);
  };

  const handleCancel = () => {
    if (recordingAudio) {
      handleAudioRecord();
    }
    setRecordingTime(0);

    setVisible(false);
    setAudioURL("");
    setSavedAudioURL("");
  };
  const handleRemoveFile = (file: File) => {
    const filteredFiles = uploadedFiles.filter((f) => f !== file);
    setUploadedFiles(filteredFiles);
  };

  const handleReset = () => {
    setIsOpen(false);
    formik.resetForm();
    setSavedAudioURL("");
    setIsRecording(false);
    setShowVideo(false);
    videoRef.current = null;
    setSelectedAgent("Assigned To");
    setSelectedStatus("Status");
    setSelectedStatusId(null);
    setSelectedPriority("Priority");
    setSelectedlabel("Labels");
    setCalculatedDate("");
    setAgentID(null);
    setUploadedFiles([]);
    setCustomDate(null);

    setSelectedAgents([]);
  };

  const handleCross = () => {
    setAudioURL("");
    setSavedAudioURL("");
    setRecordingTime(0);
    setVisible(false);
  };

  const onSubmit = async () => {
    formik.handleSubmit();
    const screenRecordFile = videoRef?.current?.src || "";
    const formData = new FormData();
    formData.append("project_id", project_id);
    formData.append("project_column_id", ColumnId);
    formData.append("title", formik.values.title);
    formData.append("description", formik.values.description);
    formData.append("priority", selectedPriority);
    formData.append("labels", formik?.values?.newLabel || selectedlabel);
    formData.append("status", ColumnId);
    formData.append("status", selectedStatusId);
    formData.append("agent_ids", selectedAgents as any);
    formData.append("voice_record_file", audioRecorder);
    formData.append("screen_record_file", screenRecorder);
    formData.append("due_date_time", calculatedDate ? calculatedDate : "");
    formData.append("business_due_date", selectedDate);
    formData.append(
      "reminders",
      formik?.values?.date != "" && formik?.values?.time != ""
        ? moment(formik?.values?.date + " " + formik?.values?.time).format(
            "YYYY-MM-DD HH:mm"
          )
        : ""
      // moment(formik?.values?.date + " " + formik?.values?.time).format(
      //   "YYYY-MM-DD HH:mm"
      // )
    );
    // Append each file with the same key
    uploadedFiles.forEach((file) => {
      formData.append("files", file); // Note the use of "files[]" to indicate an array of files
    });
    try {
      const res = await dispatch(TaskAdd(formData));
      callListApi();
      setIsOpen(false);
      formik.resetForm();
      handleReset();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleUploadFile = (event) => {
    const files = event.target.files;
    const filesArray = Array.from(files);
    setUploadedFiles((prevFiles) => [...prevFiles, ...filesArray]);
  };

  const handleAudioUploadFile = (event) => {
    const file = event.target.files[0];
    setAudioRecorder(file);
    const audioUrl = URL.createObjectURL(file);
    setAudioURL(audioUrl);
    setSavedAudioURL(audioUrl); // If you want to save it separately
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setCalenderOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setCalenderOpen(false);
  };

  const calculateFutureDate = (days, label) => {
    let date = new Date();
    let addedDays = 0;

    while (addedDays < days) {
      date.setDate(date.getDate() + 1);
      if (label.includes("business")) {
        const dayOfWeek = date.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
          addedDays++;
        }
      } else {
        addedDays++;
      }
    }
    return moment(date).format("YYYY-MM-DD HH:mm");
  };

  const handleDateChange = (newDate) => {
    setCustomDate(newDate);
    setSelectedDate(newDate.toLocaleString());
  };
  const open = Boolean(anchorEl);
  const today = new Date();

  const urlForImage = import.meta.env.VITE_API_BASE_IMAGE_URL;

  const EditDetails = () => {
    dispatch(TaskDetails(ColumnId)).then((res: any) => {
      const data = res?.payload?.data?.data;
      let date: any;
      let time: any;
      if (data?.reminders) {
        var remindersDateTime = data?.reminders.split("T");
        date = remindersDateTime[0]; // Extract the date component
        time = remindersDateTime[1].split(".")[0];
      }
      if (data?.screen_record_file != "") {
        setShowVideo(true);
      } else {
        setShowVideo(false);
      }
      if (data?.voice_record_file == "" || data?.voice_record_file == "null") {
        setSavedAudioURL("");
      } else {
        setSavedAudioURL(urlForImage + data.voice_record_file);
      }
      formik.setFieldValue("title", data.title);
      formik.setFieldValue("description", data.description);
      formik.setFieldValue("date", date || "");
      formik.setFieldValue("time", time || "");
      setSavedAudioURL(
        data?.voice_record_file && urlForImage + data.voice_record_file
      );
      videoRef.current.src =
        data?.screen_record_file && urlForImage + data?.screen_record_file;
      setSelectedDate(
        !data?.business_due_date ? "Due Date & Time" : data?.business_due_date
      );
      setSelectedlabel(!data?.labels ? "Labels" : data?.labels);
      setSelectedPriority(!data?.priority ? "" : data?.priority);
      setSelectedStatusId(!data?.status ? "Status" : data?.status);
      setUploadedFilesNew(data.task_files);
      const userNames = data?.assigned_task_users?.map(
        (user) => user.first_name
      );
      const userId = data?.assigned_task_users?.map((user) => user.user_id);
      setSelectedAgent(userNames.join(", "));
      if (data?.assigned_task_users.length == 0) {
        setSelectedAgent("Assign To");
      }
      setSelectedAgents(userId);
    });
  };
  useEffect(() => {
    if (Edit) {
      EditDetails();
    }
  }, [isOpen]);

  const handleDeleteAttachment = async (id: number) => {
    const { payload } = await dispatch(
      TaskDeleteAttachment({ type: type, file_id: id })
    );
    // console.log(payload, "kklkkkl");
    if (payload?.data?.status) {
      EditDetails();
    }
    setIsOpenDeletedModal(false);
    if (type == 1) {
      handleCross();
    }
  };

  const handleImageClick = (imageUrl) => {
    if (expandedImage === imageUrl) {
      setExpandedImage(null); // If already expanded, close it
    } else {
      setExpandedImage(imageUrl); // If not expanded, expand it
    }
  };

  const onSubmitEdit = async () => {
    formik.handleSubmit();
    const screenRecordFile = videoRef?.current?.src || "";
    const formData = new FormData();
    formData.append("task_id", ColumnId);
    formData.append("title", formik.values.title);
    formData.append("description", formik.values.description);
    formData.append("priority", selectedPriority);
    formData.append("labels", formik?.values?.newLabel || selectedlabel);
    formData.append("status", selectedStatusId || null);
    formData.append("agent_ids", selectedAgents as any);
    formData.append("voice_record_file", audioRecorder ? audioRecorder : "");
    formData.append("screen_record_file", screenRecorder);
    formData.append("due_date_time", calculatedDate ? calculatedDate : "");
    formData.append("business_due_date", selectedDate);
    formData.append("delete_agent_ids", "");
    formData.append("delete_file_ids", "");
    formData.append(
      "reminders",
      formik?.values?.date && formik?.values?.time
        ? moment(formik?.values?.date + " " + formik?.values?.time).format(
            "YYYY-MM-DD HH:mm"
          )
        : ""
    );
    // Append each file with the same key
    uploadedFiles.forEach((file) => {
      formData.append("files", file); // Note the use of "files[]" to indicate an array of files
    });
    try {
      const res = await dispatch(EditTaskAdd(formData));
      callListApi();
      setIsOpen(false);
      formik.resetForm();
      handleReset();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleAgentSelect = (agentId) => {
    if (selectedAgents.includes(agentId)) {
      setSelectedAgents(selectedAgents.filter((id) => id != agentId));
      if (selectedAgents.length == 1) {
        setSelectedAgent("Assign To");
      }
    } else {
      // If not selected, add to selection
      setSelectedAgents([...selectedAgents, agentId]);
    }
  };
  const debouncedSearch = debounce((searchValue) => {
    // Update the search filter here
    setFilterMenu((prevFilters) => ({
      ...prevFilters,
      search: searchValue,
    }));
  }, 300);
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    debouncedSearch(value);
  };

  const handleCheckboxChange = (id) => {
    setCheckedItems((prevCheckedItems) => {
      if (prevCheckedItems.includes(id)) {
        return prevCheckedItems.filter((item) => item !== id);
      } else {
        return [...prevCheckedItems, id];
      }
    });
  };

  const handleSelectAllAgents = () => {
    if (selectedAgents.length == agentMenuData.length) {
      // If all agents are already selected, deselect all
      setSelectedAgents([]);
    } else {
      // Otherwise, select all agents
      setSelectedAgents(agentMenuData.map((item) => item.id));
    }
  };

  return (
    <CommonModal
      open={isOpen}
      handleToggle={() => handleReset()}
      modalTitle={Edit ? "Edit Task" : "Add Task"}
      maxWidth="910"
      btnTitle={Edit ? "Save Edit" : "Save"}
      closeTitle="Close"
      onSubmit={Edit ? onSubmitEdit : onSubmit}
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
          <DropdownMenu
            anchorEl={AgentMenu}
            handleClose={() => setAgentMenu(null)}
            button={
              <CommonChip
                onClick={(event) => setAgentMenu(event.currentTarget)}
                style={{ maxWidth: "200px" }}
                label={
                  selectedAgents?.length > 0
                    ? selectedAgents
                        ?.map(
                          (agentId) =>
                            agentMenuData.find((item) => item.id === agentId)
                              ?.first_name
                        )
                        .join(", ")
                    : selectedAgent
                }
                icon={<AssignIcon />}
              />
            }
            popoverProps={{
              open: !!AgentMenu,
              classes: {
                paper: "pt-10 pb-20",
              },
            }}
          >
            <div className="w-[375px] p-20">
              <p className="text-title font-600 text-[1.6rem]">Agent Name</p>

              <div className="relative w-full mt-10 mb-3 sm:mb-0 ">
                <InputField
                  name={"agent"}
                  placeholder={"Enter Agent Name"}
                  className="common-inputField "
                  inputProps={{
                    className: "ps-[2rem] w-full sm:w-full",
                  }}
                  onChange={handleSearchChange}
                />
                <div className="max-h-[200px] w-full overflow-y-auto shadow-sm cursor-pointer">
                  <div
                    className="flex items-center gap-10 px-20 w-full"
                    onClick={handleSelectAllAgents}
                  >
                    <Checkbox
                      checked={selectedAgents.length === agentMenuData.length}
                      onChange={handleSelectAllAgents}
                    />
                    <span>Select All</span>
                  </div>
                  {agentMenuData.map((item: any) => (
                    <div
                      className="flex items-center gap-10 px-20 w-full"
                      key={item.id}
                    >
                      <label className="flex items-center gap-10 w-full cursor-pointer">
                        <Checkbox
                          checked={selectedAgents.includes(item.id)}
                          onChange={() => handleAgentSelect(item.id)}
                        />
                        <span>{item.first_name}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </DropdownMenu>

          {/* 
          <DropdownMenu
            anchorEl={AgentMenu}
            handleClose={() => setAgentMenu(null)}
            button={
              <CommonChip
                onClick={(event) => setAgentMenu(event.currentTarget)}
                label={
                  selectedAgents?.length > 0
                    ? selectedAgents
                        ?.map(
                          (agentId) =>
                            agentMenuData.find((item) => item.id == agentId)
                              ?.first_name
                        )
                        .join(", ")
                    : selectedAgent
                }
                icon={<AssignIcon />}
              />
            }
            popoverProps={{
              open: !!AgentMenu,
              classes: {
                paper: "pt-10 pb-20",
              },
            }}
          >
            <div className="w-[375px] p-20">
              <p className="text-title font-600 text-[1.6rem]">Agent Name</p>

              <div className="relative w-full mt-10 mb-3 sm:mb-0 ">
                <InputField
                  name={"agent"}
                  placeholder={"Enter Agent Name"}
                  className="common-inputField "
                  inputProps={{
                    className: "ps-[2rem] w-full sm:w-full",
                  }}
                  onChange={handleSearchChange}
                />
                <div className="max-h-[200px] w-full overflow-y-auto shadow-sm cursor-pointer">
                  {agentMenuData.map((item: any) => (
                    <div
                      className="flex items-center gap-10 px-20 w-full"
                      key={item.id}
                    >
                      <label className="flex items-center gap-10 w-full cursor-pointer">
                        <Checkbox
                          // checked={checkedItems.includes(item.id)}
                          // onChange={() => handleCheckboxChange(item.id)}
                          checked={selectedAgents.includes(item.id)}
                          onChange={() => handleAgentSelect(item.id)}
                        />
                        <span>{item.first_name}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </DropdownMenu> */}

          <DropdownMenu
            handleClose={() => {
              setDateTimeMenu(null);
              setCalenderOpen(false);
            }}
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
                key={item.label}
                onClick={() => {
                  const futureDate = calculateFutureDate(item.days, item.label);
                  setCalculatedDate(futureDate.toLocaleString()); // Store the calculated date
                  setSelectedDate(item.label); // Display the label
                  setDateTimeMenu(null);
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
                onClick={handleClick}
              >
                Custom Date
              </CustomButton>
              <Popover
                open={calenderOpen}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <DateTimePicker
                  open={calenderOpen}
                  // onOpen={() => setOpen(true)} // Ensure open state is true when the calendar opens
                  onClose={() => {
                    setCalenderOpen(false);
                    setDateTimeMenu(null);
                  }}
                  value={customDate}
                  onChange={handleDateChange}
                />
              </Popover>
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
                    onClick={() => {
                      setSelectedlabel(formik?.values?.newLabel);
                      setShowLabelForm(false);
                    }}
                  >
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    // disabled={disabled}
                    color="secondary"
                    className="w-[156px] h-[48px] text-[18px] ml-14"
                    onClick={() => {
                      formik.setFieldValue("newLabel", "");
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
                type="date"
              />

              <InputField
                formik={formik}
                name="time"
                id="time"
                label="Time"
                type="time"
                placeholder="Enter Time"
              />
              <div className="mt-20">
                <Button
                  variant="contained"
                  color="secondary"
                  className="w-[156px] h-[48px] text-[18px]"
                  // onClick={onSubmit}
                  onClick={() => setShowReminder(null)}
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
                    setShowReminder(null);
                    formik.setFieldValue("time", "");
                    formik.setFieldValue("date", "");
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DropdownMenu>
          {/* <CommonChip label="Reminder" icon={<ReminderIcon />} /> */}
          <DropdownMenu
            anchorEl={statusMenu}
            handleClose={() => setStatusMenu(null)}
            button={
              <CommonChip
                onClick={handleStatusMenuClick}
                // label={selectedStatus}
                label={
                  selectedStatusId
                    ? statusMenuData.find((item) => item.id == selectedStatusId)
                        ?.name
                    : selectedStatus
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
            {statusMenuData.map((item) => {
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
                {savedAudioURL && (
                  <div className="audio-container relative">
                    <audio controls src={savedAudioURL} />

                    <div className="audio-controls ml-[15px]"></div>
                    {Edit ? (
                      <div
                        className="absolute top-7 right-7"
                        // onClick={() => handleDeleteAttachment(item.id)}
                      >
                        <AttachmentDeleteIcon
                          onClick={() => {
                            setIsOpenDeletedModal(true);
                            setType(1);
                            setIsDeleteId(ColumnId);
                          }}
                        />
                      </div>
                    ) : (
                      <div className="border-1 border-solid rounded-full  absolute right-[-2px] top-[-2px] flex items-center justify-center border-[#E7E8E9]">
                        <CrossGreyIcon
                          className="h-20 w-20 p-4"
                          fill="#757982"
                          onClick={() => handleCross()}
                        />
                      </div>
                    )}
                  </div>
                )}
                {visible && (
                  <div className="my-10 flex flex-col gap-[10px] audio-container ">
                    <div
                      className="my-10 flex  gap-[10px] "
                      style={{ alignItems: "center" }}
                    >
                      {recordingAudio ? (
                        <img
                          src="../assets/images/logo/play2.svg"
                          alt="play"
                          onClick={handleAudioRecord}
                        ></img>
                      ) : (
                        <img
                          src="../assets/images/logo/pause.svg"
                          alt="pause"
                          onClick={handleAudioRecord}
                        ></img>
                      )}
                      <p className="text-[#9DA0A6]">
                        {" "}
                        {formatTime(recordingTime)}
                      </p>

                      <LiveAudioVisualizer
                        mediaRecorder={
                          recordingAudio ? mediaRecorderRef?.current : ""
                        }
                        width={300}
                        height={35}
                        barWidth={1}
                        gap={1}
                        barColor={"#4F46E5"}
                        smoothingTimeConstant={0.4}
                      />
                    </div>
                    <div>
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
                      // accept=".pdf,.png,.jpg,.jpeg"
                      onChange={handleAudioUploadFile}
                    />
                  </label>
                  <span>
                    <img src={"../assets/images/logo/upload.png"} />
                  </span>
                </label>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={6} className="relative">
            <FormLabel className="block text-[16px] font-medium text-[#111827] mb-5 border-solid border-[#4F46E5]">
              File
            </FormLabel>
            <label
              htmlFor="fileattachment"
              className="bg-[#EDEDFC] px-20  border-[0.5px] border-solid border-[#4F46E5] rounded-6 min-h-[48px] 
              flex items-center 
             justify-between cursor-pointer mb-10"
              // onClick={() => handleUploadFile()}
            >
              <label className="text-[16px] text-[#4F46E5] flex items-center cursor-pointer">
                Upload File
                <input
                  type="file"
                  style={{ display: "none" }}
                  multiple={true}
                  id="fileattachment"
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={handleUploadFile}
                />
              </label>
              <span>
                <img src={"../assets/images/logo/upload.png"} />
              </span>
            </label>
            <div className="flex flex-wrap gap-2 items-center justify-center absolute">
              {uploadedFiles?.map((file, index) => (
                <div
                  key={index}
                  className="bg-[#F6F6F6] mb-10 px-10 rounded-6 min-h-[48px] gap-3 flex items-center justify-between cursor-pointer"
                >
                  <div className="bg-F6F6F6 mb-10  rounded-6 min-h-48 flex items-center justify-between cursor-pointer w-full">
                    <span className="mr-4">
                      <PreviewIcon />
                    </span>
                    <span className="text-[16px] text-[#4F46E5] py-5 mr-3">
                      {file.name}
                    </span>
                    <span onClick={() => handleRemoveFile(file)}>
                      <CrossGreyIcon />
                    </span>
                  </div>
                </div>
              ))}

              {/* {uploadedFilesNew?.map((file, index) => (
                <div
                  key={index}
                  className="bg-[#F6F6F6] mb-10 px-10 rounded-6 min-h-[48px] gap-3 flex items-center justify-between cursor-pointer"
                >
                  <div className="bg-F6F6F6 mb-10  rounded-6 min-h-48 flex items-center justify-between cursor-pointer">
                    <img
                      src={urlForImage + file.file}
                      alt="img"
                      width="20px"
                    ></img>
                    <span
                    // onClick={() =>
                    //    handleRemoveFile(file)}
                    >
                      <CrossGreyIcon />
                    </span>
                  </div>
                </div>
              ))} */}

              {uploadedFilesNew?.map((item: any) => (
                <div className="relative cursor-pointer ">
                  {item.file.includes(".png") ||
                  item.file.includes(".jpg") ||
                  item.file.includes(".jpeg") ? (
                    <>
                      <img
                        src={urlForImage + item.file}
                        alt="Black Attachment"
                        className="w-[100px] rounded-md "
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
            </div>
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
                {Edit ? (
                  <div
                    className="absolute top-7 right-7"
                    // onClick={() => handleDeleteAttachment(item.id)}
                  >
                    <AttachmentDeleteIcon
                      onClick={() => {
                        setIsOpenDeletedModal(true);
                        setType(2);
                        setIsDeleteId(ColumnId);
                      }}
                    />
                  </div>
                ) : (
                  <div className="border-1 border-solid rounded-full  absolute right-[-2px] top-[-2px] flex items-center justify-center border-[#E7E8E9]">
                    <CrossGreyIcon
                      className="h-20 w-20 p-4"
                      fill="#757982"
                      onClick={() => setShowVideo(false)}
                    />
                  </div>
                )}
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
      <DeleteClient
        isOpen={isOpenDeletedModal}
        setIsOpen={setIsOpenDeletedModal}
        onDelete={() => handleDeleteAttachment(deleteId)}
        heading={`Delete ${type == 3 ? "Attachment" : "File"}`}
        description={`Are you sure you want to delete this ${
          type == 3 ? "Attachment" : "File"
        }? `}
      />
    </CommonModal>
  );
}

export default AddTaskModal;
