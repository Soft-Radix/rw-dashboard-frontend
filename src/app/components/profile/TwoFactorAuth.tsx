import { useFormik } from "formik";
import { Dispatch, SetStateAction } from "react";
import CommonModal from "../CommonModal";
import InputField from "../InputField";

interface IProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function TwoFactorAuth({ isOpen, setIsOpen }: IProps) {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {},
  });

  return (
    <CommonModal
      open={isOpen}
      handleToggle={() => setIsOpen((prev) => !prev)}
      modalTitle="Two-Factors Authentication"
      maxWidth="733"
    >
      <div className="flex flex-col gap-20 mb-20">
        <p className="text-para_light">
          Enter your email below and we will send 4 digits code every-time you
          log in.{" "}
        </p>
        <InputField
          formik={formik}
          name="email"
          label="Email Address"
          placeholder="Enter Email Address"
        />
      </div>
    </CommonModal>
  );
}

export default TwoFactorAuth;
