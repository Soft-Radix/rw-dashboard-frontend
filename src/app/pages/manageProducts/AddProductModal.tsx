import { Dispatch, SetStateAction } from "react";
import CommonModal from "src/app/components/CommonModal";
import InputField from "src/app/components/InputField";


interface IProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  fetchList?: () => void;
  isEditing?: boolean;
}

function AddProduct({
  isOpen,
  setIsOpen,
  fetchList,
  isEditing,
  setIsEditing,
}: IProps) {

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
    >
      <div className="flex flex-col gap-20">
        <InputField
          name="name"
          label="Name"
          placeholder="Enter Name"
        />

        <InputField
          name="description"
          label="Description"
          placeholder="Enter Description"
          multiline
          rows={4}
        />
        <InputField
          name="Unit_Price"
          label="Unit Price"
          placeholder="Enter Price"
        />
      </div>
    </CommonModal>
  );
}

export default AddProduct;
