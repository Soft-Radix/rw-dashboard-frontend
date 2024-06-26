import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { setPassword } from "app/store/Auth";
import { AuthRootState } from "app/store/Auth/Interface";
import { useAppDispatch } from "app/store/store";
import { useFormik } from "formik";
import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import AuthBox from "src/app/components/AuthBox";
import InputField from "src/app/components/InputField";
import { resetPassSchema } from "src/formSchema";
import Webcam from "react-webcam";
import {
  CircleLeft1Icon,
  CircleLeft2Icon,
  CircleRightIcon,
} from "public/assets/icons/welcome";
import { Camera } from "public/assets/icons/common";
import { useNavigation } from "react-router";

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
  const [frontID, setFrontID] = useState(null);
  const [backID, setBackID] = useState(null);
  const [webcamCapture, setWebcamCapture] = useState(null);
  const webcamRef = React.useRef(null);
  const handleFrontIDChange = (event) => {
    setFrontID(URL.createObjectURL(event.target.files[0]));
  };

  const handleBackIDChange = (event) => {
    setBackID(URL.createObjectURL(event.target.files[0]));
  };

  const handleWebcamFrontCapture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setWebcamCapture(imageSrc);
    setFrontID(imageSrc);
  }, [webcamRef]);

  const handleWebcamBackCapture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setWebcamCapture(imageSrc);
    setBackID(imageSrc);
  }, [webcamRef]);

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

  const handleButtonClick = () => {
    // Navigate to '/photo-id' route
    navigate("/photo-id");
  };

  return (
    <>
      <div className="flex items-center flex-col gap-32 py-60 ">
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
            <div className="flex items-center justify-center gap-20 sm:flex-row flex-col py-32 ">
              <div className="bg-[#EDEDFC] border-1 border-dashed border-[#4F46E5] flex flex-col rounded-6 items-center py-60  gap-14 w-[266px] h-[206px]">
                <button
                  onClick={handleWebcamFrontCapture}
                  className="  text-white px-4 py-2 "
                >
                  <Camera />
                </button>

                <label className=" cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFrontIDChange}
                  />
                  {frontID ? (
                    <img
                      src={frontID}
                      alt="Front ID"
                      className="w-full max-w-xs max-h-[50px] "
                    />
                  ) : (
                    <div className="w-full max-w-xs h-40  flex justify-center items-center">
                      <Typography className="text-[16px] font-500 text-[#111827]">
                        Upload Front ID Pic
                      </Typography>
                    </div>
                  )}
                </label>
              </div>

              <div className="bg-[#EDEDFC] border-1 border-dashed border-[#4F46E5] flex flex-col rounded-6 items-center py-60 w-[266px] h-[206px] gap-14">
                <button
                  onClick={handleWebcamBackCapture}
                  className="  text-white px-4 py-2 "
                >
                  <Camera />
                </button>

                <label className=" cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleBackIDChange}
                  />
                  {backID ? (
                    <img
                      src={backID}
                      alt="Front ID"
                      className="w-full max-w-xs max-h-[50px] "
                    />
                  ) : (
                    <div className="w-full max-w-xs h-40  flex justify-center items-center">
                      <Typography className="text-[16px] font-500 text-[#111827]">
                        Upload Back ID Pic
                      </Typography>
                    </div>
                  )}
                </label>
              </div>
            </div>
          </div>
        </div>
        {/* <Link to="/photo-id"> */}
        <Button
          variant="contained"
          color="secondary"
          size="large"
          className="text-[18px] font-700 min-w-[196px]"
          disabled={!frontID || !backID}
          onClick={handleButtonClick}
        >
          Next
        </Button>
        {/* </Link> */}
      </div>
    </>
  );
}
