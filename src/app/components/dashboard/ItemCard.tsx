import { Checkbox, Theme, Typography } from "@mui/material";
import { useTheme } from "@mui/styles";
// import { CalendarIcon } from "public/assets/icons/dashboardIcons";

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
  const theme: Theme = useTheme();
  return (
    <div className="bg-[#F7F9FB] p-14 rounded-md border">
      <div className="flex justify-between gap-10 items-center">
        <Typography color="primary.main" className="font-medium">
          {title}
        </Typography>
        <span
          className={`${priority === "Medium" ? "bg-priorityMedium/[.18]" : priority === "High" ? "bg-red/[.18]" : "bg-green/[.18]"} py-5 px-10 rounded-[27px] min-w-[69px] text-[12px] flex justify-center items-center font-medium ${priority === "Medium" ? "text-priorityMedium" : priority === "High" ? "text-red" : "text-green"}`}
        >
          {priority}
        </span>
      </div>
      <div className="mt-10 flex justify-between gap-20 items-start">
        <Typography color="primary.light" className="text-[12px] ">
          {taskName}
        </Typography>
        <Checkbox />
      </div>
      <div className="mt-10 flex justify-between">
        <div className="flex items-center">
          {/* <CalendarIcon color={theme.palette.secondary.main} /> */}
          <Typography color="primary.light" className="text-[12px] ml-10 ">
            {date}
          </Typography>
        </div>
        <div className="flex flex-row-reverse">
          {images.map((item) => (
            <img
              className="h-[34px] w-[34px] rounded-full border-2 border-white ml-[-10px] z-0"
              key={item}
              src={item}
              alt={item}
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
