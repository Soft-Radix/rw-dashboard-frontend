import React, { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { UploadImage } from "app/store/Agent";
import { useAppDispatch } from "app/store/store";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  CircleLeft1Icon,
  CircleLeft2Icon,
  CircleRightIcon,
} from "public/assets/icons/welcome";
import { Camera } from "public/assets/icons/common";
import { RefreshToken } from "app/store/Auth";
import { useAuth } from "src/app/auth/AuthRouteProvider";

export default function CreatePassword() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [frontID, setFrontID] = useState<string | null>(null);
  const { jwtService } = useAuth();
  const [frontfile, setFrontFile] = useState<File | null>(null);
  const [webcamCapture, setWebcamCapture] = useState<string | null>(null);
  const [showWebcam, setShowWebcam] = useState<boolean>(false);
  const { token } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const webcamRef = useRef<Webcam | null>(null);
  const store = useSelector((store: any) => store.auth);

  const handleWebcamFrontCapture = useCallback(() => {
    if (webcamRef.current) {
      // setFrontFile(webcamRef.current);
      const imageSrc = webcamRef.current.getScreenshot();
      setWebcamCapture(imageSrc);
      setFrontID(imageSrc);
      if (imageSrc) {
        // Convert base64 to Blob
        const byteString = atob(imageSrc.split(",")[1]);
        const mimeString = imageSrc.split(",")[0].split(":")[1].split(";")[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ab], { type: mimeString });
        const file = new File([blob], "capture.jpg", { type: mimeString });
        setFrontFile(file);
      }
      setShowWebcam(false); // Hide webcam after capturing the photo
    }
  }, [webcamRef]);

  const redirect = async () => {
    console.log("calling");
    await jwtService.agentSignIn();
  };

  const fetchData = async () => {
    try {
      const payload = {
        token,
      };
      //@ts-ignore
      const res = await dispatch(RefreshToken(payload));
      redirect();
      // toast.success(res?.payload?.data?.message);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleButtonClick = async () => {
    const payload = new FormData();
    if (frontID) {
      payload.append("files", frontfile);
    }

    try {
      const res = await dispatch(UploadImage({ payload, token }));
      if (res?.payload?.data?.status == 1) {
        navigate(`/upload-doc/${token}`);
        toast.success(res?.payload?.data?.message);
      }
    } catch (error) {
      toast.error(error?.message);
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex items-center flex-col gap-32 px-28 py-32">
      <CircleRightIcon className="hidden sm:block absolute top-0 sm:right-0 z-[-1]" />
      <CircleLeft1Icon className="hidden sm:block absolute bottom-0 left-0 z-[-1]" />
      <CircleLeft2Icon className="hidden sm:block absolute bottom-[28px] left-0 z-[-1]" />

      <img src="assets/icons/remote-icon.svg" alt="" />

      <div className="bg-[#fff] sm:min-w-[60%] h-auto sm:py-[8rem] py-60 px-20 sm:px-20 flex justify-center rounded-lg shadow-md">
        <div className="flex flex-col justify-center gap-40">
          <Typography className="text-[48px] text-center font-700 leading-normal">
            Capture a Photo
            <p className="text-[18px] font-400 text-[#757982] leading-4 pt-20">
              To proceed, please take a photo while holding your ID.
            </p>
          </Typography>
          <div className="flex justify-center">
            {!showWebcam && !frontID ? (
              <button
                onClick={() => setShowWebcam(true)}
                className="text-white px-4 py-2"
              >
                <Camera />
              </button>
            ) : null}
            {showWebcam ? (
              <div
                className="flex flex-col gap-[20px] "
                style={{ alignItems: "center" }}
              >
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  className="w-full "
                />
                <div className="border-spacing-5 border-3 border-[#4f46e5] rounded-full">
                  <button
                    onClick={handleWebcamFrontCapture}
                    className="bg-[#4f46e5] border-2 h-[54px] w-[54px] rounded-full p-2 m-2 "
                    style={{}}
                  ></button>
                </div>
              </div>
            ) : null}
            {frontID && (
              <img src={frontID} alt="Front ID" className="w-full " />
            )}
          </div>
        </div>
      </div>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        onClick={handleButtonClick}
        disabled={!frontID}
        className="text-[18px] font-500 min-w-[196px]"
      >
        Next
      </Button>
    </div>
  );
}
