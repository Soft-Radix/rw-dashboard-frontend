import {
  GroupIcon,
  ShowIcon,
  SubTaskIcon,
} from "public/assets/icons/projectsIcon";

import FilterPage from "../FilterPage";
import ProjectMenuItems from "../ProjectMenuItems";
import CalenderDesign from "./CalenderDesign";
const CalenderPage = () => {
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
        <CalenderDesign />
      </div>
    </div>
  );
};

export default CalenderPage;
