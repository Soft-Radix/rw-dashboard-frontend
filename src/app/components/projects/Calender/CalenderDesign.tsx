import {} from "console";
import moment from "moment";
import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CustomToolbar from "./CustomToolBar";
import EventCustomize from "./EventCustomize";
import { Button, Dialog, TextField, Typography } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import InputField from "../../InputField";

interface slotData {
  start: Date;
  end: Date;
  slots: Date[];
  action: "select" | "click" | "doubleClick" | "contextMenu";
  bounds: {
    x: number;
    y: number;
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  box: {
    x: number;
    y: number;
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}
interface CalendarState {
  events: any[]; // Adjust the type according to your event structure
  title: string;
  desc: string;
  start: Date | null;
  end: Date | null;
  openSlot: boolean;
  openEvent: boolean;
  clickedEvent: any | null; // Adjust the type according to your event structure
}
const localizer = momentLocalizer(moment);

const CalenderDesign = ({ events }) => {
  const [calendarState, setCalendarState] = useState<CalendarState>({
    events: [],
    title: "",
    desc: "",
    start: null,
    end: null,
    openSlot: false,
    openEvent: false,
    clickedEvent: null,
  });
  const handleClose = () => {
    setCalendarState({
      ...calendarState,
      openSlot: false,
      openEvent: false,
    });
  };

  const handleViewChange = (view: string) => {
    console.log(`Switching to ${view} view`);
    // Implement your logic to handle view change (e.g., update state)
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
          // Handle button click logic here
          console.log(`Button clicked for event: ${clickedEvent.title}`);
        }}
      />
    );
  };

  const handleSlotSelected = (slotInfo: slotData) => {
    // alert("Date is selected");
    setCalendarState({
      ...calendarState,
      title: "",
      desc: "",
      start: slotInfo.start,
      end: slotInfo.end,
      openSlot: true,
    });
    console.log(calendarState, "kkk");
  };

  const handleEventSelected = (event: any) => {
    setCalendarState({
      ...calendarState,
      openEvent: true,
      clickedEvent: event,
      start: event.start,
      end: event.end,
      title: event.title,
      desc: event.desc,
    });
  };

  const setNewAppointment = () => {
    const { title, start, end, desc } = calendarState;
    const newEvent = { title, start, end, desc };
    setCalendarState({
      ...calendarState,
      events: [...calendarState.events, newEvent],
      openSlot: false,
    });
    console.log(calendarState, "check");
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
  };

  const deleteEvent = () => {
    const { start, events } = calendarState;
    const updatedEvents = events.filter((event) => event.start !== start);
    setCalendarState({
      ...calendarState,
      events: updatedEvents,
      openEvent: false,
    });
  };

  const appointmentActions = [
    <Button key="cancel" onClick={handleClose} color="secondary">
      Cancel
    </Button>,
    <Button key="submit" onClick={setNewAppointment} color="primary">
      Submit
    </Button>,
  ];

  const eventActions = [
    <Button key="cancel" onClick={handleClose} color="secondary">
      Cancel
    </Button>,
    <Button key="delete" onClick={deleteEvent} color="secondary">
      Delete
    </Button>,
    <Button key="confirmEdit" onClick={updateEvent} color="primary">
      Confirm Edit
    </Button>,
  ];

  return (
    <div className="h-[90vh]">
      <Calendar
        localizer={localizer}
        events={events}
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
        onSelectEvent={handleEventSelected}
        onSelectSlot={handleSlotSelected} // Handle slot selection
        selectable={true} // Enable selection of slots
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
    </div>
  );
};

export default CalenderDesign;
