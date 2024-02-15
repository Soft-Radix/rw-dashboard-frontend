import { Button, Menu, MenuItem, Typography } from "@mui/material";
import { useFormik } from "formik";
import {
  DragIcon,
  PlusIcon,
  ThreeDotsIcon,
} from "public/assets/icons/dashboardIcons";
import { MouseEvent, useState } from "react";
import CommonModal from "../CommonModal";
import InputField from "../InputField";
import ItemCard from "./ItemCard";

type MainCardType = {
  title: string;
  isEmpty?: boolean;
};

export default function MainCard({ title, isEmpty }: MainCardType) {
  const [openModal, setOpenModal] = useState(false);
  const toggleModal = () => setOpenModal(!openModal);

  /** Menu states */
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //* initialise useformik hook
  const formik = useFormik({
    initialValues: {
      column_name: "",
    },
    // validationSchema: validationSchemaProperty,
    onSubmit: (values) => {},
  });

  return (
    <div className="min-w-[322px] bg-white p-14 rounded-lg shadow-md">
      <div>
        <div className="flex justify-between">
          <Typography
            className="text-[18px] font-semibold mb-5"
            color="primary.main"
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
                  toggleModal();
                }}
              >
                Edit Title
              </MenuItem>
              <MenuItem onClick={handleClose}>Delete Column</MenuItem>
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
        modalTitle={title}
        open={openModal}
        handleToggle={toggleModal}
      >
        <InputField
          formik={formik}
          name="column_name"
          label="Column Name"
          placeholder="Enter Column Name"
          inputClass="column_input"
        />
      </CommonModal>
    </div>
  );
}
