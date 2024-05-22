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
import { getLocalStorage } from "src/utils";
import { useAuth } from "src/app/auth/AuthRouteProvider";
import { projectAdd } from "app/store/Projects";

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
  const userData = getLocalStorage("userData");
  const { jwtService } = useAuth();
  const [name, setName] = useState("");

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
  const fetchData = async () => {
    const Userresponse = getLocalStorage("response");
    const payload = {
      name: name,
    };
    const redirect = async () => {
      console.log("calling");
      await jwtService.autoSignIng();
    };
    try {
      const res = await dispatch(projectAdd(payload));
      if (res) {
        redirect();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = () => {
    fetchData();
  };

  return (
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
            // formik={formik}
            name="first_name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Name Your First Project"
            placeholder="Enter Your First Project Name"
            className="text-[16px] font-500 text-[#111827] leading-3"
          />
          <Button
            variant="contained"
            color="secondary"
            size="large"
            disabled={name == "" ? true : false}
            className="text-[18px] font-500"
            onClick={handleSubmit}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
