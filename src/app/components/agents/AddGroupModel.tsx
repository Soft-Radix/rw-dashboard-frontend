import { useFormik } from "formik";
import { Dispatch, SetStateAction } from "react";
import CommonModal from "../CommonModal";
import InputField from "../InputField";

interface IProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function AddGroupModel({ isOpen, setIsOpen }: IProps) {
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
      modalTitle="Add Group"
      maxWidth="733"
    >
      <div className="flex flex-col gap-20 mb-20">
        <InputField
          formik={formik}
          name="groupName"
          label="Group Name"
          placeholder="Enter Group Name"
        />
      </div>
    </CommonModal>
  );
}

export default AddGroupModel;
