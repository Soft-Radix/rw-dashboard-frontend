import { projectAdd } from "app/store/Projects";
import { useAppDispatch } from "app/store/store";
import { Dispatch, SetStateAction, useState } from "react";
import CommonModal from "src/app/components/CommonModal";
import InputField from "src/app/components/InputField";
import { useFormik } from "formik";
import * as Yup from "yup";

interface IProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function AddProjectModal({ isOpen, setIsOpen }: IProps) {
  const [projectName, setIsProjectName] = useState();
  const dispatch = useAppDispatch();

  const fetchData = async (payload: any) => {
    try {
      const res = await dispatch(projectAdd(payload));
      // setList(res?.payload?.data?.data?.list);
      //   toast.success(res?.payload?.data?.message);
      console.log("======res==", res);
      setIsOpen((prev) => !prev);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema,
    onSubmit: (values) => {
      fetchData(formik.values);
    },
  });

  const handleSave = () => {
    formik.handleSubmit();

    setIsOpen(false);
  };
  return (
    <CommonModal
      open={isOpen}
      handleToggle={() => setIsOpen((prev) => !prev)}
      modalTitle="Add Project"
      maxWidth="314"
      btnTitle="Save"
      closeTitle="Cancel"
      headerBgColor="white"
      bgColor="white"
      titleColor="black"
      onSubmit={handleSave}
    >
      <InputField
        formik={formik}
        name="name"
        label="Project Name"
        value={formik.values.name}
        placeholder="Enter Project Name"
        className="input-color"
      />
    </CommonModal>
  );
}

export default AddProjectModal;
