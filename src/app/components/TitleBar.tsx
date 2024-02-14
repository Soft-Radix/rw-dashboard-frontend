import Typography from "@mui/material/Typography";
import { ReactNode } from "react";

type TitleBarProps = {
  title: string;
  children?: ReactNode;
};

export default function TitleBar({ title, children }: TitleBarProps) {
  return (
    <div>
      <Typography className="text-[30px] font-semibold">{title}</Typography>
    </div>
  );
}
