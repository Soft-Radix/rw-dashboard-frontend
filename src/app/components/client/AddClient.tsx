import { useFormik } from "formik";
import { Dispatch, SetStateAction, useEffect } from "react";
import * as Yup from "yup";
import { addClientSchema } from "src/formSchema";
import CommonModal from "../CommonModal";
import InputField from "../InputField";
import { addClient, restAll } from "app/store/Client";
import { useAppDispatch } from "app/store/store";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { ClientRootState, ClientType } from "app/store/Client/Interface";

interface IProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}


function AddClient({ isOpen, setIsOpen }: IProps) {
  const dispatch = useAppDispatch();
  const clientState = useSelector((store: ClientRootState) => store.client);

  const onSubmit = async (values: ClientType) => {
    await dispatch(addClient(values));
  }

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      company_name: "",
    },
    validationSchema: addClientSchema,
    onSubmit
  });


  useEffect(() => {
    if (!!clientState?.successMsg) {
      dispatch(restAll())
      setIsOpen((prev) => !prev)
    } else if (!!clientState?.errorMsg) {
      dispatch(restAll())
    }
  }, [clientState])

  return (
    <CommonModal
      open={isOpen}
      handleToggle={() => setIsOpen((prev) => !prev)}
      modalTitle="Add Client"
      maxWidth="910"
      btnTitle="Save"
      onSubmit={formik.handleSubmit}
    >
      <div className="flex flex-col gap-20">
        <InputField
          formik={formik}
          name="first_name"
          label="First Name"
          placeholder="Enter First Name"
        />
        <InputField
          formik={formik}
          name="last_name"
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
          name="company_name"
          label="Company Name"
          placeholder="Enter Company Name"
        />
      </div>
    </CommonModal>
  );
}

export default AddClient;
