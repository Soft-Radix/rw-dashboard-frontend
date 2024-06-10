import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { setPassword } from "app/store/Auth";
import { AuthRootState } from "app/store/Auth/Interface";
import { useAppDispatch } from "app/store/store";
import { useFormik } from "formik";
import { UploadDocIcon, UploadDocRightIcon } from "public/assets/icons/welcome";
import {
  CircleLeft1Icon,
  CircleLeft2Icon,
  CircleRightIcon,
} from "public/assets/icons/welcome";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import InputField from "src/app/components/InputField";
import { resetPassSchema } from "src/formSchema";

type FormType = {
  cnfPassword: string;
  password: string;
};

export default function UploadPage() {
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
    <>
      <div className="flex  items-center flex-col px-28 py-60  gap-32 ">
        <CircleRightIcon className="hidden sm:block absolute top-0 sm:right-0 z-[-1]" />
        <CircleLeft1Icon className=" hidden sm:block absolute bottom-0 left-0 z-[-1]" />
        <CircleLeft2Icon className="hidden sm:block absolute bottom-[28px] left-0 z-[-1]" />
        <div className="pb-32">
          <img src="assets/icons/remote-icon.svg" alt="" />
        </div>

        <div
          className="bg-[#fff] sm:min-w-[60%] h-auto sm:py-[8rem] py-32  sm:px-20 flex flex-col items-center
         justify-center rounded-lg shadow-md gap-32 mb-20 "
        >
          <div className="flex flex-col justify-center items-center gap-20 w-3/4 ">
            <div className="relative">
              <UploadDocIcon />
              <div className="absolute top-[55px] left-[54px]">
                <UploadDocRightIcon />
              </div>
            </div>
            <div>
              <Typography className="text-[48px] text-center font-700 leading-normal pb-20">
                Upload Successful!
              </Typography>
              <p className="text-[18px] font-400 text-[#757982] leading-normal text-center pb-60">
                Your upload has been successfully submitted. It may take some
                time to process. We'll notify you once it's completed.
              </p>
            </div>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              className="text-[18px] font-500 sm:min-w-[417px] w-[300px]"
            >
              Ok
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
