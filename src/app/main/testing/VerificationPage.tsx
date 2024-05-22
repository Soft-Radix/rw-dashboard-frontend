import { Button } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { forgotPassword, logIn } from "app/store/Auth";
import { useAppDispatch } from "app/store/store";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import AuthBox from "src/app/components/AuthBox";
import InputField from "src/app/components/InputField";
import { forgotPasswordSchema } from "src/formSchema";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { getLocalStorage } from "src/utils";
import {
  CircleLeft1Icon,
  CircleLeft2Icon,
  CircleRightIcon,
} from "public/assets/icons/welcome";

type FormType = {
  email: string;
};

export default function VerificationPage() {
  const userData = getLocalStorage("userData");
  const dispatch = useAppDispatch();
  const [list, setList] = useState<any>([]);

  // // State to track loading
  // const [isLoading, setIsLoading] = useState<boolean>(false);

  // const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // //* initialise useformik hook
  // const formik = useFormik({
  //   initialValues: {
  //     email: "",
  //   },
  //   validationSchema: forgotPasswordSchema,
  //   // validationSchema: validationSchemaProperty,
  //   onSubmit: (values) => {
  //     onSubmit(values);
  //   },
  // });

  // async function onSubmit(formData: FormType) {
  //   const { email } = formData;
  //   setIsLoading(true);
  //   let { payload } = await dispatch(forgotPassword({ email }));
  //   setIsLoading(false);
  //   if (payload?.data?.status) {
  //     navigate("/otp-verification");
  //   }
  // }
  useEffect(() => {
    setList(userData);
    // if (userData.length === 0) {
    //   navigate("/sign-document");
    // }
  }, [userData, navigate]);

  const handleButtonClick = (item) => {
    // Open the document link in a new tab
    // window.open(item.docusign_link, "_blank");
    window.location.href = item.docusign_link;

    // Remove the item from the list
    const updatedList = list.filter((listItem) => listItem.id != item.id);
    setList(updatedList);

    // Update localStorage
    setTimeout(() => {
      localStorage.setItem("userData", JSON.stringify(updatedList));
    }, 3000);

    // Update userData.subscription_and_docusign if necessary
    // userData = updatedList;

    // Navigate if the list becomes empty
    // if (updatedList.length == 0) {
    //   navigate("/sign-document");
    // }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <Paper className="w-full max-w-lg p-8 bg-white rounded-2xl shadow-lg">
          {list?.map((item, index) => (
            <div
              key={item.id}
              className="flex items-center justify-between my-4 p-10 border border-gray-200 rounded-lg shadow-sm"
            >
              <div className="flex flex-col">
                <div className="text-lg font-semibold">{`Subscription ${
                  index + 1
                }:`}</div>
                <div className="text-lg font-medium">{item.title}</div>
              </div>

              <Button
                variant="contained"
                onClick={() => handleButtonClick(item)}
                color="secondary"
                className="mt-10 w-auto h-[30px] text-[12px] font-medium leading-normal"
                aria-label="Log In"
                size="large"
              >
                Signed Contract
              </Button>
            </div>
          ))}
        </Paper>
      </div>
      <div className="flex justify-center items-center flex-col h-screen gap-60 px-28 ">
        <CircleRightIcon className="hidden sm:block absolute top-0 sm:right-0 z-[-1]" />
        <CircleLeft1Icon className=" hidden sm:block absolute bottom-0 left-0 z-[-1]" />
        <CircleLeft2Icon className="hidden sm:block absolute bottom-[28px] left-0 z-[-1]" />

        <img src="assets/icons/remote-icon.svg" alt="" />

        <div className="bg-[#fff] sm:min-w-[50%] h-auto sm:py-[8rem] py-60 px-20 sm:px-20 flex justify-center rounded-lg shadow-md ">
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
                  <Typography className="block text-[16px] font-medium text-center text-[#111827] mb-5">
                    {item.title}
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => handleButtonClick(item)}
                    color="secondary"
                    className="mt-5 px-5 h-[30px] text-[12px] font-medium leading-normal"
                    aria-label="Log In"
                    size="large"
                  >
                    Sign Document
                  </Button>
                </>
              ))}
            </div>
            <InputField
              name="first_name"
              label="Name Your First Project"
              placeholder="Enter Your First Project Name"
              className="text-[16px] font-500 text-[#111827] leading-3"
            />
            <Button
              variant="contained"
              color="secondary"
              size="large"
              className="text-[18px] font-500"
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
