import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import FilterPage from "./FilterPage";
import InputField from "../InputField";
import { Button, Theme, Typography } from "@mui/material";
import MainCard from "../dashboard/MainCard";
import { PlusIcon } from "public/assets/icons/dashboardIcons";
import { useFormik } from "formik";
import { useTheme } from "@mui/styles";
import { FilterIcon } from "public/assets/icons/user-icon";
import { projectColumnAdd, projectColumnList } from "app/store/Projects";
import toast from "react-hot-toast";
import { useAppDispatch } from "app/store/store";
import { useParams } from "react-router";
import * as Yup from "yup";
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

const Kanban = (props): any => {
  const {
    isOpen,
    setIsOpen,
    fetchList,
    isEditing,
    setIsEditing,
    fetchUpdateData,
    setId,
  } = props;
  const [columnList, setColumnList] = useState<any>([]);
  const dispatch = useAppDispatch();
  const { id, name } = useParams();
  const theme: Theme = useTheme();
  const [addCard, setAddCard] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
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
    const data = {
      project_id: id,
      ...payload,
    };
    try {
      //@ts-ignore
      const res = await dispatch(projectColumnAdd(data));
      // setList(res?.payload?.data?.data?.list);
      toast.success(res?.payload?.data?.message);
      formik.setFieldValue("name", "");
      formik.resetForm();
      listData();
      setIsOpen((prev) => !prev);
      setIsEditing(false);
      setId(null);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setAddCard(!addCard);
  };

  const listData = async () => {
    const payload = {
      start: 0,
      limit: 10,
      search: "",
      project_id: id,
    };
    try {
      //@ts-ignore
      const res = await dispatch(projectColumnList(payload));
      setColumnList(res?.payload?.data?.data?.list);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleSave = () => {
    formik.handleSubmit();
  };
  useEffect(() => {
    listData();
  }, [id]);

  return (
    <div>
      <div className="px-20 mb-20">
        <FilterPage filterDesign={true} />
      </div>
      <div className="flex gap-20 overflow-x-auto px-28 pb-28 items-start">
        {columnList?.map((item) => {
          return (
            <MainCard
              title={item?.name}
              key={item?.id}
              isEmpty
              id={item?.id}
              callListApi={listData}
            />
          );
        })}

        {/* <MainCard title="In Progress" />
        <MainCard title="In Review" />
        <MainCard title="Completed" />
        <MainCard title="Pending" isEmpty /> */}
        <div className="min-w-[322px] bg-white p-14 py-[20px] rounded-lg shadow-md ">
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
                  size="small"
                  onClick={handleSave}
                >
                  Save
                </Button>{" "}
                <Button
                  variant="outlined"
                  color="secondary"
                  className="w-[95px] text-[12px] ml-5"
                  size="small"
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
