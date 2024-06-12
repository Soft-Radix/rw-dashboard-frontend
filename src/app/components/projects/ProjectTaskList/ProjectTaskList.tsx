import React, { useEffect, useState } from "react";
import FilterPage from "../FilterPage";
import ProjectMenuItems from "../ProjectMenuItems";
import {
  DownArrowBlack,
  DownArrowright,
  GroupIcon,
  ProjectPlusIcon,
  ShowIcon,
  SortIcon,
  SubTaskIcon,
} from "public/assets/icons/projectsIcon";
import DueDate from "../DueDate";
import {
  Button,
  Checkbox,
  TableCell,
  TableRow,
  Theme,
  Typography,
} from "@mui/material";
import { PlusIcon } from "public/assets/icons/dashboardIcons";
import { useTheme } from "@mui/styles";
import ThemePageTable from "../../tasks/TaskPageTable";
import ImagesOverlap from "../../ImagesOverlap";
import {
  ArrowRightCircleIcon,
  DeleteIcon,
  EditIcon,
} from "public/assets/icons/common";
import CommonTable from "../../commonTable";
import Review from "./Review";
import InProgress from "./InProgress";
import Completed from "./Completed";
import TaskListDueData from "./TaskListDueData";
import Assignee from "./Assignee";
import Priority from "./Priority";
import Label from "./Label";
import Todo from "./Todo";
import { useParams } from "react-router";
import { useAppDispatch } from "app/store/store";
import { projectColumnList } from "app/store/Projects";
import DragLayout from "./DragLayout";
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
];
interface TaskList {
  customSelectedTab: number;
}

const ProjectTaskList = (props: TaskList) => {
  const theme: Theme = useTheme();
  const { customSelectedTab } = props;
  const [columnList, setColumnList] = useState<any[]>([]);
  const [tableSelectedItemDesign, setTableSelectedItemDesign] = useState(
    "Priority"
  );
  const [showData, setShowData] = useState(true);
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const handleShowTable = () => {
    setShowData(!showData);
  };
  const listData = async (task_limt, columnid = 0) => {
    const payload: any = {
      start: 0,
      limit: 10,
      search: "",
      project_id: id as string,
      task_start: 0,
      task_limit: task_limt || 2,
      project_column_id: columnid,
    };
    try {
      const res = await dispatch(projectColumnList(payload));
      // setColumnList(res?.payload?.data?.data?.list);
      const updatedList = res?.payload?.data?.data?.list;

      if (columnid != 0) {
        // If columnId is provided, find the column with that id
        const columnObject = updatedList.find((item) => item.id == columnid);
        const columnIndex = columnList.findIndex(
          (column) => column.id == columnid
        );
        if (columnIndex !== -1) {
          // If column is found, update its tasks
          const updatedColumn = {
            ...columnList[columnIndex],
            tasks: columnObject?.tasks,
          };

          // Update the columnList state with the updated column
          setColumnList((prevColumnList) => {
            const updatedColumns = [...prevColumnList];
            const newColumn: any = { ...updatedColumns[columnIndex] };
            newColumn.tasks = [...updatedColumn?.tasks];
            updatedColumns[columnIndex] = newColumn;
            return updatedColumns;
          });
        }
      } else {
        // If columnId is 0, update the entire columnList
        setColumnList(updatedList);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const savedOrder = localStorage.getItem(`columnOrder-${id}`);
    if (savedOrder) {
      setColumnList(JSON.parse(savedOrder));
    } else {
      listData(2);
    }
  }, [id]);
  return (
    <>
      {customSelectedTab && (
        <div className="px-28">
          <div className="shadow-md bg-white rounded-lg">
            <FilterPage />

            <div className="px-20 pb-10 flex gap-32 ">
              <ProjectMenuItems
                label={"Group By"}
                icon={<GroupIcon />}
                className="bg-[#F6F6F6] rounded-md px-10 py-20 text-[#9DA0A6] font-400
          cursor-pointer text-[12px]"
                setTableSelectedItemDesign={setTableSelectedItemDesign}
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
          <DragLayout columnList={columnList} callListApi={listData} id={id} />
          {/* <Todo /> */}
          {/* <InProgress />
          <Review />
          <Completed /> */}
        </div>
      )}
    </>
  );
};

export default ProjectTaskList;
function useQuery(): { query: any } {
  throw new Error("Function not implemented.");
}
