import navigationConfig from "app/configs/navigationConfig";
import { projectAdd, projectUpdate } from "app/store/Projects";
import { ProjectUpdate } from "app/store/Projects/Interface";
import { useAppDispatch } from "app/store/store";
import { useFormik } from "formik";
import { SubProjectIcon } from "public/assets/icons/navabarIcon";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import CommonModal from "src/app/components/CommonModal";
import InputField from "src/app/components/InputField";
import { getLocalStorage } from "src/utils";
import * as Yup from "yup";

interface IProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  projectData: {
    name: string;
    id: string | number;
  };
}

function EditProjectModal({ isOpen, setIsOpen, projectData }: IProps) {
  const [disable, setDisable] = useState(false);
  const dispatch = useAppDispatch();
  const userData = getLocalStorage("userDetail");
  const navigate = useNavigate();
  const fetchData = async (data: ProjectUpdate) => {
    setDisable(true);
    try {
      const res = await dispatch(projectUpdate(data));
      setDisable(false);
      if (res?.payload?.data.status == 1) {
        const newProject = res?.payload?.data;
        let localData = getLocalStorage("userDetail");
        navigate(`projects/${data?.project_id}/${data?.data?.name}`);
        const updateProject = localData?.projects?.findIndex(
          (item) => item.id === projectData?.id
        );
        localData.projects[updateProject] = newProject?.data;

        localStorage.setItem("userDetail", JSON.stringify(localData));
        formik.resetForm();
        window.location.reload();
        setIsOpen(false);
      }
    } catch (error) {
      setDisable(false);
      console.error("Error fetching data:", error);
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .required("Name is required")
      .min(1, "Name is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema,
    onSubmit: (values) => {
      fetchData({ project_id: projectData.id, data: values });
    },
  });

  const handleSave = () => {
    formik.handleSubmit();
  };

  useEffect(() => {
    formik.setFieldValue("name", projectData?.name);
  }, []);
  return (
    <CommonModal
      open={isOpen}
      handleToggle={() => {
        formik.setFieldValue("name", projectData?.name);
        setIsOpen((prev) => !prev);
      }}
      modalTitle="Edit Project"
      maxWidth="314"
      btnTitle="Save"
      closeTitle="Cancel"
      headerBgColor="#ffff"
      bgColor="#ffff  "
      titleColor="black"
      onSubmit={handleSave}
      disabled={disable}
      
    >
      <InputField
        formik={formik}
        name="name"
        label="Project Name"
        value={formik.values.name}
        placeholder="Enter Project Name"
        className="input-color"
        onChange={(e) => formik.setFieldValue("name", e.target.value)}
      />
    </CommonModal>
  );
}

export default EditProjectModal;
