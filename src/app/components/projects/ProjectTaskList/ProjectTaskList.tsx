import ListLoading from "@fuse/core/ListLoading";
import { Theme, Typography } from "@mui/material";
import { useTheme } from "@mui/styles";
import { projectColumnList } from "app/store/Projects";
import { ProjectRootState } from "app/store/Projects/Interface";
import { useAppDispatch } from "app/store/store";
import { NoDataFound } from "public/assets/icons/common";
import {
  GroupIcon,
  ShowIcon,
  SubTaskIcon,
} from "public/assets/icons/projectsIcon";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import FilterPage from "../FilterPage";
import ProjectMenuItems from "../ProjectMenuItems";
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
  const [tableSelectedItemDesign, setTableSelectedItemDesign] =
    useState("Priority");
  const [showData, setShowData] = useState(true);
  const { fetchStatusNew } = useSelector(
    (store: ProjectRootState) => store?.project
  );
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const handleShowTable = () => {
    setShowData(!showData);
  };
  const listData = async (task_limt, columnid = 0) => {
    const payload: any = {
      start: 0,
      limit: -1,
      search: "",
      project_id: id as string,
      task_start: 0,
      task_limit: task_limt || 20,
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
      listData(20);
    }
  }, [id]);
  if (fetchStatusNew == "loading") {
    return <ListLoading />;
  }
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

          {columnList?.length == 0 ? (
            <div
              className="flex flex-col justify-center align-items-center gap-20 bg-[#F7F9FB] min-h-[400px] py-40"
              style={{ alignItems: "center" }}
            >
              <NoDataFound />
              <Typography className="text-[24px] text-center font-600 leading-normal">
                No data found !
              </Typography>
            </div>
          ) : (
            <DragLayout
              columnList={columnList}
              callListApi={listData}
              id={id}
            />
          )}
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
