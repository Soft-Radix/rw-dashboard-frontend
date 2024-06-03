import { Button } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { RefreshToken, forgotPassword, logIn } from "app/store/Auth";
import { useAppDispatch } from "app/store/store";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import AuthBox from "src/app/components/AuthBox";
import InputField from "src/app/components/InputField";
import { forgotPasswordSchema } from "src/formSchema";
import { AxiosError } from "axios";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { getLocalStorage } from "src/utils";
import FuseLoading from "@fuse/core/FuseLoading";
import {
  CircleLeft1Icon,
  CircleLeft2Icon,
  CircleRightIcon,
} from "public/assets/icons/welcome";
import { useAuth } from "src/app/auth/AuthRouteProvider";
import { NoSubscription } from "public/assets/icons/common";
import { useSelector } from "react-redux";
import { AuthRootState } from "app/store/Auth/Interface";

type FormType = {
  email: string;
};

export default function VerificationPage() {
  // const userData = JSON.parse(localStorage.getItem("userData"));
  // const UserResponse = JSON.parse(localStorage.getItem("response"));
  const [selectedId, setselectedId] = useState("");
  const dispatch = useAppDispatch();
  const { userData, UserResponse } = useSelector(
    (store: AuthRootState) => store?.auth
  );
  const [list, setList] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const { jwtService } = useAuth();
  const { token } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  useEffect(() => {
    const redirect = async () => {
      await jwtService.autoSignIng();
    };

    // setList(userData);
    if (userData && UserResponse) {
      // console.log(serData, UserResponse, "serData && UserResponse");
      if (
        UserResponse.user?.subscription_and_docusign.length == 0 &&
        UserResponse?.user?.is_signed == 1
      ) {
        redirect();
        // localStorage.removeItem("response");
      }
    }
  }, [navigate, userData]);

  const handleButtonClick = (item) => {
    setIsLoading(true);
    window.location.href = item.docusign_link;

    setselectedId(item.id);
    setTimeout(() => {
      setIsLoading(false);
    }, 12000);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const payload = {
          token,
        };
        //@ts-ignore
        const res = await dispatch(RefreshToken(payload));

        // toast.success(res?.payload?.data?.message);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    return () => {
      // Remove the item from the list
      const updatedList = list.filter((listItem) => listItem.id !== selectedId);
      setList(updatedList);
    };
  }, []);
  useEffect(() => {
    setList(userData);
  }, [userData]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {loading && <FuseLoading />}
      {!loading && (
        <div className="flex justify-center items-center flex-col h-screen gap-60 px-28 ">
          <CircleRightIcon className="hidden sm:block absolute top-0 sm:right-0 z-[-1]" />
          <CircleLeft1Icon className=" hidden sm:block absolute bottom-0 left-0 z-[-1]" />
          <CircleLeft2Icon className="hidden sm:block absolute bottom-[28px] left-0 z-[-1]" />

          <img src="assets/icons/remote-icon.svg" alt="" />

          <div className="bg-[#fff] sm:min-w-[60%] h-auto sm:py-[8rem] py-60 px-20 sm:px-20 flex justify-center rounded-lg shadow-md ">
            {(UserResponse?.user?.subcription_status == "Pending" ||
              UserResponse?.user?.subcription_status == "Active") &&
            list.length > 0 ? (
              <div className="flex flex-col justify-center gap-40">
                <Typography className="text-[48px] text-center font-700 leading-normal">
                  Sign Document
                  <p className="text-[18px] font-400 text-[#757982] leading-4 pt-20">
                    To continue, please click the buttons below to sign the
                    document.
                  </p>
                </Typography>
                <div className="flex justify-center align-items-center flex-col">
                  {list?.map((item, index) => (
                    <>
                      <Typography className="block text-[16px] font-medium text-center text-[#111827] mt-20">
                        {item.title}
                      </Typography>
                      {/* <Button
                        variant="contained"
                        onClick={() => handleButtonClick(item)}
                        color="secondary"
                        className="mt-5 px-5 h-[50px] py-3 text-[18px] font-bold leading-normal"
                        aria-label="Log In"
                        size="large" */}
                      <Button
                        variant="contained"
                        color="secondary"
                        className=" w-full h-[50px] text-[18px] font-bold"
                        aria-label="Log In"
                        size="large"
                        type="submit"
                        onClick={() => handleButtonClick(item)}
                        disabled={isLoading}
                      >
                        Sign Document
                      </Button>
                    </>
                  ))}
                </div>
              </div>
            ) : null}
            {(UserResponse?.user?.subcription_status == "Pending" ||
              UserResponse?.user?.subcription_status == "Active") &&
            list.length == 0 ? (
              <>
                <div className="flex flex-col justify-center gap-10">
                  <div>
                    <NoSubscription />
                  </div>
                  <div>
                    <Typography className="block text-[28px] font-bold text-center text-[#111827] mb-5">
                      No subscription
                    </Typography>
                    <Typography className="text-[18px] font-400 text-[#757982] text-center leading-4 ">
                      It appears there is no active subscription.
                    </Typography>
                  </div>
                </div>
              </>
            ) : null}

            {UserResponse?.data?.user?.subcription_status == "Suspended" &&
            list.length == 0 ? (
              <>
                <div className="flex flex-col justify-center gap-10">
                  <div>
                    <NoSubscription />
                  </div>
                  <div>
                    <Typography className="block text-[28px] font-bold text-center text-[#111827] mb-5">
                      Subscription paused manually !
                    </Typography>
                    <Typography className="text-[18px] font-400 text-[#757982] text-center leading-4 ">
                      It appears there is no active subscription.
                    </Typography>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
}
