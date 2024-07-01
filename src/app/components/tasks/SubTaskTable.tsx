import { Checkbox, TableCell, TableRow, Theme } from "@mui/material";
import { useTheme } from "@mui/styles";
import {
  ArrowRightCircleIcon,
  DeleteIcon,
  EditIcon,
} from "public/assets/icons/common";
import CommonTable from "../commonTable";
import ImagesOverlap from "../ImagesOverlap";

// import DueDate from "./DueDate";
import { useEffect, useState } from "react";
// import { DownArrowBlack, SortIcon } from "public/assets/icons/projectsIcon";
import DueDate from "../projects/DueDate";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getSubTaskList } from "app/store/Agent";
import { useAppDispatch } from "app/store/store";
import AddSubTaskModal from "./AddSubTaskModal";
import ActionModal from "../ActionModal";
import { deleteTask } from "app/store/Projects";
import toast from "react-hot-toast";

const rows = [
  {
    title: "Home page design",
    defaultChecked: true,
    assignedImg: ["female-01.jpg", "female-02.jpg", "female-03.jpg"],
    priority: "Medium",
  },
  {
    title: "Mobile screen design",
    defaultChecked: true,
    assignedImg: ["female-01.jpg", "female-02.jpg", "female-03.jpg"],
    priority: "Medium",
  },
  {
    title: "Logo design",
    defaultChecked: false,
    assignedImg: ["female-01.jpg", "female-02.jpg", "female-03.jpg"],
    priority: "Medium",
  },
];

function SubTaskTable(props) {
  const { projectId, taskId } = useParams();
  const navigate = useNavigate();
  const { tableSelectedItemDesign, List, fetchSubTaskList } = props;
  const [tableList, setTableList] = useState([]);
  const [disable, setDisabled] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [id, setId] = useState("");
  const [isOpenAddSubTaskModal, setIsOpenAddSubTaskModal] = useState(false);
  const theme: Theme = useTheme();
  const dispatch = useAppDispatch();
  const toggleDeleteModal = () => setOpenDeleteModal(!openDeleteModal);
  useEffect(() => {
    setTableList(List);
  }, [List]);

  const handleDelete = () => {
    if (id) {
      setDisabled(true);
      dispatch(deleteTask(id))
        .unwrap()
        .then((res) => {
          if (res?.data?.status == 1) {
            setOpenDeleteModal(false);
            fetchSubTaskList();
            toast.success(res?.data?.message, {
              duration: 4000,
            });
            setId("");
            setDisabled(false);
          }
        });
    }
  };
  const urlForImage = import.meta.env.VITE_API_BASE_IMAGE_URL;
  const userDetails = JSON.parse(localStorage.getItem("userDetail"));
  return (
    <>
      {tableSelectedItemDesign == "Due Date" ? (
        <>
          <CommonTable
            headings={[
              "Title",
              "Assigned",
              "Due Date",
              "Priority",
              userDetails?.role == "client" && "Action",
            ]}
          >
            <div></div>
          </CommonTable>
          <div className="flex flex-col gap-5">
            <DueDate
              rows={rows}
              title={"Overdue (2)"}
              className="text-lg font-medium text-[#F44336]"
            />
            <DueDate
              title={"No Due Date (5)"}
              rows={rows}
              className="text-lg font-medium text-[#757982]"
            />
          </div>
        </>
      ) : (
        <CommonTable
          headings={[
            "Title",
            "Assigned",
            "Due Date",
            "Priority",
            userDetails?.role == "client" && "Action",
          ]}
        >
          {tableList?.map((row, index) => (
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
                <span
                  className="flex items-center gap-10 cursor-pointer"
                  onClick={() =>
                    navigate(`/${projectId}/subTask/detail/${row.id}`)
                  }
                >
                  {row.title}
                </span>
              </TableCell>
              <TableCell align="center">
                {/* <ImagesOverlap images={row?.assigned_task_users?.user_image} /> */}
                <div className="flex">
                  {row?.assigned_task_users.slice(0, 3)?.map((item, idx) => (
                    <img
                      className={`h-[34px] w-[34px] rounded-full border-2 border-white ${
                        row?.assigned_task_users?.length > 1 ? "ml-[-10px]" : ""
                      } z-0`}
                      key={idx}
                      src={
                        //@ts-ignore
                        !item?.user_image
                          ? "../assets/images/logo/images.jpeg"
                          : `${urlForImage}${
                              //@ts-ignore
                              item?.user_image
                            }`
                      }
                      alt={item}
                      loading="lazy"
                    />
                  ))}

                  {row?.assigned_task_users.length - 3 > 0 && (
                    <span className="ml-[-10px] z-0 h-[34px] w-[34px] rounded-full border-2 border-[#4f46e5] bg-[#4f46e5] flex items-center justify-center text-xs text-white">
                      +{row?.assigned_task_users.length - 3}
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
              {userDetails?.role == "client" && (
                <TableCell align="left" className="w-[1%]">
                  <div className="flex gap-20 items-center">
                    <span className="p-2 cursor-pointer">
                      <DeleteIcon
                        onClick={() => {
                          setOpenDeleteModal(true);
                          setId(row.id);
                        }}
                      />
                    </span>
                    <span
                      className="p-2 cursor-pointer"
                      onClick={() => {
                        setIsOpenAddSubTaskModal(true);
                        setId(row.id);
                      }}
                    >
                      <EditIcon />
                    </span>
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))}
        </CommonTable>
      )}

      {isOpenAddSubTaskModal && (
        <AddSubTaskModal
          isOpen={isOpenAddSubTaskModal}
          setIsOpen={setIsOpenAddSubTaskModal}
          project_id={projectId}
          fetchSubTaskList={fetchSubTaskList}
          Edit={true}
          ColumnId={id}
        />
      )}
      <ActionModal
        modalTitle="Delete Task"
        modalSubTitle="Are you sure you want to delete this task?"
        open={openDeleteModal}
        handleToggle={toggleDeleteModal}
        type="delete"
        onDelete={handleDelete}
        disabled={disable}
      />
    </>
  );
}

export default SubTaskTable;
