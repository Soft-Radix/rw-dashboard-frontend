import { useFormik } from "formik";
import { Dispatch, SetStateAction } from "react";
import * as Yup from "yup";
import { addClientSchema } from "src/formSchema";
import CommonModal from "../CommonModal";
import InputField from "../InputField";

interface IProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function AddClient({ isOpen, setIsOpen }: IProps) {

  const onSubmit = () => {
    formik.handleSubmit()
  }

  const formik = useFormik({
    initialValues: {
      fName: "",
      lName: "",
    },
    validationSchema: addClientSchema,
    onSubmit
  });

  return (
    <CommonModal
      open={isOpen}
      handleToggle={() => setIsOpen((prev) => !prev)}
      modalTitle="Add Client"
      maxWidth="910"
      btnTitle="Save"
      onSubmit={onSubmit}
    >
      <div className="flex flex-col gap-20">
        <InputField
          formik={formik}
          name="fName"
          label="First Name"
          placeholder="Enter First Name"
        />
        <InputField
          formik={formik}
          name="lName"
          label="Last Name"
          placeholder="Enter Last Name"
        />
        <InputField
          formik={formik}
          name="email"
          label="Email Address"
          placeholder="Enter Email"
        />
        <InputField
          formik={formik}
          name="cName"
          label="Company Name"
          placeholder="Enter Company Name"
        />
      </div>
    </CommonModal>
  );
}

export default AddClient;
