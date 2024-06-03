import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import {
  CircleLeft1Icon,
  CircleLeft2Icon,
  CircleRightIcon,
} from "public/assets/icons/welcome";

export default function UploadKYC() {
  const [frontID, setFrontID] = useState(null);
  const [backID, setBackID] = useState(null);

  const handleFrontIDChange = (event) => {
    setFrontID(URL.createObjectURL(event.target.files[0]));
  };

  const handleBackIDChange = (event) => {
    setBackID(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <>
      <div className="flex justify-center items-center flex-col min-h-screen gap-60 px-28 pt-60 pb-60">
        <CircleRightIcon className="hidden sm:block absolute top-0 sm:right-0 z-[-1]" />
        <CircleLeft1Icon className=" hidden sm:block absolute bottom-0 left-0 z-[-1]" />
        <CircleLeft2Icon className="hidden sm:block absolute bottom-[28px] left-0 z-[-1]" />

        <img src="assets/icons/remote-icon.svg" alt="" />

        <div className="bg-[#fff] w-[60%] h-auto sm:py-[8rem] py-60 px-20 sm:px-20 flex flex-col justify-center items-center rounded-lg shadow-md">
          <Typography className="text-[24px] text-center font-600 leading-normal">
            Upload KYC
            <p className="text-[16px] font-300 text-[#757982] leading-4 pt-20">
              To initiate, kindly provide your KYC documents.
            </p>
          </Typography>

          <div className="pt-40 w-full flex flex-col items-center">
            <Typography className="text-[20px] font-500 leading-normal">
              Upload front ID
            </Typography>
            <label className="pt-20 cursor-pointer">
              <input
                type="file"
                className="hidden"
                onChange={handleFrontIDChange}
              />
              {frontID ? (
                <img src={frontID} alt="Front ID" className="w-full max-w-xs" />
              ) : (
                <div className="w-full max-w-xs h-40 border-2 border-dashed border-gray-300 flex justify-center items-center">
                  <span className="text-gray-500">
                    Click to upload front ID
                  </span>
                </div>
              )}
            </label>
          </div>

          <div className="pt-40 w-full flex flex-col items-center">
            <Typography className="text-[20px] font-500 leading-normal">
              Upload back ID
            </Typography>
            <label className="pt-20 cursor-pointer">
              <input
                type="file"
                className="hidden"
                onChange={handleBackIDChange}
              />
              {backID ? (
                <img src={backID} alt="Back ID" className="w-full max-w-xs" />
              ) : (
                <div className="w-full max-w-xs h-40 border-2 border-dashed border-gray-300 flex justify-center items-center">
                  <span className="text-gray-500">Click to upload back ID</span>
                </div>
              )}
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
