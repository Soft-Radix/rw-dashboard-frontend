import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { setPassword } from "app/store/Auth";
import { AuthRootState } from "app/store/Auth/Interface";
import { useAppDispatch } from "app/store/store";
import { useFormik } from "formik";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import AuthBox from "src/app/components/AuthBox";
import InputField from "src/app/components/InputField";
import { resetPassSchema } from "src/formSchema";

type FormType = {
  cnfPassword: string;
  password: string;
};

export default function SetPassword() {
  // State to track loading
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { token } = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate();

  const store = useSelector((store: AuthRootState) => store.auth)

  //* initialise useformik hook
  const formik = useFormik({
    initialValues: {
      cnfPassword: "",
      password: ""
    },
    validationSchema: resetPassSchema,
    onSubmit: (values) => { onSubmit(values) },
  });

  async function onSubmit(formData: FormType) {
    let data = {
      password: formData.password,
      token
    }
    setIsLoading(true)
    let { payload } = await dispatch(setPassword(data))
    setIsLoading(false)
    if (payload?.data?.status) {
      navigate('/sign-in')
    }
  }

  return (
    <div className="flex flex-col items-center flex-1 min-w-0 sm:flex-row sm:justify-center md:items-start md:justify-start">
      <Paper className="flex justify-center w-full h-full px-16 py-8 ltr:border-r-1 rtl:border-l-1 sm:h-auto sm:w-auto sm:rounded-2xl sm:p-48 sm:shadow md:flex md:h-full md:w-1/2 md:items-center md:rounded-none md:p-64 md:shadow-none">
        <CardContent className="mx-auto max-w-420 sm:mx-0 sm:w-420">
          <div className="flex items-center">
            <img src="assets/icons/remote-icon.svg" alt="" />
          </div>

          <Typography className="mt-96 text-[48px] font-bold leading-tight tracking-tight">
            Set Password
          </Typography>
          <div className="flex items-baseline mt-2 font-medium">
            <Typography className="text-[18px] text-[#757982] mt-8 max-w-[480px]">
              Please set your password by entering a new password.
            </Typography>
          </div>

          <div className="w-full mt-40 max-w-[417px] flex gap-16 flex-col">
            {" "}
            <InputField
              formik={formik}
              name="password"
              label="New Password"
              type="password"
              placeholder="Enter New Password"
            />
            <InputField
              formik={formik}
              name="cnfPassword"
              label="Confirm Password"
              type="password"
              placeholder="Enter Confirm Password"
            />
            <Button
              variant="contained"
              color="secondary"
              className="mt-40 w-full h-[50px] text-[18px] font-bold"
              aria-label="Log In"
              size="large"
              onClick={() => formik.handleSubmit()}
              disabled={isLoading}
            >
              Submit
            </Button>
          </div>
        </CardContent>
      </Paper>
      <AuthBox />
    </div>
  );
}
