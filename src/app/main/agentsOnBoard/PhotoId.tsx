import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { UploadImage } from "app/store/Agent";
import { setPassword } from "app/store/Auth";
import { AuthRootState } from "app/store/Auth/Interface";
import { useAppDispatch } from "app/store/store";
import { useFormik } from "formik";
import { Camera } from "public/assets/icons/common";
import {
  CircleLeft1Icon,
  CircleLeft2Icon,
  CircleRightIcon,
} from "public/assets/icons/welcome";
import { useCallback, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassSchema } from "src/formSchema";

type FormType = {
  cnfPassword: string;
  password: string;
};

export default function CreatePassword() {
  // State to track loading
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [frontID, setFrontID] = useState(null);
  const [frontfile, setFrontFile] = useState(null);
  const [webcamCapture, setWebcamCapture] = useState(null);
  const { token } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const webcamRef = useRef(null);
  const store = useSelector((store: AuthRootState) => store.auth);

  //* initialise useformik hook
  const handleWebcamFrontCapture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setWebcamCapture(imageSrc);
    setFrontID(imageSrc);
  }, [webcamRef]);

  const handleButtonClick = async () => {
    // Navigate to '/photo-id' route
    const payload = new FormData();
    payload.append("file", frontfile);

    try {
      const res = await dispatch(UploadImage({ payload, token }));
      if (res?.payload?.data?.status == 0) {
        toast.success(res?.payload?.data?.message);
        navigate("/upload-doc");
      }
    } catch (error) {
      toast.error(error?.message);
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="flex  items-center flex-col  gap-32 px-28 py-32">
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
          <div className="flex justify-center">
            <button
              onClick={handleWebcamFrontCapture}
              className="  text-white px-4 py-2 "
            >
              <Camera />
            </button>
            {frontID && (
              <img src={frontID} alt="Front ID" className="w-full max-w-xs " />
            )}
          </div>
        </div>
      </div>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        // disabled={!frontID}
        onClick={handleButtonClick}
        className="text-[18px] font-500  min-w-[196px]"
      >
        Next
      </Button>
    </div>
  );
}
