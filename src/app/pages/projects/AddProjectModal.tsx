import navigationConfig from "app/configs/navigationConfig";
import { projectAdd } from "app/store/Projects";
import { useAppDispatch } from "app/store/store";
import { useFormik } from "formik";
import { SubProjectIcon } from "public/assets/icons/navabarIcon";
import { Dispatch, SetStateAction } from "react";
import CommonModal from "src/app/components/CommonModal";
import InputField from "src/app/components/InputField";
import { getLocalStorage } from "src/utils";
import * as Yup from "yup";

interface IProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function AddProjectModal({ isOpen, setIsOpen }: IProps) {
  const dispatch = useAppDispatch();
  const userData = getLocalStorage("userDetail");

  const fetchData = async (payload: any) => {
    try {
      const res = await dispatch(projectAdd(payload));
      if (res?.payload?.data?.status == 1) {
        const newProject = res?.payload?.data;
        let layout = {
          id: newProject?.data.id,
          title: (newProject.data.name as string).toUpperCase(),
          type: "item",
          icon: "material-twotone:compress",
          customIcon: <SubProjectIcon />,
          url: `projects/${newProject?.data.id}/${newProject.data.name}`,
          end: true,
          isProject: true,
        };

        const projectData = [...navigationConfig, layout];

        let localData = getLocalStorage("userDetail");
        let projectIndex = projectData.findIndex(
          (item) => item.id === "projects"
        );

        let projects = [...localData.projects, newProject?.data];
        localData.projects = projects;

        localStorage.setItem("userDetail", JSON.stringify(localData));

        window.location.reload();
        setIsOpen(false);
      }
    } catch (error) {
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
      fetchData(formik.values);
    },
  });

  const handleSave = () => {
    formik.handleSubmit();
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
      // bgColor="white"
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
