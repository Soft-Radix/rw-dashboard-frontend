import React from "react";
import { EventIcon, ThreeDotHzIcon } from "public/assets/icons/calender";
import { ThreeDotsIcon } from "public/assets/icons/dashboardIcons";
import { useNavigate, useParams } from "react-router";

// Define a type for the event object
interface EventData {
  id: number;
  title: string;
  description: string;
  status?: number;
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
  const { id } = useParams();
  const navigate = useNavigate();
  const handleButtonClick = () => {
    onClickButton(event);
  };
  const userDetails = JSON.parse(localStorage.getItem("userDetail"));
  return (
    <div className="relative w-[100%]">
      {userDetails?.role != "agent" && (
        <div className="absolute right-7 z-999 ">
          <button onClick={handleButtonClick} className="pr-2">
            <ThreeDotHzIcon />
          </button>
        </div>
      )}
      <div
        className="flex items-center justify-between border-[0.5px] border-[#9DA0A6] p-5  rounded-sm relative "
        onClick={() => navigate(`/${id}/tasks/detail/${event?.status}`)}
      >
        <div className="text-[#757982] text-[10px] font-semibold flex gap-3 items-center ">
          <EventIcon />
          <strong className="truncate max-w-[10%] md:max-w-[20%] xl:max-w-[50%]">
            {event.title}
          </strong>
          <p>{event.description}</p>
        </div>
      </div>
    </div>
  );
};

export default EventCustomize;
