import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { FormLabel, Grid, MenuItem, styled } from "@mui/material";
import { useFormik } from "formik";
import {
  AssignIcon,
  MicIcon,
  PriorityIcon,
  ReminderIcon,
  ScreenRecordingIcon,
  StatusIcon,
  UploadIcon,
} from "public/assets/icons/task-icons";
import { Dispatch, SetStateAction, useState } from "react";
import CommonModal from "../CommonModal";
import DropdownMenu from "../Dropdown";
import InputField from "../InputField";
import CommonChip from "../chip";
import CustomButton from "../custom_button";

interface IProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  padding: "8px 20px",
  minWidth: "250px",
}));

function AddTaskModal({ isOpen, setIsOpen }: IProps) {
  const [dateTimeMenu, setDateTimeMenu] = useState<HTMLElement | null>(null);
  const [priorityMenu, setPriorityMenu] = useState<HTMLElement | null>(null);
  const [statusMenu, setStatusMenu] = useState<HTMLElement | null>(null);
  const [labelsMenu, setLabelsMenu] = useState<HTMLElement | null>(null);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    onSubmit: (values) => {},
  });

  const dateTimeMenuData = [
    { label: "In 1 business day" },
    { label: "In 2 business days" },
    { label: "In 3 business days" },
    { label: "In 1 week" },
    { label: "In 2 week" },
    { label: "In 1 month" },
    { label: "In 3 months" },
    { label: "In 6 months" },
  ];
  const priorityMenuData = [
    { label: "Medium" },
    { label: "High" },
    { label: "Low" },
  ];
  const statusMenuData = [
    { label: "To Do" },
    { label: "In Progress" },
    { label: "In Review" },
    { label: "Completed" },
  ];
  const labelsMenuData = [
    { label: "Important Task" },
    { label: "High Priority" },
    { label: "Medium Priority" },
    { label: "Responsive" },
  ];

  return (
    <CommonModal
      open={isOpen}
      handleToggle={() => setIsOpen((prev) => !prev)}
      modalTitle="Add Task"
      maxWidth="910"
    >
      <div className="flex flex-col gap-20">
        <InputField
          formik={formik}
          name="title"
          label="Title"
          placeholder="Enter Title"
        />
        <InputField
          formik={formik}
          name="description"
          label="Description"
          placeholder="Enter Description"
          multiline
          rows={4}
        />
        <div className="flex gap-10">
          <CommonChip label="Assigned To" icon={<AssignIcon />} />
          <DropdownMenu
            handleClose={() => setDateTimeMenu(null)}
            anchorEl={dateTimeMenu}
            button={
              <CommonChip
                onClick={(event) => setDateTimeMenu(event.currentTarget)}
                label="Due Date & Time"
                icon={
                  <FuseSvgIcon size={20}>
                    material-outline:calendar_today
                  </FuseSvgIcon>
                }
              />
            }
            popoverProps={{
              open: !!dateTimeMenu,
              classes: {
                paper: "pt-10 pb-20",
              },
            }}
          >
            {dateTimeMenuData.map((item) => (
              <StyledMenuItem onClick={() => setDateTimeMenu(null)}>
                {item.label}
              </StyledMenuItem>
            ))}
            <div className="px-20">
              <CustomButton
                fullWidth
                variant="contained"
                color="secondary"
                startIcon={
                  <FuseSvgIcon>material-outline:add_circle_outline</FuseSvgIcon>
                }
                className="min-w-[224px] mt-10"
              >
                Custom Date
              </CustomButton>
            </div>
          </DropdownMenu>
          <DropdownMenu
            anchorEl={priorityMenu}
            handleClose={() => setPriorityMenu(null)}
            button={
              <CommonChip
                onClick={(event) => setPriorityMenu(event.currentTarget)}
                label="Priority"
                icon={<PriorityIcon />}
              />
            }
            popoverProps={{
              open: !!priorityMenu,
              classes: {
                paper: "pt-10 pb-20",
              },
            }}
          >
            {priorityMenuData.map((item) => (
              <StyledMenuItem onClick={() => setPriorityMenu(null)}>
                {item.label}
              </StyledMenuItem>
            ))}
          </DropdownMenu>

          <DropdownMenu
            anchorEl={labelsMenu}
            handleClose={() => setLabelsMenu(null)}
            button={
              <CommonChip
                onClick={(event) => setLabelsMenu(event.currentTarget)}
                label="Labels"
                icon={
                  <FuseSvgIcon size={20}>heroicons-outline:tag</FuseSvgIcon>
                }
              />
            }
            popoverProps={{
              open: !!labelsMenu,
              classes: {
                paper: "pt-10 pb-20",
              },
            }}
          >
            {labelsMenuData.map((item) => (
              <StyledMenuItem onClick={() => setPriorityMenu(null)}>
                {item.label}
              </StyledMenuItem>
            ))}
            <div className="px-20">
              <CustomButton
                fullWidth
                variant="contained"
                color="secondary"
                startIcon={
                  <FuseSvgIcon>material-outline:add_circle_outline</FuseSvgIcon>
                }
                className="min-w-[224px] mt-10"
              >
                Custom Date
              </CustomButton>
            </div>
          </DropdownMenu>
        </div>
        <div className="flex gap-20">
          <CommonChip label="Reminder" icon={<ReminderIcon />} />
          <DropdownMenu
            anchorEl={statusMenu}
            handleClose={() => setStatusMenu(null)}
            button={
              <CommonChip
                onClick={(event) => setStatusMenu(event.currentTarget)}
                label="Status"
                icon={<StatusIcon />}
              />
            }
            popoverProps={{
              open: !!statusMenu,
              classes: {
                paper: "pt-10 pb-20",
              },
            }}
          >
            {statusMenuData.map((item) => (
              <StyledMenuItem onClick={() => setStatusMenu(null)}>
                {item.label}
              </StyledMenuItem>
            ))}
          </DropdownMenu>
        </div>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <FormLabel className="block text-[16px] font-medium text-[#111827] mb-5">
              Voice Memo
            </FormLabel>
            <Grid container spacing={2}>
              <Grid item md={6}>
                <CommonChip
                  colorSecondary
                  className="w-full"
                  label="Record voice memo"
                  icon={<MicIcon />}
                />
              </Grid>
              <Grid item md={6}>
                <CommonChip
                  colorSecondary
                  className="w-full"
                  label="Upload File"
                  icon={<UploadIcon />}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={6}>
            <FormLabel className="block text-[16px] font-medium text-[#111827] mb-5">
              File
            </FormLabel>
            <CommonChip
              colorSecondary
              className="w-full"
              label="Upload File"
              icon={<UploadIcon />}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <FormLabel className="block text-[16px] font-medium text-[#111827] mb-5">
              Screen Recording
            </FormLabel>
            <CommonChip
              colorSecondary
              className="w-full"
              label="Record Your Screen"
              icon={<ScreenRecordingIcon />}
            />
          </Grid>
        </Grid>
      </div>
    </CommonModal>
  );
}

export default AddTaskModal;
