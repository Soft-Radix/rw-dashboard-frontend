import { Button, Menu, MenuItem, Typography } from "@mui/material";
import { useFormik } from "formik";
import {
  DragIcon,
  PlusIcon,
  ThreeDotsIcon,
} from "public/assets/icons/dashboardIcons";
import { MouseEvent, useEffect, useState } from "react";
import CommonModal from "../CommonModal";
import InputField from "../InputField";
import ItemCard from "./ItemCard";
import ActionModal from "../ActionModal";
import { useDispatch } from "react-redux";
import { deleteColumn, projectColumnUpdate } from "app/store/Projects";
import toast from "react-hot-toast";
import * as Yup from "yup";

type MainCardType = {
  id?: string | number;
  title: string;
  isEmpty?: boolean;
  callListApi?: any;
};

export default function MainCard({
  title,
  isEmpty,
  id,
  callListApi,
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
  const toggleDeleteModal = () => setOpenDeleteModal(!openDeleteModal);
  const [disable, setDisabled] = useState(false);

  /** Menu states */
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
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

  return (
    <div className="min-w-[322px] bg-white p-14 rounded-lg shadow-md w-[322px]">
      <div>
        <div className="flex justify-between">
          <Typography
            className="text-[18px] font-semibold mb-5 "
            color="primary.main"
            style={{ wordBreak: "break-word" }}
          >
            {title}
          </Typography>
          <div className="flex gap-10">
            <DragIcon className="cursor-pointer" />
            <span
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
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
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
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
        <div className="py-20 flex flex-col gap-14">
          {isEmpty ? (
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
          ) : (
            <>
              {" "}
              <ItemCard
                title="iOS App Home Page"
                priority="Medium"
                taskName="There 20 mobile app design requirements"
                date="Feb 12, 2024"
                isChecked={false}
                images={[
                  "https://picsum.photos/seed/picsum/200/200",
                  "https://picsum.photos/200/200?grayscale",
                  "https://picsum.photos/seed/picsum/200/200",
                ]}
              />
              <ItemCard
                title="iOS App Home Page"
                priority="High"
                taskName="There 20 mobile app design requirements"
                date="Feb 12, 2024"
                isChecked={false}
                images={[
                  "https://picsum.photos/seed/picsum/200/200",
                  "https://picsum.photos/200/200?grayscale",
                  "https://picsum.photos/seed/picsum/200/200",
                ]}
              />
              <ItemCard
                title="iOS App Home Page"
                priority="Low"
                taskName="There 20 mobile app design requirements"
                date="Feb 12, 2024"
                isChecked={false}
                images={[
                  "https://picsum.photos/seed/picsum/200/200",
                  "https://picsum.photos/200/200?grayscale",
                  "https://picsum.photos/seed/picsum/200/200",
                ]}
              />
            </>
          )}
        </div>
        {!isEmpty && (
          <Button
            variant="contained"
            color="secondary"
            className="w-full h-[48px] text-[18px] flex gap-8"
            aria-label="Log In"
            size="large"
          >
            <PlusIcon color="white" />
            Add New
          </Button>
        )}
      </div>
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
    </div>
  );
}
