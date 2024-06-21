import {
  Checkbox,
  TableCell,
  TableRow,
  Theme,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/styles";
import {
  ArrowRightCircleIcon,
  DeleteIcon,
  EditIcon,
  NoDataFound,
} from "public/assets/icons/common";
import CommonTable from "../commonTable";
import ImagesOverlap from "../ImagesOverlap";

// import DueDate from "./DueDate";
import { useState } from "react";
// import { DownArrowBlack, SortIcon } from "public/assets/icons/projectsIcon";
import DueDate from "../projects/DueDate";
import { Link } from "react-router-dom";
import DeleteClient from "../client/DeleteClient";
import { CheckedTask, deleteTask } from "app/store/Projects";
import { useAppDispatch } from "app/store/store";
import AddTaskModal from "./AddTask";
import ListLoading from "@fuse/core/ListLoading";
import { useSelector } from "react-redux";
import { ProjectRootState } from "app/store/Projects/Interface";
import toast from "react-hot-toast";

function ThemePageTable(props) {
  const {
    tableSelectedItemDesign,
    columnList,
    ListData,
    setColumnList,
    project_id,
    ColumnId,
    showLoader,
    handleCompleteTask,
    isDefault,
  } = props;
  const dispatch = useAppDispatch();
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [isOpenDeletedModal, setIsOpenDeletedModal] = useState(false);

  const [deleteId, setIsDeleteId] = useState<any>(null);
  const userDetails = JSON.parse(localStorage.getItem("userDetail"));
  const [taskId, setTaskId] = useState<number>(null);
  const { fetchStatusNew } = useSelector(
    (store: ProjectRootState) => store?.project
  );
  const urlForImage = import.meta.env.VITE_API_BASE_IMAGE_URL;
  const theme: Theme = useTheme();
  // console.log(tableSelectedItemDesign, "kkkklkvkjdkgjdgjdgdg");
  // console.log(columnList, "columnListvsdfsdf");
  const handleDeleteAttachment = (id) => {
    dispatch(deleteTask(id)).then((res) => {
      // console.log("hellowse", res?.payload);

      if (res?.payload?.data.status === 1) {
        setColumnList((prevColumnList) =>
          prevColumnList.filter((item) => item.id !== id)
        );
      }
    });
    // ListData();
    setIsOpenDeletedModal(false);
  };

  // const extraAgentsCount = agent.length - maxVisibleImages;
  const extraAgents = columnList?.assigned_task_users?.length - 3;
  // setIsOpenDeletedModal(false);
  return (
    <>
      {tableSelectedItemDesign == "Due Date" ? (
        <>
          <CommonTable
            headings={["Title", "Assigned", "Due Date", "Priority", "Action"]}
          >
            <div></div>
          </CommonTable>
          <div className="flex flex-col gap-5">
            <DueDate
              // rows={rows}
              title={"Overdue (2)"}
              className="text-lg font-medium text-[#F44336]"
            />
            <DueDate
              title={"No Due Date (5)"}
              // rows={rows}
              className="text-lg font-medium text-[#757982]"
            />
          </div>
        </>
      ) : (
        <CommonTable
          headings={["Title", "Assigned", "Due Date", "Priority", "Action"]}
        >
          {!showLoader && columnList?.length == 0 ? (
            <TableRow>
              <TableCell colSpan={5} align="center">
                {/* <ListLoading /> */}
                <div
                  className="flex flex-col justify-center align-items-center gap-20  bg-[#F7F9FB]  py-20"
                  style={{ alignItems: "center" }}
                >
                  <NoDataFound />
                </div>
                <Typography className="text-[24px] text-center font-600 leading-normal">
                  No data found !
                </Typography>
              </TableCell>
            </TableRow>
          ) : showLoader ? (
            <TableRow>
              <TableCell colSpan={7} align="center">
                <ListLoading /> {/* Render loader component */}
              </TableCell>
            </TableRow>
          ) : (
            // )}
            <>
              {columnList?.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "& td": {
                      borderBottom: "1px solid #EDF2F6",
                      paddingTop: "12px",
                      paddingBottom: "12px",
                      color: theme.palette.primary.main,
                    },
                  }}
                >
                  <TableCell scope="row">
                    <span className="flex items-center gap-10">
                      {isDefault == 1 ? (
                        <Checkbox
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          checked={true}
                        />
                      ) : (
                        <Checkbox
                          sx={{ padding: "4px" }}
                          color="primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCompleteTask(row.id, ColumnId);
                          }}
                          defaultChecked={row.defaultChecked}
                          inputProps={{
                            "aria-labelledby": `table-checkbox-${index}`,
                          }}
                        />
                      )}{" "}
                      {row.title}
                    </span>
                  </TableCell>
                  <TableCell align="center">
                    <div className="flex mt-10 items-center justify-center">
                      {row.assigned_task_users?.slice(0, 3).map((item, idx) => {
                        // console.log(item, "itemmmm");
                        return (
                          <img
                            className={`h-[34px] w-[34px] rounded-full border-2 border-white ${
                              row.assigned_task_users?.length > 1
                                ? "ml-[-16px]"
                                : ""
                            } z-0`}
                            src={
                              item.user_image
                                ? urlForImage + item?.user_image
                                : "../assets/images/logo/images.jpeg"
                            }
                            alt={`User ${index + 1}`}
                          />
                        );
                      })}
                      {row.assigned_task_users?.length > 0 && (
                        <span
                          className="ml-[-16px] z-0 h-[34px] w-[34px] rounded-full border-2 border-white bg-[#4F46E5] flex 
                        items-center justify-center text-[12px] font-500 text-white"
                        >
                          +{row.assigned_task_users?.length}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell align="center">Feb 12,2024</TableCell>
                  <TableCell align="center">
                    <span
                      className={`inline-flex items-center justify-center rounded-full w-[70px] min-h-[25px] text-sm font-500
                  ${
                    row.priority === "Low"
                      ? "text-[#4CAF50] bg-[#4CAF502E]"
                      : row.priority === "Medium"
                        ? "text-[#FF5F15] bg-[#FF5F152E]"
                        : "text-[#F44336] bg-[#F443362E]"
                  }`}
                    >
                      {row.priority}
                    </span>
                  </TableCell>
                  <TableCell align="left" className="w-[1%]">
                    <div className="flex gap-20 items-center">
                      {userDetails?.role != "agent" && (
                        <>
                          <span className="p-2 cursor-pointer">
                            <DeleteIcon
                              onClick={() => {
                                setIsOpenDeletedModal(true);
                                setIsDeleteId(row.id);
                              }}
                            />
                          </span>
                          <span className="p-2 cursor-pointer">
                            <EditIcon
                              onClick={() => {
                                setIsOpenAddModal(true);
                                setTaskId(row.id);
                              }}
                            />
                          </span>
                        </>
                      )}
                      <Link to={`/${project_id}/tasks/detail/${row.id}`}>
                        <span className="p-2 cursor-pointer">
                          <ArrowRightCircleIcon />
                        </span>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </>
          )}
        </CommonTable>
      )}
      <DeleteClient
        isOpen={isOpenDeletedModal}
        setIsOpen={setIsOpenDeletedModal}
        onDelete={() => handleDeleteAttachment(deleteId)}
        heading={"Delete Task"}
        description={"Are you sure you want to delete this Task? "}
      />
      {isOpenAddModal && (
        <AddTaskModal
          isOpen={isOpenAddModal}
          setIsOpen={setIsOpenAddModal}
          project_id={project_id}
          ColumnId={taskId}
          callListApi={ListData}
          Edit
        />
      )}
    </>
  );
}

export default ThemePageTable;
