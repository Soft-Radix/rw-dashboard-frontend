import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import FilterPage from "./FilterPage";
import InputField from "../InputField";
import { Button, Theme, Typography } from "@mui/material";
import MainCard from "../dashboard/MainCard";
import { PlusIcon } from "public/assets/icons/dashboardIcons";
import { useFormik } from "formik";
import { useTheme } from "@mui/styles";
import toast from "react-hot-toast";
import { useAppDispatch } from "app/store/store";
import { useParams } from "react-router";
import * as Yup from "yup";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import {
  projectColumnAdd,
  projectColumnList,
  projectColumnMove,
} from "app/store/Projects";
import CombinedDragDrop from "./Combined";
import DragLayout from "../dashboard/DragLayout";
import { ProjectRootState } from "app/store/Projects/Interface";
import { useSelector } from "react-redux";
import ListLoading from "@fuse/core/ListLoading";

interface IProps {
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  setIsEditing?: Dispatch<SetStateAction<boolean>>;
  fetchList?: () => void;
  fetchUpdateData?: (any) => void;
  setId?: Dispatch<SetStateAction<number | null>>;
  isEditing?: boolean;
  id?: number | null;
  isCombineEnabled?: false;
}

const Kanban = (props: IProps): JSX.Element => {
  const {
    isOpen,
    setIsOpen,
    fetchList,
    isEditing,
    setIsEditing,
    fetchUpdateData,
    setId,
    isCombineEnabled,
  } = props;
  const [columnList, setColumnList] = useState<any[]>([]);
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const theme: Theme = useTheme();
  const [addCard, setAddCard] = useState(false);
  const [error, setError] = useState("");
  const [previous, setPrevious] = useState("");
  const [columnIds, setColumnIds] = useState<any>();
  const [disabled, setDisable] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .required("Name is required")
      .min(1, "Name is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setPrevious(values?.name);
      fetchData(values);
    },
  });

  const fetchData = async (payload: any) => {
    setDisable(true);
    const data: any = {
      project_id: id as string,
      name: payload.name,
    };
    try {
      const res = await dispatch(projectColumnAdd(data));
      if (res?.payload?.data?.status == 1) {
        toast.success(res?.payload?.data?.message);
        formik.setFieldValue("name", "");
        formik.resetForm();
        listData(2);
        if (setIsOpen) setIsOpen((prev) => !prev);
        if (setIsEditing) setIsEditing(false);
        if (setId) setId(null);
        setDisable(false);
        setAddCard(!addCard);
      } else {
        setDisable(false);
        setError(res?.payload?.data?.message);
      }
    } catch (error) {
      setDisable(false);
      console.error("Error fetching data:", error);
    }
  };
  const { fetchStatusNew } = useSelector(
    (store: ProjectRootState) => store?.project
  );
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
  const moveColumns = async (payload: {
    project_id: string;
    column_ids: any[];
  }) => {
    try {
      const res = await dispatch(projectColumnMove(payload));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSave = () => {
    formik.handleSubmit();
  };

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const reorderedColumns = Array.from(columnList);
    const [removed] = reorderedColumns.splice(result.source.index, 1);
    reorderedColumns.splice(result.destination.index, 0, removed);

    // Directly create the payload here with the new column order
    const payload = {
      project_id: id,
      column_ids: reorderedColumns.map((column) => column.id),
    };

    try {
      setColumnList(reorderedColumns);
      await moveColumns(payload);
    } catch (error) {
      console.error("Error moving column:", error);
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

  if (fetchStatusNew == "loading") {
    return <ListLoading />;
  }
  // const handleAddTask = () => {
  //   return (
  //     <Button
  //       variant="outlined"
  //       color="secondary"
  //       className="h-[40px] text-[16px] flex gap-8"
  //       aria-label="Add Tasks"
  //       size="large"
  //       // onClick={() => setIsOpenAddModal(true)}
  //       startIcon={<PlusIcon color={theme.palette.secondary.main} />}
  //     >
  //       Add Task
  //     </Button>
  //   );
  // };
  // const value = formik?.values?.name;
  // useEffect(() => {
  //   setError("");
  // }, [value]);
  return (
    <div>
      <div className="px-20 mb-20">
        <FilterPage filterDesign={true} />
      </div>

      <div
        className={`flex ${
          columnList?.length > 0 ? "gap-20" : ""
        } overflow-x-auto px-28 pb-28 items-start`}
      >
        <DragLayout columnList={columnList} callListApi={listData} id={id} />

        <div className="min-w-[322px] bg-white p-14 py-[20px] rounded-lg shadow-md">
          {!addCard && (
            <div
              className="flex gap-10 items-center cursor-pointer w-fit"
              onClick={() => setAddCard(!addCard)}
            >
              <PlusIcon color={theme.palette.secondary.main} />
              <Typography
                className="text-[16px] font-semibold"
                color="secondary.main"
              >
                Create New Column
              </Typography>
            </div>
          )}
          {addCard && (
            <div>
              <InputField
                formik={formik}
                name="name"
                label="Column Name"
                placeholder="Enter Column Name"
                onChange={(e) => {
                  formik.setFieldValue("name", e.target.value);
                  setError("");
                }}
              />
              <span className=" text-red   block ">{error}</span>
              <div className="mt-20">
                <Button
                  variant="contained"
                  color="secondary"
                  className="w-[95px] text-[12px]"
                  onClick={handleSave}
                  disabled={disabled}
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  className="w-[95px] text-[12px] ml-5"
                  onClick={() => {
                    setAddCard(!addCard);
                    formik.setFieldValue("name", "");
                    formik.resetForm();
                  }}
                  disabled={disabled}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Kanban;
