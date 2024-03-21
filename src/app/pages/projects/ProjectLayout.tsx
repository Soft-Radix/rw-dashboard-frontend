import React, { useState } from "react";
import ProjectTabPanel from "./ProjectTapPanel";
import { Button, Theme, Typography } from "@mui/material";
import { PlusIcon } from "public/assets/icons/dashboardIcons";
import { useTheme } from "@mui/styles";

const ProjectLayout = ({ children }) => {
  const theme: Theme = useTheme();

  const [selectedTab, setSelectedTab] = useState(0);
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
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
      <ProjectTabPanel />
      {children}
    </div>
  );
};

export default ProjectLayout;
