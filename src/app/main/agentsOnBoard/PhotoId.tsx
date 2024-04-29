import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { setPassword } from "app/store/Auth";
import { AuthRootState } from "app/store/Auth/Interface";
import { useAppDispatch } from "app/store/store";
import { useFormik } from "formik";
import {
  CircleLeft1Icon,
  CircleLeft2Icon,
  CircleRightIcon,
} from "public/assets/icons/welcome";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassSchema } from "src/formSchema";

type FormType = {
  cnfPassword: string;
  password: string;
};

export default function CreatePassword() {
  // State to track loading
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { token } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const store = useSelector((store: AuthRootState) => store.auth);

  //* initialise useformik hook
  const formik = useFormik({
    initialValues: {
      cnfPassword: "",
      password: "",
    },
    validationSchema: resetPassSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  async function onSubmit(formData: FormType) {
    let data = {
      password: formData.password,
      token,
    };
    setIsLoading(true);
    let { payload } = await dispatch(setPassword(data));
    setIsLoading(false);
    if (payload?.data?.status) {
      navigate("/sign-in");
    }
  }

  return (
    <div className="flex justify-center items-center flex-col h-screen gap-32 px-28 ">
      <CircleRightIcon className="hidden sm:block absolute top-0 sm:right-0 z-[-1]" />
      <CircleLeft1Icon className=" hidden sm:block absolute bottom-0 left-0 z-[-1]" />
      <CircleLeft2Icon className="hidden sm:block absolute bottom-[28px] left-0 z-[-1]" />

      <img src="assets/icons/remote-icon.svg" alt="" />

      <div className="bg-[#fff] sm:min-w-[60%] h-auto sm:py-[8rem] py-60 px-20 sm:px-20 flex justify-center rounded-lg shadow-md ">
        <div className="flex flex-col justify-center gap-40">
          <Typography className="text-[48px] text-center font-700 leading-normal">
            Capture a Photo
            <p className="text-[18px] font-400 text-[#757982] leading-4 pt-20">
              To proceed, please take a photo while holding your ID.
            </p>
          </Typography>
          <div></div>
        </div>
      </div>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        className="text-[18px] font-500"
      >
        Save
      </Button>
    </div>
  );
}
