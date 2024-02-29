import { useFormik } from "formik";
import { Dispatch, SetStateAction, useEffect } from "react";
import CommonModal from "../CommonModal";
import InputField from "../InputField";

interface IProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  uploadedFile: File[] | null;
}

function UploadFileName({ isOpen, setIsOpen, uploadedFile }: IProps) {
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: (values) => {},
  });

  useEffect(() => {
    if (!isOpen) {
      formik.resetForm();
    }
  }, [isOpen]);

  return (
    <CommonModal
      open={isOpen}
      handleToggle={() => setIsOpen((prev) => !prev)}
      modalTitle="Upload Name"
      maxWidth="390"
    >
      <div className="flex flex-col gap-20 mb-20">
        <InputField
          formik={formik}
          name="name"
          label="Give Your Upload Name"
          placeholder="Enter Upload Name"
        />
      </div>
    </CommonModal>
  );
}

export default UploadFileName;
