import { Button, Theme, Typography } from "@mui/material";
import { useTheme } from "@mui/styles";
import { useFormik } from "formik";
// import { KanbanIcon } from "public/assets/icons/projectsIcon.tsx";
import { PlusIcon } from "public/assets/icons/dashboardIcons";
import { useState } from "react";
import AddNewTicket from "src/app/components/support/AddNewTicket";

import ProjectTabPanel from "../../components/projects/ProjectTapPanel";
import { useParams } from "react-router";
export default function Projects() {
  const theme: Theme = useTheme();
  const [addCard, setAddCard] = useState(false);
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const { name } = useParams();

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
        <Typography className="text-[18px] font-bold sm:text-[20px]  capitalize">
          {name}
        </Typography>
        {/* <Button
          variant="outlined"
          color="secondary"
          className="h-[40px] text-[16px] flex gap-8"
          aria-label="Add Tasks"
          size="large"
          onClick={() => setIsOpenAddModal(true)}
          startIcon={<PlusIcon color={theme.palette.secondary.main} />}
        >
          Add Task
        </Button> */}
      </div>
      <div>
        <ProjectTabPanel />
      </div>
      <AddNewTicket isOpen={isOpenAddModal} setIsOpen={setIsOpenAddModal} />
    </div>
  );
}
