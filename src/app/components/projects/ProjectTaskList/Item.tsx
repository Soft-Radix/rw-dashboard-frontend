import {
  Checkbox,
  Menu,
  Theme,
  Typography,
  MenuItem,
  Tooltip,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/styles";
import moment from "moment";
import { PlusIcon, ThreeDotsIcon } from "public/assets/icons/dashboardIcons";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { useAppDispatch } from "app/store/store";
import toast from "react-hot-toast";
import { deleteTask } from "app/store/Projects";
import {
  ArrowRightCircleIcon,
  Clock,
  ClockTask,
  DeleteIcon,
  EditIcon,
} from "public/assets/icons/common";
import { debounce } from "lodash";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Draggable } from "react-beautiful-dnd";
import AddTaskModal from "../../tasks/AddTask";
import ActionModal from "../../ActionModal";
import ImagesOverlap from "../../ImagesOverlap";
// import { CalendarIcon } from "public/assets/icons/dashboardIcons";
type CardType = {
  title: string;
  priority: string;
  taskName: string;
  isChecked: boolean;
  date: string;
  images: string[];
  id?: number;
  callListApi?: any;
  index?: any;
  project_id?: any;
  agent?: [];
};
export const TruncateText = ({ text, maxWidth }) => {
  const [isTruncated, setIsTruncated] = useState(false);
  const textRef = useRef(null);
  useEffect(() => {
    if (textRef.current) {
      const textWidth = textRef.current.scrollWidth;
      setIsTruncated(textWidth > maxWidth);
    }
  }, [text, maxWidth]);
  return (
    <Tooltip title={text} enterDelay={500} disableHoverListener={!isTruncated}>
      <Typography
        ref={textRef}
        noWrap
        style={{
          maxWidth: `${maxWidth}px`,
          overflow: "hidden",
          textOverflow: "ellipsis",
          // display: "inline-block",
          whiteSpace: "nowrap",
        }}
      >
        {text}
      </Typography>
    </Tooltip>
  );
};
export default function Item({
  title,
  priority,
  taskName,
  isChecked,
  date,
  id,
  callListApi,
  images,
  index,
  project_id,
  agent,
}: CardType) {
  const theme: Theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const projectid = useParams<{ id: string }>();
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // const Date = date.split(",");
  // console.log("=====date==", Date[0]);
  const [disable, setDisabled] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isOpenAddModal, setIsOpenAddModal] = useState<boolean>(false);
  const [originalTitle, setOriginalTitle] = useState(title);
  const toggleDeleteModal = () => setOpenDeleteModal(!openDeleteModal);

  const toggleEditModal = () => {
    setIsOpenAddModal(true);
    if (openEditModal) {
      // formik.setFieldValue("name", originalTitle);
    } else {
      // setOriginalTitle(formik.values.name);
    }
    // setOpenEditModal(!openEditModal);
  };
  const dispatch = useAppDispatch();
  const handleDelete = () => {
    if (id) {
      setDisabled(true);
      dispatch(deleteTask(id))
        .unwrap()
        .then((res) => {
          if (res?.data?.status == 1) {
            setOpenDeleteModal(false);
            callListApi(2);
            toast.success(res?.data?.message, {
              duration: 4000,
            });
            setDisabled(false);
          }
        });
    }
  };

  const userDetails = JSON.parse(localStorage.getItem("userDetail"));
  return (
    <>
      <div style={{ position: "relative" }}>
        <ActionModal
          modalTitle="Delete Task"
          modalSubTitle="Are you sure you want to delete this task?"
          open={openDeleteModal}
          handleToggle={toggleDeleteModal}
          type="delete"
          onDelete={handleDelete}
          disabled={disable}
        />
        {isOpenAddModal && (
          <AddTaskModal
            isOpen={isOpenAddModal}
            project_id={project_id}
            setIsOpen={setIsOpenAddModal}
            ColumnId={id}
            callListApi={callListApi}
            Edit
          />
        )}
        <div
          // to={}
          style={{ textDecoration: "none" }}
          onClick={(e) => {
            event.preventDefault();
            e.stopPropagation();
            navigate(`/tasks/detail/${id}`);
          }}
        >
          <Draggable
            draggableId={id.toString()}
            index={index}
            //@ts-ignore
            type="task"
          >
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.dragHandleProps}
                //@ts-ignore
                {...provided.draggableProps}
                //@ts-ignore
                isDragging={snapshot.isDragging}
              >
                <div className="table-body px-[6px]">
                  <div key={index} className="flex">
                    {/* <div className="table-cell">
                      <span className="flex items-center gap-10">
                        <Checkbox
                          sx={{ padding: "4px" }}
                          color="primary"
                          // defaultChecked={row.defaultChecked}
                          inputProps={{
                            "aria-labelledby": `table-checkbox-${index}`,
                          }}
                        />
                      </span>
                    </div> */}
                    <div className="table-cell">
                      <span className="flex items-center gap-10">{title}</span>
                    </div>
                    <div className="table-cell">
                      {agent?.map((item) => (
                        <img
                          className={`h-[34px] w-[34px] rounded-full border-2 border-white
                  ml-[-10px]
                          z-0`}
                          key={item}
                          src={
                            //@ts-ignore
                            !item?.user_image
                              ? "../assets/images/logo/images.jpeg"
                              : `/assets/images/avatars/${item}`
                          }
                          alt={item}
                          loading="lazy"
                        />
                      ))}
                    </div>
                    <div className="table-cell">Feb 12, 2024</div>
                    <div className="table-cell">
                      <span
                        style={{ width: "fit-content" }}
                        className={`${
                          priority === "Medium"
                            ? "bg-priorityMedium/[.18]"
                            : priority === "High"
                            ? "bg-red/[.18]"
                            : "bg-green/[.18]"
                        } py-5 px-10 rounded-[27px] min-w-[69px] text-[12px] flex justify-center items-center  font-medium ${
                          priority === "Medium"
                            ? "text-priorityMedium"
                            : priority === "High"
                            ? "text-red"
                            : "text-green"
                        }`}
                      >
                        {priority}
                      </span>
                    </div>
                    <div className="table-cell action-cell">
                      <div className="flex gap-20 px-10">
                        {userDetails?.role != "agent" && (
                          <span
                            className="p-2 cursor-pointer"
                            onClick={(e) => {
                              handleClose();
                              toggleDeleteModal();
                              e.stopPropagation();
                            }}
                          >
                            <DeleteIcon />
                          </span>
                        )}
                        {userDetails?.role != "agent" && (
                          <span
                            className="p-2 cursor-pointer"
                            onClick={(e) => {
                              handleClose();
                              toggleEditModal();
                              e.stopPropagation();
                            }}
                          >
                            <EditIcon />
                          </span>
                        )}

                        <span
                          className="p-2 cursor-pointer"
                          onClick={(e) => {
                            event.preventDefault();
                            e.stopPropagation();
                            navigate(`/tasks/detail/${id}`);
                          }}
                        >
                          <ArrowRightCircleIcon />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Draggable>
        </div>
      </div>
    </>
  );
}
