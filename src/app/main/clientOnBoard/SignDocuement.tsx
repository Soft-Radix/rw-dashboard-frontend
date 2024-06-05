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

type FormType = {
  cnfPassword: string;
  password: string;
};

export default function SignDocuement() {
  // State to track loading
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { token } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const userData = getLocalStorage("userData");
  const { jwtService } = useAuth();
  const [name, setName] = useState("");
  const [disable, setDisable] = useState(false);

  const store = useSelector((store: AuthRootState) => store.auth);
  const Userresponse = getLocalStorage("response");
  //* initialise useformik hook

  const validationSchema = Yup.object({
    name: Yup.string()
      .transform((value) => (value ? value.trim() : ""))
      .required("Name is required")
      .test(
        "not-only-spaces",
        "Name cannot be only spaces",
        (value) => value && value.trim().length > 0
      ),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
    },

    validationSchema,
    onSubmit: (values) => {
      fetchData();
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
  const fetchData = async () => {
    setDisable(true);
    const payload = {
      name: formik.values?.name,
      token: Userresponse.access_token,
    };
    const redirect = async () => {
      console.log("calling");
      await jwtService.autoSignIng();
    };
    try {
      const res = await dispatch(projectAddDoc(payload));
      if (res?.payload?.data?.status == 1) {
        let localData = getLocalStorage("response");

        let newItem = res?.payload?.data.data;
        let projects = [...localData.user.projects, newItem];
        localData.user.projects = projects;

        localStorage.setItem("response", JSON.stringify(localData));
        setDisable(false);
        redirect();
      }
    } catch (error) {
      setDisable(false);
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = () => {
    formik.handleSubmit();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const payload = {
          token: Userresponse.access_token,
        };

        //@ts-ignore
        const res = await dispatch(RefreshToken(payload));
        // localStorage.setItem(
        //   "userDetail",
        //   JSON.stringify(res?.payload?.data?.user)
        // );
        // localStorage.setItem("userDetail", JSON.stringify(res?.payload?.data?.));

        // toast.success(res?.payload?.data?.message);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
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

          <div className="bg-[#fff] sm:min-w-[50%] h-auto sm:py-[8rem] py-60 px-20 sm:px-20 flex justify-center rounded-lg shadow-md ">
            <div className="flex flex-col justify-center gap-40">
              <Typography className="text-[48px] text-center font-700 leading-normal">
                Let’s Start
                <p className="text-[18px] font-400 text-[#757982] leading-4 pt-20">
                  To begin, kindly include the name of your project.
                </p>
              </Typography>
              <InputField
                formik={formik}
                name="name"
                // value={name}
                // onChange={(e) => setName(e.target.value)}
                label="Name Your First Project"
                placeholder="Enter Your First Project Name"
                className="text-[16px] font-500 text-[#111827] leading-3"
              />
              <Button
                variant="contained"
                color="secondary"
                size="large"
                disabled={disable}
                className="text-[18px] font-500"
                onClick={handleSubmit}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
