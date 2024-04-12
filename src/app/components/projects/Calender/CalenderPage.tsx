import {
  GroupIcon,
  ShowIcon,
  SubTaskIcon,
} from "public/assets/icons/projectsIcon";

import FilterPage from "../FilterPage";
import ProjectMenuItems from "../ProjectMenuItems";
import CalenderDesign from "./CalenderDesign";
const CalenderPage = () => {
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
  return (
    <div className=" px-20">
      <div className="shadow-md bg-white rounded-lg">
        <FilterPage />

        <div className="px-20 pb-10 flex gap-32">
          <ProjectMenuItems
            label={"Group By"}
            icon={<GroupIcon />}
            className="bg-[#F6F6F6] rounded-md px-10 py-20 text-[#9DA0A6] font-400
          cursor-pointer text-[12px]"
            // setTableSelectedItemDesign={setTableSelectedItemDesign}
          />
          <ProjectMenuItems
            label={"Show/Hide Subtasks"}
            icon={<SubTaskIcon />}
            className="bg-[#F6F6F6] rounded-md px-10 py-20 text-[#9DA0A6] font-400
          cursor-pointer text-[12px]"
          />
          <ProjectMenuItems
            label="Show Closed"
            icon={<ShowIcon />}
            className="bg-[#F6F6F6] rounded-md px-10 py-20 text-[#9DA0A6] font-400
          cursor-pointer text-[12px]"
          />
        </div>
      </div>
      <div className="my-20 w-100%">
        <CalenderDesign events={events} />
      </div>
    </div>
  );
};

export default CalenderPage;
