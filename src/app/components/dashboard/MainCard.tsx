import { Button, Typography } from "@mui/material";
import React from "react";
import {
  DragIcon,
  PlusIcon,
  ThreeDotsIcon,
} from "public/assets/icons/dashboardIcons";
import ItemCard from "./ItemCard";

type MainCardType = {
  title: string;
};

export default function MainCard({ title }: MainCardType) {
  return (
    <div className="w-[322px] bg-white p-14 rounded-lg shadow-md">
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
            <ThreeDotsIcon className="cursor-pointer" />
          </div>
        </div>
        <Typography color="primary.light">
          Please review your to-do list below.
        </Typography>
        <div className="py-20">
          <ItemCard title="iOS App Home Page" priority="Medium" />
        </div>
        <Button
          variant="contained"
          color="secondary"
          className="w-full h-[48px] text-[18px] flex gap-8"
          aria-label="Log In"
          size="large"
        >
          <PlusIcon />
          Add New
        </Button>
      </div>
    </div>
  );
}
