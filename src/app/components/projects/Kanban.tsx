// import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
// import FilterPage from "./FilterPage";
// import InputField from "../InputField";
// import { Button, Theme, Typography } from "@mui/material";
// import MainCard from "../dashboard/MainCard";
// import { PlusIcon } from "public/assets/icons/dashboardIcons";
// import { useFormik } from "formik";
// import { useTheme } from "@mui/styles";
// import { FilterIcon } from "public/assets/icons/user-icon";
// import { projectColumnAdd, projectColumnList } from "app/store/Projects";
// import toast from "react-hot-toast";
// import { useAppDispatch } from "app/store/store";
// import { useParams } from "react-router";
// import * as Yup from "yup";
// interface IProps {
//   isOpen?: boolean;
//   setIsOpen?: Dispatch<SetStateAction<boolean>>;
//   setIsEditing?: Dispatch<SetStateAction<boolean>>;
//   fetchList?: () => void;
//   fetchUpdateData?: (any) => void;
//   setId?: Dispatch<SetStateAction<number | null>>;
//   isEditing?: boolean;
//   id?: number | null;
// }

// const Kanban = (props): any => {
//   const {
//     isOpen,
//     setIsOpen,
//     fetchList,
//     isEditing,
//     setIsEditing,
//     fetchUpdateData,
//     setId,
//   } = props;
//   const [columnList, setColumnList] = useState<any>([]);
//   const dispatch = useAppDispatch();
//   const { id, name } = useParams();
//   const theme: Theme = useTheme();
//   const [addCard, setAddCard] = useState(false);

//   // const validationSchema = Yup.object({
//   //   name: Yup.string()
//   //     .matches(
//   //       /^[a-zA-Z0-9 ]*$/,
//   //       "Only letters, numbers and spaces are allowed"
//   //     )
//   //     .required("Name is required"),
//   // });
//   const validationSchema = Yup.object({
//     name: Yup.string()
//       .trim()
//       .matches(
//         /^[a-zA-Z0-9 ]*$/,
//         "Only letters, numbers and spaces are allowed"
//       )
//       .required("Name is required")
//       .min(1, "Name is required"),
//   });
//   const formik = useFormik({
//     initialValues: {
//       name: "",
//     },
//     validationSchema,
//     onSubmit: (values) => {
//       fetchData(values);
//     },
//   });

//   const fetchData = async (payload: any) => {
//     const data = {
//       project_id: id,
//       ...payload,
//     };
//     try {
//       //@ts-ignore
//       const res = await dispatch(projectColumnAdd(data));
//       // setList(res?.payload?.data?.data?.list);
//       toast.success(res?.payload?.data?.message);
//       formik.setFieldValue("name", "");
//       formik.resetForm();
//       listData();
//       setIsOpen((prev) => !prev);
//       setIsEditing(false);
//       setId(null);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//     setAddCard(!addCard);
//   };

//   const listData = async () => {
//     const payload = {
//       start: 0,
//       limit: 10,
//       search: "",
//       project_id: id,
//     };
//     try {
//       //@ts-ignore
//       const res = await dispatch(projectColumnList(payload));
//       setColumnList(res?.payload?.data?.data?.list);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };
//   const handleSave = () => {
//     formik.handleSubmit();
//   };
//   useEffect(() => {
//     listData();
//   }, [id]);

//   return (
//     <div>
//       <div className="px-20 mb-20">
//         <FilterPage filterDesign={true} />
//       </div>
//       <div className="flex gap-20 overflow-x-auto px-28 pb-28 items-start">
//         {columnList?.map((item) => {
//           return (
//             <MainCard
//               title={item?.name}
//               key={item?.id}
//               isEmpty
//               id={item?.id}
//               callListApi={listData}
//             />
//           );
//         })}

//         {/* <MainCard title="In Progress" />
//         <MainCard title="In Review" />
//         <MainCard title="Completed" />
//         <MainCard title="Pending" isEmpty /> */}
//         <div className="min-w-[322px] bg-white p-14 py-[20px] rounded-lg shadow-md ">
//           {!addCard && (
//             <div
//               className="flex gap-10 items-center cursor-pointer w-fit"
//               onClick={() => setAddCard(!addCard)}
//             >
//               <PlusIcon color={theme.palette.secondary.main} />
//               <Typography
//                 className="text-[16px] font-semibold"
//                 color="secondary.main"
//               >
//                 Create New Column
//               </Typography>
//             </div>
//           )}
//           {addCard && (
//             <div>
//               <InputField
//                 formik={formik}
//                 name="name"
//                 label="Column Name"
//                 placeholder="Enter Column Name"
//                 onKeyDown={(e) => console.log(`Key pressed: ${e.key}`)}
//               />
//               <div className="mt-20">
//                 <Button
//                   variant="contained"
//                   color="secondary"
//                   className="w-[95px] text-[12px] "
//                   onClick={handleSave}
//                 >
//                   Save
//                 </Button>{" "}
//                 <Button
//                   variant="outlined"
//                   color="secondary"
//                   className="w-[95px] text-[12px] ml-5 "
//                   onClick={() => {
//                     setAddCard(!addCard);
//                     formik.setFieldValue("name", "");
//                     formik.resetForm();
//                   }}
//                 >
//                   Cancel
//                 </Button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Kanban;
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

interface IProps {
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  setIsEditing?: Dispatch<SetStateAction<boolean>>;
  fetchList?: () => void;
  fetchUpdateData?: (any) => void;
  setId?: Dispatch<SetStateAction<number | null>>;
  isEditing?: boolean;
  id?: number | null;
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
  } = props;
  const [columnList, setColumnList] = useState<any[]>([]);
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const theme: Theme = useTheme();
  const [addCard, setAddCard] = useState(false);
  const [columnIds, setColumnIds] = useState<any>();

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
      fetchData(values);
    },
  });

  const fetchData = async (payload: any) => {
    const data: any = {
      project_id: id as string,
      name: payload.name,
    };
    try {
      const res = await dispatch(projectColumnAdd(data));
      toast.success(res?.payload?.data?.message);
      formik.setFieldValue("name", "");
      formik.resetForm();
      listData();
      if (setIsOpen) setIsOpen((prev) => !prev);
      if (setIsEditing) setIsEditing(false);
      if (setId) setId(null);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setAddCard(!addCard);
  };

  const listData = async () => {
    const payload: any = {
      start: 0,
      limit: 10,
      search: "",
      project_id: id as string,
    };
    try {
      const res = await dispatch(projectColumnList(payload));
      setColumnList(res?.payload?.data?.data?.list);
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
      setColumnList(reorderedColumns); // Update the state with the new column order
      await moveColumns(payload); // Call the moveColumns function with the correct payload
    } catch (error) {
      console.error("Error moving column:", error);
    }
  };

  useEffect(() => {
    const savedOrder = localStorage.getItem(`columnOrder-${id}`);
    if (savedOrder) {
      setColumnList(JSON.parse(savedOrder));
    } else {
      listData();
    }
  }, [id]);

  return (
    <div>
      <div className="px-20 mb-20">
        <FilterPage filterDesign={true} />
      </div>
      <div className="flex gap-20 overflow-x-auto px-28 pb-28 items-start">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable" direction="horizontal">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="flex gap-20"
              >
                {columnList?.map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={item.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <MainCard
                          title={item.name}
                          key={item.id}
                          isEmpty
                          id={item.id}
                          callListApi={listData}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

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
              />
              <div className="mt-20">
                <Button
                  variant="contained"
                  color="secondary"
                  className="w-[95px] text-[12px]"
                  onClick={handleSave}
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
