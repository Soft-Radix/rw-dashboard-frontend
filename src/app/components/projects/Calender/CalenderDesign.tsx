import moment from "moment";
import React, { useCallback, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CustomToolbar from "./CustomToolBar";
import EventCustomize from "./EventCustomize";
import { Button, Dialog, Menu, MenuItem, Typography } from "@mui/material";
import InputField from "../../InputField";
import { ThreeDotsIcon } from "public/assets/icons/dashboardIcons"; // Ensure this is the correct import path

const localizer = momentLocalizer(moment);

const CalenderDesign = ({ events }) => {
  const [calendarState, setCalendarState] = useState({
    events: events,
    title: "",
    desc: "",
    start: null,
    end: null,
    openSlot: false,
    openEvent: false,
    clickedEvent: null,
  });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
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
    return {
      className: isToday ? "today-cell" : "",
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
      desc: event.desc,
    });
    setAnchorEl(e.currentTarget);
  };

  const setNewAppointment = () => {
    const { title, start, end, desc, events } = calendarState;
    const newEvent = { title, start, end, desc };
    setCalendarState({
      ...calendarState,
      events: [...events, newEvent],
      openSlot: false,
    });
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

  const toggleEditModal = () => {
    setCalendarState({
      ...calendarState,
      openSlot: false,
      openEvent: true,
    });
  };

  const toggleDeleteModal = () => {
    deleteEvent();
  };

  return (
    <div className="h-[90vh]">
      <Calendar
        localizer={localizer}
        events={calendarState.events}
        startAccessor="start"
        endAccessor="end"
        defaultView="month"
        components={{
          toolbar: (props) => (
            <CustomToolbar {...props} onViewChange={handleViewChange} />
          ),
          event: eventComponent,
        }}
        formats={formats}
        dayPropGetter={customDayPropGetter}
        onSelectEvent={(event, e) => handleSelectEvent(event, e)}
        onSelectSlot={handleSelectSlot}
        selectable={true}
      />

      <Dialog
        open={calendarState.openSlot}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        PaperProps={{
          style: {
            minWidth: "20vw",
            padding: "2rem",
          },
        }}
      >
        <div className="flex items-center justify-between mb-20">
          <Typography className="text-[16px] font-500">Create Task</Typography>
          {calendarState.start && (
            <Typography
              variant="subtitle1"
              className="text-[14px] text-[#757982]"
            >
              {moment(calendarState.start).format("MMMM Do YYYY")}
            </Typography>
          )}
        </div>
        <div className="mb-20">
          <InputField
            name="title"
            label="Title"
            placeholder="Enter Task Name"
            value={calendarState.title}
            onChange={(e) =>
              setCalendarState({ ...calendarState, title: e.target.value })
            }
          />
        </div>
        <div className="flex">
          <Button
            variant="contained"
            color="secondary"
            className="w-[95px] h-[30px] text-[16px] rounded-[28px]"
            onClick={setNewAppointment}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            className="w-[95px] h-[30px] text-[16px] ml-14 rounded-[28px]"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </div>
      </Dialog>

      {/* <Dialog
        open={calendarState.openEvent}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        PaperProps={{
          style: {
            minWidth: "20vw",
            padding: "2rem",
          },
        }}
      >
        <div className="flex items-center justify-between mb-20">
          <Typography className="text-[16px] font-500">Edit Task</Typography>
          {calendarState.start && (
            <Typography
              variant="subtitle1"
              className="text-[14px] text-[#757982]"
            >
              {moment(calendarState.start).format("MMMM Do YYYY")}
            </Typography>
          )}
        </div>
        <div className="mb-20">
          <InputField
            name="title"
            label="Title"
            placeholder="Enter Task Name"
            value={calendarState.title}
            onChange={(e) =>
              setCalendarState({ ...calendarState, title: e.target.value })
            }
          />
          <InputField
            name="desc"
            label="Description"
            placeholder="Enter Task Description"
            value={calendarState.desc}
            onChange={(e) =>
              setCalendarState({ ...calendarState, desc: e.target.value })
            }
          />
        </div>
        <div className="flex">
          <Button
            variant="contained"
            color="secondary"
            className="w-[95px] h-[30px] text-[16px] rounded-[28px]"
            onClick={updateEvent}
          >
            Save
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className="w-[95px] h-[30px] text-[16px] ml-14 rounded-[28px]"
            onClick={deleteEvent}
          >
            Delete
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            className="w-[95px] h-[30px] text-[16px] ml-14 rounded-[28px]"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </div>
      </Dialog> */}

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
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem
            onClick={(e) => {
              handleClose();
              toggleEditModal();
            }}
          >
            Edit Task
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              handleClose();
              toggleDeleteModal();
              e.stopPropagation();
            }}
          >
            Delete Task
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              handleClose();
              e.stopPropagation();
              // Replace navigate call with your navigation logic
              // navigate(`/${project_id}/tasks/detail/${id}`);
            }}
          >
            View
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default CalenderDesign;
