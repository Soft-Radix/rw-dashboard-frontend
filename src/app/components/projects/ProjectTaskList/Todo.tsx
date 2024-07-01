import {
  Button,
  Checkbox,
  Menu,
  MenuItem,
  TableCell,
  TableRow,
  Typography,
  Theme,
} from "@mui/material";
import { useFormik } from "formik";
import {
  DragIcon,
  PlusIcon,
  ThreeDotsIcon,
} from "public/assets/icons/dashboardIcons";
import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  TaskListColumn,
  deleteColumn,
  projectColumnUpdate,
} from "app/store/Projects";
import toast from "react-hot-toast";
import * as Yup from "yup";

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { debounce } from "lodash";
import CommonModal from "../../CommonModal";
import InputField from "../../InputField";
import ActionModal from "../../ActionModal";
import AddTaskModal from "../../tasks/AddTask";
import ItemCard from "../../dashboard/ItemCard";
import { DownArrowright, SortIcon } from "public/assets/icons/projectsIcon";
import { useTheme } from "@mui/styles";
import CommonTable from "../../commonTable";
import ImagesOverlap from "../../ImagesOverlap";
import { DeleteIcon } from "public/assets/icons/navabarIcon";
import { ArrowRightCircleIcon, EditIcon } from "public/assets/icons/common";
import Item from "./Item";

type MainCardType = {
  id?: string | number;
  title?: string;
  isEmpty?: boolean;
  callListApi?: any;
  dataList?: any;
  dataListLength?: any;
  tasks?: any[];
  project_id?: number | string;
  key?: any;
  index?: any;
  column?: any;
};

