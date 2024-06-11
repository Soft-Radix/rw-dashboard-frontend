import { Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import clsx from "clsx";
import { NotificationIcon } from "public/assets/icons/topBarIcons";

type NotificationsProps = {
  className?: string;
};

export default function Notifications(props: NotificationsProps) {
  const { className = "" } = props;
  return (
    <Tooltip title="Notifications" placement="bottom">
      <IconButton className={clsx("h-40 w-40 p-8", className)} size="large">
        <NotificationIcon />
      </IconButton>
    </Tooltip>
  );
}
