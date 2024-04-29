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
import {
  CircleLeft1Icon,
  CircleLeft2Icon,
  CircleRightIcon,
} from "public/assets/icons/welcome";
import { CameraIcon } from "public/assets/icons/common";

type FormType = {
  cnfPassword: string;
  password: string;
};

export default function UploadKyc() {
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
  const title = [
    {
      description: " Upload Front ID Pic",
    },
    {
      description: " Upload Back ID Pic",
    },
  ];
  //
  return (
    <div className="flex justify-center items-center flex-col h-screen gap-32">
      <CircleRightIcon className="hidden sm:block absolute top-0 sm:right-0 z-[-1]" />
      <CircleLeft1Icon className=" hidden sm:block absolute bottom-0 left-0 z-[-1]" />
      <CircleLeft2Icon className="hidden sm:block absolute bottom-[28px] left-0 z-[-1]" />

      <img src="assets/icons/remote-icon.svg" alt="" />

      <div className="bg-[#fff] sm:min-w-[60%] h-auto sm:py-[8rem] py-20 px-20 sm:px-24 flex justify-center rounded-lg shadow-md ">
        <div className="flex flex-col justify-center gap-40 ">
          <Typography className="text-[48px] text-center font-700 leading-normal">
            Upload KYC
            <p className="text-[18px] font-400 text-[#757982] pt-20 sm:leading-4 leading-6">
              To initiate, kindly provide your KYC documents.
            </p>
          </Typography>
          <div className="flex items-center justify-center gap-20 sm:flex-row flex-col ">
            {title.map((data) => (
              <div className="bg-[#EDEDFC] border-1 border-dashed border-[#4F46E5] flex flex-col rounded-6 items-center py-60 px-60 gap-14">
                <CameraIcon />
                <Typography className="text-[16px] font-500 text-[#111827]">
                  {data.description}
                </Typography>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        className="text-[18px] font-700 min-w-[196px]"
      >
        Next
      </Button>
    </div>
  );
}
