import { Typography } from "@mui/material";
import React from "react";

type CardType = {
  title: string;
  priority: string;
  taskName: string;
  isChecked: boolean;
  date: string;
  images: string[];
};

export default function ItemCard({
  title,
  priority,
  taskName,
  isChecked,
  date,
  images,
}: CardType) {
  return (
    <div className="bg-[#F7F9FB] p-14 rounded-md border">
      <div className="flex justify-between">
        <Typography color="primary.main" className="font-medium">
          {title}
        </Typography>
        <span
          className={`bg-${priority === "Medium" ? "priorityMedium" : priority === "High" ? "red" : "green"}/[.18] py-5 px-10 rounded-[27px] min-w-[69px] text-[12px] flex justify-center items-center font-medium ${priority === "Medium" ? "text-priorityMedium" : priority === "High" ? "text-red" : "text-green"}`}
        >
          {priority}
        </span>
      </div>
    </div>
  );
}
