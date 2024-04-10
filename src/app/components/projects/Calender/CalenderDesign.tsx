import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const CalenderDesign = () => {
  const headerToolbar = {
    left: "title",
    // center: "title",
    // right: "dayGridMonth,timeGridWeek,timeGridDay",
  };
  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        headerToolbar={headerToolbar}
        dayHeaderFormat={{ weekday: "long" }}
        // weekends={false}
      />
    </div>
  );
};

export default CalenderDesign;
