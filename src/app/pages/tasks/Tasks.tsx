import { Button, Theme } from "@mui/material";
import { useTheme } from "@mui/styles";
import { PlusIcon } from "public/assets/icons/dashboardIcons";
import TitleBar from "src/app/components/TitleBar";

export default function Tasks() {
  const theme: Theme = useTheme();
  return (
    <div>
      <TitleBar title="Task List">
        {" "}
        <Button
          variant="outlined"
          color="secondary"
          className="h-[40px] text-[16px] flex gap-8"
          aria-label="Log In"
          size="large"
        >
          <PlusIcon color={theme.palette.secondary.main} />
          Add Task
        </Button>
      </TitleBar>
    </div>
  );
}
