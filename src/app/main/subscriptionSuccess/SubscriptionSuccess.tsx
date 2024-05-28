import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { RefreshToken, setPassword } from "app/store/Auth";
import { AuthRootState } from "app/store/Auth/Interface";
import { useAppDispatch } from "app/store/store";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
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
import { getLocalStorage } from "src/utils";
import { useAuth } from "src/app/auth/AuthRouteProvider";
import { projectAdd, projectAddDoc } from "app/store/Projects";
import { SubProjectIcon } from "public/assets/icons/navabarIcon";
import navigationConfig from "app/configs/navigationConfig";
import * as Yup from "yup";
import FuseLoading from "@fuse/core/FuseLoading";
import { SucessSubscription } from "public/assets/icons/common";

type FormType = {
  cnfPassword: string;
  password: string;
};

export default function SubscriptionSuccess() {
  // State to track loading

  return (
    <>
      <div className="flex justify-center items-center flex-col h-screen gap-60 px-28 ">
        <CircleRightIcon className="hidden sm:block absolute top-0 sm:right-0 z-[-1]" />
        <CircleLeft1Icon className=" hidden sm:block absolute bottom-0 left-0 z-[-1]" />
        <CircleLeft2Icon className="hidden sm:block absolute bottom-[28px] left-0 z-[-1]" />

        <img src="assets/icons/remote-icon.svg" alt="" />

        <div className="bg-[#fff] sm:min-w-[50%] h-auto sm:py-[8rem] py-60 px-20 sm:px-20 flex justify-center rounded-lg shadow-md ">
          <div
            className="flex flex-col justify-center  gap-40"
            style={{ alignItems: "center" }}
          >
            <SucessSubscription />
            <Typography className="text-[48px] text-center font-700 leading-normal">
              Subscription Successful!
              <p className="text-[18px] font-400 text-[#757982] leading-4 pt-20">
                Your subscription has been activated, granting you access
              </p>
              <p className="text-[18px] font-400 text-[#757982] leading-4 pt-10">
                to all the services and benefits included.
              </p>
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
}
