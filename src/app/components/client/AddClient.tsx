import { addClient, restAll } from "app/store/Client";
import { ClientRootState, ClientType } from "app/store/Client/Interface";
import { useAppDispatch } from "app/store/store";
import { useFormik } from "formik";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useSelector } from "react-redux";
import { addClientSchema } from "src/formSchema";
import CommonModal from "../CommonModal";
import InputField from "../InputField";

interface IProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  fetchList: () => void;
}

function AddClient({ isOpen, setIsOpen, fetchList }: IProps) {
  const dispatch = useAppDispatch();
  const clientState = useSelector((store: ClientRootState) => store.client);

  const onSubmit = async (values: ClientType, { resetForm }) => {
    const { payload } = await dispatch(addClient(values));
    if (payload?.data?.status) {
      resetForm();
    }
  };

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      company_name: "",
    },
    validationSchema: addClientSchema,
    onSubmit,
  });

  useEffect(() => {
    if (!!clientState?.successMsg) {
      dispatch(restAll());
      fetchList();
      setIsOpen(false);
      formik.resetForm();
    } else if (!!clientState?.errorMsg) {
      dispatch(restAll());
    }
  }, [clientState]);

  return (
    <CommonModal
      open={isOpen}
      handleToggle={() => {
        setIsOpen((prev) => !prev);
        formik.resetForm();
      }}
      modalTitle="Add Client"
      maxWidth="910"
      btnTitle="Save"
      onSubmit={formik.handleSubmit}
      disabled={clientState.actionStatus}
      closeTitle="Cancel"
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
