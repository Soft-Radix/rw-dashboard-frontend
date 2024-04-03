import React from "react";
import FilterPage from "../FilterPage";
import ProjectMenuItems from "../ProjectMenuItems";
import {
  DownArrowBlack,
  GroupIcon,
  ShowIcon,
  SortIcon,
  SubTaskIcon,
} from "public/assets/icons/projectsIcon";
import DueDate from "../DueDate";
import { Typography } from "@mui/material";
const rows = [
  {
    title: "Brand logo design",
    defaultChecked: true,
    assignedImg: ["female-01.jpg", "female-02.jpg", "female-03.jpg"],
    priority: "Medium",
  },
  {
    title: "Brand logo design",
    defaultChecked: true,
    assignedImg: [
      "female-01.jpg",
      "female-02.jpg",
      "female-03.jpg",
      "female-04.jpg",
      "female-05.jpg",
    ],
    priority: "Medium",
  },
  {
    title: "Brand logo design",
    defaultChecked: false,
    assignedImg: ["female-01.jpg", "female-02.jpg", "female-03.jpg"],
    priority: "Medium",
  },
  {
    title: "Brand logo design",
    defaultChecked: false,
    assignedImg: ["female-01.jpg", "female-02.jpg", "female-03.jpg"],
    priority: "Low",
  },
  {
    title: "Brand logo design",
    defaultChecked: false,
    assignedImg: ["female-01.jpg", "female-02.jpg", "female-03.jpg"],
    priority: "High",
  },
  {
    title: "Brand logo design",
    defaultChecked: false,
    assignedImg: ["female-01.jpg", "female-02.jpg", "female-03.jpg"],
    priority: "Low",
  },
  {
    title: "Brand logo design",
    defaultChecked: false,
    assignedImg: ["female-01.jpg", "female-02.jpg", "female-03.jpg"],
    priority: "High",
  },
];
interface TaskList {
  customSelectedTab: number;
}
const ProjectTaskList = (props: TaskList) => {
  const { customSelectedTab } = props;
  return (
    <>
      {customSelectedTab && (
        <div>
          <div className="shadow-md bg-white mx-28 rounded-lg">
            <FilterPage />

            <div className="px-20 pb-10 flex gap-32 ">
              <ProjectMenuItems
                label={"Group By"}
                icon={<GroupIcon />}
                className="bg-[#F6F6F6] rounded-md px-10 py-20 text-[#9DA0A6] font-400
          cursor-pointer text-[12px]"
                //   setTableSelectedItemDesign={setTableSelectedItemDesign}
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

          <div className="flex items-center gap-20 px-20 h-40 w-full shadow-sm bg-white ">
            <DownArrowBlack />
            <Typography>Todo </Typography>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectTaskList;
