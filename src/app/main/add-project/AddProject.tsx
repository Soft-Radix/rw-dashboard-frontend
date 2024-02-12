import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import AuthBox from "src/app/components/AuthBox";
import InputField from "src/app/components/InputField";

export default function AddProject() {
  //* initialise useformik hook
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    // validationSchema: validationSchemaProperty,
    onSubmit: (values) => {},
  });
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center sm:flex-row sm:justify-center md:items-start md:justify-start">
      <Paper className="h-full w-full px-16 py-8 ltr:border-r-1 rtl:border-l-1 sm:h-auto sm:w-auto sm:rounded-2xl sm:p-48 sm:shadow md:flex md:h-full md:w-1/2 md:items-center md:rounded-none md:p-64 md:shadow-none flex justify-center">
        <CardContent className="mx-auto max-w-420 sm:mx-0 sm:w-420">
          <div className="flex items-center">
            <img src="assets/icons/remote-icon.svg" alt="" />
          </div>

          <Typography className="mt-96 text-[48px] font-bold leading-tight tracking-tight">
            Let's Start
          </Typography>
          <div className="mt-2 flex items-baseline font-medium">
            <Typography className="text-[18px] text-[#757982] mt-8 max-w-[480px]">
              To begin, kindly include the name of your project.
            </Typography>
          </div>

          <div className="w-full mt-40 max-w-[417px] flex gap-16 flex-col">
            {" "}
            <InputField
              formik={formik}
              name="name"
              label="Name Your First Project"
              placeholder="Enter Your Project Name"
            />
            <Button
              variant="contained"
              color="secondary"
              className="mt-40 w-full h-[50px] text-[18px] font-bold"
              aria-label="Log In"
              size="large"
              onClick={() => formik.handleSubmit()}
            >
              Save
            </Button>
          </div>
        </CardContent>
      </Paper>
      <AuthBox />
    </div>
  );
}
