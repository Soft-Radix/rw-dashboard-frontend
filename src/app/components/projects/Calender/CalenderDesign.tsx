import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CustomToolbar from "./CustomToolBar";

const localizer = momentLocalizer(moment);

const CalenderDesign = () => {
  const events = [
    {
      title: "Meeting",
      start: new Date(2024, 3, 15, 10, 0), // 10.00 AM
      end: new Date(2024, 3, 15, 12, 0), // 12.00 PM
    },
    {
      title: "Coffee Break",
      start: new Date(2024, 3, 16, 15, 0), // 3.00 PM
      end: new Date(2024, 3, 16, 15, 30), // 3.30 PM
    },
  ];
  const handleViewChange = (view: string) => {
    console.log(`Switching to ${view} view`);
    // Implement your logic to handle view change (e.g., update state)
  };
  const formats = {
    weekdayFormat: (date: Date, culture: string, localizer: any) =>
      localizer.format(date, "dddd", culture),
  };
  const dayPropGetter = (date) => {
    const today = moment().startOf("day");
    const day = moment(date).startOf("day");

    if (day.isSame(today)) {
      return {
        style: {
          backgroundColor: "lightblue", // Example background color
          color: "black", // Example text color
          // Example rounded appearance
          padding: "2px", // Example padding
          textAlign: "center", // Center text
        },
        content: "Today", // Custom content to render
      };
    }

    // Return an empty object for other days
    return {};
  };

  // const eventStyleGetter = (event, start, end, isSelected) => {
  //   // Define style object with explicit type including backgroundColor
  //   let style: React.CSSProperties = {};

  //   if (event.type === "meeting") {
  //     style.backgroundColor = "blue";
  //   } else if (event.type === "break") {
  //     style.backgroundColor = "green";
  //   }

  //   style.color = "white";
  //   style.borderRadius = "0px";
  //   style.border = "none";

  //   return {
  //     style,
  //   };
  // };
  console.log(dayPropGetter, "jjj");
  return (
    <div className="h-[90vh]">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        components={{
          toolbar: (props) => (
            <CustomToolbar {...props} onViewChange={handleViewChange} />
          ),
        }}
        formats={formats}
        // eventStyleGetter={eventStyleGetter}
        dayPropGetter={dayPropGetter}
      />
    </div>
  );
};

export default CalenderDesign;
