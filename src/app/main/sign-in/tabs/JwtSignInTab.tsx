import React, { useCallback, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { logIn } from "app/store/Auth";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "app/store/store";
import { Link } from "react-router-dom";
import { useAuth } from "src/app/auth/AuthRouteProvider";
import InputField from "src/app/components/InputField";
import { loginSchema } from "src/formSchema";
import toast from "react-hot-toast";

type FormType = {
  email: string;
  password: string;
  remember?: boolean;
};

function jwtSignInTab() {
  const { jwtService } = useAuth();

  // State to track loading
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = useCallback(async (formData) => {
    const { email, password } = formData;
    setIsLoading(true);
    await jwtService.signIn({ email, password });
    setIsLoading(false);
  }, []);

  //* initialise useformik hook
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit,
  });

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form behavior
    formik.handleSubmit(); // Trigger formik form submission
  };

  return (
    <div className="w-full mt-32 max-w-[417px] flex gap-16 flex-col">
      <form onSubmit={handleSubmit}>
        <InputField
          formik={formik}
          name="email"
          label="Email Address"
          placeholder="Enter Email Address"
          // inputRef={input => input && input.focus()}
        />
        <InputField
          formik={formik}
          name="password"
          label="Password"
          type="password"
          placeholder="Enter Password"
        />
        <Link
          className="text-[16px] font-medium !no-underline w-fit"
          to="/forgot-password"
        >
          Forgot Password
        </Link>
        <Button
          variant="contained"
          color="secondary"
          className="mt-28 w-full h-[50px] text-[18px] font-bold"
          aria-label="Log In"
          size="large"
          type="submit"
          disabled={isLoading}
        >
          Log In
        </Button>
      </form>
      <div className="flex items-center mt-12">
        <div className="flex-auto mt-px border-t" />
        <Typography className="mx-8" color="text.secondary">
          Or continue with
        </Typography>
        <div className="flex-auto mt-px border-t" />
      </div>
      <div className="flex justify-center mt-16">
        <Button
          variant="contained"
          className="w-full max-w-[345px] h-[56px] max-h-[56px] text-[18px] font-medium border bg-white border-solid border-[#E7E8E9] shadow-lg rounded-full"
          aria-label="Log In"
        >
          <img src="assets/icons/google.svg" alt="" className="mr-14" />
          Log In with Google
        </Button>
      </div>
      <div className="flex justify-center mt-8">
        <Button
          variant="contained"
          className="w-full max-w-[345px] h-[56px] max-h-[56px] text-[18px] font-medium border bg-white border-solid border-[#E7E8E9] shadow-lg rounded-full"
          aria-label="Log In"
        >
          <img src="assets/icons/facebook.svg" alt="" className="mr-14" />
          Log In with Facebook
        </Button>
      </div>
      <div className="flex items-center justify-center mt-20 cursor-pointer">
        <Typography color="text.secondary">New User?</Typography>
        <Typography color="secondary.main">
          {/* <Link className="ml-2 !no-underline font-bold " to="/sign-up"> */}
          Create Account
          {/* </Link> */}
        </Typography>
      </div>
    </div>
  );
}
export default React.memo(jwtSignInTab);
