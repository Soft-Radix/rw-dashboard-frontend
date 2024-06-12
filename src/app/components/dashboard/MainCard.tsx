import { Button, Menu, MenuItem, Typography } from "@mui/material";
import { useFormik } from "formik";
import {
  DragIcon,
  PlusIcon,
  ThreeDotsIcon,
} from "public/assets/icons/dashboardIcons";
import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import CommonModal from "../CommonModal";
import InputField from "../InputField";
import ItemCard from "./ItemCard";
import ActionModal from "../ActionModal";
import { useDispatch } from "react-redux";
import {
  TaskListColumn,
  deleteColumn,
  projectColumnUpdate,
} from "app/store/Projects";
import toast from "react-hot-toast";
import * as Yup from "yup";
import AddTaskModal from "../tasks/AddTask";

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
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { debounce } from "lodash";

export default function MainCard({
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

  const toggleEditModal = () => {
    if (openEditModal) {
      formik.setFieldValue("name", originalTitle);
    } else {
      setOriginalTitle(formik.values.name);
    }
    setOpenEditModal(!openEditModal);
  };
  const dispatch = useDispatch();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isOpenAddModal, setIsOpenAddModal] = useState<boolean>(false);
  const toggleDeleteModal = () => setOpenDeleteModal(!openDeleteModal);
  const [scrolledDivId, setScrolledDivId] = useState(null);
  const [disable, setDisabled] = useState(false);
  const [List, setList] = useState(null);

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
      if (scrollRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 50 && !isFetching) {
          // Increased threshold
          setIsFetching(true);
          callListApi(4, column.id).finally(() => {
            setIsFetching(false);
          });
        }
      }
    }, 300), // Adjust debounce delay as needed
    [isFetching]
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
  }, [handleScroll]);

  return (
    <>
      <Draggable
        draggableId={column.id.toString()}
        index={index}
        //@ts-ignore
        type="column"
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
                  <div className="min-w-[322px] bg-white p-14 rounded-lg shadow-md w-[322px] mx-10">
                    <div>
                      <div className="flex justify-between">
                        <Typography
                          className="text-[18px] font-semibold mb-5 "
                          color="primary.main"
                          style={{ wordBreak: "break-word" }}
                        >
                          {column?.title}
                        </Typography>
                        <div className="flex gap-10">
                          <DragIcon className="cursor-pointer" />
                          <span
                            id="basic-button"
                            aria-controls={open ? "basic-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleClick(e);
                            }}
                          >
                            <ThreeDotsIcon className="cursor-pointer" />
                          </span>
                          <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                              "aria-labelledby": "basic-button",
                            }}
                            transformOrigin={{
                              horizontal: "right",
                              vertical: "top",
                            }}
                            anchorOrigin={{
                              horizontal: "right",
                              vertical: "bottom",
                            }}
                          >
                            <MenuItem
                              onClick={() => {
                                handleClose();
                                toggleEditModal();
                              }}
                            >
                              Edit Title
                            </MenuItem>
                            <MenuItem
                              onClick={() => {
                                handleClose();
                                toggleDeleteModal();
                              }}
                            >
                              Delete Column
                            </MenuItem>
                          </Menu>
                        </div>
                      </div>
                      <Typography color="primary.light">
                        Please review your to-do list below.
                      </Typography>
                      <div
                        className="py-20 flex flex-col gap-14 max-h-[300px] overflow-auto"
                        ref={scrollRef}
                      >
                        {tasks?.length == 0 ? (
                          <>
                            <div className="bg-[#F7F9FB] p-14 rounded-md border flex items-center flex-col">
                              <Typography
                                color="primary.main"
                                className="text-[16px] font-semibold"
                              >
                                No Task Yet!
                              </Typography>
                              <Typography
                                color="primary.light"
                                className="text-[12px] max-w-[180px] text-center mt-5"
                              >
                                You don’t have any tasks yet in this Column
                              </Typography>
                            </div>
                            <Button
                              variant="contained"
                              color="secondary"
                              className="h-[40px] text-[16px] flex gap-8"
                              aria-label="Add Tasks"
                              size="large"
                              onClick={() => setIsOpenAddModal(true)}
                              startIcon={<PlusIcon color="white" />}
                            >
                              Add Task
                            </Button>
                          </>
                        ) : (
                          tasks.map((item, index) => (
                            <ItemCard
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
                            />
                            // <Task key={task.id} task={task} index={index} />
                          ))
                        )}

                        {provided.placeholder}
                      </div>
                      {tasks.length > 0 && (
                        <Button
                          variant="contained"
                          color="secondary"
                          className="w-full h-[48px] text-[18px] flex gap-8"
                          aria-label="Log In"
                          size="large"
                          onClick={() => setIsOpenAddModal(true)}
                        >
                          <PlusIcon color="white" />
                          Add New
                        </Button>
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
      <CommonModal
        modalTitle={"Edit Column"}
        open={openEditModal}
        btnTitle={"Save"}
        onSubmit={handleEdit}
        closeTitle="Cancel"
        handleToggle={toggleEditModal}
        disabled={disable}
      >
        <InputField
          formik={formik}
          name="name"
          label="Column Name"
          placeholder="Enter Column Name"
        />
      </CommonModal>
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
