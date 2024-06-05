import { Dispatch, SetStateAction, useEffect, useState } from "react";
import CommonModal from "src/app/components/CommonModal";
import InputField from "src/app/components/InputField";
import * as Yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { Navigate } from "react-router";
import { productAdd, productDetails, productUpdate } from "app/store/Client";
import { useAppDispatch } from "app/store/store";
import FuseLoading from "@fuse/core/FuseLoading";

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
    )
    .max(50, "Name should be less than or equal to 50 characters"),
  // .matches(/^[A-Za-z\s]+$/, "Name can only contain letters and spaces"),

  description: Yup.string()
    .transform((value) => (value ? value.trim() : ""))
    .required("Description is required")
    .test(
      "not-only-spaces",
      "Description cannot be only spaces",
      (value) => value && value.trim().length > 0
    )
    .max(500, "Description should be less than or equal to 500 characters"),
  // .matches(
  //   /^[A-Za-z\s]+$/,
  //   "Description can only contain letters and spaces"
  // ),

  unit_price: Yup.string()
    .required("Unit Price is required")
    .test(
      "is-valid-number",
      "Unit Price must be a valid number without + or - symbols",
      (value) => value !== undefined && /^[^+-]*\d*\.?\d{0,2}$/.test(value)
    )
    .test(
      "decimal-places",
      "Only two decimal places are allowed",
      (value) => value === undefined || /^\d*\.?\d{0,2}$/.test(value)
    )
    .test(
      "max-length",
      "Unit Price must be less than or equal to 6 digits",
      (value) => value === undefined || /^\d{1,6}(\.\d{1,2})?$/.test(value)
    )
    .test(
      "is-greater-than-zero",
      "Unit Price must be greater than 0",
      (value) => value !== undefined && parseFloat(value) > 0
    )
    .transform((value) => (value ? String(parseFloat(value)) : null)),
  // unit_price: Yup.number()
  //   .required("Unit Price is required")
  //   .min(0.01, "Unit Price must be greater than 0")
  //   .test(
  //     "decimal-places",
  //     "Only two decimal places are allowed",
  //     (value: any) => value === undefined || /^\d+(\.\d{1,2})?$/.test(value)
  //   )
  //   .test(
  //     "max-length",
  //     "Unit Price must be less than or equal to 6 digits",
  //     (value: any) => value === undefined || /^\d{1,6}(\.\d{1,2})?$/.test(value)
  //   )
  //   .test(
  //     "is-valid-number",
  //     "Unit Price must be a valid number without + or - symbols",
  //     (value) => value !== undefined && /^\d+(\.\d{1,2})?$/.test(value)
  //   ),
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
  const [loading, setLoading] = useState(true);

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
      setLoading(true);
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
        setLoading(false);
        setDisable(false);
      } catch (error) {
        setDisable(false);
        console.error("Error fetching data:", error);
      }
    };
    fetchDataDEtails();
  }, [dispatch]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [loading]);

  return (
    <>
      {loading && <FuseLoading />}
      {!loading && (
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
      )}
    </>
  );
}

export default AddProduct;
