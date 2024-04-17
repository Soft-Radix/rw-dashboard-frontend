import Typography from "@mui/material/Typography";
import { ReactNode } from "react";

type TitleBarProps = {
  title: string;
  children?: ReactNode;
};

export default function TitleBar({ title, children }: TitleBarProps) {
  return (
    <div className="flex justify-between px-[28px] pt-[20px] pb-[20px] items-center ">
      <Typography className="text-xl font-semibold text-[#0A0F18]">
        {title}
      </Typography>
      {children}
    </div>
  );
}
