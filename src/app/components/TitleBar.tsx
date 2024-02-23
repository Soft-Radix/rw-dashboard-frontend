import Typography from "@mui/material/Typography";
import { ReactNode } from "react";

type TitleBarProps = {
  title: string;
  children?: ReactNode;
};

export default function TitleBar({ title, children }: TitleBarProps) {
  return (
    <div className="flex justify-between px-[28px] py-[20px]">
      <Typography className="text-[30px] font-semibold">{title}</Typography>
      {children}
    </div>
  );
}
