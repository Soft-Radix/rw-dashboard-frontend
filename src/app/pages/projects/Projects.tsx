import { Button, Theme, Typography } from "@mui/material";
import { useTheme } from "@mui/styles";
import { useFormik } from "formik";
// import { KanbanIcon } from "public/assets/icons/projectsIcon.tsx";
import { PlusIcon } from "public/assets/icons/dashboardIcons";
import { useState } from "react";
import InputField from "src/app/components/InputField";
import MainCard from "src/app/components/dashboard/MainCard";
import AddNewTicket from "src/app/components/support/AddNewTicket";

import FilterPage from "src/app/components/projects/FilterPage";
import ProjectTabPanel from "./ProjectTapPanel";
export default function Projects() {
  const theme: Theme = useTheme();
  const [addCard, setAddCard] = useState(false);
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  // const [color, setcolor] = useState<{ background: string }>({
  //   background: "red",
  // });

  //* initialise useformik hook
  const formik = useFormik({
    initialValues: {
      column_name: "",
    },
    // validationSchema: validationSchemaProperty,
    onSubmit: (values) => {},
  });

  // const handleColorChange = () => {
  //   setcolor({ background: "green" });
  // };

  return (
    <div>
      <div className="flex items-center justify-between px-28 py-20 ">
        <Typography className="text-[18px] font-bold sm:text-[20px]  ">
          Project 1
        </Typography>
        <Button
          variant="outlined"
          color="secondary"
          className="h-[40px] text-[16px] flex gap-8"
          aria-label="Add Tasks"
          size="large"
          onClick={() => setIsOpenAddModal(true)}
          startIcon={<PlusIcon color={theme.palette.secondary.main} />}
        >
          Add Task
        </Button>
      </div>
      <div>
        <ProjectTabPanel />
      </div>
      <FilterPage />

      <div className="flex gap-20 overflow-x-auto px-28 pb-28 items-start">
        <MainCard title="To Do" />
        <MainCard title="In Progress" />
        <MainCard title="In Review" />
        <MainCard title="Completed" />
        <MainCard title="Pending" isEmpty />
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
                name="column_name"
                label="Column Name"
                placeholder="Enter Column Name"
              />
              <div className="mt-20">
                <Button
                  variant="contained"
                  color="secondary"
                  className="w-[95px] text-[12px]"
                  size="small"
                >
                  Save
                </Button>{" "}
                <Button
                  variant="outlined"
                  color="secondary"
                  className="w-[95px] text-[12px] ml-5"
                  size="small"
                  onClick={() => setAddCard(!addCard)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <AddNewTicket isOpen={isOpenAddModal} setIsOpen={setIsOpenAddModal} />
    </div>
  );
}
