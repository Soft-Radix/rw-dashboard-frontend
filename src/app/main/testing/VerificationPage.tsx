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
    setList(userData.subscription_and_docusign);
    if (userData.subscription_and_docusign.length === 0) {
      navigate("/sign-document");
    }
  }, [userData, navigate]);

  const handleButtonClick = (item) => {
    // Open the document link in a new tab
    window.open(item.docusign_link, "_blank");

    // Remove the item from the list
    const updatedList = list.filter((listItem) => listItem.id != item.id);
    setList(updatedList);

    // Update localStorage
    localStorage.setItem("userData", JSON.stringify(updatedList));

    // Update userData.subscription_and_docusign if necessary
    userData.subscription_and_docusign = updatedList;

    // Navigate if the list becomes empty
    if (updatedList.length == 0) {
      navigate("/sign-document");
    }
  };

  return (
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
              {/* <div className="text-sm font-light">{item.title}</div> */}
            </div>
            {/* <button
              onClick={() => window.open(item.docusign_link, "_blank")}
              className=" muiltr-1mw9zou text-white font-bold py-2 px-4 rounded mr-4"
            >
              assigned
            </button> */}
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
  );
}
