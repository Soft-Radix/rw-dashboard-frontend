import Typography from "@mui/material/Typography";
import { ReactNode } from "react";

type TitleBarProps = {
  title: string;
  children?: ReactNode;
};

export default function TitleBar({ title, children }: TitleBarProps) {
  return (
    <div className="flex justify-between px-[28px] py-[20px] xs:px-10">
      <Typography className="text-3xl font-semibold text-[#0A0F18]">
        {title}
      </Typography>
      {children}
    </div>
  );
}
