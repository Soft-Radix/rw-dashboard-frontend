import { Button } from "@mui/material";
import { useFormik } from "formik";
import InputField from "src/app/components/InputField";

export default function ChangePassword() {
  const formik = useFormik({
    initialValues: {
      old_password: "",
      new_password: "",
      confirm_password: "",
    },
    onSubmit: (values) => {},
  });
  return (
    <>
      {/* <TitleBar title="Change Password" /> */}
      <div className="px-[28px]">
        <div className="flex items-center justify-center lg:min-h-[calc(100vh_-_12rem)] bg-white rounded-lg shadow-sm p-20 py-[3rem] mt-[3rem]">
          <div className="flex flex-col items-center">
            <div className="text-center">
              <h2 className="text-4xl lg:text-[4.8rem] font-600 mb-10">
                Change Password
              </h2>
              <p className="text-lg lg:text-xl text-para_light">
                Here you can change your password by fill the below form.
              </p>
            </div>
            <div className="w-[86%] mt-[4rem] flex flex-col gap-[2rem]">
              <InputField
                type="password"
                label="Old Password"
                name="old_password"
                formik={formik}
                placeholder="Enter Old Password"
              />
              <InputField
                type="password"
                label="New Password"
                name="new_password"
                formik={formik}
                placeholder="Enter New Password"
              />
              <InputField
                type="password"
                name="old_password"
                formik={formik}
                placeholder="Confirm New Password"
                label="Confirm New Password"
              />
              <Button
                variant="contained"
                color="secondary"
                className="w-full h-[50px] text-[18px] font-bold mt-[4rem]"
                aria-label="Change"
                size="large"
              >
                Change
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