export default function Todo({
  title,
  isEmpty,
  id,
  dataList,
  callListApi,
  dataListLength,
  tasks,
  project_id,
  key,
  index,
  column,
}: MainCardType) {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [originalTitle, setOriginalTitle] = useState(title);

  const dispatch = useDispatch();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isOpenAddModal, setIsOpenAddModal] = useState<boolean>(false);
  const toggleDeleteModal = () => setOpenDeleteModal(!openDeleteModal);
  const [scrolledDivId, setScrolledDivId] = useState(null);
  const [disable, setDisabled] = useState(false);
  const [List, setList] = useState(null);
  const [showData, setShowData] = useState(false);
  const handleShowTable = () => {
    setShowData(!showData);
  };
  const toggleEditModal = () => {
    setIsOpenAddModal(!isOpenAddModal);
  };
  const theme: Theme = useTheme();
  /** Menu states */
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .required("Name is required")
      .min(1, "Name is required"),
  });

  //* initialise useformik hook
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const data = {
        column_id: id,
        data: values,
      };
      setDisabled(true);
      dispatch(projectColumnUpdate(data))
        .unwrap()
        .then((res) => {
          if (res?.data?.status == 1) {
            setDisabled(false);
            setOpenEditModal(false);
            toast.success(res?.data?.message);
            callListApi();
            toggleEditModal();
          }
        });
    },
  });

  const handleDelete = () => {
    if (id) {
      setDisabled(true);
      dispatch(deleteColumn(id))
        .unwrap()
        .then((res) => {
          if (res?.data?.status == 1) {
            callListApi();
            toast.success(res?.data?.message, {
              duration: 4000,
            });
            setDisabled(false);
            setOpenDeleteModal(false);
          }
        });
    }
  };

  const handleEdit = () => {
    formik.handleSubmit();
  };

  useEffect(() => {
    formik.setFieldValue("name", title);
  }, [title]);

  useEffect(() => {
    setList(tasks);
  }, [tasks]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setList(items);
  };

  const scrollRef = useRef(null);
  const handleScroll = useCallback(
    debounce(() => {
      console.log("-0-0-0-=");
      if (scrollRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 50 && !isFetching) {
          // Increased threshold
          setIsFetching(true);
          callListApi(40, column.id).finally(() => {
            setIsFetching(false);
          });
        }
      }
    }, 300), // Adjust debounce delay as needed
    [isFetching, showData]
  );

  // Effect to attach scroll event listener when component mounts
  useEffect(() => {
    const scrolledElement = scrollRef.current;
    if (scrolledElement) {
      scrolledElement.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (scrolledElement) {
        scrolledElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScroll, showData]);
  const headings = [
    "Title",
    "Assigned  ",
    "Subtask",
    "Due Date",
    "Priority",
    "Action",
  ];
  const userDetails = JSON.parse(localStorage.getItem("userDetail"));
  return (
    <>
      <Draggable
        draggableId={column.id.toString()}
        index={index}
        //@ts-ignore
        type="column"
        isDragDisabled={true}
      >
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Droppable droppableId={column.id.toString()} type="task">
              {(provided, snapshot) => (
                <div
                  //@ts-ignore
                  isDraggingOver={snapshot.isDraggingOver}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <div className="block gap-20  pt-10  w-full  my-10 bg-white rounded-lg h-fit border-1 border-solid border-[#D1D7DB] mb-24  ">
                    <div className="flex  flex-col  ">
                      <div className="flex items-center justify-start gap-20 px-[18px] pb-10">
                        {!showData ? (
                          <DownArrowright onClick={handleShowTable} />
                        ) : (
                          <SortIcon
                            onClick={handleShowTable}
                            className="border-1 w-32 h-32 p-2 rounded-sm"
                          />
                        )}
                        <Typography className="text-lg font-medium text-black">
                          {title}
                        </Typography>
                      </div>
                      {showData && (
                        <>
                          <div>
                            <div className="custom-table">
                              <div className="table-header  mr-[8px] bg-[#F7F9FB] ">
                                {headings.map((heading, index) => (
                                  <div
                                    key={index}
                                    className="table-cell header-cell border-1 border-solid text-[#757982] font-500 text-12 "
                                  >
                                    {heading}
                                  </div>
                                ))}
                              </div>
                              <div
                                className="table-body max-h-[120px] overflow-auto"
                                ref={scrollRef}
                              >
                                {tasks.map((item, index) => (
                                  <Item
                                    id={item.id}
                                    title={item.title}
                                    priority={item.priority}
                                    taskName={item.description}
                                    date={item.due_date_time}
                                    isChecked={item.isChecked}
                                    images={item?.images}
                                    callListApi={callListApi}
                                    index={index}
                                    key={item.id}
                                    project_id={project_id}
                                    agent={item.assigned_task_users}
                                    total_sub_tasks={item?.total_sub_tasks}
                                  />
                                ))}
                              </div>
                            </div>
                            {userDetails?.role != "agent" && (
                              <div className=" border-1 border-solid border-[#D1D7DB]">
                                <Button
                                  variant="text"
                                  color="secondary"
                                  className="h-[40px] sm:text-[16px] flex gap-2 sm:mb-[1rem] leading-none pt-10  pl-[18px]"
                                  aria-label="Manage Sections"
                                  size="large"
                                  startIcon={
                                    <PlusIcon
                                      color={theme.palette.secondary.main}
                                    />
                                  }
                                  onClick={(e) => {
                                    handleClose();
                                    toggleEditModal();
                                    e.stopPropagation();
                                  }}
                                >
                                  Add Task
                                </Button>
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        )}
      </Draggable>

      <ActionModal
        modalTitle="Delete Column"
        modalSubTitle="Are you sure you want to delete this column?"
        open={openDeleteModal}
        handleToggle={toggleDeleteModal}
        type="delete"
        onDelete={handleDelete}
        disabled={disable}
      />
      {isOpenAddModal && (
        <AddTaskModal
          isOpen={isOpenAddModal}
          setIsOpen={setIsOpenAddModal}
          ColumnId={id}
          project_id={project_id}
          callListApi={callListApi}
        />
      )}
    </>
  );
}
