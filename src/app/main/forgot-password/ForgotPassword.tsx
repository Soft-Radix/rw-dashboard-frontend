import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { forgotPassword } from "app/store/Auth";
import { useAppDispatch } from "app/store/store";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import AuthBox from "src/app/components/AuthBox";
import InputField from "src/app/components/InputField";
import { forgotPasswordSchema } from "src/formSchema";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { useState } from "react";

type FormType = {
  email: string;
};

export default function ForgotPassword() {
  // State to track loading
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  //* initialise useformik hook
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPasswordSchema,
    // validationSchema: validationSchemaProperty,
    onSubmit: (values) => { onSubmit(values) },
  });

  async function onSubmit(formData: FormType) {
    const { email } = formData;
    setIsLoading(true)
    let { payload } = await dispatch(forgotPassword({ email }))
    setIsLoading(false)
    if (payload?.data?.status) {
      navigate('/otp-verification')
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
            Forgot Password
          </Typography>

          <div className="flex items-baseline mt-2 font-medium">
            <Typography className="text-[18px] text-[#757982] mt-8 max-w-[480px]">
              Please enter your email address and we will send you a one-time
              password(OTP).
            </Typography>
          </div>

          <div className="w-full mt-40 max-w-[417px] flex gap-16 flex-col">
            {" "}
            <InputField
              formik={formik}
              name="email"
              label="Email Address"
              placeholder="Enter Email Address"
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
              Send
            </Button>
          </div>
        </CardContent>
      </Paper>
      <AuthBox />
    </div>
  );
}
