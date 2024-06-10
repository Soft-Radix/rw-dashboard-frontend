import { useFormik } from "formik";
import { Dispatch, SetStateAction } from "react";
import CommonModal from "../CommonModal";
import InputField from "../InputField";
import { Checkbox, FormControlLabel, Grid } from "@mui/material";

interface IProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function AddCard({ isOpen, setIsOpen }: IProps) {
  const formik = useFormik({
    initialValues: {
      card_name: "",
      card_number: "",
      expiry_date: "",
      cvv: "",
      save_card: false,
    },
    onSubmit: (values) => {},
  });

  return (
    <CommonModal
      open={isOpen}
      handleToggle={() => setIsOpen((prev) => !prev)}
      modalTitle="Add New Card"
      maxWidth="733"
    >
      <div className="flex flex-col gap-20 mb-20">
        <InputField
          formik={formik}
          name="card_name"
          label="Cardholder Name"
          placeholder="Enter Cardholder Name"
        />
        <InputField
          formik={formik}
          name="card_number"
          label="Card Number"
          placeholder="Enter Card Number"
        />
        <Grid container spacing="22px">
          <Grid item lg={6}>
            <InputField
              formik={formik}
              name="expiry_date"
              label="Expiration Date"
              placeholder="Enter Date"
            />
          </Grid>
          <Grid item lg={6}>
            <InputField
              formik={formik}
              name="cvv"
              label="CVV"
              placeholder="Enter CVV"
            />
          </Grid>
        </Grid>
        <div>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label={
              <span className="text-lg text-black">
                Save the card for future use.
              </span>
            }
          />
        </div>
      </div>
    </CommonModal>
  );
}

export default AddCard;
