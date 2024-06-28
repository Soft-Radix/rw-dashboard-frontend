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
import { Box } from "@mui/material";
import MicrophonePopup from "src/app/components/client/MicrophonePopup";

export default function PhotoId() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [frontID, setFrontID] = useState<string | null>(null);
  const { jwtService } = useAuth();
  const [frontfile, setFrontFile] = useState<File | null>(null);
  const [webcamCapture, setWebcamCapture] = useState<string | null>(null);
  const [showWebcam, setShowWebcam] = useState<boolean>(true);
  const [disable, setDisabled] = useState(false);
  const { token } = useParams();
  const dispatch = useAppDispatch();
  const [isMediaModal, setIsMediaModal] = useState(false);
  const navigate = useNavigate();
  const webcamRef = useRef<Webcam | null>(null);
  const [permissions, setPermissions] = useState("");
  const store = useSelector((store: any) => store.auth);

  const handleWebcamFrontCapture = useCallback(() => {
    console.log("===calling handleWebcamFrontCapture", webcamRef.current);
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setWebcamCapture(imageSrc);
      setFrontID(imageSrc);
      if (imageSrc) {
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
  }, [webcamRef, permissions]);

  const redirect = async () => {
    console.log("calling redirect");
    await jwtService.agentSignIn();
  };

  const fetchData = async () => {
    try {
      const payload = { token };
      const res = await dispatch(RefreshToken(payload));
      redirect();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleButtonClick = async () => {
    setDisabled(true);
    const payload = new FormData();
    if (frontID) {
      payload.append("files", frontfile);
    }

    try {
      const res = await dispatch(UploadImage({ payload, token }));
      if (res?.payload?.data?.status === 1) {
        navigate(`/upload-doc/${token}`);
        setDisabled(false);
        toast.success(res?.payload?.data?.message);
      }
    } catch (error) {
      toast.error(error?.message);
      setDisabled(false);
      console.error("Error uploading image:", error);
    }
  };

  useEffect(() => {
    // fetchData();
  }, []);

  const handleMediaAccess = async () => {
    try {
      const permission = await navigator.permissions.query({
        //@ts-ignore
        name: "camera",
      });
      console.log("Permission State:", permission.state);

      if (permission.state === "denied") {
        setIsMediaModal(true);
      } else if (permission.state === "granted") {
        setIsMediaModal(false);
      } else if (permission.state === "prompt") {
        try {
          await navigator.mediaDevices.getUserMedia({ video: true });
          setIsMediaModal(false);
        } catch (error) {
          setIsMediaModal(true);
        }
      }

      permission.onchange = async () => {
        console.log("Permission Changed:", permission.state);
        if (permission.state === "denied") {
          setIsMediaModal(true);
        } else if (permission.state === "granted") {
          setIsMediaModal(false);
        } else if (permission.state === "prompt") {
          try {
            await navigator.mediaDevices.getUserMedia({ video: true });
            setIsMediaModal(false);
          } catch (error) {
            setIsMediaModal(true);
          }
        }
      };
    } catch (error) {
      console.error("Error checking media permissions:", error);
    }
  };

  useEffect(() => {
    handleMediaAccess();
  }, []);

  useEffect(() => {
    if (!isMediaModal) {
      handleWebcamFrontCapture();
    }
  }, [isMediaModal]);

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
            {!isMediaModal ? (
              <div
                className="flex flex-col gap-[20px]"
                style={{ alignItems: "center" }}
              >
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  className="w-full"
                />
                <div className="border-spacing-5 border-3 border-[#4f46e5] rounded-full">
                  <button
                    onClick={handleMediaAccess}
                    className="bg-[#4f46e5] border-2 h-[54px] w-[54px] rounded-full p-2 m-2"
                  ></button>
                </div>
              </div>
            ) : null}
            {frontID && <img src={frontID} alt="Front ID" className="w-full" />}
          </div>
        </div>
      </div>
      {disable && (
        <Box
          id="spinner"
          sx={{
            "& > div": {
              backgroundColor: "palette.secondary.main",
            },
          }}
        >
          <div className="bounce1" />
          <div className="bounce2" />
          <div className="bounce3" />
        </Box>
      )}
      <Button
        variant="contained"
        color="secondary"
        size="large"
        onClick={handleButtonClick}
        disabled={!frontID || disable}
        className="text-[18px] font-500 min-w-[196px]"
      >
        Next
      </Button>
      <MicrophonePopup
        isOpen={isMediaModal}
        setIsOpen={setIsMediaModal}
        heading={`Whoops! Looks like you denied access`}
        media="media"
      />
    </div>
  );
}
