import { Button, Theme, Typography } from "@mui/material";
import { useTheme } from "@mui/styles";
import { useFormik } from "formik";
import { PlusIcon } from "public/assets/icons/dashboardIcons";
import { useState } from "react";
import InputField from "src/app/components/InputField";
import TitleBar from "src/app/components/TitleBar";
import MainCard from "src/app/components/dashboard/MainCard";

export default function Dashboard() {
  const theme: Theme = useTheme();
  const [addCard, setAddCard] = useState(false);

  //* initialise useformik hook
  const formik = useFormik({
    initialValues: {
      column_name: "",
    },
    // validationSchema: validationSchemaProperty,
    onSubmit: (values) => {},
  });
  return (
    <div>
      <TitleBar title="Welcome On Dashboard!" />
      <div className="flex gap-20 overflow-x-auto px-28 pb-28 items-start">
        <MainCard title="To Do" />
        <MainCard title="In Progress" />
        <MainCard title="In Review" />
        <MainCard title="Completed" />
        <MainCard title="Pending" isEmpty />
        <div className="min-w-[322px] bg-white p-14 py-[20px] rounded-lg shadow-md">
          {!addCard && (
            <div
              className="flex gap-10 items-center cursor-pointer w-fit"
              onClick={() => setAddCard(!addCard)}
            >
              <PlusIcon color={theme.palette.secondary.main} />
              <Typography
                className="text-[16px] font-semibold"
                color="secondary.main"
              >
                Create New Column
              </Typography>
            </div>
          )}
          {addCard && (
            <div>
              <InputField
                formik={formik}
                name="column_name"
                label="Column Name"
                placeholder="Enter Column Name"
                inputClass="column_input"
              />
              <div className="mt-20">
                <Button
                  variant="contained"
                  color="secondary"
                  className="w-[95px] text-[12px]"
                  size="small"
                >
                  Save
                </Button>{" "}
                <Button
                  variant="outlined"
                  color="secondary"
                  className="w-[95px] text-[12px] ml-5"
                  size="small"
                  onClick={() => setAddCard(!addCard)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
