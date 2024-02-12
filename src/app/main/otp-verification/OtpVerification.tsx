import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import { useState } from "react";
import OTPInput from "react-otp-input";
import AuthBox from "src/app/components/AuthBox";

export default function OtpVerification() {
  const [otp, setOtp] = useState("");

  //* initialise useformik hook
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
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
            OTP Verification
          </Typography>
          <div className="mt-2 flex items-baseline font-medium">
            <Typography className="text-[18px] text-[#757982] mt-8 max-w-[480px]">
              Please enter one time password (OTP) that is sent to
              <span className="font-semibold"> info456@gmail.com</span>
            </Typography>
          </div>

          <div className="w-full mt-40 max-w-[417px] flex gap-16 flex-col">
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={4}
              renderSeparator={<span className="w-[20px]" />}
              inputStyle="h-[55px] !w-[62px] bg-[#F6F6F6] rounded-[7px] text-[16px] border focus:border-[#4F46E5]"
              renderInput={(props) => <input {...props} />}
            />
            <Button
              variant="contained"
              color="secondary"
              className="mt-40 w-full h-[50px] text-[18px] font-bold"
              aria-label="Log In"
              size="large"
              onClick={() => formik.handleSubmit()}
            >
              Submit
            </Button>
            <div className="mt-28 flex items-center cursor-pointer justify-center">
              <Typography color="text.secondary" className="font-medium">
                Resend OTP in
              </Typography>
              <Typography color="secondary.main" className="font-bold ml-5">
                00:24
              </Typography>
            </div>
          </div>
        </CardContent>
      </Paper>
      <AuthBox />
    </div>
  );
}
