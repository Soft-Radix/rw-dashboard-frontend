import { Dispatch, SetStateAction, useEffect } from "react";
import CommonModal from "src/app/components/CommonModal";
import InputField from "src/app/components/InputField";
import * as Yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { Navigate } from "react-router";
// import { productAdd, productDetails, productUpdate } from "app/store/Client";
import { useAppDispatch } from "app/store/store";

interface IProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  fetchList?: () => void;
  isEditing?: boolean;
  id: number | null;
}
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  unit_price: Yup.number()
    .required("Unit Price is required")
    .min(0.01, "Unit Price must be greater than 0"),
});
function AddProduct({
  isOpen,
  setIsOpen,
  fetchList,
  isEditing,
  setIsEditing,
  id,
}: IProps) {
  const formik = useFormik({
    initialValues: {
      description: "",
      unit_price: null,
      name: "",
    },
    validationSchema,
    onSubmit: (values) => {
      if (id) {
        fetchUpdateData({ ...formik.values, product_id: id });
      } else {
        fetchData(formik.values);
      }
    },
  });

  const dispatch = useAppDispatch();
  const fetchData = async (payload: any) => {
    try {
      //@ts-ignore
      const res = await dispatch(productAdd(payload));
      // setList(res?.payload?.data?.data?.list);
      toast.success(res?.payload?.data?.message);
      setIsOpen((prev) => !prev);
      setIsEditing(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchUpdateData = async (payload: any) => {
    try {
      //@ts-ignore
      const res = await dispatch(productUpdate(payload));
      // setList(res?.payload?.data?.data?.list);
      toast.success(res?.payload?.data?.message);
      setIsOpen((prev) => !prev);
      setIsEditing(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSave = () => {
    formik.handleSubmit();
  };

  useEffect(() => {
    if (!id) return null;

    const fetchDataDEtails = async () => {
      try {
        const payload = {
          product_id: id,
        };
        //@ts-ignore
        const res = await dispatch(productDetails(payload));
        const data = res?.payload?.data?.data;

        if (data) {
          formik.setValues({
            description: data.description || "",
            unit_price: data.unit_price || null,
            name: data.name || "",
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDataDEtails();
  }, [dispatch]);

  return (
    <CommonModal
      open={isOpen}
      handleToggle={() => {
        setIsOpen((prev) => !prev);
        setIsEditing(false);
      }}
      modalTitle={isEditing == true ? "Edit Product" : "Add Product"}
      maxWidth="730"
      btnTitle="Save"
      closeTitle="Cancel"
      onSubmit={handleSave}
    >
      <div className="flex flex-col gap-20">
        <InputField
          name="name"
          label="Name"
          placeholder="Enter Name"
          formik={formik}
        />

        <InputField
          name="description"
          label="Description"
          placeholder="Enter Description"
          multiline
          formik={formik}
          rows={4}
        />
        <InputField
          name="unit_price"
          label="Unit Price"
          placeholder="Enter Price"
          formik={formik}
        />
      </div>
    </CommonModal>
  );
}

export default AddProduct;
