import React from "react";
import { EventIcon, ThreeDotHzIcon } from "public/assets/icons/calender";
import { ThreeDotsIcon } from "public/assets/icons/dashboardIcons";

// Define a type for the event object
interface EventData {
  id: number;
  title: string;
  description: string;
  // Add more properties if needed
}

// Define the props interface for the EventCustomize component
interface EventCustomizeProps {
  event: EventData; // Use the EventData type for the event prop
  onClickButton: (event: EventData) => void; // Function accepting EventData as parameter
}

const EventCustomize: React.FC<EventCustomizeProps> = ({
  event,
  onClickButton,
}) => {
  const handleButtonClick = () => {
    onClickButton(event);
  };

  return (
    <div className="flex items-center justify-between border-[0.5px] border-[#9DA0A6] p-5  rounded-sm">
      <div className="text-[#757982] text-[10px] font-semibold flex gap-3 items-center">
        <EventIcon />
        <strong>{event.title}</strong>
        <p>{event.description}</p>
      </div>
      <button onClick={handleButtonClick} className="pr-2">
        <ThreeDotHzIcon />
      </button>
    </div>
  );
};

export default EventCustomize;
