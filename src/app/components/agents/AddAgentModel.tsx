import { useFormik } from "formik";
import { Dispatch, SetStateAction } from "react";
import CommonModal from "../CommonModal";
import InputField from "../InputField";

interface IProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function AddAgentModel({ isOpen, setIsOpen }: IProps) {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
      role: "",
    },
    onSubmit: (values) => { },
  });

  return (
    <CommonModal
      open={isOpen}
      handleToggle={() => setIsOpen((prev) => !prev)}
      modalTitle="Add Agent"
      maxWidth="733"
    >
      <div className="flex flex-col gap-20 mb-20">
        <InputField
          formik={formik}
          name="firstName"
          label="First Name"
          placeholder="Enter First Name"
        />
        <InputField
          formik={formik}
          name="lastName"
          label="Last Name"
          placeholder="Enter Last Name"
        />
        <InputField
          formik={formik}
          name="email"
          label="Email Address"
          placeholder="Enter Email"
        />
      </div>
    </CommonModal>
  );
}

export default AddAgentModel;