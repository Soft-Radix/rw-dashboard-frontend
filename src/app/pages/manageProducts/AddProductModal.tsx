import { Dispatch, SetStateAction, useEffect, useState } from "react";
import CommonModal from "src/app/components/CommonModal";
import InputField from "src/app/components/InputField";
import * as Yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { Navigate } from "react-router";
import { productAdd, productDetails, productUpdate } from "app/store/Client";
import { useAppDispatch } from "app/store/store";

interface IProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  fetchList?: () => void;
  fetchUpdateData?: (any) => void;
  setId?: Dispatch<SetStateAction<number | null>>;
  isEditing?: boolean;
  id?: number | null;
}
const validationSchema = Yup.object({
  name: Yup.string()
    .transform((value) => (value ? value.trim() : ""))
    .required("Name is required")
    .test(
      "not-only-spaces",
      "Name cannot be only spaces",
      (value) => value && value.trim().length > 0
    ),
  description: Yup.string()
    .transform((value) => (value ? value.trim() : ""))
    .required("Description is required")
    .test(
      "not-only-spaces",
      "Description cannot be only spaces",
      (value) => value && value.trim().length > 0
    ),
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
  fetchUpdateData,
  setId,
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
        setIsOpen((prev) => !prev);
        setIsEditing(false);
        setId(null);
      } else {
        fetchData(formik.values);
      }
    },
  });
  const [disabled, setDisable] = useState(false);
  const dispatch = useAppDispatch();
  const fetchData = async (payload: any) => {
    setDisable(true);
    try {
      //@ts-ignore
      const res = await dispatch(productAdd(payload));
      // setList(res?.payload?.data?.data?.list);
      toast.success(res?.payload?.data?.message);
      setIsOpen((prev) => !prev);
      setDisable(false);
      setIsEditing(false);
      setId(null);
    } catch (error) {
      setDisable(false);
      console.error("Error fetching data:", error);
    }
  };

  // const fetchUpdateData = async (payload: any) => {
  //   try {
  //     //@ts-ignore
  //     const res = await dispatch(productUpdate(payload));
  //     // setList(res?.payload?.data?.data?.list);
  //     toast.success(res?.payload?.data?.message);
  //     setIsOpen((prev) => !prev);
  //     setIsEditing(false);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  const handleSave = () => {
    formik.handleSubmit();
  };

  useEffect(() => {
    if (!id) return;

    const fetchDataDEtails = async () => {
      setDisable(true);
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
        setDisable(false);
      } catch (error) {
        setDisable(false);
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
        setId(null);
      }}
      disabled={disabled}
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
          type="number"
        />
      </div>
    </CommonModal>
  );
}

export default AddProduct;
