import {
  Button,
  Grid,
  Menu,
  MenuItem,
  TableCell,
  Theme,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/styles";
import { PlusIcon } from "public/assets/icons/dashboardIcons";
import { useEffect, useState } from "react";
import TitleBar from "src/app/components/TitleBar";
import AddTaskModal from "src/app/components/tasks/AddTask";
import ThemePageTable from "src/app/components/tasks/TaskPageTable";
import RecentData from "../../components/client/clientAgent/RecentData";
import { Clock, DownGreenIcon, Token } from "public/assets/icons/common";
import { useParams } from "react-router";
import { getAgentInfo } from "app/store/Agent";
import { useAppDispatch } from "app/store/store";
import { useSelector } from "react-redux";
import { ClientRootState } from "app/store/Client/Interface";
import { Console } from "console";
import { AgentRootState } from "app/store/Agent/Interafce";
import moment from "moment";
import TaskDetailData from "./TaskDetailData";
import { ImportantTaskIcon } from "public/assets/icons/task-icons";
import SubTaskTable from "./SubTaskTable";
import task1 from "../../../../public/assets/images/pages/tasks/task-file1.png";
import task2 from "../../../../public/assets/images/pages/tasks/task-file2.png";

const TaskDetails = () => {
  const theme: Theme = useTheme();

  return (
    <div>
      <TitleBar title="Task Details"></TitleBar>

      <div className="px-28 flex gap-20 flex-wrap lg:flex-nowrap">
        <div className="basis-full lg:basis-auto lg:grow">
          <div className="shadow-md bg-white rounded-lg">
            <div className="border border-[#E7E8E9] rounded-lg flex  justify-left gap-[30px] items-start p-[2rem] flex-col sm:flex-row relative">
              <div>
                <div className="flex items-center justify-between gap-40 mb-10">
                  <span className="text-[20px] text-[#111827] font-600 inline-block">
                    Brand logo design
                  </span>
                  <Button className="text-[#4F46E5] bg-[#EDEDFC] flex gap-10 py-10 px-20">
                    {/* {agentDetail?.status || "N/A"} */}
                    <ImportantTaskIcon />
                    Important Task
                  </Button>
                </div>

                <div className="flex text-[14px] text-para_light my-10 font-400 ">
                  <div className="flex">
                    {/* <span>{agentDetail?.email}</span> */}
                    Due Date{" "}
                    <span className="font-500 text-[#111827] text-[14px]">
                      : Feb 12,2024 , 11: 30 AM
                    </span>{" "}
                  </div>
                </div>

                <div className="flex text-[2rem] text-para_light mt-4 gap-10 justify-between ">
                  <Typography className="text-[#757982] font-400 text-[14px] w-4/5">
                    Designing a brand logo involves several considerations,
                    including the brand's identity, target audience, and
                    message. Here's a general process you can follow to design a
                    brand logo
                  </Typography>
                </div>
                {/* <div className="container mx-auto p-4 border-t">
                  <div className="flex items-center  border-gray-300 py-2 font-semibold text-gray-600">
                    <div className="w-1/4">Priority</div>
                    <div className="w-1/4">Status</div>
                    <div className="w-1/4">Reminder</div>
                    <div className="w-1/4">Assignees</div>
                  </div>
                  <div className="flex items-center border-gray-200 py-2">
                    <div className="flex items-center w-1/4">
                      <span className="bg-[#FF5F152E] text-[#FF5F15]  py-1 px-3 rounded-full  w-[70px] min-h-[25px] text-sm font-500">
                        Medium
                      </span>
                    </div>
                    <div className="flex items-center w-1/4">
                      <span className="text-gray-700">To Do</span>
                    </div>
                    <div className="flex items-center w-1/4">
                      <span className="text-gray-700">
                        Feb 13, 2024, 11:30 AM
                      </span>
                    </div>
                    <div className="flex items-center w-1/4">
                      <div className="flex -space-x-2">
                        <img
                          className="w-8 h-8 rounded-full border-2 border-white"
                          src="https://via.placeholder.com/150"
                          alt="User 1"
                        />
                        <img
                          className="w-8 h-8 rounded-full border-2 border-white"
                          src="https://via.placeholder.com/150"
                          alt="User 2"
                        />
                        <img
                          className="w-8 h-8 rounded-full border-2 border-white"
                          src="https://via.placeholder.com/150"
                          alt="User 3"
                        />
                        <img
                          className="w-8 h-8 rounded-full border-2 border-white"
                          src="https://via.placeholder.com/150"
                          alt="User 4"
                        />
                      </div>
                    </div>
                  </div>
                </div> */}
                {/* <div className="flex gap-30">
                  <div>
                    <Typography>Files</Typography>
                    <div className="flex gap-10">
                      <img src={task1} alt="" />
                      <img src={task2} alt="" />
                    </div>
                  </div>
                  <div>
                    <div>
                      <Typography>Screen Recording</Typography>
                    </div>
                  </div>
                </div> */}
                <div className="flex justify-between items-center">
                  <div className="text-[20px] font-600">Subtasks</div>
                  <Button className="text-[16px] font-500 text-[#4F46E5] gap-10">
                    <PlusIcon color={theme.palette.secondary.main} />
                    Add Subtask
                  </Button>
                </div>
                {/* <div className="flex items-baseline justify-between w-full pt-0 pb-20 gap-31 my-10"></div> */}
              </div>
            </div>
            <SubTaskTable />
          </div>
        </div>
        <div className="basis-full lg:basis-[322px]">
          <TaskDetailData />
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
