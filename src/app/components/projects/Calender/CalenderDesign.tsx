import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CustomToolbar from "./CustomToolBar";
import EventCustomize from "./EventCustomize";
import { Button, Dialog, Menu, MenuItem, Typography } from "@mui/material";
import InputField from "../../InputField";
import { PlusIcon, ThreeDotsIcon } from "public/assets/icons/dashboardIcons"; // Ensure this is the correct import path
import { useAppDispatch } from "app/store/store";
import { getStatusList } from "app/store/Agent";
import { useNavigate, useParams } from "react-router";
import DropdownMenu from "../../Dropdown";
import CommonChip from "../../chip";
import { StatusIcon } from "public/assets/icons/task-icons";
import { styled, useTheme } from "@mui/styles";
import AddTaskModal from "../../tasks/AddTask";
import * as Yup from "yup";
import {
  TaskAdd,
  TaskListColumn,
  deleteTask,
  projectColumnAdd,
} from "app/store/Projects";
import toast from "react-hot-toast";
import ActionModal from "../../ActionModal";
import { useFormik } from "formik";

const localizer = momentLocalizer(moment);
const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  padding: "8px 20px",
  minWidth: "250px",
}));

const CalenderDesign = ({ events }) => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [statusMenuData, setStatusMenuData] = useState([]);
  const [selectedStatusId, setSelectedStatusId] = useState(null);
  const [statusMenu, setStatusMenu] = useState<HTMLElement | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isOpenAddModal, setIsOpenAddModal] = useState<boolean>(false);
  const [disable, setDisabled] = useState(false);
  const [disabled, setDisable] = useState(false);
  const [columnId, setColumnId] = useState(null);
  const [calendarState, setCalendarState] = useState({
    events: events,
    title: "",
    desc: "",
    start: null,
    status: "",
    end: null,
    openSlot: false,
    openEvent: false,
    clickedEvent: null,
  });

  useEffect(() => {
    dispatch(getStatusList({ id: id })).then((res) => {
      setStatusMenuData(res?.payload?.data?.data?.list);
      setSelectedStatusId(res?.payload?.data?.data?.list?.[0]?.id);
    });
  }, [dispatch]);

  const mapEvents = (events) => {
    return events.map((event) => ({
      title: event.title,
      start: new Date(event.due_date_time), // Adjust the date fields as needed
      end: new Date(event.due_date_time),
      desc: event.description,
      status: event.id,
      // Add other event fields as needed
    }));
  };

  const getAllEvents = async () => {
    const payload = {
      project_id: id,
      start: 0,
      limit: -1,
      search: "",
      type: 1,
    };
    await dispatch(TaskListColumn(payload)).then((res) => {
      // setStatusMenuData(res?.payload?.data?.data?.list);
      const mappedEvents = mapEvents(res?.payload?.data?.data?.list);
      setCalendarState((prevState) => ({
        ...prevState,
        events: mappedEvents,
      }));
    });
  };

  useEffect(() => {
    getAllEvents();
  }, [dispatch]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    formik.resetForm();
    setCalendarState({
      ...calendarState,
      openSlot: false,
      openEvent: false,
    });
    setAnchorEl(null);
  };

  const handleViewChange = (view: string) => {
    console.log(`Switching to ${view} view`);
  };

  const formats = {
    weekdayFormat: (date: Date, culture: string, localizer: any) =>
      localizer.format(date, "dddd", culture),
  };

  const [today] = React.useState(new Date());

  const customDayPropGetter = (date) => {
    const isToday = moment(date).isSame(today, "day");
    const isSlotOpen =
      calendarState.openSlot && moment(date).isSame(calendarState.start, "day");

    return {
      className: isToday ? "today-cell" : isSlotOpen ? "active-slot" : "",
    };
  };
  const eventComponent = ({ event }) => {
    return (
      <EventCustomize
        event={event}
        onClickButton={(clickedEvent) => {
          console.log(`Button clicked for event: ${clickedEvent.title}`);
        }}
      />
    );
  };

  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      setCalendarState({
        ...calendarState,
        start,
        end,
        openSlot: true,
        openEvent: false,
      });
    },
    [calendarState]
  );

  const handleSelectEvent = (event, e) => {
    setCalendarState({
      ...calendarState,
      openEvent: true,
      clickedEvent: event,
      start: event.start,
      end: event.end,
      title: event.title,
      status: event.status,
      desc: event.desc,
    });
    setAnchorEl(e.currentTarget);
  };

  const setNewAppointment = async () => {
    setDisabled(true);
    const { title, start, end, desc, events, status } = calendarState;
    const newEvent = { title, start, end, desc, status };

    const formData = new FormData();
    formData.append("project_id", id);
    formData.append("project_column_id", status || statusMenuData?.[0]?.id);
    formData.append("title", title);
    formData.append("description", "");
    formData.append("priority", "");
    formData.append("labels", "");
    formData.append("status", status || statusMenuData?.[0]?.id);
    formData.append("agent_ids", "");
    formData.append("voice_record_file", "");
    formData.append("screen_record_file", "");
    formData.append("due_date_time", moment(start).format("YYYY-MM-DD HH:mm"));
    formData.append(
      "business_due_date",
      moment(start).format("YYYY-MM-DD HH:mm")
    );
    formData.append("reminders", "");
    formData.append("files", "");

    try {
      const res = await dispatch(TaskAdd(formData));
      if (res?.payload?.data?.status == 1) {
        setDisabled(false);
        setCalendarState({
          ...calendarState,
          openSlot: false,
        });
        getAllEvents();
        toast.success(res?.payload?.data?.message);
      } else {
        setDisabled(false);
        toast.error(res?.payload?.data?.message);
        setCalendarState({
          ...calendarState,
          openSlot: false,
        });
      }
    } catch (error) {
      setDisabled(false);
      console.error("Error fetching data:", error);
    }
  };

  const updateEvent = () => {
    const { title, desc, start, end, events, clickedEvent } = calendarState;
    const updatedEvents = events.map((event) =>
      event === clickedEvent ? { ...event, title, desc, start, end } : event
    );
    setCalendarState({
      ...calendarState,
      events: updatedEvents,
      openEvent: false,
    });
    handleClose();
  };

  const deleteEvent = () => {
    const { events, clickedEvent } = calendarState;
    const updatedEvents = events.filter((event) => event !== clickedEvent);
    setCalendarState({
      ...calendarState,
      events: updatedEvents,
      openEvent: false,
    });
    handleClose();
  };

  const toggleDeleteModal = () => setOpenDeleteModal(!openDeleteModal);

  const handleStatusMenuClick = (event) => {
    setStatusMenu(event.currentTarget);
  };

  const handleStatusMenuItemClick = (status) => {
    setSelectedStatusId(status.id);
    setCalendarState({ ...calendarState, status: status.id });

    setStatusMenu(null);
  };
  useEffect(() => {
    setCalendarState({
      ...calendarState,

      title: "",
      status: "",
    });
    setSelectedStatusId(null);
  }, [calendarState?.openSlot]);

  const toggleEditModal = () => {
    setIsOpenAddModal(true);
  };
  const handleClosePopup = () => {
    setAnchorEl(null);
  };
  const handleDelete = () => {
    if (id) {
      setDisabled(true);
      dispatch(deleteTask(calendarState?.status))
        .unwrap()
        .then((res) => {
          if (res?.data?.status == 1) {
            setOpenDeleteModal(false);
            deleteEvent();
            // callListApi(2);
            getAllEvents();
            toast.success(res?.data?.message, {
              duration: 4000,
            });
            setDisabled(false);
          }
        });
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .required("Name is required")
      .min(1, "Name is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema,
    onSubmit: (values) => {
      fetchData(values);
    },
  });

  const fetchData = async (payload: any) => {
    setDisable(true);
    const data: any = {
      project_id: id as string,
      name: payload.name,
    };
    try {
      const res = await dispatch(projectColumnAdd(data));
      if (res?.payload?.data?.status == 1) {
        toast.success(res?.payload?.data?.message);
        formik.setFieldValue("name", "");
        formik.resetForm();

        setDisable(false);
        dispatch(getStatusList({ id: id })).then((res) => {
          setStatusMenuData(res?.payload?.data?.data?.list);
          setSelectedStatusId(res?.payload?.data?.data?.list?.[0]?.id);
        });
      } else {
        setDisable(false);
      }
    } catch (error) {
      setDisable(false);
      console.error("Error fetching data:", error);
    }
  };
  const handleSave = () => {
    formik.handleSubmit();
  };

  const userDetails = JSON.parse(localStorage.getItem("userDetail"));
  return (
    <>
      <div className={` ${userDetails?.role == "client" ? "client" : ""}`}>
        <Calendar
          localizer={localizer}
          events={calendarState.events}
          startAccessor="start"
          endAccessor="end"
          defaultView="month"
          popup={true}
          components={{
            toolbar: (props) => (
              <CustomToolbar {...props} onViewChange={handleViewChange} />
            ),
            event: eventComponent,
          }}
          formats={formats}
          dayPropGetter={customDayPropGetter}
          onSelectEvent={(event, e) => handleSelectEvent(event, e)}
          onSelectSlot={userDetails?.role != "agent" && handleSelectSlot}
          selectable={true}
        />

        <Dialog
          open={calendarState.openSlot}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
          PaperProps={{
            style: {
              minWidth: "20vw",
              paddingTop: "2rem",
              paddingBottom: "2rem",
            },
          }}
        >
          <>
            <div className="flex items-center justify-between mb-20 border-b-1 border-b-solid border-b-[#EDF2F6] px-20 pb-10">
              <Typography className="text-[16px] font-500">
                Create Task
              </Typography>
              {calendarState.start && (
                <Typography
                  variant="subtitle1"
                  className="text-[14px] text-[#757982]"
                >
                  {moment(calendarState.start).format("MMMM Do YYYY")}
                </Typography>
              )}
            </div>
            <div className="mb-20 px-20">
              <InputField
                name="title"
                label="Title"
                placeholder="Enter Task Name"
                value={calendarState.title}
                onChange={(e) =>
                  setCalendarState({
                    ...calendarState,
                    title: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-20 px-20">
              {statusMenuData?.length != 0 ? (
                <>
                  <Typography className="block text-[16px] font-medium text-[#111827] mb-5">
                    Column List
                  </Typography>
                  <DropdownMenu
                    anchorEl={statusMenu}
                    handleClose={() => setStatusMenu(null)}
                    button={
                      <CommonChip
                        onClick={handleStatusMenuClick}
                        // label={selectedStatus}
                        style={{ width: "100%" }}
                        label={
                          selectedStatusId
                            ? statusMenuData?.find(
                                (item) => item.id == selectedStatusId
                              )?.name
                            : statusMenuData?.[0]?.name
                        }
                        icon={<StatusIcon />}
                      />
                    }
                    popoverProps={{
                      open: !!statusMenu,
                      classes: {
                        paper: "pt-10 pb-20 ",
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
                    })}
                  </DropdownMenu>
                </>
              ) : (
                <>
                  <div className="flex gap-4 " style={{ alignItems: "center" }}>
                    <InputField
                      className="!w-[200px]"
                      formik={formik}
                      name="name"
                      label="Column Name"
                      placeholder="Enter Column Name"
                    />
                    <Button
                      variant="contained"
                      color="secondary"
                      className="w-[95px] h-[30px] text-[16px] rounded-[28px] mt-[12px]"
                      onClick={handleSave}
                      // disabled={
                      //   calendarState.title == "" ||
                      //   statusMenuData?.length == 0 ||
                      //   disable
                      // }
                    >
                      Add
                    </Button>
                  </div>
                  <span className=" text-red   block ">
                    You don't have column please add column first
                  </span>
                </>
              )}
            </div>
            <div className="flex px-20">
              <Button
                variant="contained"
                color="secondary"
                className="w-[95px] h-[30px] text-[16px] rounded-[28px]"
                onClick={setNewAppointment}
                disabled={
                  calendarState.title == "" ||
                  statusMenuData?.length == 0 ||
                  disable
                }
              >
                Save
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                className="w-[95px] h-[30px] text-[16px] ml-14 rounded-[28px]"
                onClick={handleClose}
                disabled={disable}
              >
                Cancel
              </Button>
            </div>
          </>
        </Dialog>

        <div style={{ position: "absolute", right: 20, top: 19 }}>
          <span
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            <ThreeDotsIcon className="cursor-pointer" />
          </span>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClosePopup}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem
              onClick={(e) => {
                handleClosePopup();
                toggleEditModal();
              }}
            >
              Edit Task
            </MenuItem>
            <MenuItem
              onClick={(e) => {
                handleClosePopup();
                toggleDeleteModal();
                e.stopPropagation();
              }}
            >
              Delete Task
            </MenuItem>
          </Menu>
        </div>
      </div>
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
          project_id={id}
          setIsOpen={setIsOpenAddModal}
          ColumnId={calendarState?.status}
          callListApi={getAllEvents}
          Edit
        />
      )}
    </>
  );
};

export default CalenderDesign;
