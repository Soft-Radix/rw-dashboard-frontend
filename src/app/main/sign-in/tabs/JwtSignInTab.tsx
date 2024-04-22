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
import { z } from "zod";

/**
 * Form Validation Schema
 */
const schema = z.object({
  email: z
    .string()
    .email("You must enter a valid email")
    .nonempty("You must enter an email"),
  password: z
    .string()
    .min(4, "Password is too short - must be at least 4 chars.")
    .nonempty("Please enter your password."),
});

type FormType = {
  email: string;
  password: string;
  remember?: boolean;
};

const defaultValues = {
  email: "",
  password: "",
  remember: true,
};

function jwtSignInTab() {
  const { jwtService } = useAuth();

  //* initialise useformik hook
  const formik = useFormik({
    initialValues: {
      email: "admin@yopmail.com",
      password: "123456",
    },
    // validationSchema: validationSchemaProperty,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  const { control, formState, handleSubmit, setValue, setError } =
    useForm<FormType>({
      mode: "onChange",
      defaultValues,
      resolver: zodResolver(schema),
    });

  const { isValid, dirtyFields, errors } = formState;

  useEffect(() => {
    setValue("email", "admin@fusetheme.com", {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue("password", "admin", { shouldDirty: true, shouldValidate: true });
  }, [setValue]);

  function onSubmit(formData: FormType) {
    const { email, password } = formData;
    // dispatch(logIn({ email, password }));
    jwtService
      .signIn({
        email,
        password,
      })
    // .catch(
    //   (
    //     error: AxiosError<
    //       {
    //         type:
    //         | "email"
    //         | "password"
    //         | "remember"
    //         | `root.${string}`
    //         | "root";
    //         message: string;
    //       }[]
    //     >
    //   ) => {
    //     const errorData = error.response.data;

    //     errorData.forEach((err) => {
    //       setError(err.type, {
    //         type: "manual",
    //         message: err.message,
    //       });
    //     });
    //   }
    // );
  }

  return (
    <div className="w-full mt-32 max-w-[417px] flex gap-16 flex-col">
      <InputField
        formik={formik}
        name="email"
        label="Email Address"
        placeholder="Enter Email Address"
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
        onClick={() => formik.handleSubmit()}
      >
        Log In
      </Button>

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
          <Link className="ml-2 !no-underline font-bold " to="/sign-up">
            Create Account
          </Link>
        </Typography>
      </div>
    </div>
  );
}

export default jwtSignInTab;
